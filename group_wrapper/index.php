<!doctype html>
<html lang="ruRU">
<head>
<title>test group_wrapper</title>
<meta charset="Utf-8">
<script src="gr_wrapper.js"> </script>
<style>
.center{
	position: relative;
	width: 80%;	
	font-size: medium;
	font-weight: bold;
	text-align: center;	
	color: green;
	
	}
</style>
</head>
<body>
	<h1>пример:</h1>
	<div class="center">
	    <ul class="non_decorate">
            <li><input type="checkbox" name="sms_agree" data-type="option" data-order="1" data-group="" checked/>Получать уведомления по СМС</li>
            <li><input type="checkbox" name="email_appointment_notice" data-type="option" data-order="2" data-group="Получать ВСЕ уведомления на почту" checked/>Получать только уведомления о назначении экспертизы</li>
            <li><input type="checkbox" name="email_info" data-type="option" data-order="3" data-group="Получать ВСЕ уведомления на почту" checked/>Получать только информационные сообщения</li>
            <li><input type="checkbox" name="email_appointment_notice" data-type="option" data-order="2" data-group="группа 2" checked/>просто текст</li>
            <li><input type="checkbox" name="email_info" data-type="option" data-order="4" data-group="группа 2" checked/>ещё один пункт</li>
            <li><input type="checkbox" name="email_appointment_notice" data-type="option" data-order="5" data-group="группа 2" checked/>другой текст</li>
            <li><input type="checkbox" name="email_info" data-type="option" data-order="6" data-group="" checked/>другой пункт</li>
            <li><input type="checkbox" name="email_appointment_notice" data-type="option" data-order="7" data-group="" checked/>ужасный текст</li>
            <li><input type="checkbox" name="email_info" data-type="option" data-order="8" data-group="" checked/>рестрикт</li>
		</ul>
    </div>
    <script>
    /** vanilla js ready - (only DOM !) **/
		document.addEventListener("DOMContentLoaded", function(){
			gr_wrap('ul[class="non_decorate"]');
			});
    /** end vanill js ready **/
    </script>
</body>
</html>
