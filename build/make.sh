#! /bin/bash
hulk ./src/js/themes/bootstrap/*.mustache > ./bin/bootstrap.cobler.js
minify ./src/js/*.js > ./bin/cobler.min.js
minify ./src/js/form/*.js > ./bin/form.cobler.min.js
minify ./src/js/page/*.js > ./bin/page.cobler.min.js

cp ./bin/cobler.min.js ../Berry/assets/js/
cp ./bin/bootstrap.cobler.js ../Berry/assets/js/
cp ./bin/form.cobler.min.js ../Berry/assets/js/
cp ./bin/page.cobler.min.js ../Berry/assets/js/
