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

const renderDropDownList = obj => {
  // todo release this function! fixme!!!!
  console.log('in dropdownlist');
  const dropDownHeader = document.createElement('span'); // eslint-disable-line

  const dropDownList = document.createElement('div'); // eslint-disable-line

  dropDownList.className = 'dropdown-list';
  dropDownHeader.className = 'dropdown-header';
  dropDownHeader.style.border = '1px solid black';
  dropDownHeader.style.borderRadius = '4px';
  dropDownHeader.style.cursor = 'pointer';
  dropDownHeader.style.display = 'inline-block';
  dropDownHeader.style.width = '60px';
  dropDownHeader.style.height = '18px';
  dropDownList.style.display = 'none';
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
  sendRequest(config.url).then(obj => {
    console.log(obj);
    renderLabel(config.domObject);
    renderDropDownList(config.domObject);
    renderInput(config.domObject);
  }).catch(error => console.log(error));
  return 0;
};

var _default = renderMobileInput;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2JpbGVJbnB1dENvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzZW5kUmVxdWVzdCIsInVybCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXN1bHQiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJFcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsInJlbmRlckxhYmVsIiwib2JqIiwibGFiZWxJbnB1dCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZvciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaWQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsInJlbmRlckRyb3BEb3duTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJkcm9wRG93bkhlYWRlciIsImRyb3BEb3duTGlzdCIsImNsYXNzTmFtZSIsInN0eWxlIiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwiY3Vyc29yIiwiZGlzcGxheSIsIndpZHRoIiwiaGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbmRlcklucHV0IiwicmVuZGVyTW9iaWxlSW5wdXQiLCJjb25maWciLCJfIiwiVkVSU0lPTiIsInRoZW4iLCJkb21PYmplY3QiLCJjYXRjaCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1BLFdBQVcsR0FBSUMsR0FBRCxJQUFTO0FBQzNCO0FBQ0EsUUFBTUMsS0FBSyxHQUFHLElBQUlDLGNBQUosRUFBZDtBQUNBOztBQUNBLFFBQU1DLEdBQUcsR0FBRyxJQUFJQyxPQUFKLENBQWEsQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQzVDTCxJQUFBQSxLQUFLLENBQUNNLGtCQUFOLEdBQTJCLFlBQVk7QUFDckMsVUFBSSxLQUFL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MkJBLE1BQU11QixXQUFXLEdBQUl2QixHQUFELElBQVM7QUFDM0I7QUFDQVUsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVo7QUFDQSxTQUFPWCxHQUFQO0FBQ0QsQ0FKRDs7QUFNQSxNQUFNd0IsaUJBQWlCLEdBQUlDLE1BQUQsSUFBWTtBQUNwQ2YsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksR0FBWixFQUFpQmMsTUFBakIsRUFBeUIsa0JBQXpCLEVBQTZDQyxVQUFFQyxPQUEvQztBQUNBL0MsRUFBQUEsV0FBVyxDQUFDNkMsTUFBTSxDQUFDNUMsR0FBUixDQUFYLENBQ0crQyxJQURILENBQ1M1QixHQUFELElBQVM7QUFDYlUsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlYLEdBQVo7QUFDQUQsSUFBQUEsV0FBVyxDQUFDMEIsTUFBTSxDQUFDSSxTQUFSLENBQVg7QUFDQXBCLElBQUFBLGtCQUFrQixDQUFDZ0IsTUFBTSxDQUFDSSxTQUFSLENBQWxCO0FBQ0FOLElBQUFBLFdBQVcsQ0FBQ0UsTUFBTSxDQUFDSSxTQUFSLENBQVg7QUFDRCxHQU5ILEVBT0dDLEtBUEgsQ0FPVUMsS0FBRCxJQUFXckIsT0FBTyxDQUFDQyxHQUFSLENBQVlvQixLQUFaLENBUHBCO0FBUUEsU0FBTyxDQUFQO0FBQ0QsQ0FYRDs7ZUFhZVAsaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfIH0gZnJvbSAnbG9kYXNoJztcblxuLy8gdG9kbyBhZGQgcmVuZGVyIGRyb3Bkb3duXG4vLyB0b2RvIGZvciBjb2RlcyBieSBjb3VudGllcyB3aXRoIGZsYWdzIGltYWdlcyAoYmVjYXVzZSBzZWxlY3Qgbm90IHdvcmsgd2l0aCBmbGFncyk7XG4vLyB0b2RvIGFkZCBpbnB1dCB3aXRoIGNvbmZpZ3VyYWJsZSBtYXNrIGFuZFxuLy8gdG9kbyB2YWxpZGF0aW9uIGZ1bmN0aW9uIC8vaHRtbDUgKyBodG1sNCAmJiBJRSAxMC8xMSBzdXBwb3J0O1xuLy8gdG9kb1xuY29uc3Qgc2VuZFJlcXVlc3QgPSAodXJsKSA9PiB7XG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIGNvbnN0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIC8qIGVzbGludC1lbmFibGUgKi9cbiAgY29uc3QgcmVxID0gbmV3IFByb21pc2UoKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBjb25zdCByZXN1bHQgPSB4aHR0cC5yZXNwb25zZVRleHQ7XG4gICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXN1bHQpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgRXJyb3IhICR7dGhpcy5yZWFkeVN0YXRlfSAke3RoaXMuc3RhdHVzfWApKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICB4aHR0cC5zZW5kKCdtb2JpbGVfY29kZXM9Z2V0Jyk7XG4gIH0pKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbmNvbnN0IHJlbmRlckxhYmVsID0gKG9iaikgPT4ge1xuICBjb25zdCBsYWJlbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBsYWJlbElucHV0LmZvciA9IG9iai5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKS5pZDtcbiAgbGFiZWxJbnB1dC50ZXh0Q29udGVudCA9ICcgKyc7XG4gIG9iai5hcHBlbmQobGFiZWxJbnB1dCk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCByZW5kZXJEcm9wRG93bkxpc3QgPSAob2JqKSA9PiB7XG4gIC8vIHRvZG8gcmVsZWFzZSB0aGlzIGZ1bmN0aW9uISBmaXhtZSEhISFcbiAgY29uc29sZS5sb2coJ2luIGRyb3Bkb3dubGlzdCcpO1xuICBjb25zdCBkcm9wRG93bkhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBkcm9wRG93bkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBkcm9wRG93bkxpc3QuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duLWxpc3QnO1xuICBkcm9wRG93bkhlYWRlci5jbGFzc05hbWUgPSAnZHJvcGRvd24taGVhZGVyJztcblxuICBkcm9wRG93bkhlYWRlci5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGJsYWNrJztcbiAgZHJvcERvd25IZWFkZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzRweCc7XG4gIGRyb3BEb3duSGVhZGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgZHJvcERvd25IZWFkZXIuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICBkcm9wRG93bkhlYWRlci5zdHlsZS53aWR0aCA9ICc2MHB4JztcbiAgZHJvcERvd25IZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzE4cHgnO1xuXG4gIGRyb3BEb3duTGlzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gIG9iai5hcHBlbmQoZHJvcERvd25IZWFkZXIpO1xuICBvYmouYXBwZW5kKGRyb3BEb3duTGlzdCk7XG5cbiAgZHJvcERvd25IZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZHJvcERvd25MaXN0LnN0eWxlLmRpc3BsYXkgPSAoZHJvcERvd25MaXN0LnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpID8gJ25vbmUnIDogJ2Jsb2NrJztcbiAgICByZXR1cm4gZHJvcERvd25MaXN0O1xuICB9KTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IHJlbmRlcklucHV0ID0gKG9iaikgPT4ge1xuICAvLyB0b2RvIHJlbGVhc2UgdGhpcyBmdW5jdGlvbiEgZml4bWUhISFcbiAgY29uc29sZS5sb2coJ2luIHJlbmRlcklucHV0IGZ1bmN0aW9uIScpO1xuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3QgcmVuZGVyTW9iaWxlSW5wdXQgPSAoY29uZmlnKSA9PiB7XG4gIGNvbnNvbGUubG9nKCchJywgY29uZmlnLCAndmVyc2lvbiBsb2Rhc2g6ICcsIF8uVkVSU0lPTik7XG4gIHNlbmRSZXF1ZXN0KGNvbmZpZy51cmwpXG4gICAgLnRoZW4oKG9iaikgPT4ge1xuICAgICAgY29uc29sZS5sb2cob2JqKTtcbiAgICAgIHJlbmRlckxhYmVsKGNvbmZpZy5kb21PYmplY3QpO1xuICAgICAgcmVuZGVyRHJvcERvd25MaXN0KGNvbmZpZy5kb21PYmplY3QpO1xuICAgICAgcmVuZGVySW5wdXQoY29uZmlnLmRvbU9iamVjdCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICByZXR1cm4gMDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlck1vYmlsZUlucHV0O1xuIl19