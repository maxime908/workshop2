<?php
    try {
        $mysqlClient = new PDO('mysql:host=83.228.195.160;port=3306;dbname=default', 'mysql', 'OcPCZUx8gG5ffRVPrZYONtnKWAY9iZJuH3KdBADPx0OKi04t74v1vbRnyBf8mi3V');

    $mysqlClient->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $exception) {
        die('Erreur : ' . $exception->getMessage());
    }