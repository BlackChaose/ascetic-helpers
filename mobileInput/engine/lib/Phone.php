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

    static function deepSearch($mobile, $array){
        $mobile_by_symbols = str_split($mobile);
        print_r(['ms=>  ' => $mobile_by_symbols, ' count: ' => count(self::searchCode('3', $array))]);
        $result = array_reduce($mobile_by_symbols, function($acc, $el) use ($array){
            if(count(self::searchCode($el, $array)) >= 1){
                $acc[]=$el;
            }
            return $acc;
        }, []);
        print_r(['=>  ' => $result]);
        $code = implode('', $result);
        print_r(['====>  ' => $code]);
        return self::searchCode($code, $array);
    }

    static function Extract($mobileNumber){
        $pdoObj = new DbUtility();
        $pdo = $pdoObj->getPDO();
        $query= "SELECT * FROM reestr.countries_and_codes";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $list = $stmt->fetchAll();

        $result = [];

        $tmp = self::deepSearch($mobileNumber, $list);
        print_r([$tmp, $list[0]]);
        die;
        $result['code'] = $tmp['mobile_code'];
        $result['mobile'] = str_replace($result['code'], $mobileNumber,count($result['code']));
        $result['country'] = $tmp['name_lat'];

        return $result;
    }
}