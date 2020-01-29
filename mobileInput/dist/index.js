"use strict";

require("@babel/polyfill");

var _mobileInputComponent = _interopRequireDefault(require("./mobileInputComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname === '/experty/expert_change_dom.php' || window.location.host === 'localhost:5000') {
    var config = {
      "domObject": document.getElementById('appInput'),
      "url": 'ajax_mobile_codes.php',
      "defaultMobile": document.getElementById('appInput').dataset.mobileVal,
      "defaultCountryCode": document.getElementById('appInput').dataset.mobileCode,
      "hiddenInputName": document.getElementById('appInput').dataset.nameInput,
      "borderStyle": document.getElementById('appInput').dataset.borderStyle
    };
    (0, _mobileInputComponent.default)(config);
  }
});
/* eslint-enable */