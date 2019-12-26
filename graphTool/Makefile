# Makefile
install:
	composer install
devsrv:
	php -S localhost:5000 -t ./public
testphp:
	php './vendor/phpunit/phpunit/phpunit' './lib/tests/GetDbTest'
asm:
	cp -Rv --remove-destination ./assets/* ./public
	cp -Rv --remove-destination ./Lib/* ./public/Lib
	cp -Rv --remove-destination ./templates/* ./public/templates
	cp -Rv --remove-destination ./index.php ./public/index.php
	composer update
	composer dumpauto
