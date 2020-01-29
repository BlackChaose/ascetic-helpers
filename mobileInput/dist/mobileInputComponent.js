"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var sendRequest = function sendRequest(url) {
  /* eslint-disable */
  var xhttp = new XMLHttpRequest();
  var req = new Promise(function (resolve, reject) {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // eslint-disable-line
        var result = xhttp.responseText;
        resolve(JSON.parse(result));
      } else if (this.readyState === 4 && this.status !== 200) {
        reject(new Error("Error! ".concat(this.readyState, " ").concat(this.status)));
      }
    };

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('mobile_codes=get');
  });
  return req;
  /* eslint-enable */
};

var renderLabel = function renderLabel(obj) {
  var labelInput = document.createElement('label'); // eslint-disable-line

  labelInput.for = obj.getElementsByTagName('input').id;
  labelInput.textContent = ' +';
  obj.appendChild(labelInput);
  return obj;
};

var mobileFormat = function mobileFormat(arr) {
  var str = (0, _lodash.reduce)(arr, function (acc, item, key) {
    var res = acc;

    if (key === 2 || key === 5) {
      res += item;
      res += '-';
      return res;
    }

    res += item;
    return res;
  }, '');
  return str;
};

var mobileClear = function mobileClear(str) {
  return str.match(/\d/g);
};

