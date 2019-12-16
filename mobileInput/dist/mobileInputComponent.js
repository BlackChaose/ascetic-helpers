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
  /* eslint-enable */

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
      res += ' - ';
      return res;
    }

    res += item;
    return res;
  }, '');
  return str;
};

const renderDropDownList = (obj, SortedFlags) => {
  const dropDownHeader = document.createElement('span'); // eslint-disable-line

  const dropDownInput = document.createElement('input'); // eslint-disable-line

  const dropDownList = document.createElement('div'); // eslint-disable-line

  dropDownList.className = 'mobile_input--dropdown-list';
  dropDownHeader.className = 'mobile_input--dropdown-header';
  dropDownInput.className = 'mobile_input--dropdown-input';
  dropDownInput.readOnly = true;
  dropDownInput.placeholder = 'код';
  dropDownInput.maxLength = 4;
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
    imgFlag.style.backgroundImage = `url(img/flags/${el.flag_picture_name})`;
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
  obj.append(dropDownHeader);
  obj.append(mobileInput);
  obj.append(dropDownList);
  const keybuf = [];
  mobileInput.addEventListener('keydown', e => {
    if (isNaN(parseInt(e.key, 10)) && e.key !== 'Backspace' && e.key !== 'Enter') {
      // eslint-disable-line
      e.preventDefault();
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

    mobileInput.value = '';
    mobileInput.value = mobileFormat(keybuf);
    keybuf.push(e.key);
  });
  dropDownList.addEventListener('mouseleave', () => {
    dropDownList.style.display = 'none';
  });
  dropDownInput.addEventListener('click', () => {
    dropDownList.style.display = dropDownList.style.display === 'block' ? 'none' : 'block';
  });
  mobileInput.addEventListener('focusin', () => {
    dropDownList.style.display = 'none';
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
    renderDropDownList(config.domObject, SortedMobileCodes);
  }).catch(error => console.log(error));
  return 0;
};

var _default = renderMobileInput;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2JpbGVJbnB1dENvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzZW5kUmVxdWVzdCIsInVybCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXN1bHQiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJFcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsInJlbmRlckxhYmVsIiwib2JqIiwibGFiZWxJbnB1dCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZvciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaWQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsIm1vYmlsZUZvcm1hdCIsImFyciIsInN0ciIsImFjYyIsIml0ZW0iLCJrZXkiLCJyZXMiLCJyZW5kZXJEcm9wRG93bkxpc3QiLCJTb3J0ZWRGbGFncyIsImRyb3BEb3duSGVhZGVyIiwiZHJvcERvd25JbnB1dCIsImRyb3BEb3duTGlzdCIsImNsYXNzTmFtZSIsInJlYWRPbmx5IiwicGxhY2Vob2xkZXIiLCJtYXhMZW5ndGgiLCJ1bCIsImVsIiwibGkiLCJpbWdGbGFnIiwibGlUZXh0IiwibW9iaWxlX2NvZGUiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImZsYWdfcGljdHVyZV9uYW1lIiwiYXBwZW5kQ2hpbGQiLCJ0aXRsZSIsIm5hbWVfY3lyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwiZGlzcGxheSIsIm1vYmlsZUlucHV0IiwicGF0dGVybiIsInR5cGUiLCJyZXF1aXJlZCIsImtleWJ1ZiIsImUiLCJpc05hTiIsInBhcnNlSW50IiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJwb3AiLCJwdXNoIiwidXBVc2VkQ291bnRyeSIsImNvZGVzIiwiY291bnRyaWVzIiwidXBMaXN0IiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJuYW1lX2xhdCIsImNvbmNhdCIsImZvcm1hdENvZGVzIiwic29ydEFyciIsIm1vYmlsZV9jb2RlcyIsIm8iLCJyZW5kZXJNb2JpbGVJbnB1dCIsImNvbmZpZyIsInRoZW4iLCJNb2JpbGVDb2RlcyIsIlNvcnRlZE1vYmlsZUNvZGVzIiwiZG9tT2JqZWN0IiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFJQTtBQUNBO0FBQ0EsTUFBTUEsV0FBVyxHQUFJQyxHQUFELElBQVM7QUFDM0I7QUFDQSxRQUFNQyxLQUFLLEdBQUcsSUFBSUMsY0FBSixFQUFkO0FBQ0E7O0FBQ0EsUUFBTUMsR0FBRyxHQUFHLElBQUlDLE9BQUosQ0FBYSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDNUNMLElBQUFBLEtBQUssQ0FBQ00sa0JBQU4sR0FBMkIsWUFBWTtBQUNyQyxVQUFJLEtBQUtDLFVBQUwsS0FBb0IsQ0FBcEIsSUFBeUIsS0FBS0MsTUFBTCxLQUFnQixHQUE3QyxFQUFrRDtBQUFFO0FBQ2xELGNBQU1DLE1BQU0sR0FBR1QsS0FBSyxDQUFDVSxZQUFyQjtBQUNBTixRQUFBQSxPQUFPLENBQUNPLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxNQUFYLENBQUQsQ0FBUDtBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUtGLFVBQUwsS0FBb0IsQ0FBcEIsSUFBeUIsS0FBS0MsTUFBTCxLQUFnQixHQUE3QyxFQUFrRDtBQUN2REgsUUFBQUEsTUFBTSxDQUFDLElBQUlRLEtBQUosQ0FBVyxVQUFTLEtBQUtOLFVBQVcsSUFBRyxLQUFLQyxNQUFPLEVBQW5ELENBQUQsQ0FBTjtBQUNEO0FBQ0YsS0FQRDs7QUFRQVIsSUFBQUEsS0FBSyxDQUFDYyxJQUFOLENBQVcsTUFBWCxFQUFtQmYsR0FBbkIsRUFBd0IsSUFBeEI7QUFDQUMsSUFBQUEsS0FBSyxDQUFDZSxnQkFBTixDQUF1QixjQUF2QixFQUF1QyxtQ0FBdkM7QUFDQWYsSUFBQUEsS0FB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LFdBQVcsQ0FBQ3FGLE1BQU0sQ0FBQ3BGLEdBQVIsQ0FBWCxDQUNHcUYsSUFESCxDQUNTQyxXQUFELElBQWlCO0FBQ3JCLFVBQU1DLGlCQUFpQixHQUFHUixXQUFXLENBQUNPLFdBQUQsQ0FBckM7QUFDQXBFLElBQUFBLFdBQVcsQ0FBQ2tFLE1BQU0sQ0FBQ0ksU0FBUixDQUFYO0FBQ0FyRCxJQUFBQSxrQkFBa0IsQ0FBQ2lELE1BQU0sQ0FBQ0ksU0FBUixFQUFtQkQsaUJBQW5CLENBQWxCO0FBQ0QsR0FMSCxFQU1HRSxLQU5ILENBTVVDLEtBQUQsSUFBV0MsT0FBTyxDQUFDQyxHQUFSLENBQVlGLEtBQVosQ0FOcEI7QUFPQSxTQUFPLENBQVA7QUFDRCxDQVREOztlQVdlUCxpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGZvckVhY2gsIHNvcnRCeSwgcmVkdWNlLFxufSBmcm9tICdsb2Rhc2gnO1xuXG4vLyB0b2RvIHZhbGlkYXRpb24gZnVuY3Rpb24gLy9odG1sNSArIGh0bWw0ICYmIElFIDEwLzExIHN1cHBvcnQ7XG4vLyB0b2RvXG5jb25zdCBzZW5kUmVxdWVzdCA9ICh1cmwpID0+IHtcbiAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgY29uc3QgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuICBjb25zdCByZXEgPSBuZXcgUHJvbWlzZSgoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHhodHRwLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlc3VsdCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBFcnJvciEgJHt0aGlzLnJlYWR5U3RhdGV9ICR7dGhpcy5zdGF0dXN9YCkpO1xuICAgICAgfVxuICAgIH07XG4gICAgeGh0dHAub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgIHhodHRwLnNlbmQoJ21vYmlsZV9jb2Rlcz1nZXQnKTtcbiAgfSkpO1xuICByZXR1cm4gcmVxO1xufTtcblxuY29uc3QgcmVuZGVyTGFiZWwgPSAob2JqKSA9PiB7XG4gIGNvbnN0IGxhYmVsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGxhYmVsSW5wdXQuZm9yID0gb2JqLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpLmlkO1xuICBsYWJlbElucHV0LnRleHRDb250ZW50ID0gJyArJztcbiAgb2JqLmFwcGVuZChsYWJlbElucHV0KTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IG1vYmlsZUZvcm1hdCA9IChhcnIpID0+IHtcbiAgY29uc3Qgc3RyID0gcmVkdWNlKGFyciwgKGFjYywgaXRlbSwga2V5KSA9PiB7XG4gICAgbGV0IHJlcyA9IGFjYztcbiAgICBpZiAoa2V5ID09PSAyIHx8IGtleSA9PT0gNSkge1xuICAgICAgcmVzICs9IGl0ZW07XG4gICAgICByZXMgKz0gJyAtICc7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICByZXMgKz0gaXRlbTtcbiAgICByZXR1cm4gcmVzO1xuICB9LCAnJyk7XG4gIHJldHVybiBzdHI7XG59O1xuXG5jb25zdCByZW5kZXJEcm9wRG93bkxpc3QgPSAob2JqLCBTb3J0ZWRGbGFncykgPT4ge1xuICBjb25zdCBkcm9wRG93bkhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBkcm9wRG93bklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBkcm9wRG93bkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIGRyb3BEb3duTGlzdC5jbGFzc05hbWUgPSAnbW9iaWxlX2lucHV0LS1kcm9wZG93bi1saXN0JztcbiAgZHJvcERvd25IZWFkZXIuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tZHJvcGRvd24taGVhZGVyJztcbiAgZHJvcERvd25JbnB1dC5jbGFzc05hbWUgPSAnbW9iaWxlX2lucHV0LS1kcm9wZG93bi1pbnB1dCc7XG4gIGRyb3BEb3duSW5wdXQucmVhZE9ubHkgPSB0cnVlO1xuXG4gIGRyb3BEb3duSW5wdXQucGxhY2Vob2xkZXIgPSAn0LrQvtC0JztcbiAgZHJvcERvd25JbnB1dC5tYXhMZW5ndGggPSA0O1xuXG4gIGRyb3BEb3duSGVhZGVyLmFwcGVuZChkcm9wRG93bklucHV0KTtcblxuICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgdWwuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tZHJvcGRvd24tdWwnO1xuXG4gIGZvckVhY2goU29ydGVkRmxhZ3MsIChlbCkgPT4ge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGxldCBpbWdGbGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgbGV0IGxpVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGxpLmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWxpJztcbiAgICBpbWdGbGFnLmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWltZ2ZsYWcnO1xuICAgIGxpVGV4dC5jbGFzc05hbWUgPSAnbW9iaWxlX2lucHV0LS1kcm9wZG93bi1saXRleHQnO1xuXG4gICAgbGlUZXh0LnRleHRDb250ZW50ID0gZWwubW9iaWxlX2NvZGU7XG5cbiAgICBpbWdGbGFnLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoaW1nL2ZsYWdzLyR7ZWwuZmxhZ19waWN0dXJlX25hbWV9KWA7XG5cbiAgICBsaS5hcHBlbmRDaGlsZChpbWdGbGFnKTtcbiAgICBsaS5hcHBlbmRDaGlsZChsaVRleHQpO1xuXG4gICAgbGkudGl0bGUgPSBlbC5uYW1lX2N5cjtcbiAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGRyb3BEb3duSW5wdXQudmFsdWUgPSBsaVRleHQudGV4dENvbnRlbnQ7XG4gICAgICBkcm9wRG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9KTtcbiAgICB1bC5hcHBlbmQobGkpO1xuICB9KTtcblxuICBkcm9wRG93bkxpc3QuYXBwZW5kKHVsKTtcblxuICBjb25zdCBtb2JpbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgbW9iaWxlSW5wdXQuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tbW9iaWxlLWlucHV0JztcbiAgbW9iaWxlSW5wdXQucGF0dGVybiA9ICdcXFxcZHszfShcXFxcc3wtKVxcXFxkezN9KFxcXFxzfC0pXFxcXGR7NH0nO1xuICBtb2JpbGVJbnB1dC5wbGFjZWhvbGRlciA9ICdYWFgtWFhYLVhYWFgnO1xuICBtb2JpbGVJbnB1dC50aXRsZSA9ICfQvdC+0LzQtdGAINC80L7QsdC40LvRjNC90L7Qs9C+INGC0LXQu9C10YTQvtC90LAnO1xuICBtb2JpbGVJbnB1dC50eXBlID0gJ3RlbCc7XG4gIG1vYmlsZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgb2JqLmFwcGVuZChkcm9wRG93bkhlYWRlcik7XG5cbiAgb2JqLmFwcGVuZChtb2JpbGVJbnB1dCk7XG5cbiAgb2JqLmFwcGVuZChkcm9wRG93bkxpc3QpO1xuXG5cbiAgY29uc3Qga2V5YnVmID0gW107XG4gIG1vYmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgIGlmIChpc05hTihwYXJzZUludChlLmtleSwgMTApKSAmJiBlLmtleSAhPT0gJ0JhY2tzcGFjZScgJiYgZS5rZXkgIT09ICdFbnRlcicpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoa2V5YnVmLmxlbmd0aCA+PSAxMCAmJiBlLmtleSAhPT0gJ0JhY2tzcGFjZScpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUua2V5ID09PSAnQmFja3NwYWNlJykge1xuICAgICAgbW9iaWxlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIG1vYmlsZUlucHV0LnZhbHVlID0gbW9iaWxlRm9ybWF0KGtleWJ1Zik7XG4gICAgICBrZXlidWYucG9wKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbW9iaWxlSW5wdXQudmFsdWUgPSAnJztcbiAgICBtb2JpbGVJbnB1dC52YWx1ZSA9IG1vYmlsZUZvcm1hdChrZXlidWYpO1xuICAgIGtleWJ1Zi5wdXNoKGUua2V5KTtcbiAgfSk7XG5cbiAgZHJvcERvd25MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgZHJvcERvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0pO1xuXG4gIGRyb3BEb3duSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZHJvcERvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoZHJvcERvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpID8gJ25vbmUnIDogJ2Jsb2NrJztcbiAgfSk7XG5cbiAgbW9iaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsICgpID0+IHtcbiAgICBkcm9wRG93bkxpc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSk7XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IHVwVXNlZENvdW50cnkgPSAoY29kZXMsIGNvdW50cmllcykgPT4ge1xuICBjb25zdCB1cExpc3QgPSBjb2Rlcy5maWx0ZXIoKGVsKSA9PiBjb3VudHJpZXMuaW5jbHVkZXMoZWwubmFtZV9sYXQpKTtcbiAgY29uc3QgcmVzdWx0ID0gdXBMaXN0LmNvbmNhdChjb2Rlcyk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBmb3JtYXRDb2RlcyA9IChhcnIpID0+IHtcbiAgY29uc3Qgc29ydEFyciA9IHNvcnRCeShhcnIubW9iaWxlX2NvZGVzLCBbKG8pID0+IG8ubmFtZV9jeXJdKTtcbiAgcmV0dXJuIHVwVXNlZENvdW50cnkoc29ydEFyciwgWydSdXNzaWEnLCAnQmVsYXJ1cycsICdGaW5sYW5kJywgJ0themFraHN0YW4nLCAnS3lyZ3l6c3RhbicsICdBemVyYmFpamFuJywgJ0FybWVuaWEnLCAnTW9sZG92YScsICdUYWppa2lzdGFuJywgJ1V6YmVraXN0YW4nXSk7XG59O1xuXG5jb25zdCByZW5kZXJNb2JpbGVJbnB1dCA9IChjb25maWcpID0+IHtcbiAgc2VuZFJlcXVlc3QoY29uZmlnLnVybClcbiAgICAudGhlbigoTW9iaWxlQ29kZXMpID0+IHtcbiAgICAgIGNvbnN0IFNvcnRlZE1vYmlsZUNvZGVzID0gZm9ybWF0Q29kZXMoTW9iaWxlQ29kZXMpO1xuICAgICAgcmVuZGVyTGFiZWwoY29uZmlnLmRvbU9iamVjdCk7XG4gICAgICByZW5kZXJEcm9wRG93bkxpc3QoY29uZmlnLmRvbU9iamVjdCwgU29ydGVkTW9iaWxlQ29kZXMpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgcmV0dXJuIDA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJNb2JpbGVJbnB1dDtcbiJdfQ==