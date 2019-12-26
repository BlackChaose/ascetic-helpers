<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 25.12.19
 * Time: 13:48
 */
require_once '../vendor/autoload.php';

use Utility\DbUtility;

$obj = new DbUtility();
$pdo = $obj->getPDO();

//$sqlquery = 'Insert into timelog (date) values('2019-11-15 09:11:51');'
try {
    $listTurnOn = file_get_contents('../scripts/dates.txt');
    $arrDates = explode(PHP_EOL, $listTurnOn);
    $buf = [];
    $buf[]=$arrDates;
    foreach($arrDates as $record){
        $sqlquery = 'INSERT INTO timelog(date) VALUES(:date);';
        $stmt = $pdo->prepare($sqlquery);
        $stmt->bindParam(':date',$record );
        $buf[] = $stmt->execute();
    }

    http_response_code(200);
    echo json_encode(['result' => $buf]);
    die;
} catch (\Exception $e) {
    http_response_code(400);
    echo json_encode(['Error!' => $e->getMessage()]);
    die;
}