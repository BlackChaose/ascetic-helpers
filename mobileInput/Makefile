# Makefile
install:
	npm install
	composer install
publish:
	npm publish --dry-run
lint:
	npx eslint .
tst_publish:
	make publish
	npm link
bundle:
	browserify -e ./dist/index.js > ./dist/bundle.js

instbrow:
	npm install -g browserify
devsrv: 
	php -S localhost:5000 -t ./public
test:	
	npx jest
test_cover:
	npx jest --coverage
testphp:
	php './vendor/phpunit/phpunit/phpunit' './engine/lib/tests/PhoneTest'
asm:
	npx eslint .
	npm run build
	browserify -e ./dist/index.js > ./dist/bundle.js
	cp -Rv --remove-destination ./assets/* ./public
	cp -Rv --remove-destination ./dist/bundle.js ./public/js/mobileInput.js
	cp -Rv --remove-destination ./engine/* ./public
	composer update
	composer dumpauto
