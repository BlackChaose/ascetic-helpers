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
        'email' => 'd.jaxon@primereason.ru',
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
   <script src="js/lodash.min.js"></script>
   <script src="js/helperSnap.js"></script>

   <style>
   label {
     color: green;
     font-size: small;
     font-family: serif;
   }
   input {
     color: red;
     font-family: sans-serif;
     font-size: medium;
   }
   #mesInfo{
     display: none;
     border-radius: 8px;
     background-color: lightgray;
   }
   </style>

 </head>
 <body>
   <script>
   	$(document).ready(function() {

    //helper.saveSnap(helper.createSnap("form > input[value]"));
    helper.saveSnap(helper.createSnapVal("form > input[value]",true));
      $("#update").on("click", function() {

        console.log("click!..");

        $.post("/", {
          dt: "data"
        }, function(data) {
          let arrData = [];
          arrData = JSON.parse(data);
          $('input[name="text\[address\]\[country\]"]').val(arrData['address']['country']);
          $('input[name="text\[address\]\[house\]"]').val(arrData['address']['house']);
          $('input[name="text\[name\]\[first\]"]').val(arrData['name']['first']);
          $('input[name="text\[name\]\[last\]"]').val(arrData['name']['last']);
          $('input[name="text\[contacts\]\[email\]"]').val(arrData['contacts']['email']);
          $('input[name="text\[contacts\]\[whatsapp\]"]').val(arrData['contacts']['whatsapp']);

        //helper.saveSnap(helper.createSnap("form > input[value]"));
        helper.saveSnap(helper.createSnapVal("form > input[value]"));

        console.log("showSnap: "); console.log(helper.showSnap());
        let diffSnap = helper.getDiffSnap(helper.getFirstSnap(), helper.getLastSnap());

        console.log(diffSnap);
        console.log(helper.getDiffHistory(helper.getFirstSnap(), helper.getLastSnap()));
        if(diffSnap.length >0){
          helper.createMessage(helper.getDiffHistory(helper.getFirstSnap(), helper.getLastSnap()),'mesInfo');
        }

        helper.delLastSnap();
        });
      });
    });
   </script>
   <p class="message" id="mesInfo">
   </p>
   <p>
   <a id="update" href="#">load...</a>
 </p>
 <p>
   <form name="testForm" id="testForm" action="" target="_self" method="POST">
     <label for="text[address][country]"><?= $arrData['address']['country'] ?></label> <br>
     <input name="text[address][country]" type="text" value="<?= $arrData['address']['country'] ?>"/> <br>
     <label for="text[address][house]"><?= $arrData['address']['house'] ?></label> <br>
     <input name="text[address][house]" type="text" value="<?= $arrData['address']['house'] ?>"/> <br>
     <label for="text[name][first]"><?= $arrData['name']['first'] ?></label> <br>
     <input name="text[name][first]" type="text" value="<?= $arrData['name']['first'] ?>"/> <br>
     <label for="text[name][last]"><?= $arrData['name']['last'] ?></label> <br>
     <input name="text[name][last]" type="text" value="<?= $arrData['name']['last'] ?>"/> <br>
     <label for="text[contacts][email]"><?= $arrData['contacts']['email'] ?></label> <br>
     <input name="text[contacts][email]" type="text" value="<?= $arrData['contacts']['email'] ?>"/> <br>
     <label for="text[contacts][whatsapp]"><?= $arrData['contacts']['whatsapp'] ?></label><br>
     <input name="text[contacts][whatsapp]" type="text" value="<?= $arrData['contacts']['whatsapp'] ?>"/> <br>
     <br>
     <hr>
     <br>
     <input type="submit" /> <br>
   </form>
 </p>
 </body>
 </html>
