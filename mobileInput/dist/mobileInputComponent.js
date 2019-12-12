"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

// todo add render dropdown
// todo for codes by counties with flags images (because select not work with flags);
// todo add input with configurable mask and
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

const renderDropDownList = (obj, Flags) => {
  // todo release this function! fixme!!!!
  console.log('in dropdownlist');
  const dropDownHeader = document.createElement('span'); // eslint-disable-line

  const dropDownInput = document.createElement('input'); // eslint-disable-line

  const dropDownList = document.createElement('div'); // eslint-disable-line

  dropDownList.className = 'mobile_input--dropdown-list';
  dropDownHeader.className = 'mobile_input--dropdown-header';
  dropDownInput.className = 'mobile_input--dropdown-input';
  dropDownInput.placeholder = 'код';
  dropDownHeader.append(dropDownInput);
  const ul = document.createElement('ul'); // eslint-disable-line

  ul.className = 'mobile_input--dropdown-ul';
  const liBufs = [];

  _lodash._.forEach(Flags.mobile_codes, el => {
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
    ul.append(li);
    liBufs.push(li);
  });

  dropDownList.append(ul);
  obj.append(dropDownHeader);
  obj.append(dropDownList);
  dropDownHeader.addEventListener('click', () => {
    dropDownList.style.display = dropDownList.style.display === 'block' ? 'none' : 'block';
    return dropDownList;
  });
  return obj;
};

const renderInput = obj => {
  // todo release this function! fixme!!!
  console.log('in renderInput function!');
  return obj;
};

const renderMobileInput = config => {
  console.log('!', config, 'version lodash: ', _lodash._.VERSION);
  sendRequest(config.url).then(Flags => {
    console.log(Flags);
    renderLabel(config.domObject);
    renderDropDownList(config.domObject, Flags);
    renderInput(config.domObject);
  }).catch(error => console.log(error));
  return 0;
};

