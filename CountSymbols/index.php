<?php
/*
 * test file for count_symbols.js
 * 
 * */
if(!empty($_GET['test_form'])){
	header('Content-Type: application/json');
	echo json_encode($_GET);
	die;
}
?> 
<!doctype html>
<html lang="ruRU">
<head>
<script type="text/javascript" src="js/lodash.min.js"></script>
<script type="text/javascript" src="js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="js/count_symbols.js"></script>
</head>
<body>
<h1>test form</h1>
<form name="test_form">
<?php for($i=0; $i<=5; $i++): ?>
<input type="text" class="paramInput" id="pInp-<?=$i?>" name="param-input-<?=$i?>" /><br>
<textarea rows="4" cols="45" class="paramInput" id="pInpTA-<?=$i?>" ></textarea><br>
<?php endfor; ?>

<button type="submit">send</button>
</form>	
<footer>
<hr><br>
2019
<hr><br>
</footer>
<script>
window.addEventListener('load', function () {
  console.log(ascCS);
})
</script>
</body>
</html>
