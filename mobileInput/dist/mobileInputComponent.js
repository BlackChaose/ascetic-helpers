"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

// todo validation function //html5 + html4 && IE 10/11 support;
// todo
const sendRequest = url => {
  /* eslint-disable */
  const xhttp = new XMLHttpRequest();
  const req = new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // eslint-disable-line
        const result = xhttp.responseText;
        resolve(JSON.parse(result));
      } else if (this.readyState === 4 && this.status !== 200) {
        reject(new Error(`Error! ${this.readyState} ${this.status}`));
      }
    };

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('mobile_codes=get');
  });
  return req;
  /* eslint-enable */
};

const renderLabel = obj => {
  const labelInput = document.createElement('label'); // eslint-disable-line

  labelInput.for = obj.getElementsByTagName('input').id;
  labelInput.textContent = ' +';
  obj.append(labelInput);
  return obj;
};

const mobileFormat = arr => {
  const str = (0, _lodash.reduce)(arr, (acc, item, key) => {
    let res = acc;

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

const renderDropDownList = (obj, SortedFlags, inputMobileDefault, inputCountryCodeDefault, hiddenInputName) => {
  const dropDownHeader = document.createElement('span'); // eslint-disable-line

  const dropDownInput = document.createElement('input'); // eslint-disable-line

  const dropDownList = document.createElement('div'); // eslint-disable-line

  const dropDownHiddenInput = document.createElement('input'); // eslint-disable-line

  dropDownList.className = 'mobile_input--dropdown-list';
  dropDownHeader.className = 'mobile_input--dropdown-header';
  dropDownInput.className = 'mobile_input--dropdown-input';
  dropDownInput.name = 'country_code';
  dropDownInput.readOnly = true;
  dropDownInput.placeholder = 'код';
  dropDownInput.maxLength = 4;
  dropDownInput.value = inputCountryCodeDefault;
  dropDownHiddenInput.type = 'hidden';
  dropDownHiddenInput.name = hiddenInputName;
  dropDownHeader.append(dropDownInput);
  const ul = document.createElement('ul'); // eslint-disable-line

  ul.className = 'mobile_input--dropdown-ul';
  (0, _lodash.forEach)(SortedFlags, el => {
    const li = document.createElement('li'); // eslint-disable-line

    let imgFlag = document.createElement('span'); // eslint-disable-line

    let liText = document.createElement('span'); // eslint-disable-line

    li.className = 'mobile_input--dropdown-li';
    imgFlag.className = 'mobile_input--dropdown-imgflag';
    liText.className = 'mobile_input--dropdown-litext';
    liText.textContent = el.mobile_code;
    imgFlag.style.backgroundImage = `url(../img/flags/${el.flag_picture_name})`; // imgFlag.style.backgroundImage = `url(img/flags/${el.flag_picture_name})`;

    li.appendChild(imgFlag);
    li.appendChild(liText);
    li.title = el.name_cyr;
    li.addEventListener('click', () => {
      dropDownInput.value = liText.textContent;
      dropDownList.style.display = 'none';
    });
    ul.append(li);
  });
  dropDownList.append(ul);
  const mobileInput = document.createElement('input'); // eslint-disable-line

  mobileInput.className = 'mobile_input--mobile-input';
  mobileInput.pattern = '\\d{3}(\\s|-)\\d{3}(\\s|-)\\d{4}';
  mobileInput.placeholder = 'XXX-XXX-XXXX';
  mobileInput.title = 'номер мобильного телефона';
  mobileInput.type = 'tel';
  mobileInput.required = true;
  mobileInput.value = mobileFormat(inputMobileDefault);
  mobileInput.name = 'mobile_number';
  obj.append(dropDownHeader);
  obj.append(mobileInput);
  obj.append(dropDownList);
  obj.append(dropDownHiddenInput);

  const HiddenInputHandler = function () {
    dropDownHiddenInput.value = dropDownInput.value + mobileInput.value;
    return dropDownHiddenInput.value;
  };

  const keybuf = inputMobileDefault.split(''); // fixme: доработать буфер - надо считывать значение
  // по умолчанию в буфер + обработка нажатий стрелок

  mobileInput.addEventListener('keydown', e => {
    if (isNaN(parseInt(e.key, 10)) && e.key !== 'Backspace' && e.key !== 'Enter') {
      // eslint-disable-line
      e.preventDefault();
      return;
    }

    if (keybuf.length >= 10 && e.key !== 'Backspace') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Backspace') {
      mobileInput.value = '';
      mobileInput.value = mobileFormat(keybuf);
      keybuf.pop();
      return;
    }

    console.warn('====> ', typeof parseInt(e.key, 10));
    mobileInput.value = '';
    mobileInput.value = mobileFormat(keybuf);
    keybuf.push(e.key);
    HiddenInputHandler();
  });
  dropDownList.addEventListener('mouseleave', () => {
    dropDownList.style.display = 'none';
    HiddenInputHandler();
  });
  dropDownInput.addEventListener('click', () => {
    dropDownList.style.display = dropDownList.style.display === 'block' ? 'none' : 'block';
    HiddenInputHandler();
  });
  mobileInput.addEventListener('focusin', () => {
    dropDownList.style.display = 'none';
    HiddenInputHandler();
  });
  return obj;
};

const upUsedCountry = (codes, countries) => {
  const upList = codes.filter(el => countries.includes(el.name_lat));
  const result = upList.concat(codes);
  return result;
};

const formatCodes = arr => {
  const sortArr = (0, _lodash.sortBy)(arr.mobile_codes, [o => o.name_cyr]);
  return upUsedCountry(sortArr, ['Russia', 'Belarus', 'Finland', 'Kazakhstan', 'Kyrgyzstan', 'Azerbaijan', 'Armenia', 'Moldova', 'Tajikistan', 'Uzbekistan']);
};

const renderMobileInput = config => {
  sendRequest(config.url).then(MobileCodes => {
    const SortedMobileCodes = formatCodes(MobileCodes);
    renderLabel(config.domObject);
    renderDropDownList(config.domObject, SortedMobileCodes, config.defaultMobile, config.defaultCountryCode, config.hiddenInputName);
  }).catch(error => console.log(error));
  return 0;
};

var _default = renderMobileInput;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2JpbGVJbnB1dENvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzZW5kUmVxdWVzdCIsInVybCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXN1bHQiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJFcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsInJlbmRlckxhYmVsIiwib2JqIiwibGFiZWxJbnB1dCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZvciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaWQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsIm1vYmlsZUZvcm1hdCIsImFyciIsInN0ciIsImFjYyIsIml0ZW0iLCJrZXkiLCJyZXMiLCJyZW5kZXJEcm9wRG93bkxpc3QiLCJTb3J0ZWRGbGFncyIsImlucHV0TW9iaWxlRGVmYXVsdCIsImlucHV0Q291bnRyeUNvZGVEZWZhdWx0IiwiaGlkZGVuSW5wdXROYW1lIiwiZHJvcERvd25IZWFkZXIiLCJkcm9wRG93bklucHV0IiwiZHJvcERvd25MaXN0IiwiZHJvcERvd25IaWRkZW5JbnB1dCIsImNsYXNzTmFtZSIsIm5hbWUiLCJyZWFkT25seSIsInBsYWNlaG9sZGVyIiwibWF4TGVuZ3RoIiwidmFsdWUiLCJ0eXBlIiwidWwiLCJlbCIsImxpIiwiaW1nRmxhZyIsImxpVGV4dCIsIm1vYmlsZV9jb2RlIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJmbGFnX3BpY3R1cmVfbmFtZSIsImFwcGVuZENoaWxkIiwidGl0bGUiLCJuYW1lX2N5ciIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwbGF5IiwibW9iaWxlSW5wdXQiLCJwYXR0ZXJuIiwicmVxdWlyZWQiLCJIaWRkZW5JbnB1dEhhbmRsZXIiLCJrZXlidWYiLCJzcGxpdCIsImUiLCJpc05hTiIsInBhcnNlSW50IiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJwb3AiLCJjb25zb2xlIiwid2FybiIsInB1c2giLCJ1cFVzZWRDb3VudHJ5IiwiY29kZXMiLCJjb3VudHJpZXMiLCJ1cExpc3QiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsIm5hbWVfbGF0IiwiY29uY2F0IiwiZm9ybWF0Q29kZXMiLCJzb3J0QXJyIiwibW9iaWxlX2NvZGVzIiwibyIsInJlbmRlck1vYmlsZUlucHV0IiwiY29uZmlnIiwidGhlbiIsIk1vYmlsZUNvZGVzIiwiU29ydGVkTW9iaWxlQ29kZXMiLCJkb21PYmplY3QiLCJkZWZhdWx0TW9iaWxlIiwiZGVmYXVsdENvdW50cnlDb2RlIiwiY2F0Y2giLCJlcnJvciIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUlBO0FBQ0E7QUFDQSxNQUFNQSxXQUFXLEdBQUlDLEdBQUQsSUFBUztBQUMzQjtBQUNBLFFBQU1DLEtBQUssR0FBRyxJQUFJQyxjQUFKLEVBQWQ7QUFFQSxRQUFNQyxHQUFHLEdBQUcsSUFBSUMsT0FBSixDQUFhLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUM1Q0wsSUFBQUEsS0FBSyxDQUFDTSxrQkFBTixHQUEyQixZQUFZO0FBQ3JDLFVBQUksS0FBS0MsVUFBTCxLQUFvQixDQUFwQixJQUF5QixLQUFLQyxNQUFMLEtBQWdCLEdBQTdDLEVBQWtEO0FBQUU7QUFDbEQsY0FBTUMsTUFBTSxHQUFHVCxLQUFLLENBQUNVLFlBQXJCO0FBQ0FOLFFBQUFBLE9BQU8sQ0FBQ08sSUFBSSxDQUFDQyxLQUFMLENBQVdILE1BQVgsQ0FBRCxDQUFQO0FBQ0QsT0FIRCxNQUdPLElBQUksS0FBS0YsVUFBTCxLQUFvQixDQUFwQixJQUF5QixLQUFLQyxNQUFMLEtBQWdCLEdBQTdDLEVBQWtEO0FBQ3ZESCxRQUFBQSxNQUFNLENBQUMsSUFBSVEsS0FBSixDQUFXLFVBQVMsS0FBS04sVUFBVyxJQUFHLEtBQUtDLE1BQU8sRUFB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U0FBM0UsRUFBc0YsU0FBdEYsRUFBaUcsWUFBakcsRUFBK0csWUFBL0csQ0FBVixDQUFwQjtBQUNELENBSEQ7O0FBS0EsTUFBTUcsaUJBQWlCLEdBQUlDLE1BQUQsSUFBWTtBQUNwQzlGLEVBQUFBLFdBQVcsQ0FBQzhGLE1BQU0sQ0FBQzdGLEdBQVIsQ0FBWCxDQUNHOEYsSUFESCxDQUNTQyxXQUFELElBQWlCO0FBQ3JCLFVBQU1DLGlCQUFpQixHQUFHUixXQUFXLENBQUNPLFdBQUQsQ0FBckM7QUFDQTdFLElBQUFBLFdBQVcsQ0FBQzJFLE1BQU0sQ0FBQ0ksU0FBUixDQUFYO0FBQ0E5RCxJQUFBQSxrQkFBa0IsQ0FBQzBELE1BQU0sQ0FBQ0ksU0FBUixFQUNoQkQsaUJBRGdCLEVBQ0dILE1BQU0sQ0FBQ0ssYUFEVixFQUN5QkwsTUFBTSxDQUFDTSxrQkFEaEMsRUFDb0ROLE1BQU0sQ0FBQ3RELGVBRDNELENBQWxCO0FBRUQsR0FOSCxFQU9HNkQsS0FQSCxDQU9VQyxLQUFELElBQVd4QixPQUFPLENBQUN5QixHQUFSLENBQVlELEtBQVosQ0FQcEI7QUFRQSxTQUFPLENBQVA7QUFDRCxDQVZEOztlQVllVCxpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGZvckVhY2gsIHNvcnRCeSwgcmVkdWNlLFxufSBmcm9tICdsb2Rhc2gnO1xuXG4vLyB0b2RvIHZhbGlkYXRpb24gZnVuY3Rpb24gLy9odG1sNSArIGh0bWw0ICYmIElFIDEwLzExIHN1cHBvcnQ7XG4vLyB0b2RvXG5jb25zdCBzZW5kUmVxdWVzdCA9ICh1cmwpID0+IHtcbiAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgY29uc3QgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICBjb25zdCByZXEgPSBuZXcgUHJvbWlzZSgoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHhodHRwLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlc3VsdCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBFcnJvciEgJHt0aGlzLnJlYWR5U3RhdGV9ICR7dGhpcy5zdGF0dXN9YCkpO1xuICAgICAgfVxuICAgIH07XG4gICAgeGh0dHAub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgIHhodHRwLnNlbmQoJ21vYmlsZV9jb2Rlcz1nZXQnKTtcbiAgfSkpO1xuICByZXR1cm4gcmVxO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG59O1xuXG5jb25zdCByZW5kZXJMYWJlbCA9IChvYmopID0+IHtcbiAgY29uc3QgbGFiZWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgbGFiZWxJbnB1dC5mb3IgPSBvYmouZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykuaWQ7XG4gIGxhYmVsSW5wdXQudGV4dENvbnRlbnQgPSAnICsnO1xuICBvYmouYXBwZW5kKGxhYmVsSW5wdXQpO1xuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3QgbW9iaWxlRm9ybWF0ID0gKGFycikgPT4ge1xuICBjb25zdCBzdHIgPSByZWR1Y2UoYXJyLCAoYWNjLCBpdGVtLCBrZXkpID0+IHtcbiAgICBsZXQgcmVzID0gYWNjO1xuICAgIGlmIChrZXkgPT09IDIgfHwga2V5ID09PSA1KSB7XG4gICAgICByZXMgKz0gaXRlbTtcbiAgICAgIHJlcyArPSAnLSc7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICByZXMgKz0gaXRlbTtcbiAgICByZXR1cm4gcmVzO1xuICB9LCAnJyk7XG4gIHJldHVybiBzdHI7XG59O1xuXG5jb25zdCByZW5kZXJEcm9wRG93bkxpc3QgPSAob2JqLFxuICBTb3J0ZWRGbGFncyxcbiAgaW5wdXRNb2JpbGVEZWZhdWx0LFxuICBpbnB1dENvdW50cnlDb2RlRGVmYXVsdCxcbiAgaGlkZGVuSW5wdXROYW1lKSA9PiB7XG4gIGNvbnN0IGRyb3BEb3duSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IGRyb3BEb3duSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IGRyb3BEb3duTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IGRyb3BEb3duSGlkZGVuSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgZHJvcERvd25MaXN0LmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWxpc3QnO1xuICBkcm9wRG93bkhlYWRlci5jbGFzc05hbWUgPSAnbW9iaWxlX2lucHV0LS1kcm9wZG93bi1oZWFkZXInO1xuICBkcm9wRG93bklucHV0LmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWlucHV0JztcbiAgZHJvcERvd25JbnB1dC5uYW1lID0gJ2NvdW50cnlfY29kZSc7XG4gIGRyb3BEb3duSW5wdXQucmVhZE9ubHkgPSB0cnVlO1xuICBkcm9wRG93bklucHV0LnBsYWNlaG9sZGVyID0gJ9C60L7QtCc7XG4gIGRyb3BEb3duSW5wdXQubWF4TGVuZ3RoID0gNDtcbiAgZHJvcERvd25JbnB1dC52YWx1ZSA9IGlucHV0Q291bnRyeUNvZGVEZWZhdWx0O1xuXG4gIGRyb3BEb3duSGlkZGVuSW5wdXQudHlwZSA9ICdoaWRkZW4nO1xuICBkcm9wRG93bkhpZGRlbklucHV0Lm5hbWUgPSBoaWRkZW5JbnB1dE5hbWU7XG5cbiAgZHJvcERvd25IZWFkZXIuYXBwZW5kKGRyb3BEb3duSW5wdXQpO1xuXG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB1bC5jbGFzc05hbWUgPSAnbW9iaWxlX2lucHV0LS1kcm9wZG93bi11bCc7XG5cbiAgZm9yRWFjaChTb3J0ZWRGbGFncywgKGVsKSA9PiB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgbGV0IGltZ0ZsYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBsZXQgbGlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgbGkuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tZHJvcGRvd24tbGknO1xuICAgIGltZ0ZsYWcuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tZHJvcGRvd24taW1nZmxhZyc7XG4gICAgbGlUZXh0LmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWxpdGV4dCc7XG5cbiAgICBsaVRleHQudGV4dENvbnRlbnQgPSBlbC5tb2JpbGVfY29kZTtcblxuICAgIGltZ0ZsYWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCguLi9pbWcvZmxhZ3MvJHtlbC5mbGFnX3BpY3R1cmVfbmFtZX0pYDtcbiAgICAvLyBpbWdGbGFnLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoaW1nL2ZsYWdzLyR7ZWwuZmxhZ19waWN0dXJlX25hbWV9KWA7XG5cbiAgICBsaS5hcHBlbmRDaGlsZChpbWdGbGFnKTtcbiAgICBsaS5hcHBlbmRDaGlsZChsaVRleHQpO1xuXG4gICAgbGkudGl0bGUgPSBlbC5uYW1lX2N5cjtcbiAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGRyb3BEb3duSW5wdXQudmFsdWUgPSBsaVRleHQudGV4dENvbnRlbnQ7XG4gICAgICBkcm9wRG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9KTtcbiAgICB1bC5hcHBlbmQobGkpO1xuICB9KTtcblxuICBkcm9wRG93bkxpc3QuYXBwZW5kKHVsKTtcblxuICBjb25zdCBtb2JpbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgbW9iaWxlSW5wdXQuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tbW9iaWxlLWlucHV0JztcbiAgbW9iaWxlSW5wdXQucGF0dGVybiA9ICdcXFxcZHszfShcXFxcc3wtKVxcXFxkezN9KFxcXFxzfC0pXFxcXGR7NH0nO1xuICBtb2JpbGVJbnB1dC5wbGFjZWhvbGRlciA9ICdYWFgtWFhYLVhYWFgnO1xuICBtb2JpbGVJbnB1dC50aXRsZSA9ICfQvdC+0LzQtdGAINC80L7QsdC40LvRjNC90L7Qs9C+INGC0LXQu9C10YTQvtC90LAnO1xuICBtb2JpbGVJbnB1dC50eXBlID0gJ3RlbCc7XG4gIG1vYmlsZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgbW9iaWxlSW5wdXQudmFsdWUgPSBtb2JpbGVGb3JtYXQoaW5wdXRNb2JpbGVEZWZhdWx0KTtcbiAgbW9iaWxlSW5wdXQubmFtZSA9ICdtb2JpbGVfbnVtYmVyJztcblxuICBvYmouYXBwZW5kKGRyb3BEb3duSGVhZGVyKTtcblxuICBvYmouYXBwZW5kKG1vYmlsZUlucHV0KTtcblxuICBvYmouYXBwZW5kKGRyb3BEb3duTGlzdCk7XG5cbiAgb2JqLmFwcGVuZChkcm9wRG93bkhpZGRlbklucHV0KTtcblxuICBjb25zdCBIaWRkZW5JbnB1dEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZHJvcERvd25IaWRkZW5JbnB1dC52YWx1ZSA9IGRyb3BEb3duSW5wdXQudmFsdWUgKyBtb2JpbGVJbnB1dC52YWx1ZTtcbiAgICByZXR1cm4gZHJvcERvd25IaWRkZW5JbnB1dC52YWx1ZTtcbiAgfTtcblxuICBjb25zdCBrZXlidWYgPSBpbnB1dE1vYmlsZURlZmF1bHQuc3BsaXQoJycpO1xuICAvLyBmaXhtZTog0LTQvtGA0LDQsdC+0YLQsNGC0Ywg0LHRg9GE0LXRgCAtINC90LDQtNC+INGB0YfQuNGC0YvQstCw0YLRjCDQt9C90LDRh9C10L3QuNC1XG4gIC8vINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINCyINCx0YPRhNC10YAgKyDQvtCx0YDQsNCx0L7RgtC60LAg0L3QsNC20LDRgtC40Lkg0YHRgtGA0LXQu9C+0LpcbiAgbW9iaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgaWYgKGlzTmFOKHBhcnNlSW50KGUua2V5LCAxMCkpICYmIGUua2V5ICE9PSAnQmFja3NwYWNlJyAmJiBlLmtleSAhPT0gJ0VudGVyJykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChrZXlidWYubGVuZ3RoID49IDEwICYmIGUua2V5ICE9PSAnQmFja3NwYWNlJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZS5rZXkgPT09ICdCYWNrc3BhY2UnKSB7XG4gICAgICBtb2JpbGVJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgbW9iaWxlSW5wdXQudmFsdWUgPSBtb2JpbGVGb3JtYXQoa2V5YnVmKTtcbiAgICAgIGtleWJ1Zi5wb3AoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS53YXJuKCc9PT09PiAnLCB0eXBlb2YgKHBhcnNlSW50KGUua2V5LCAxMCkpKTtcbiAgICBtb2JpbGVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIG1vYmlsZUlucHV0LnZhbHVlID0gbW9iaWxlRm9ybWF0KGtleWJ1Zik7XG4gICAga2V5YnVmLnB1c2goZS5rZXkpO1xuICAgIEhpZGRlbklucHV0SGFuZGxlcigpO1xuICB9KTtcblxuICBkcm9wRG93bkxpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICBkcm9wRG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBIaWRkZW5JbnB1dEhhbmRsZXIoKTtcbiAgfSk7XG5cbiAgZHJvcERvd25JbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkcm9wRG93bkxpc3Quc3R5bGUuZGlzcGxheSA9IChkcm9wRG93bkxpc3Quc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykgPyAnbm9uZScgOiAnYmxvY2snO1xuICAgIEhpZGRlbklucHV0SGFuZGxlcigpO1xuICB9KTtcblxuICBtb2JpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgKCkgPT4ge1xuICAgIGRyb3BEb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIEhpZGRlbklucHV0SGFuZGxlcigpO1xuICB9KTtcblxuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3QgdXBVc2VkQ291bnRyeSA9IChjb2RlcywgY291bnRyaWVzKSA9PiB7XG4gIGNvbnN0IHVwTGlzdCA9IGNvZGVzLmZpbHRlcigoZWwpID0+IGNvdW50cmllcy5pbmNsdWRlcyhlbC5uYW1lX2xhdCkpO1xuICBjb25zdCByZXN1bHQgPSB1cExpc3QuY29uY2F0KGNvZGVzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGZvcm1hdENvZGVzID0gKGFycikgPT4ge1xuICBjb25zdCBzb3J0QXJyID0gc29ydEJ5KGFyci5tb2JpbGVfY29kZXMsIFsobykgPT4gby5uYW1lX2N5cl0pO1xuICByZXR1cm4gdXBVc2VkQ291bnRyeShzb3J0QXJyLCBbJ1J1c3NpYScsICdCZWxhcnVzJywgJ0ZpbmxhbmQnLCAnS2F6YWtoc3RhbicsICdLeXJneXpzdGFuJywgJ0F6ZXJiYWlqYW4nLCAnQXJtZW5pYScsICdNb2xkb3ZhJywgJ1RhamlraXN0YW4nLCAnVXpiZWtpc3RhbiddKTtcbn07XG5cbmNvbnN0IHJlbmRlck1vYmlsZUlucHV0ID0gKGNvbmZpZykgPT4ge1xuICBzZW5kUmVxdWVzdChjb25maWcudXJsKVxuICAgIC50aGVuKChNb2JpbGVDb2RlcykgPT4ge1xuICAgICAgY29uc3QgU29ydGVkTW9iaWxlQ29kZXMgPSBmb3JtYXRDb2RlcyhNb2JpbGVDb2Rlcyk7XG4gICAgICByZW5kZXJMYWJlbChjb25maWcuZG9tT2JqZWN0KTtcbiAgICAgIHJlbmRlckRyb3BEb3duTGlzdChjb25maWcuZG9tT2JqZWN0LFxuICAgICAgICBTb3J0ZWRNb2JpbGVDb2RlcywgY29uZmlnLmRlZmF1bHRNb2JpbGUsIGNvbmZpZy5kZWZhdWx0Q291bnRyeUNvZGUsIGNvbmZpZy5oaWRkZW5JbnB1dE5hbWUpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgcmV0dXJuIDA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJNb2JpbGVJbnB1dDtcbiJdfQ==