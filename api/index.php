<?php 
    session_start();

    require_once(__DIR__ . "/config/config.php");

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    // $steps = json_decode(file_get_contents("steps.json"), true);

    // print_r(json_encode($steps));

    // $tabNull = [
    //     "question" => "Replace les évenements a la date correspondante",
    //     "choice" => [
    //         "date" => [
    //             "1914",
    //             "1933",
    //             "1937-1938",
    //             "1942",
    //             "2000",
    //         ],
    //         "name" => [
    //             "Naissance",
    //             "Grand scandale",
    //             "Grand succès",
    //             "Fuite de l’Europe",
    //             "Décès",
    //             "Mariage",
    //             "Nouveau système de comm",
    //             "Signe avec la MGM",
    //         ],
    //     ],
    // ];

    // $test = $mysqlClient -> prepare("UPDATE steps SET question = :question WHERE id_step = 1");
    // $test -> execute([
    //     "question" => json_encode($tabNull),
    // ]);

    // return;


    // Pour verifier si un paramètre name n'est pas envoyé dans l'url
    if (!isset($_GET['name'])) {
        // Verifier la methode de la requête
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Récuper donner envoyer en POST
            $data = json_decode(file_get_contents('php://input'), true);

            // Récuper les stats de l'utilisateur qui est entrain de jouer
            if (isset($data["device_id"])) {
                $selectUsersAllStats = $mysqlClient -> prepare(
                    "SELECT * 
                    FROM game
                    INNER JOIN pages
                    ON game.id_page = pages.id_page
                    WHERE device_id = :device_id 
                    AND endDate IS NOT NULL");
                $selectUsersAllStats -> execute([
                    'device_id' => $data['device_id'],
                ]);
                $allUserStats = $selectUsersAllStats -> fetchAll(PDO::FETCH_ASSOC);

                echo json_encode($allUserStats);
            }

            exit;
        }

        // Récuper les personnalitées
        $selectPersonalityStatement = $mysqlClient -> prepare("SELECT * FROM pages");
        $selectPersonalityStatement -> execute();
        $selectPersonality = $selectPersonalityStatement -> fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($selectPersonality));

        exit;
    }

    // Si il y a un paramètre name envoyer dans l'url cela récupère la personnalitée correspondante
    $selectPersonalityStatement = $mysqlClient -> prepare("SELECT * FROM pages WHERE name LIKE :name");
    $selectPersonalityStatement -> execute([
        'name' => $_GET['name'] . '%',
    ]);
    $selectPersonality = $selectPersonalityStatement -> fetch(PDO::FETCH_ASSOC);

    $personality = $selectPersonality;

    // Vérifier si un numéro d'étape est envoyer dans l'url et si c'est le cas récupérer l'étape correspondant à la personnalitée choisie 
    if (isset($_GET['step'])) {
        $selectStepsStatement = $mysqlClient -> prepare(
            "SELECT * 
            FROM steps
            INNER JOIN pages_steps
            ON pages_steps.id_step = steps.id_step
            WHERE {$personality['id_page']} = pages_steps.id_page
            AND steps.number = {$_GET['step']}");
        $selectStepsStatement -> execute();
        $selectSteps = $selectStepsStatement -> fetchAll(PDO::FETCH_ASSOC);

        $personality = $selectSteps;

        // Pour update le json et y passé le bonne étape à la bonne personnalitée
        $json = null;
        $file = '../front/steps.json';


        if ($personality) {
            foreach ($personality as $value) {
                $json = json_decode(file_get_contents($file), true);
                foreach ($json as $key => $value2) {
                    if ($key === $_GET['name']) {
                        $json[$key]['step'] = $value['number'];
                        file_put_contents($file, json_encode($json), JSON_PRETTY_PRINT);
                    }
                }
            }
        }

        print_r(json_encode($personality));

        exit;
    }


    // Pour finir une game
    if ($_SERVER['REQUEST_METHOD'] === "PATCH") {
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data['device_id'] && $data['endDate'] && $data["score"]) {
            $newGameStatement = $mysqlClient -> prepare("UPDATE game SET device_id = :device_id, endGame = :endDate, score = :score WHERE id_page = :id_page");
            $newGameStatement -> execute([
                'device_id' => $data['device_id'],
                'endDate' => date("Y-m-d H:i:s"),
                'score' => $data['score'],
                'id_page' => $personality['id_page'],
            ]);

            exit;
        }
    }

    // Crée une game et verifier si le dernière utilsateur qui à lancé une game sa fait plus de 5 minutes qu'il l'a lancé 
    if (!isset($_GET['params']) && $_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['device_id'])) {
            $userSearchStatement = $mysqlClient -> prepare("SELECT * FROM game WHERE endDate IS NULL");
            $userSearchStatement -> execute();
            $userSearch = $userSearchStatement -> fetch(PDO::FETCH_ASSOC);

            if ($userSearch) {
                $startDate = strtotime($userSearch["startDate"]);

                if (strtotime(date("Y-m-d H:i:s")) > $startDate + 60 * 5) {
                    $userInsertStatement = $mysqlClient -> prepare("UPDATE game SET endDate = :endDate WHERE device_id = :device_id");
                    $userInsertStatement -> execute([
                        'device_id' => $userSearch['device_id'],
                        'endDate' => date("Y-m-d H:i:s"),
                    ]);

                    $userInsertStatement = $mysqlClient -> prepare("INSERT INTO game (device_id, id_page) VALUES (:device_id, :id_page)");
                    $userInsertStatement -> execute([
                        'device_id' => $data['device_id'],
                        'id_page' => $personality['id_page'],
                    ]);

                    echo json_encode(true);
                    exit;
                }

                echo json_encode(false);
                exit;
            }

            $newGameStatement = $mysqlClient -> prepare("INSERT INTO game (device_id, id_page) VALUES (:device_id, :id_page)");
            $newGameStatement -> execute([
                'device_id' => $data['device_id'],
                'id_page' => $personality['id_page'],
            ]);
            echo json_encode(true);
        }

        exit;
    }

    // Pour update le param du json
    if (isset($_GET['params']) && $_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['params'])) {
            $json = null;
            $file = '../front/steps.json';

            $json = json_decode(file_get_contents($file), true);
            foreach ($json as $key => $value) {
                if ($key === $_GET['name']) {
                    $json[$key]['params'] = $data['params'];
                    file_put_contents($file, json_encode($json), JSON_PRETTY_PRINT);
                }
            }
        }

        exit;
    }

    // Pour savoir si aucune personnalité a été trouvé
    if (!$personality) {
        echo "Aucune personnalité trouvé";
        exit;
    }
    
    print_r(json_encode($personality));
?>