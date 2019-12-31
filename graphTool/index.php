<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 25.12.19
 * Time: 13:00
 */
require_once "../vendor/autoload.php";

use Utility\DbUtility;

ini_set('display_errors', '1');

function plainDates($arr, $field)
{

    $result = [
        'dates' => array_map(function ($el) use ($field) {
            $dt = new DateTime($el[$field]);
            $date = $dt->format('m/d/Y');
            return $date;
        }, $arr),
        'times' => array_map(function ($el) use ($field) {
            $dt = new DateTime($el[$field]);
            $time = $dt->format('H:i:s');
            return $time;
        }, $arr),
        'times_val' => array_map(function ($el) use ($field) {
            $dt = new DateTime($el[$field]);
            $timeString = '1970-02-01 '.$dt->format('H:i:s');
            return ["x"=>$el[$field],"y"=>$timeString];
        }, $arr),
        'labels' => array_map(function ($el) use ($field) {
            return $el[$field];
        }, $arr)
    ];
    return $result;
}

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
} elseif (!empty($_GET) && $_GET['get'] === 'initdb') {
    require "../scripts/initdb.php";
} else {
    $loader = new \Twig\Loader\FilesystemLoader('./templates');
    $twig = new \Twig\Environment($loader);

    $obj = new DbUtility();
    $pdo = $obj->getPDO();
    try {
        $sqlquery = 'SELECT * from timelog;';
        $stmt = $pdo->prepare($sqlquery);
        $stmt->execute();
        $data = $stmt->fetchAll();
        $renderData = plainDates($data, 'date');
//        print_r($renderData);
//        die;
        echo $twig->render('index',
            [
                'name' => 'graphicTool',
                'labels' => $renderData['labels'],
                'dates' => $renderData['dates'],
                'times' => $renderData['times'],
                'times_val' => $renderData['times_val']
            ]
        );
        die;
    } catch (\Exception $e) {
        http_response_code(400);
        echo json_encode(['Error!' => $e->getMessage()]);
        die;
    }
};
