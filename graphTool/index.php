<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 25.12.19
 * Time: 13:00
 */
require_once "../vendor/autoload.php";

use Utility\DbUtility;

ini_set('display_errors', '1');

if (!empty($_GET) && $_GET['get'] === 'data') {
    $obj = new DbUtility();
    $pdo = $obj->getPDO();
    try {
        $sqlquery = 'SELECT * from timelog;';
        $stmt = $pdo->prepare($sqlquery);
        $stmt->execute();
        $data = $stmt->fetchAll();
        http_response_code(200);
        echo json_encode(['result' => $data]);
        die;
    } catch (\Exception $e) {
        http_response_code(400);
        echo json_encode(['Error!' => $e->getMessage()]);
        die;
    }
}else {
    http_response_code(200);
    echo "!!!";
    die;
};