var _default = renderMobileInput;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2JpbGVJbnB1dENvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzZW5kUmVxdWVzdCIsInVybCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXN1bHQiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJFcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsInJlbmRlckxhYmVsIiwib2JqIiwibGFiZWxJbnB1dCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZvciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaWQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsInJlbmRlckRyb3BEb3duTGlzdCIsIkZsYWdzIiwiY29uc29sZSIsImxvZyIsImRyb3BEb3duSGVhZGVyIiwiZHJvcERvd25JbnB1dCIsImRyb3BEb3duTGlzdCIsImNsYXNzTmFtZSIsInBsYWNlaG9sZGVyIiwidWwiLCJsaUJ1ZnMiLCJfIiwiZm9yRWFjaCIsIm1vYmlsZV9jb2RlcyIsImVsIiwibGkiLCJpbWdGbGFnIiwibGlUZXh0IiwibW9iaWxlX2NvZGUiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImZsYWdfcGljdHVyZV9uYW1lIiwiYXBwZW5kQ2hpbGQiLCJ0aXRsZSIsIm5hbWVfY3lyIiwicHVzaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwbGF5IiwicmVuZGVySW5wdXQiLCJyZW5kZXJNb2JpbGVJbnB1dCIsImNvbmZpZyIsIlZFUlNJT04iLCJ0aGVuIiwiZG9tT2JqZWN0IiwiY2F0Y2giLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNQSxXQUFXLEdBQUlDLEdBQUQsSUFBUztBQUMzQjtBQUNBLFFBQU1DLEtBQUss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O0FBb0RBLE1BQU1xQyxXQUFXLEdBQUlyQyxHQUFELElBQVM7QUFDM0I7QUFDQVcsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVo7QUFDQSxTQUFPWixHQUFQO0FBQ0QsQ0FKRDs7QUFNQSxNQUFNc0MsaUJBQWlCLEdBQUlDLE1BQUQsSUFBWTtBQUNwQzVCLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEdBQVosRUFBaUIyQixNQUFqQixFQUF5QixrQkFBekIsRUFBNkNuQixVQUFFb0IsT0FBL0M7QUFDQTVELEVBQUFBLFdBQVcsQ0FBQzJELE1BQU0sQ0FBQzFELEdBQVIsQ0FBWCxDQUNHNEQsSUFESCxDQUNTL0IsS0FBRCxJQUFXO0FBQ2ZDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaO0FBQ0FYLElBQUFBLFdBQVcsQ0FBQ3dDLE1BQU0sQ0FBQ0csU0FBUixDQUFYO0FBQ0FqQyxJQUFBQSxrQkFBa0IsQ0FBQzhCLE1BQU0sQ0FBQ0csU0FBUixFQUFtQmhDLEtBQW5CLENBQWxCO0FBQ0EyQixJQUFBQSxXQUFXLENBQUNFLE1BQU0sQ0FBQ0csU0FBUixDQUFYO0FBQ0QsR0FOSCxFQU9HQyxLQVBILENBT1VDLEtBQUQsSUFBV2pDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZ0MsS0FBWixDQVBwQjtBQVFBLFNBQU8sQ0FBUDtBQUNELENBWEQ7O2VBYWVOLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXyB9IGZyb20gJ2xvZGFzaCc7XG5cbi8vIHRvZG8gYWRkIHJlbmRlciBkcm9wZG93blxuLy8gdG9kbyBmb3IgY29kZXMgYnkgY291bnRpZXMgd2l0aCBmbGFncyBpbWFnZXMgKGJlY2F1c2Ugc2VsZWN0IG5vdCB3b3JrIHdpdGggZmxhZ3MpO1xuLy8gdG9kbyBhZGQgaW5wdXQgd2l0aCBjb25maWd1cmFibGUgbWFzayBhbmRcbi8vIHRvZG8gdmFsaWRhdGlvbiBmdW5jdGlvbiAvL2h0bWw1ICsgaHRtbDQgJiYgSUUgMTAvMTEgc3VwcG9ydDtcbi8vIHRvZG9cbmNvbnN0IHNlbmRSZXF1ZXN0ID0gKHVybCkgPT4ge1xuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICBjb25zdCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG4gIGNvbnN0IHJlcSA9IG5ldyBQcm9taXNlKCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geGh0dHAucmVzcG9uc2VUZXh0O1xuICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVzdWx0KSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYEVycm9yISAke3RoaXMucmVhZHlTdGF0ZX0gJHt0aGlzLnN0YXR1c31gKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHR0cC5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgeGh0dHAuc2VuZCgnbW9iaWxlX2NvZGVzPWdldCcpO1xuICB9KSk7XG4gIHJldHVybiByZXE7XG59O1xuXG5jb25zdCByZW5kZXJMYWJlbCA9IChvYmopID0+IHtcbiAgY29uc3QgbGFiZWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgbGFiZWxJbnB1dC5mb3IgPSBvYmouZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykuaWQ7XG4gIGxhYmVsSW5wdXQudGV4dENvbnRlbnQgPSAnICsnO1xuICBvYmouYXBwZW5kKGxhYmVsSW5wdXQpO1xuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3QgcmVuZGVyRHJvcERvd25MaXN0ID0gKG9iaiwgRmxhZ3MpID0+IHtcbiAgLy8gdG9kbyByZWxlYXNlIHRoaXMgZnVuY3Rpb24hIGZpeG1lISEhIVxuICBjb25zb2xlLmxvZygnaW4gZHJvcGRvd25saXN0Jyk7XG4gIGNvbnN0IGRyb3BEb3duSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IGRyb3BEb3duSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IGRyb3BEb3duTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgZHJvcERvd25MaXN0LmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWxpc3QnO1xuICBkcm9wRG93bkhlYWRlci5jbGFzc05hbWUgPSAnbW9iaWxlX2lucHV0LS1kcm9wZG93bi1oZWFkZXInO1xuICBkcm9wRG93bklucHV0LmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWlucHV0JztcblxuICBkcm9wRG93bklucHV0LnBsYWNlaG9sZGVyID0gJ9C60L7QtCc7XG5cbiAgZHJvcERvd25IZWFkZXIuYXBwZW5kKGRyb3BEb3duSW5wdXQpO1xuXG4gIGNvbnN0IHVsPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIHVsLmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLXVsJztcblxuICBjb25zdCBsaUJ1ZnMgPSBbXTtcbiAgXy5mb3JFYWNoKEZsYWdzLm1vYmlsZV9jb2RlcywgKGVsKSA9PiB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgbGV0IGltZ0ZsYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBsZXQgbGlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgbGkuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tZHJvcGRvd24tbGknO1xuICAgIGltZ0ZsYWcuY2xhc3NOYW1lID0gJ21vYmlsZV9pbnB1dC0tZHJvcGRvd24taW1nZmxhZyc7XG4gICAgbGlUZXh0LmNsYXNzTmFtZSA9ICdtb2JpbGVfaW5wdXQtLWRyb3Bkb3duLWxpdGV4dCc7XG5cbiAgICBsaVRleHQudGV4dENvbnRlbnQgPSBlbC5tb2JpbGVfY29kZTtcblxuICAgIGltZ0ZsYWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChpbWcvZmxhZ3MvJHtlbC5mbGFnX3BpY3R1cmVfbmFtZX0pYDtcblxuICAgIGxpLmFwcGVuZENoaWxkKGltZ0ZsYWcpO1xuICAgIGxpLmFwcGVuZENoaWxkKGxpVGV4dCk7XG5cbiAgICBsaS50aXRsZSA9IGVsLm5hbWVfY3lyO1xuXG4gICAgdWwuYXBwZW5kKGxpKTtcbiAgICBsaUJ1ZnMucHVzaChsaSk7XG4gIH0pO1xuXG4gIGRyb3BEb3duTGlzdC5hcHBlbmQodWwpO1xuXG4gIG9iai5hcHBlbmQoZHJvcERvd25IZWFkZXIpO1xuICBvYmouYXBwZW5kKGRyb3BEb3duTGlzdCk7XG5cbiAgZHJvcERvd25IZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZHJvcERvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoZHJvcERvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpID8gJ25vbmUnIDogJ2Jsb2NrJztcbiAgICByZXR1cm4gZHJvcERvd25MaXN0O1xuICB9KTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IHJlbmRlcklucHV0ID0gKG9iaikgPT4ge1xuICAvLyB0b2RvIHJlbGVhc2UgdGhpcyBmdW5jdGlvbiEgZml4bWUhISFcbiAgY29uc29sZS5sb2coJ2luIHJlbmRlcklucHV0IGZ1bmN0aW9uIScpO1xuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3QgcmVuZGVyTW9iaWxlSW5wdXQgPSAoY29uZmlnKSA9PiB7XG4gIGNvbnNvbGUubG9nKCchJywgY29uZmlnLCAndmVyc2lvbiBsb2Rhc2g6ICcsIF8uVkVSU0lPTik7XG4gIHNlbmRSZXF1ZXN0KGNvbmZpZy51cmwpXG4gICAgLnRoZW4oKEZsYWdzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhGbGFncyk7XG4gICAgICByZW5kZXJMYWJlbChjb25maWcuZG9tT2JqZWN0KTtcbiAgICAgIHJlbmRlckRyb3BEb3duTGlzdChjb25maWcuZG9tT2JqZWN0LCBGbGFncyk7XG4gICAgICByZW5kZXJJbnB1dChjb25maWcuZG9tT2JqZWN0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gIHJldHVybiAwO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyTW9iaWxlSW5wdXQ7XG4iXX0=