<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 06.12.19
 * Time: 10:09
 */

namespace Utility;

use Utility\DbUtility;

class MobileCodeParser
{
    public $codes;
    public $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function parse()
    {
        try {
            $htmlDoc = new \DOMDocument();
            $urlFile = file_get_contents($this->url);
            $htmlDoc->loadHTML($urlFile);
            $result = [];
            $x = $htmlDoc->getElementsByTagName('tr');
            for ($i = 0; $i < $x->count(); $i++) {
                array_push($result, []);
                $y = $x->item($i)->getElementsByTagName('td');
                for ($j = 0; $j < $y->count(); $j++) {
                    array_push($result[$i], $y->item($j)->nodeValue);
                }
            }
            $this->codes = $result;
        } catch (Exception $exception) {
            http_response_code(400);
            echo json_encode(['error' => $exception->getMessage()]);
        }

    }

    public function downloadFlags($urlFlags)
    {
        try {
            $htmlDoc = new \DOMDocument();
            $uF = file_get_contents($urlFlags);
            $htmlDoc->loadHTML($uF);
            $result = [];
            $x = $htmlDoc->getElementsByTagName('li');
            echo "<pre>";
            echo "--->";
            print_r ($x->count());
            echo "</pre>";
            for ($i = 0; $i < $x->count(); $i++) {
                array_push($result, []);
                $y = $x->item($i)->getElementsByTagName('img');
                for ($j = 0; $j < $y->count(); $j++) {
                    array_push($result[$i], $y);
                }
            }

            return $result;
        } catch (\Exception $exception) {
            http_response_code(400);
            echo json_encode(['error' => $exception->getMessage()]);
        }
    }

    public function getCodes()
    {
        return $this->codes;
    }

}