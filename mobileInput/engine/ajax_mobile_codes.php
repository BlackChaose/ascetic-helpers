<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 10.12.19
 * Time: 10:31
 */
use PDO;

require_once 'env.php';

if (!empty($_POST) && $_POST['mobile_codes'] === 'get') {

    try {


        $opt = array(
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
            \PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8"
        );

        try {

            $pdo = new PDO(DSN_MYSQL, DBLOGIN, DBPASS, $opt);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }

        $stmt = $pdo->prepare("SELECT * FROM countries_and_codes");
        $stmt->execute();

        $result = $stmt->fetchAll();

        $pdo = null;

        http_response_code(200);
        echo json_encode(["mobile_codes" => $result]);

    } catch (\PDOException $e) {
        http_response_code(400);
        echo json_encode(["error" => $e->getMessage(), "code" => $e->getCode()]);
        die;
    }
}