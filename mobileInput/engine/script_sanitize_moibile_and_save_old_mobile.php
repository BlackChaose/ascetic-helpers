<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 23.12.19
 * Time: 16:18
 */
namespace Utility;

require '../vendor/autoload.php';

use PDO;
use Utility;

ini_set('display_errors', 1);
error_reporting(E_ERROR);

require_once 'env.php';

if(!empty($_GET) && isset($_GET['start']) && isset($_GET['end'])) {
    $pdoObj = new DbUtility();
    $pdo = $pdoObj->getPDO();
    $query = "SELECT IdExpert, Mobile FROM reestr.Experts limit :start,:end";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':start', $_GET['start'], PDO::PARAM_STR);
    $stmt->bindParam(':end', $_GET['end'], PDO::PARAM_STR);
    $stmt->execute();

    $list = $stmt->fetchAll();

    $newList = array_map(function ($el) {
        return [
            'IdExpert' => $el['IdExpert'],
            'Mobile' => $el['Mobile'],
            'Mobile_sanitized' => Phone::sanitizeForRussia($el['Mobile']),
            'Mobile_old' => $el['Mobile']
        ];
    }, $list);
    echo "<pre>";
    print_r($newList);
    echo "</pre>";
    // write Mobile_sanitized
    try {
        $pdo = $pdoObj->getPDO();
        $queryUpdate = "UPDATE reestr.Experts SET Mobile_sanitized = :mobSanitize where IdExpert = :id_expert";
        $stmt = $pdo->prepare($queryUpdate);
        foreach ($newList as $val) {
            $stmt->bindParam(':mobSanitize', $val['Mobile_sanitized'], PDO::PARAM_STR);
            $stmt->bindParam(':id_expert', $val['IdExpert'], PDO::PARAM_STR);
            $stmt->execute();
        }

        echo "<pre>";
        print_r("Ok!");
        echo "</pre>";
    } catch (\Exception $e) {
        echo "<pre>";
        print_r(["error!" => $e->getMessage()]);
        echo "</pre>";
    }

    //write Mobile_old
    try {
        $pdo = $pdoObj->getPDO();
        $queryUpdate = "UPDATE reestr.Experts SET Mobile_old = :mobOld where IdExpert = :id_expert";
        $stmt = $pdo->prepare($queryUpdate);
        foreach ($newList as $val) {
            $stmt->bindParam(':mobOld', $val['Mobile_Old'], PDO::PARAM_STR);
            $stmt->bindParam(':id_expert', $val['IdExpert'], PDO::PARAM_STR);
            $stmt->execute();
        }

        echo "<pre>";
        print_r("Ok!");
        echo "</pre>";

    } catch (\Exception $e) {
        echo "<pre>";
        print_r(["error!" => $e->getMessage()]);
        echo "</pre>";
    }
}else {
    echo 'no start/end info';
}

