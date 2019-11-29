# Makefile
install:
	npm install @babel/core @babel/cli @babel/node @babel/preset-env
publish:
	npm publish --dry-run
lint:
	npx eslint .
tst:
	make publish
	npm link
bundle:
	browserify -e ./dist/index.js > ./dist/bundle.js

instbrow:
	npm install -g browserify
devsrv: 
	php -S localhost:5000 -t ./public
asm:
	npx eslint .
	npm run build
	browserify -e ./dist/index.js > ./dist/bundle.js
	cp -Rv --remove-destination ./assets/* ./public
	cp -Rv --remove-destination ./dist/bundle.js ./public/js/bundle.js
