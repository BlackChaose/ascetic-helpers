<?php
/**
 * User: nikita.s.kalitin@gmail.com
 * Date: 16.12.19
 * Time: 18:26
 */

namespace Utility;


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
    static function Extract($mobileNumber){
        // fixme: add extract
    }
}