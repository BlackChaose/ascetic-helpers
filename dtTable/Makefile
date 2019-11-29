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
