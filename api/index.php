<?php 
    session_start();

    require_once(__DIR__ . "/config/config.php");

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS,  PATCH");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    $steps = json_decode(file_get_contents("steps.json"), true);

    // print_r(json_encode($steps));

    if (!isset($_GET['page'])) {
        $selectPersonalityStatement = $mysqlClient -> prepare("SELECT * FROM pages");
        $selectPersonalityStatement -> execute();
        $selectPersonality = $selectPersonalityStatement -> fetchAll(PDO::FETCH_ASSOC);

        print_r(json_encode($selectPersonality));
    }
?>