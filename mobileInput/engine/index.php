<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 06.12.19
 * Time: 10:09
 *
 */
namespace Utility;

require '../vendor/autoload.php';

use Utility\MobileCodeParser;
use PDO;

ini_set('display_errors', 1);
error_reporting(E_ERROR);

function parse_and_save(){
    $url = 'https://countrycode.org/';
    $parser = new MobileCodeParser($url);
    $parser->parse_2();
    $listCodes = $parser->getCodes();
    $srcFlags = 'https://flagpedia.net';
    $destFlags = '../assets/img/flags';
    $flags = $parser->downloadFlags($srcFlags.'/index');
    $countries_and_codes = [];
    $index=0;
    foreach ($flags as $pictures) {
        foreach ($pictures as $name => $path) {
            //$image = file_get_contents($srcFlags . $path);
            $name_ = strtolower(preg_replace("/[ ]/", "_", trim($name)));
            //file_put_contents($destFlags . '/' . $name_ . '.png', $image);
            $countries_and_codes[$index]["flag_path"] = $destFlags.'/'.$name_.'.png';
            $countries_and_codes[$index]["flag_picture_name"] = $name_.'.png';
            $countries_and_codes[$index]["name_lat"]=$name;
            foreach($listCodes as $el){
                if(mb_strtolower(trim($el[1])) == mb_strtolower(trim($name))){
                    $countries_and_codes[$index]["mobile_code"]=$el[3];
                    $countries_and_codes[$index]["short_code"]=$el[5];
                }
            }
        }
        $index++;
    }

    try {

        $dsn = DSN_MYSQL;
        $opt = array(
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
            \PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8"
        );

        try {
            $pdo = new PDO($dsn, DBLOGIN, DBPASS, $opt);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }

        $stmt = $pdo->prepare("INSERT INTO countries_and_codes (name_lat, short_code, mobile_code, flag_picture_name, flag_path)
 VALUES (:name_lat, :short_code, :mobile_code, :flag_picture_name, :flag_path)");

        $stmt->bindParam(':name_lat', $name_lat);
        $stmt->bindParam(':short_code', $short_code);
        $stmt->bindParam(':mobile_code', $mobile_code);
        $stmt->bindParam(':flag_picture_name', $flag_picture_name);
        $stmt->bindParam(':flag_path', $flag_path);

        foreach($countries_and_codes as $el){
            $name_lat = $el["name_lat"];
            $short_code = $el["short_code"];
            $mobile_code = $el["mobile_code"];
            $flag_path = $el["flag_path"];
            $flag_picture_name = $el["flag_picture_name"];

            $stmt->execute();
        }

        $pdo = null;
    }
    catch(\PDOException $e){
        http_response_code(400);
        echo json_encode(["error"=>$e->getMessage(), "code"=> $e->getCode()]);
        die;
    }
    return $countries_and_codes;
}
//todo: js - select mobile code by country & validation // REST
?>
<!DOCTYPE html>
<html lang="ruRU">
<head>
    <meta charset="UTF-8">
    <title>test mobile input</title>
    <link rel="stylesheet" href="css/mobileInput.css">

</head>
<body>
<pre>
<?php //print_r(parse_and_save()); ?>
</pre>
<hr>
<div style="height: 5em; width: 100%; background-color: black;">###</div>
<!--<form id="appInput" data-mobile-code="7" data-mobile-val="9998881010">-->
<form id="appInput" data-mobile-code="7" data-mobile-val="">

</form>
<div style="height: 5em; width: 100%; background-color: black;">###</div>
<script type="text/javascript" src="js/mobileInput.js"></script>
</body>
</html>