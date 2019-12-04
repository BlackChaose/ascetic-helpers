"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runApp = exports.sum = void 0;

var _lodash = require("lodash");

//  fixme: add pagination, search, count rows
//  todo посмотри что можно сделать с валидацией номера телефона напримера
//  - т.е. получать инфу по кодификатору например.
const sum = (a, b) => a + b;
/* eslint-disable */


exports.sum = sum;

const buildRow = (parentObj, oneRowObjects, tag) => {
  const row = document.createElement('tr');

  _lodash._.reduce(oneRowObjects, (acc, el) => {
    const cell = document.createElement(tag); //console.log(el);

    cell.textContent = el;
    acc.append(cell);
    return acc;
  }, row);

  parentObj.append(row);
  return row;
};

const buildTableHeader = (obj, headers) => {
  const header = buildRow(obj, headers, 'th');
  header.className = 'header';
  return header;
};

const isOdd = num => {
  return num % 2;
};

const addRemoveRowCell = obj => {
  let colRemove = document.createElement('td');
  colRemove.className = 'removeRowBtn';
  let buttonRemove = document.createElement('i');
  buttonRemove.className = "fa fa-remove";
  colRemove.append(buttonRemove);
  obj.append(colRemove);
  return obj;
};

const addRemoveRowHeaderCell = obj => {
  let colRemove = document.createElement('th');
  let buttonRemove = document.createElement('i');
  buttonRemove.className = "fa fa-remove";
  colRemove.append(buttonRemove);
  obj.append(colRemove);
  return obj;
};

const hasRemoveRowColumn = obj => obj.columnDeleteRow;

const selectHandler = e => {
  console.log(e.target);
  console.log(e.target.parentNode);
};

const removeHandler = e => {
  //console.log('=> ',e.target.parentElement, '=>> ', e.target.parentNode.parentNode);
  e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
};
/**
 * application
 * @param obj
 * @param configTable
 * @param testData
 * @returns {*}
 */


const runApp = (obj, configTable, testData) => {
  const tbl = document.createElement('table');
  tbl.className = 'dtTable';
  const header = buildTableHeader(obj, configTable.headers[0]);

  if (hasRemoveRowColumn(configTable)) {
    addRemoveRowHeaderCell(header);
  }

  tbl.append(header);
  let index = 0;

  _lodash._.forEach(testData, element => {
    const row = buildRow(obj, element, 'td'); //row.className = (isOdd(index)) ? 'odd' : 'even';

    if (hasRemoveRowColumn(configTable)) {
      addRemoveRowCell(row);
    }

    tbl.append(row);
    index += 1;
  });

  obj.append(tbl);
  const rows = document.querySelectorAll('table.dtTable tr');

  _lodash._.forEach(rows, element => {
    element.addEventListener('click', selectHandler);
  });

  const removeRowButtons = document.querySelectorAll('td.removeRowBtn');

  _lodash._.forEach(removeRowButtons, button => {
    button.addEventListener('click', removeHandler);
  });

  return obj;
};
/* eslint-enable */


