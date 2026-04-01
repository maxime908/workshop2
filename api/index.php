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

    if (!isset($_GET['name'])) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data["device_id"])) {
                $selectUsersAllStats = $mysqlClient -> prepare("SELECT * FROM game WHERE device_id = :device_id AND endDate IS NOT NULL");
                $selectUsersAllStats -> execute([
                    'device_id' => $data['device_id'],
                ]);
                $allUserStats = $selectUsersAllStats -> fetchAll(PDO::FETCH_ASSOC);

                echo json_encode($allUserStats);
            }

            exit;
        }

        $selectPersonalityStatement = $mysqlClient -> prepare("SELECT * FROM pages");
        $selectPersonalityStatement -> execute();
        $selectPersonality = $selectPersonalityStatement -> fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($selectPersonality));

        exit;
    }

    $selectPersonalityStatement = $mysqlClient -> prepare("SELECT * FROM pages WHERE name LIKE :name");
    $selectPersonalityStatement -> execute([
        'name' => $_GET['name'] . '%',
    ]);
    $selectPersonality = $selectPersonalityStatement -> fetch(PDO::FETCH_ASSOC);

    $personality = $selectPersonality;

    if (isset($_GET['id'])) {
        $selectStepsStatement = $mysqlClient -> prepare(
            "SELECT * 
            FROM steps
            INNER JOIN pages_steps
            ON pages_steps.id_step = steps.id_step
            WHERE {$personality['id_page']} = pages_steps.id_page
            AND steps.number = {$_GET['id']}");
        $selectStepsStatement -> execute();
        $selectSteps = $selectStepsStatement -> fetchAll(PDO::FETCH_ASSOC);

        $personality = $selectSteps;

        $json = null;
        $file = '../front/steps.json';

        foreach ($personality as $value) {
            $json = json_decode(file_get_contents($file), true);
            foreach ($json as $key => $value2) {
                if ($key === $_GET['name']) {
                    $json[$key]['step'] = $value['number'];
                    file_put_contents($file, json_encode($json), JSON_PRETTY_PRINT);
                }
            }
        }

        print_r(json_encode($personality));

        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === "PATCH") {
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data['device_id'] && $data['endDate'] && $data["score"]) {
            $newGameStatement = $mysqlClient -> prepare("UPDATE game SET device_id = :device_id, endGame = :endDate, score = :score WHERE id_page = :id_page");
            $newGameStatement -> execute([
                'device_id' => $data['device_id'],
                'endDate' => $data['endDate'],
                'score' => $data['score'],
                'id_page' => $personality['id_page'],
            ]);

            exit;
        }
    }

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

    if (!$personality) {
        echo "Aucune personnalité trouvé";
        exit;
    }
    
    print_r(json_encode($personality));
?>