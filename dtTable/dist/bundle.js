(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runApp = exports.sum = void 0;

const sum = (a, b) => a + b;

exports.sum = sum;

const runApp = obj => {
  /* eslint-disable */
  const tbl = document.createElement('table');
  const tblHead = document.createElement('th');
  const tblTr = document.createElement('tr');
  const tblTd = document.createElement('td');
  /* eslint-enable */

  tblHead.textContent = 'example';
  tblTd.textContent = 'content';
  tblTr.append(tblTd);
  tblHead.append(tblTr);
  tbl.append(tblHead);
  obj.append(tbl);
  return obj;
};

exports.runApp = runApp;

},{}],2:[function(require,module,exports){
"use strict";

var _dtTable = require("./dtTable");

/* eslint-disable */
let obj = document.getElementById('app');
(0, _dtTable.runApp)(obj);
/* eslint-enable */

},{"./dtTable":1}]},{},[2]);
