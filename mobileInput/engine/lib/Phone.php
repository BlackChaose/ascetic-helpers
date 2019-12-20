<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 16.12.19
 * Time: 18:26
 */

namespace Utility;
use Utility\DbUtility;

class Phone
{

    //todo add sanitize!
    static function sanitizeForRussia($mobileNumber){
        $tmp = preg_replace('/[^0-9]/', '', $mobileNumber);
        if (strlen($tmp) == 10 && substr($tmp, 0, 1) == '9') {
            return "7" . $tmp;
        } else {
            if (strlen($tmp) == 11) {
                if (substr($tmp, 0, 2) == '89') {
                    return '7' . substr($tmp, 1, 10);
                } else {
                    if (substr($tmp, 0, 2) == '79') {
                        return $tmp;
                    }
                }

            } else {
                return '<b style="color:red"> error: </b>' . ' ' . $mobileNumber;
            }
        }

    }

    static function searchCode($mobilNumber, $listNumbers){
        //$arrayMobilNumber = str_split($mobilNumber);

        $planeCodes = array_map(function($el){
            return $el['mobile_code'];
        }, $listNumbers);

        $result = array_filter($planeCodes, function($el) use($mobilNumber) {
            if(mb_ereg('^'.$el, $mobilNumber)){
                return true;
            };
         return false;
        });

        print_r($result);

        return $result;
    }

    static function searchFirstByMobileCode($tpl, $list){
        return array_map(function($el)use($tpl){
            return ($el['mobile_code'] === $tpl);
        }, $list);
    }

    static function Extract($mobileNumber){
        $pdoObj = new DbUtility();
        $pdo = $pdoObj->getPDO();
        $query= "SELECT * FROM reestr.countries_and_codes";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $list = $stmt->fetchAll();

        $result = [];


        $result['code'] = self::searchCode($mobileNumber, $list)[0];
        $result['mobile'] = mb_eregi_replace($result['code'], $result['code'], $mobileNumber);
        $result['country'] = $list

        return $result;
    }
}