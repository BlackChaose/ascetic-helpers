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
    // sanitize without countries +8, +9
    static function sanitizeForRussia($mobileNumber){

        $tmp = preg_replace('/[^0-9]/', '', trim($mobileNumber));
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
                    return $tmp;
                }

            } if (strlen($tmp) > 11 && strlen($tmp)<=13){
                return $tmp;
            }             else {
                return NULL;
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

        $cd = self::searchCode($mobileNumber, $list);
        $result['code'] = array_shift($cd);
        $result['mobile'] = mb_eregi_replace('^'.$result['code'],'', $mobileNumber);
        return $result;
    }
}