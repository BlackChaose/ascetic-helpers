<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 06.12.19
 * Time: 10:09
 *
 */
namespace Utility;

use Utility\MobileCodeParser;

require '../vendor/autoload.php';
ini_set('display_errors', 1);
error_reporting(E_ERROR);

$url = 'https://countrycode.org/';

$parser = new MobileCodeParser($url);
$parser->parse();
$flags = $parser->downloadFlags('https://flagpedia.net/index')

//fixme: add flags - download and save
//fixme: add save to db
//fixme: add translate from english to russian via google taranslator

?>
<!DOCTYPE html>
<html lang="ruRU">
<head>
    <meta charset="UTF-8">
    <title>test mobile input</title>
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
<pre>
<?php //print_r($parser->getCodes()); ?>
<?php print_r($flags); ?>
</pre>
<hr>
<form id="appInput">

</form>
<script type="text/javascript" src="js/mobileInput.js"></script>
</body>
</html>