var renderDropDownList = function renderDropDownList(obj, SortedFlags, inputMobileDefault, inputCountryCodeDefault, hiddenInputName, borderStyle) {
  var dropDownHeader = document.createElement('span'); // eslint-disable-line

  var dropDownInput = document.createElement('input'); // eslint-disable-line

  var dropDownList = document.createElement('div'); // eslint-disable-line

  var dropDownHiddenInput = document.createElement('input'); // eslint-disable-line

  var dropDownArrow = document.createElement('div'); // eslint-disable-line

  dropDownList.className = 'mobile_input--dropdown-list';
  dropDownHeader.className = 'mobile_input--dropdown-header';

  if (borderStyle === 'red') {
    dropDownInput.className = 'mobile_input--dropdown-input-red';
  } else if (borderStyle === 'define') {
    dropDownInput.className = 'mobile_input--dropdown-input';
  }

  dropDownInput.name = 'country_code';
  dropDownInput.readOnly = true;
  dropDownInput.placeholder = 'код';
  dropDownInput.maxLength = 4;
  dropDownInput.value = inputCountryCodeDefault;
  dropDownHiddenInput.type = 'hidden';
  dropDownHiddenInput.name = hiddenInputName || 'mobileInput_Mobile';
  dropDownHeader.appendChild(dropDownInput);
  var ul = document.createElement('ul'); // eslint-disable-line

  ul.className = 'mobile_input--dropdown-ul';
  (0, _lodash.forEach)(SortedFlags, function (el) {
    var li = document.createElement('li'); // eslint-disable-line

    var imgFlag = document.createElement('span'); // eslint-disable-line

    var liText = document.createElement('span'); // eslint-disable-line

    li.className = 'mobile_input--dropdown-li';
    imgFlag.className = 'mobile_input--dropdown-imgflag';
    liText.className = 'mobile_input--dropdown-litext';
    liText.textContent = el.mobile_code;
    imgFlag.style.backgroundImage = "url(../img/flags/".concat(el.flag_picture_name, ")"); // imgFlag.style.backgroundImage = `url(img/flags/${el.flag_picture_name})`;

    li.appendChild(imgFlag);
    li.appendChild(liText);
    li.title = el.name_cyr;
    li.addEventListener('click', function () {
      dropDownInput.value = liText.textContent;
      dropDownList.style.display = 'none';
    });
    ul.appendChild(li);
  });
  dropDownList.appendChild(ul);
  var mobileInput = document.createElement('input'); // eslint-disable-line

  if (borderStyle === 'red') {
    mobileInput.className = 'mobile_input--mobile-input-red';
  } else if (borderStyle === 'define') {
    mobileInput.className = 'mobile_input--mobile-input';
  }

  mobileInput.pattern = '\\d{3}(\\s|-)\\d{3}(\\s|-)\\d{4}';
  mobileInput.placeholder = 'XXX-XXX-XXXX';
  mobileInput.title = 'номер мобильного телефона';
  mobileInput.type = 'tel';
  mobileInput.required = true;
  mobileInput.value = mobileFormat(inputMobileDefault);
  mobileInput.name = 'mobile_number';
  mobileInput.autocomplete = 'off';
  obj.appendChild(dropDownHeader);
  dropDownHeader.appendChild(dropDownArrow);
  obj.appendChild(mobileInput);
  obj.appendChild(dropDownList);
  dropDownHiddenInput.value = mobileFormat(inputMobileDefault);
  obj.appendChild(dropDownHiddenInput);

  var HiddenInputHandler = function HiddenInputHandler() {
    dropDownHiddenInput.value = dropDownInput.value + mobileInput.value;
    return dropDownHiddenInput.value;
  };

  var setSelectionIndex = function setSelectionIndex(e, index) {
    e.target.selectionStart = index;
    e.target.selectionEnd = e.target.selectionStart;
    return index;
  };

  var delSelection = function delSelection(e, buffer) {
    var currentCaret = e.target.selectionStart;
    var currentEnd = mobileInput.value.length;
    e.preventDefault();
    var indexes = {
      caret: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      digits: [0, 1, 2, null, 4, 5, 6, null, 8, 9, 10, 11, null],
      buffer: [0, 1, 2, null, 3, 4, 5, null, 6, 7, 8, 9, null]
    };

    switch (e.key) {
      case 'Backspace':
        {
          if (currentCaret === 0 && e.target.selectionEnd === 0) {
            return;
          }

          if (e.target.selectionStart === e.target.selectionEnd) {
            if (indexes.buffer[e.target.selectionStart - 1] !== null) {
              buffer.splice(indexes.buffer[e.target.selectionStart - 1], 1);
            }

            mobileInput.value = '';
            mobileInput.value = mobileFormat(buffer);

            if (indexes.buffer[e.target.selectionStart] === null) {
              setSelectionIndex(e, currentCaret - 2);
            } else {
              setSelectionIndex(e, currentCaret - 1);
            }

            break;
          }

          var delPart = mobileInput.value;
          var delPartRes = delPart.substring(0, e.target.selectionStart) + delPart.substring(e.target.selectionEnd, delPart.length);
          var delPartsCnt = mobileClear(delPart.substring(e.target.selectionStart, e.target.selectionEnd)).length;
          buffer.splice(indexes.buffer[e.target.selectionStart], delPartsCnt);
          mobileInput.value = mobileFormat(mobileClear(delPartRes));
          break;
        }

      case 'Delete':
        {
          if (currentCaret === currentEnd && e.target.selectionStart === currentEnd) {
            return;
          }

          if (e.target.selectionStart === e.target.selectionEnd) {
            if (indexes.buffer[e.target.selectionStart] !== null) {
              buffer.splice(indexes.buffer[e.target.selectionStart], 1);
            }

            mobileInput.value = '';
            mobileInput.value = mobileFormat(buffer);

            if (indexes.buffer[e.target.selectionStart] === null) {
              setSelectionIndex(e, currentCaret + 1);
            } else {
              setSelectionIndex(e, currentCaret);
            }

            break;
          }

          var _delPart = mobileInput.value;

          var _delPartRes = _delPart.substring(0, e.target.selectionStart) + _delPart.substring(e.target.selectionEnd, _delPart.length);

          var _delPartsCnt = mobileClear(_delPart.substring(e.target.selectionStart, e.target.selectionEnd)).length;
          buffer.splice(indexes.buffer[e.target.selectionStart], _delPartsCnt);
          mobileInput.value = mobileFormat(mobileClear(_delPartRes));
          break;
        }

      default:
        return buffer;
    }

    return buffer;
  };

  var keybuf = inputMobileDefault.split(''); // по умолчанию в буфер + обработка нажатий стрелок

  mobileInput.addEventListener('keydown', function (e) {
    // ArrowRight ArrowLeft ArrowUp ArrowDown Delete
    if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(e.key)) {
      return;
    }

    if (isNaN(parseInt(e.key, 10)) && e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Delete' // eslint-disable-line
    && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') {
      // eslint-disable-line
      e.preventDefault();
      return;
    }

    if (keybuf.length >= 10 && e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Delete' // eslint-disable-line
    && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Backspace') {
      delSelection(e, keybuf);
      return;
    }

    if (e.key === 'Delete') {
      delSelection(e, keybuf);
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();

      if (e.target.selectionStart > 0) {
        e.target.selectionStart -= 1;
        e.target.selectionEnd -= 1;
      }

      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();

      if (e.target.selectionStart >= 0 && e.target.selectionEnd <= 12) {
        e.target.selectionStart += 1;
      }

      return;
    } //fixme (add shift + key? use e.shiftKey https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey


    e.preventDefault();
    mobileInput.value = '';
    keybuf.push(e.key);
    mobileInput.value = mobileFormat(keybuf);
    HiddenInputHandler();
  });
  mobileInput.addEventListener('keyup', function (e) {});
  dropDownList.addEventListener('mouseleave', function () {
    dropDownList.style.display = 'none';
    HiddenInputHandler();
  });
  dropDownInput.addEventListener('click', function () {
    dropDownList.style.display = dropDownList.style.display === 'block' ? 'none' : 'block';
    HiddenInputHandler();
  });
  dropDownArrow.className = 'mobile_input--dropdown-header-arrow';
  dropDownArrow.textContent = '▼';
  dropDownArrow.addEventListener('click', function () {
    dropDownList.style.display = dropDownList.style.display === 'block' ? 'none' : 'block';
    HiddenInputHandler();
  });
  mobileInput.addEventListener('focusin', function () {
    dropDownList.style.display = 'none';
    HiddenInputHandler();
  });
  return obj;
};

var upUsedCountry = function upUsedCountry(codes, countries) {
  var upList = codes.filter(function (el) {
    return countries.includes(el.name_lat);
  });
  var result = upList.concat(codes);
  return result;
};

var formatCodes = function formatCodes(arr) {
  var sortArr = (0, _lodash.sortBy)(arr.mobile_codes, [function (o) {
    return o.mobile_code;
  }]);
  return upUsedCountry(sortArr, ['Russia']);
};

var renderMobileInput = function renderMobileInput(config) {
  sendRequest(config.url).then(function (MobileCodes) {
    var SortedMobileCodes = formatCodes(MobileCodes);
    renderLabel(config.domObject);
    renderDropDownList(config.domObject, SortedMobileCodes, config.defaultMobile, config.defaultCountryCode, config.hiddenInputName, config.borderStyle);
  });
  return 0;
};

var _default = renderMobileInput;
exports.default = _default;