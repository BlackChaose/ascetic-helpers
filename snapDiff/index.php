 <?php
 ini_set('display_errors', '1');

 $arrData = array(
    'address' => array(
        'country' => 'Russia',
        'city' => 'Moscow',
        'street' => 'RedStreet',
        'house' => '8'
    ),
    'name' => array(
        'first' => 'Daniel',
        'last' => 'Jaxon',
    ),
    'contacts' => array(
        'mail' => 'd.jaxon@primereason.ru',
        'skype' =>'d.jaxon@live.com',
        'whatsapp' => '245 789 354 4785'
    )
 );

 if (!empty($_POST['dt']) && $_POST['dt'] === 'data') {
     $ran = rand(1, 10);
     if ($ran >3 && $ran <=7) {
         $arrData['address']['house']=$ran;
         $arrData['contacts']['whatsapp'] ='+'.$ran.' '. $arrData['contacts']['whatsapp'];
     } elseif ($ran < 4) {
         $arrData['address']['house']=125;
         $arrData['contacts']['whatsapp'] ='+1 '. $arrData['contacts']['whatsapp'];
     } else {
         $arrData['name']['first'] = 'Samuel';
     }
     http_response_code(200);
     print(json_encode($arrData));
     die;
 }
 ?>
 <!doctype html>
 <html>
 <head>
   <link rel="stylesheet" href="css/styles.css">
   <script src="js/jquery-3.4.1.js"></script>
   <script src="js/helperSnap.js"></script>
 </head>
 <body>
   <script>
   	$(document).ready(function() {
      $("#update").on("click", function() {
        console.log("click!..");
        $.post("/", {
          dt: "data"
        }, function(data) {
          let arrData = [];
          arrData = JSON.parse(data);
          console.warn(arrData['address']['house']);
          $('input[name="text\[address\]\[house\]"]').val(arrData['address']['house']);
        });
      });
    });
   </script>

   <p>
   <a id="update" href="#">load...</a>
 </p>
 <p>
   <form name="testForm" id="testForm" action="" target="_self" method="POST">

     <input name="text[address][house]" type="text" value="<?= $arrData['address']['house'] ?>"/>

     <input type="submit" />
   </form>
 </p>
 </body>
 </html>
