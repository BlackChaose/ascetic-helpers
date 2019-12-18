<?php
use PHPUnit\Framework\TestCase;
use Utility\Phone;

final class PhoneTest extends TestCase
{
    public function testExtract()
    {
        $datasetOk = [
            '' => ['-', '-'],
            /* +7 9*** 10 */
            '79778346185'=> ['code'=>'7', 'mobile'=> '9778346185', 'country'=>'Russia'],
            /* +49 151, 152, 155,157,159 *** 10 | 160 *** 10/11 | 162,163,170,171,172,173,174,175,176,177,178, 179 ... 10 | */
            '491512347541'=>['code'=>'49', 'mobile'=>'1512347541', 'country'=>'Germany'],
            /* +371 2*** 8 */
            '37124312567'=>['code'=>'371', 'mobile'=>'24312567', 'country'=>'Latvia'],
            /* +1 10 */
            '15557774422' =>['code'=>'1', 'mobile'=> '5557774422', 'country'=>'United States']
        ];

        $datasetFail = [
            /* +7 9*** 10 */
            '72778346185'=> ['code'=>'7', 'mobile'=> '9778346185', 'country'=>'Russia'],
            /* +49 151, 152, 155,157,159 *** 10 | 160 *** 10/11 | 162,163,170,171,172,173,174,175,176,177,178, 179 ... 10 | */
            '491512347541'=>['code'=>'49', 'mobile'=>'1512347541', 'country'=>'Germany'],
            /* +371 2*** 8 */
            '37124312567'=>['code'=>'371', 'mobile'=>'24312567', 'country'=>'Latvia'],
            /* +1 10 */
            '15557774422' =>['code'=>'1', 'mobile'=> '5557774422', 'country'=>'United States']
        ];

        $this->assertEquals($token, $_SESSION['_token_csm']);

    }

}