exports.runApp = runApp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kdFRhYmxlLmpzIl0sIm5hbWVzIjpbInN1bSIsImEiLCJiIiwiYnVpbGRSb3ciLCJwYXJlbnRPYmoiLCJvbmVSb3dPYmplY3RzIiwidGFnIiwicm93IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiXyIsInJlZHVjZSIsImFjYyIsImVsIiwiY2VsbCIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiYnVpbGRUYWJsZUhlYWRlciIsIm9iaiIsImhlYWRlcnMiLCJoZWFkZXIiLCJjbGFzc05hbWUiLCJpc09kZCIsIm51bSIsImFkZFJlbW92ZVJvd0NlbGwiLCJjb2xSZW1vdmUiLCJidXR0b25SZW1vdmUiLCJhZGRSZW1vdmVSb3dIZWFkZXJDZWxsIiwiaGFzUmVtb3ZlUm93Q29sdW1uIiwiY29sdW1uRGVsZXRlUm93Iiwic2VsZWN0SGFuZGxlciIsImUiLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUhhbmRsZXIiLCJyZW1vdmVDaGlsZCIsInJ1bkFwcCIsImNvbmZpZ1RhYmxlIiwidGVzdERhdGEiLCJ0YmwiLCJpbmRleCIsImZvckVhY2giLCJlbGVtZW50Iiwicm93cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlUm93QnV0dG9ucyIsImJ1dHRvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUVBLE1BQU1BLEdBQUcsR0FBRyxDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVUQsQ0FBQyxHQUFHQyxDQUExQjtBQUNBOzs7OztBQUNBLE1BQU1DLFFBQVEsR0FBRyxDQUFDQyxTQUFELEVBQVlDLGFBQVosRUFBMkJDLEdBQTNCLEtBQW1DO0FBQ2xELFFBQU1DLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBQVo7O0FBQ0FDLFlBQUVDLE1BQUYsQ0FBU04sYUFBVCxFQUF3QixDQUFDTyxHQUFELEVBQU1DLEVBQU4s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eyBfIH0gZnJvbSAnbG9kYXNoJztcblxuLy8gIGZpeG1lOiBhZGQgcGFnaW5hdGlvbiwgc2VhcmNoLCBjb3VudCByb3dzXG4vLyAgdG9kbyDQv9C+0YHQvNC+0YLRgNC4INGH0YLQviDQvNC+0LbQvdC+INGB0LTQtdC70LDRgtGMINGBINCy0LDQu9C40LTQsNGG0LjQtdC5INC90L7QvNC10YDQsCDRgtC10LvQtdGE0L7QvdCwINC90LDQv9GA0LjQvNC10YDQsFxuLy8gIC0g0YIu0LUuINC/0L7Qu9GD0YfQsNGC0Ywg0LjQvdGE0YMg0L/QviDQutC+0LTQuNGE0LjQutCw0YLQvtGA0YMg0L3QsNC/0YDQuNC80LXRgC5cblxuY29uc3Qgc3VtID0gKGEsIGIpID0+IGEgKyBiO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmNvbnN0IGJ1aWxkUm93ID0gKHBhcmVudE9iaiwgb25lUm93T2JqZWN0cywgdGFnKSA9PiB7XG4gIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gIF8ucmVkdWNlKG9uZVJvd09iamVjdHMsIChhY2MsIGVsKSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAvL2NvbnNvbGUubG9nKGVsKTtcbiAgICBjZWxsLnRleHRDb250ZW50ID0gZWw7XG4gICAgYWNjLmFwcGVuZChjZWxsKTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCByb3cpO1xuICBwYXJlbnRPYmouYXBwZW5kKHJvdyk7XG4gIHJldHVybiByb3c7XG59O1xuXG5jb25zdCBidWlsZFRhYmxlSGVhZGVyID0gKG9iaiwgaGVhZGVycykgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGJ1aWxkUm93KG9iaiwgaGVhZGVycywgJ3RoJyk7XG4gICAgaGVhZGVyLmNsYXNzTmFtZSA9ICdoZWFkZXInO1xuICAgIHJldHVybiBoZWFkZXI7XG59O1xuXG5jb25zdCBpc09kZCA9IChudW0pID0+IHsgcmV0dXJuIG51bSAlIDI7fTtcblxuY29uc3QgYWRkUmVtb3ZlUm93Q2VsbCA9IChvYmopID0+IHtcbiAgICBsZXQgY29sUmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBjb2xSZW1vdmUuY2xhc3NOYW1lID0gJ3JlbW92ZVJvd0J0bic7XG4gICAgbGV0IGJ1dHRvblJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBidXR0b25SZW1vdmUuY2xhc3NOYW1lPVwiZmEgZmEtcmVtb3ZlXCI7XG4gICAgY29sUmVtb3ZlLmFwcGVuZChidXR0b25SZW1vdmUpO1xuICAgIG9iai5hcHBlbmQoY29sUmVtb3ZlKTtcbiAgICByZXR1cm4gb2JqO1xufTtcblxuY29uc3QgYWRkUmVtb3ZlUm93SGVhZGVyQ2VsbCA9IChvYmopID0+IHtcbiAgbGV0IGNvbFJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gIGxldCBidXR0b25SZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIGJ1dHRvblJlbW92ZS5jbGFzc05hbWU9XCJmYSBmYS1yZW1vdmVcIjtcbiAgY29sUmVtb3ZlLmFwcGVuZChidXR0b25SZW1vdmUpO1xuICBvYmouYXBwZW5kKGNvbFJlbW92ZSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBoYXNSZW1vdmVSb3dDb2x1bW4gPSAob2JqKSA9PiBvYmouY29sdW1uRGVsZXRlUm93O1xuXG5jb25zdCBzZWxlY3RIYW5kbGVyID0gKGUpID0+IHtcbiAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlKTtcbn07XG5cbmNvbnN0IHJlbW92ZUhhbmRsZXIgPSAoZSkgPT4ge1xuICAvL2NvbnNvbGUubG9nKCc9PiAnLGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsICc9Pj4gJywgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcbiAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcbn07XG5cbi8qKlxuICogYXBwbGljYXRpb25cbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjb25maWdUYWJsZVxuICogQHBhcmFtIHRlc3REYXRhXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuY29uc3QgcnVuQXBwID0gKG9iaiwgY29uZmlnVGFibGUsIHRlc3REYXRhKSA9PiB7XG5cbiAgY29uc3QgdGJsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcblxuXG4gIHRibC5jbGFzc05hbWUgPSAnZHRUYWJsZSc7XG4gIGNvbnN0IGhlYWRlciA9IGJ1aWxkVGFibGVIZWFkZXIob2JqLCBjb25maWdUYWJsZS5oZWFkZXJzWzBdKTtcbiAgaWYoaGFzUmVtb3ZlUm93Q29sdW1uKGNvbmZpZ1RhYmxlKSl7XG4gICAgYWRkUmVtb3ZlUm93SGVhZGVyQ2VsbChoZWFkZXIpO1xuICB9XG4gIHRibC5hcHBlbmQoaGVhZGVyKTtcblxuXG4gIGxldCBpbmRleCA9IDA7XG4gIF8uZm9yRWFjaCh0ZXN0RGF0YSwgKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCByb3cgPSBidWlsZFJvdyhvYmosIGVsZW1lbnQsICd0ZCcpO1xuICAgIC8vcm93LmNsYXNzTmFtZSA9IChpc09kZChpbmRleCkpID8gJ29kZCcgOiAnZXZlbic7XG4gICAgaWYoaGFzUmVtb3ZlUm93Q29sdW1uKGNvbmZpZ1RhYmxlKSl7XG4gICAgICBhZGRSZW1vdmVSb3dDZWxsKHJvdyk7XG4gICAgfVxuICAgIHRibC5hcHBlbmQocm93KTtcbiAgICBpbmRleCArPSAxO1xuICB9KTtcbiAgb2JqLmFwcGVuZCh0YmwpO1xuXG4gIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZS5kdFRhYmxlIHRyJyk7XG4gIF8uZm9yRWFjaChyb3dzLCAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RIYW5kbGVyKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVtb3ZlUm93QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkLnJlbW92ZVJvd0J0bicpO1xuICBfLmZvckVhY2gocmVtb3ZlUm93QnV0dG9ucywgKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUhhbmRsZXIpO1xuICB9KTtcbiAgcmV0dXJuIG9iajtcbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5leHBvcnQgeyBzdW0sIHJ1bkFwcCB9O1xuIl19