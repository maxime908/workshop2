<?php 
    session_start();

    require_once(__DIR__ . "/config/config.php");

    $selectStepsStatement = $mysqlClient -> prepare(
        "SELECT * 
        FROM steps
        INNER JOIN pages_steps
        ON pages_steps.id_step = steps.id_step
        INNER JOIN pages
        ON pages.id_page = pages_steps.id_page");
    $selectStepsStatement -> execute();
    $selectSteps = $selectStepsStatement -> fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js" integrity="sha384-G/EV+4j2dNv+tEPo3++6LCgdCROaejBqfUeNjuKAiuXbjrxilcCdDz6ZAVfHWe1Y" crossorigin="anonymous"></script>
    
    <title>Document</title>
</head>
<body>
    <section class="p-5 d-flex flex-column gap-3">
        <?php foreach ($selectSteps as $selectStep): ?>
            <form action="gestion/update.php" method="post">
                <div class="card p-3 d-flex flex-row justify-content-between align-items-center">
                    <input type="hidden" name="id" value="<?php echo $selectStep['id_step']; ?>">
                    <div class="w-100">
                        <div class="d-flex gap-5">
                            <span>Nom : <?php echo $selectStep['name']; ?></span>
                            <span>Etape : <?php echo $selectStep['number'] += 1; ?></span>
                        </div>
                        <?php if (!isset($_GET['update'])): ?>
                            <p style="white-space: pre;"><?php echo $selectStep['question']; ?></p>
                            <p style="white-space: pre;"><?php echo $selectStep['interaction']; ?></p>
                        <?php else: ?>
                            <?php if ($selectStep['id_step'] == $_GET['id']): ?>
                                <textarea class="w-75" name="question"><?php echo $selectStep['question']; ?></textarea>
                                <textarea class="w-75" name="interaction"><?php echo $selectStep['interaction']; ?></textarea>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>
                    <?php if (!isset($_GET['update'])): ?>
                        <a href="?update=true&id=<?php echo $selectStep['id_step']; ?>" class="btn btn-primary">Modifier</a>
                    <?php else: ?>
                        <div class="d-flex gap-2">
                            <a href="admin.php" class="btn btn-secondary">Retour</a>
                            <button type="submit" class="btn btn-success">Valider</button>
                        </div>
                    <?php endif; ?>
                </div>
            </form>
        <?php endforeach; ?>
    </section>
</body>
</html>