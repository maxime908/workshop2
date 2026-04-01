<?php 
    session_start();

    require_once(__DIR__ . "/../config/config.php");
?>

<?php 
    if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
        header('location: ../admin.php');
        return;
    }

    if (isset($_POST['question']) && isset($_POST['interaction'])) {
        if (empty($_POST['question'])) {
            header('location: ../admin.php');
            return;
        }

        $updateStatement = $mysqlClient -> prepare("UPDATE steps SET question = :question, interaction = :interaction WHERE id_step = :id");
        $updateStatement -> execute([
            'id' => $_POST['id'],
            'question' => $_POST['question'],
            'interaction' => $_POST['interaction'],
        ]);

        header('location: ../admin.php');
    }
?>