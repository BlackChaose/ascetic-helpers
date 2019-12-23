<?php
use PHPUnit\Framework\TestCase;
use Utility\Phone;

final class PhoneTest extends TestCase
{
    public function testExtract()
    {
        $datasetOk = [
//            '' => ['-', '-'],
            /* +39 345 123 45 67 */
            '393451234567'=> ['code'=>'39', 'mobile'=> '3451234567'],
            /* +7 9*** 10 */
            '79778346185'=> ['code'=>'7', 'mobile'=> '9778346185'],
            /* +49 151, 152, 155,157,159 *** 10 | 160 *** 10/11 | 162,163,170,171,172,173,174,175,176,177,178, 179 ... 10 | */
            '491512347541'=>['code'=>'49', 'mobile'=>'1512347541'],
            /* +371 2*** 8 */
            '37124312567'=>['code'=>'371', 'mobile'=>'24312567'],
            /* +1 10 */
            '15557774422' =>['code'=>'1', 'mobile'=> '5557774422']
        ];

        foreach($datasetOk as $phoneNumber => $fields){
            $this->assertEquals(Phone::Extract($phoneNumber), $fields);
        }

    }

    public function testExtractDeep()
    {
        $datasetFail = [
            /* +7 9*** 10  Russia*/
            '72778346185'=> ['code'=>'7', 'mobile'=> '2778346185'],
            /* +49 151, 152, 155,157,159 *** 10 | 160 *** 10/11 | 162,163,170,171,172,173,174,175,176,177,178, 179 ... 10 | German */
            '492252347541'=>['code'=>'49', 'mobile'=>'1512347541'],
            /* +371 2*** 8 Latvia */
            '37134312567'=>['code'=>'371', 'mobile'=>'24312567'],
            /* +1 10  USA */
            '155577744225' =>['code'=>'1', 'mobile'=> '5557774422']
        ];

        foreach($datasetFail as $phoneNumber => $fields){
            $this->assertNotEquals(Phone::Extract($phoneNumber), $fields);
        }
    }

}