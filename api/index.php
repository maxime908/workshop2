<?php 
    session_start();

    require_once(__DIR__ . "/config/config.php");

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    // $steps = json_decode(file_get_contents("steps.json"), true);

    // print_r(json_encode($steps));

    if (!isset($_GET['name'])) {
        $selectPersonalityStatement = $mysqlClient -> prepare("SELECT * FROM pages");
        $selectPersonalityStatement -> execute();
        $selectPersonality = $selectPersonalityStatement -> fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($selectPersonality));
    } else {
        $selectPersonalityStatement = $mysqlClient -> prepare("SELECT * FROM pages WHERE name = :name");
        $selectPersonalityStatement -> execute([
            'name' => $_GET['name'],
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
                        file_put_contents($file, json_encode($json));
                    }
                }
            }
        }

        if ($_SERVER['REQUEST_METHOD'] === "PATCH") {
            $data = json_decode(file_get_contents('php://input'), true);
            if ($data['mac'] && $data['endDate'] && $data["score"]) {
                $newGameStatement = $mysqlClient -> prepare("UPDATE game SET mac = :mac, endGame = :endDate, score = :score WHERE id_page = :id_page");
                $newGameStatement -> execute([
                    'mac' => $data['mac'],
                    'endDate' => $data['endDate'],
                    'score' => $data['score'],
                    'id_page' => $personality['id_page'],
                ]);

                exit;
            }
        }

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $data = json_encode(file_get_contents('php://input'));
            if (isset($data['mac'])) {
                $newGameStatement = $mysqlClient -> prepare("INSERT INTO game (mac, id_page) VALUES (:mac, :id_page)");
                $newGameStatement -> execute([
                    'mac' => $data['mac'],
                    'id_page' => $personality['id_page'],
                ]);
            }

            exit;
        }
        
        print_r(json_encode($personality));
    }
?>