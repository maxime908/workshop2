<?php
    try {
        $mysqlClient = new PDO('mysql:host=localhost;dbname=workshop2', 'root', '');

    $mysqlClient->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $exception) {
        die('Erreur : ' . $exception->getMessage());
    }