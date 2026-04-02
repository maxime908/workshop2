<?php
    try {
        $envFirst = function (array $names, $default = null) {
            foreach ($names as $name) {
                $value = getenv($name);
                if ($value !== false && $value !== '') {
                    return $value;
                }
            }

            return $default;
        };

        $dbHost = $envFirst(['DB_HOST', 'MYSQL_HOST', 'MARIADB_HOST', 'PMA_HOST'], '127.0.0.1');
        $dbPort = $envFirst(['DB_PORT', 'MYSQL_PORT', 'MARIADB_PORT', 'PMA_PORT'], '3306');
        $dbName = $envFirst(['DB_NAME', 'MYSQL_DATABASE', 'MARIADB_DATABASE'], 'workshop2');
        $dbUser = $envFirst(['DB_USER', 'MYSQL_USER', 'MARIADB_USER'], 'root');
        $dbPass = $envFirst(['DB_PASS', 'MYSQL_PASSWORD', 'MARIADB_PASSWORD', 'MYSQL_ROOT_PASSWORD'], '');

        // With PDO MySQL, host=localhost can switch to unix socket and fail in containers.
        if ($dbHost === 'localhost') {
            $dbHost = '127.0.0.1';
        }

        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $dbHost, $dbPort, $dbName);

        $mysqlClient = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (Exception $exception) {
        die('Erreur : ' . $exception->getMessage());
    }