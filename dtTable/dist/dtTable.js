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
let stackStore = {
  "version": "1.0.0"
};
stackStore.currentPageNumber = 1;
stackStore.pageRowsLimit = 10;

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
  console.log('event.currentTarget =>', e.currentTarget);
};

const removeHandler = e => {
  //console.log('=> ',e.target.parentElement, '=>> ', e.target.parentNode.parentNode);
  e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode); // fixme: add stack for store removed mail-lists
  // fixme: add stack for store final list of rows ( and check it befor send)
  // fixme: add this two stascks to configTable - for store data

  stackStore.count = stackStore.count + 1;
  console.log('stackStore => ', stackStore);
};

const renderDtTable = (obj, configTable, tableData) => {
  //obj.removeChild(obj);
  const tbl = document.createElement('table');
  tbl.className = 'dtTable';
  const header = buildTableHeader(obj, configTable.headers[0]);

  if (hasRemoveRowColumn(configTable)) {
    addRemoveRowHeaderCell(header);
  }

  tbl.append(header);
  let index = 0;

  _lodash._.forEach(tableData, element => {
    const row = buildRow(obj, element, 'td');

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
/**
 * application
 * @param obj
 * @param configTable
 * @param testData
 * @returns {*}
 */


const runApp = (obj, configTable, tableData) => {
  /**
   * !!!
   */
  stackStore.inputData = tableData; // fixme - clone or copy obj!!!!  - todo

  if (tableData.rowLimit) {
    stackStore.pageRowsLimit = tableData.rowLimit;
  }

  renderDtTable(obj, configTable, tableData);
  return renderDtTable(obj, configTable, tableData);
};
/* eslint-enable */


exports.runApp = runApp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kdFRhYmxlLmpzIl0sIm5hbWVzIjpbInN1bSIsImEiLCJiIiwic3RhY2tTdG9yZSIsImN1cnJlbnRQYWdlTnVtYmVyIiwicGFnZVJvd3NMaW1pdCIsImJ1aWxkUm93IiwicGFyZW50T2JqIiwib25lUm93T2JqZWN0cyIsInRhZyIsInJvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIl8iLCJyZWR1Y2UiLCJhY2MiLCJlbCIsImNlbGwiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsImJ1aWxkVGFibGVIZWFkZXIiLCJvYmoiLCJoZWFkZXJzIiwiaGVhZGVyIiwiY2xhc3NOYW1lIiwiaXNPZGQiLCJudW0iLCJhZGRSZW1vdmVSb3dDZWxsIiwiY29sUmVtb3ZlIiwiYnV0dG9uUmVtb3ZlIiwiYWRkUmVtb3ZlUm93SGVhZGVyQ2VsbCIsImhhc1JlbW92ZVJvd0NvbHVtbiIsImNvbHVtbkRlbGV0ZVJvdyIsInNlbGVjdEhhbmRsZXIiLCJlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJyZW1vdmVIYW5kbGVyIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY291bnQiLCJyZW5kZXJEdFRhYmxlIiwiY29uZmlnVGFibGUiLCJ0YWJsZURhdGEiLCJ0YmwiLCJpbmRleCIsImZvckVhY2giLCJlbGVtZW50Iiwicm93cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlUm93QnV0dG9ucyIsImJ1dHRvbiIsInJ1bkFwcCIsImlucHV0RGF0YSIsInJvd0xpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBR0E7QUFDQTtBQUNBO0FBRUEsTUFBTUEsR0FBRyxHQUFHLENBQUNDLENBQUQsRUFBSUMsQ0FBSixLQUFVRCxDQUFDLEdBQUdDLENBQTFCO0FBQ0E7Ozs7QUFDQSxJQUFJQyxVQUFVLEdBQUc7QUFBQyxhQUFXO0FBQVosQ0FBakI7QUFDQUEsVUFBVSxDQUFDQyxpQkFBWCxHQUErQixDQUEvQjtBQUNBRCxVQUFVLENBQUNFLGFBQVgsR0FBMkIsRUFBM0I7O0FBRUEsTUFBTUMsUUFBUSxHQUFHLENBQUNDLFNBQUQsRUFBWUMsYUFBWixFQUEyQkMsR0FBM0IsS0FBbUM7QUFDbEQsUUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWjs7QUFDQUMsWUFBRUMsTUFBRixDQUFTTixhQUFULEVBQXdCLENBQUNPLEdBQUQsRUFBTUMsRUFBTixLQUFhO0FBQ25DLFVBQU1DLElBQUksR0FBR04sUUFBUSxDQUFDQyxhQUFULENBQXVCSCxHQUF2QixDQUFiLENBRG1DLENBRW5DOztBQUNBUSxJQUFBQSxJQUFJLENBQUNDLFdBQUwsR0FBbUJGLEVBQW5CO0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0ksTUFBSixDQUFXRixJQUFYO0FBQ0EsV0FBT0YsR0FBUDtBQUNELEdBTkQsRUFNR0wsR0FOSDs7QUFPQUgsRUFBQUEsU0FBUyxDQUFDWSxNQUFWLENBQWlCVCxHQUFqQjtBQUNBLFNBQU9BLEdBQVA7QUFDRCxDQVhEOztBQWFBLE1BQU1VLGdCQUFnQixHQUFHLENBQUNDLEdBQUQsRUFBTUMsT0FBTixLQUFrQjtBQUN2QyxRQUFNQyxNQUFNLEdBQUdqQixRQUFRLENBQUNlLEdBQUQsRUFBTUMsT0FBTixFQUFlLElBQWYsQ0FBdkI7QUFDQUMsRUFBQUEsTUFBTSxDQUFDQyxTQUFQLEdBQW1CLFFBQW5CO0FBQ0EsU0FBT0QsTUFBUDtBQUNILENBSkQ7O0FBTUEsTUFBTUUsS0FBSyxHQUFJQyxHQUFELElBQVM7QUFBRSxTQUFPQSxHQUFHLEdBQUcsQ0FBYjtBQUFnQixDQUF6Qzs7QUFFQSxNQUFNQyxnQkFBZ0IsR0FBSU4sR0FBRCxJQUFTO0FBQzlCLE1BQUlPLFNBQVMsR0FBR2pCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUF2QixDQUFoQjtBQUNBZ0IsRUFBQUEsU0FBUyxDQUFDSixTQUFWLEdBQXNCLGNBQXRCO0FBQ0EsTUFBSUssWUFBWSxHQUFHbEIsUUFBUSxDQUFDQyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0FpQixFQUFBQSxZQUFZLENBQUNMLFNBQWIsR0FBdUIsY0FBdkI7QUFDQUksRUFBQUEsU0FBUyxDQUFDVCxNQUFWLENBQWlCVSxZQUFqQjtBQUNBUixFQUFBQSxHQUFHLENBQUNGLE1BQUosQ0FBV1MsU0FBWDtBQUNBLFNBQU9QLEdBQVA7QUFDSCxDQVJEOztBQVVBLE1BQU1TLHNCQUFzQixHQUFJVCxHQUFELElBQVM7QUFDdEMsTUFBSU8sU0FBUyxHQUFHakIsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBQWhCO0FBQ0EsTUFBSWlCLFlBQVksR0FBR2xCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixHQUF2QixDQUFuQjtBQUNBaUIsRUFBQUEsWUFBWSxDQUFDTCxTQUFiLEdBQXVCLGNBQXZCO0FBQ0FJLEVBQUFBLFNBQVMsQ0FBQ1QsTUFBVixDQUFpQlUsWUFBakI7QUFDQVIsRUFBQUEsR0FBRyxDQUFDRixNQUFKLENBQVdTLFNBQVg7QUFDQSxTQUFPUCxHQUFQO0FBQ0QsQ0FQRDs7QUFTQSxNQUFNVSxrQkFBa0IsR0FBSVYsR0FBRCxJQUFTQSxHQUFHLENBQUNXLGVBQXhDOztBQUVBLE1BQU1DLGFBQWEsR0FBSUMsQ0FBRCxJQUFPO0FBQzNCQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ0YsQ0FBQyxDQUFDRyxhQUF4QztBQUNELENBRkQ7O0FBSUEsTUFBTUMsYUFBYSxHQUFJSixDQUFELElBQU87QUFFM0I7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDRyxhQUFGLENBQWdCRSxVQUFoQixDQUEyQkEsVUFBM0IsQ0FBc0NDLFdBQXRDLENBQWtETixDQUFDLENBQUNHLGFBQUYsQ0FBZ0JFLFVBQWxFLEVBSDJCLENBSTNCO0FBQ0E7QUFDQTs7QUFFQXBDLEVBQUFBLFVBQVUsQ0FBQ3NDLEtBQVgsR0FBbUJ0QyxVQUFVLENBQUNzQyxLQUFYLEdBQW1CLENBQXRDO0FBQ0FOLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaLEVBQThCakMsVUFBOUI7QUFFRCxDQVhEOztBQWFBLE1BQU11QyxhQUFhLEdBQUcsQ0FBQ3JCLEdBQUQsRUFBTXNCLFdBQU4sRUFBbUJDLFNBQW5CLEtBQWlDO0FBQ3JEO0FBQ0EsUUFBTUMsR0FBRyxHQUFHbEMsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQVo7QUFFQWlDLEVBQUFBLEdBQUcsQ0FBQ3JCLFNBQUosR0FBZ0IsU0FBaEI7QUFDQSxRQUFNRCxNQUFNLEdBQUdILGdCQUFnQixDQUFDQyxHQUFELEVBQU1zQixXQUFXLENBQUNyQixPQUFaLENBQW9CLENBQXBCLENBQU4sQ0FBL0I7O0FBQ0EsTUFBR1Msa0JBQWtCLENBQUNZLFdBQUQsQ0FBckIsRUFBbUM7QUFDakNiLElBQUFBLHNCQUFzQixDQUFDUCxNQUFELENBQXRCO0FBQ0Q7O0FBRURzQixFQUFBQSxHQUFHLENBQUMxQixNQUFKLENBQVdJLE1BQVg7QUFHQSxNQUFJdUIsS0FBSyxHQUFHLENBQVo7O0FBQ0FqQyxZQUFFa0MsT0FBRixDQUFVSCxTQUFWLEVBQXNCSSxPQUFELElBQWE7QUFDaEMsVUFBTXRDLEdBQUcsR0FBR0osUUFBUSxDQUFDZSxHQUFELEVBQU0yQixPQUFOLEVBQWUsSUFBZixDQUFwQjs7QUFDQSxRQUFHakIsa0JBQWtCLENBQUNZLFdBQUQsQ0FBckIsRUFBbUM7QUFDakNoQixNQUFBQSxnQkFBZ0IsQ0FBQ2pCLEdBQUQsQ0FBaEI7QUFDRDs7QUFDRG1DLElBQUFBLEdBQUcsQ0FBQzFCLE1BQUosQ0FBV1QsR0FBWDtBQUNBb0MsSUFBQUEsS0FBSyxJQUFJLENBQVQ7QUFDRCxHQVBEOztBQVFBekIsRUFBQUEsR0FBRyxDQUFDRixNQUFKLENBQVcwQixHQUFYO0FBRUEsUUFBTUksSUFBSSxHQUFHdEMsUUFBUSxDQUFDdUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQWI7O0FBQ0FyQyxZQUFFa0MsT0FBRixDQUFVRSxJQUFWLEVBQWlCRCxPQUFELElBQWE7QUFDM0JBLElBQUFBLE9BQU8sQ0FBQ0csZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0NsQixhQUFsQztBQUNELEdBRkQ7O0FBSUEsUUFBTW1CLGdCQUFnQixHQUFHekMsUUFBUSxDQUFDdUMsZ0JBQVQsQ0FBMEIsaUJBQTFCLENBQXpCOztBQUNBckMsWUFBRWtDLE9BQUYsQ0FBVUssZ0JBQVYsRUFBNkJDLE1BQUQsSUFBWTtBQUN0Q0EsSUFBQUEsTUFBTSxDQUFDRixnQkFBUCxDQUF3QixPQUF4QixFQUFpQ2IsYUFBakM7QUFDRCxHQUZEOztBQUlBLFNBQU9qQixHQUFQO0FBQ0QsQ0FuQ0Q7QUFvQ0E7Ozs7Ozs7OztBQU9BLE1BQU1pQyxNQUFNLEdBQUcsQ0FBQ2pDLEdBQUQsRUFBTXNCLFdBQU4sRUFBbUJDLFNBQW5CLEtBQWlDO0FBRTlDOzs7QUFHQXpDLEVBQUFBLFVBQVUsQ0FBQ29ELFNBQVgsR0FBdUJYLFNBQXZCLENBTDhDLENBS1o7O0FBRWxDLE1BQUdBLFNBQVMsQ0FBQ1ksUUFBYixFQUFzQjtBQUNwQnJELElBQUFBLFVBQVUsQ0FBQ0UsYUFBWCxHQUEyQnVDLFNBQVMsQ0FBQ1ksUUFBckM7QUFDRDs7QUFDRGQsRUFBQUEsYUFBYSxDQUFDckIsR0FBRCxFQUFNc0IsV0FBTixFQUFtQkMsU0FBbkIsQ0FBYjtBQUNBLFNBQU9GLGFBQWEsQ0FBQ3JCLEdBQUQsRUFBTXNCLFdBQU4sRUFBbUJDLFNBQW5CLENBQXBCO0FBQ0QsQ0FaRDtBQWFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXyB9IGZyb20gJ2xvZGFzaCc7XG5cblxuLy8gIGZpeG1lOiBhZGQgcGFnaW5hdGlvbiwgc2VhcmNoLCBjb3VudCByb3dzXG4vLyAgdG9kbyDQv9C+0YHQvNC+0YLRgNC4INGH0YLQviDQvNC+0LbQvdC+INGB0LTQtdC70LDRgtGMINGBINCy0LDQu9C40LTQsNGG0LjQtdC5INC90L7QvNC10YDQsCDRgtC10LvQtdGE0L7QvdCwINC90LDQv9GA0LjQvNC10YDQsFxuLy8gIC0g0YIu0LUuINC/0L7Qu9GD0YfQsNGC0Ywg0LjQvdGE0YMg0L/QviDQutC+0LTQuNGE0LjQutCw0YLQvtGA0YMg0L3QsNC/0YDQuNC80LXRgC5cblxuY29uc3Qgc3VtID0gKGEsIGIpID0+IGEgKyBiO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmxldCBzdGFja1N0b3JlID0ge1widmVyc2lvblwiOiBcIjEuMC4wXCJ9O1xuc3RhY2tTdG9yZS5jdXJyZW50UGFnZU51bWJlciA9IDE7XG5zdGFja1N0b3JlLnBhZ2VSb3dzTGltaXQgPSAxMDtcblxuY29uc3QgYnVpbGRSb3cgPSAocGFyZW50T2JqLCBvbmVSb3dPYmplY3RzLCB0YWcpID0+IHtcbiAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgXy5yZWR1Y2Uob25lUm93T2JqZWN0cywgKGFjYywgZWwpID0+IHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIC8vY29uc29sZS5sb2coZWwpO1xuICAgIGNlbGwudGV4dENvbnRlbnQgPSBlbDtcbiAgICBhY2MuYXBwZW5kKGNlbGwpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHJvdyk7XG4gIHBhcmVudE9iai5hcHBlbmQocm93KTtcbiAgcmV0dXJuIHJvdztcbn07XG5cbmNvbnN0IGJ1aWxkVGFibGVIZWFkZXIgPSAob2JqLCBoZWFkZXJzKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gYnVpbGRSb3cob2JqLCBoZWFkZXJzLCAndGgnKTtcbiAgICBoZWFkZXIuY2xhc3NOYW1lID0gJ2hlYWRlcic7XG4gICAgcmV0dXJuIGhlYWRlcjtcbn07XG5cbmNvbnN0IGlzT2RkID0gKG51bSkgPT4geyByZXR1cm4gbnVtICUgMjt9O1xuXG5jb25zdCBhZGRSZW1vdmVSb3dDZWxsID0gKG9iaikgPT4ge1xuICAgIGxldCBjb2xSZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIGNvbFJlbW92ZS5jbGFzc05hbWUgPSAncmVtb3ZlUm93QnRuJztcbiAgICBsZXQgYnV0dG9uUmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGJ1dHRvblJlbW92ZS5jbGFzc05hbWU9XCJmYSBmYS1yZW1vdmVcIjtcbiAgICBjb2xSZW1vdmUuYXBwZW5kKGJ1dHRvblJlbW92ZSk7XG4gICAgb2JqLmFwcGVuZChjb2xSZW1vdmUpO1xuICAgIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBhZGRSZW1vdmVSb3dIZWFkZXJDZWxsID0gKG9iaikgPT4ge1xuICBsZXQgY29sUmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcbiAgbGV0IGJ1dHRvblJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgYnV0dG9uUmVtb3ZlLmNsYXNzTmFtZT1cImZhIGZhLXJlbW92ZVwiO1xuICBjb2xSZW1vdmUuYXBwZW5kKGJ1dHRvblJlbW92ZSk7XG4gIG9iai5hcHBlbmQoY29sUmVtb3ZlKTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IGhhc1JlbW92ZVJvd0NvbHVtbiA9IChvYmopID0+IG9iai5jb2x1bW5EZWxldGVSb3c7XG5cbmNvbnN0IHNlbGVjdEhhbmRsZXIgPSAoZSkgPT4ge1xuICBjb25zb2xlLmxvZygnZXZlbnQuY3VycmVudFRhcmdldCA9PicsIGUuY3VycmVudFRhcmdldCk7XG59O1xuXG5jb25zdCByZW1vdmVIYW5kbGVyID0gKGUpID0+IHtcblxuICAvL2NvbnNvbGUubG9nKCc9PiAnLGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsICc9Pj4gJywgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcbiAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlLmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSk7XG4gIC8vIGZpeG1lOiBhZGQgc3RhY2sgZm9yIHN0b3JlIHJlbW92ZWQgbWFpbC1saXN0c1xuICAvLyBmaXhtZTogYWRkIHN0YWNrIGZvciBzdG9yZSBmaW5hbCBsaXN0IG9mIHJvd3MgKCBhbmQgY2hlY2sgaXQgYmVmb3Igc2VuZClcbiAgLy8gZml4bWU6IGFkZCB0aGlzIHR3byBzdGFzY2tzIHRvIGNvbmZpZ1RhYmxlIC0gZm9yIHN0b3JlIGRhdGFcblxuICBzdGFja1N0b3JlLmNvdW50ID0gc3RhY2tTdG9yZS5jb3VudCArIDE7XG4gIGNvbnNvbGUubG9nKCdzdGFja1N0b3JlID0+ICcsIHN0YWNrU3RvcmUpO1xuXG59O1xuXG5jb25zdCByZW5kZXJEdFRhYmxlID0gKG9iaiwgY29uZmlnVGFibGUsIHRhYmxlRGF0YSkgPT4ge1xuICAvL29iai5yZW1vdmVDaGlsZChvYmopO1xuICBjb25zdCB0YmwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuXG4gIHRibC5jbGFzc05hbWUgPSAnZHRUYWJsZSc7XG4gIGNvbnN0IGhlYWRlciA9IGJ1aWxkVGFibGVIZWFkZXIob2JqLCBjb25maWdUYWJsZS5oZWFkZXJzWzBdKTtcbiAgaWYoaGFzUmVtb3ZlUm93Q29sdW1uKGNvbmZpZ1RhYmxlKSl7XG4gICAgYWRkUmVtb3ZlUm93SGVhZGVyQ2VsbChoZWFkZXIpO1xuICB9XG5cbiAgdGJsLmFwcGVuZChoZWFkZXIpO1xuXG5cbiAgbGV0IGluZGV4ID0gMDtcbiAgXy5mb3JFYWNoKHRhYmxlRGF0YSwgKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCByb3cgPSBidWlsZFJvdyhvYmosIGVsZW1lbnQsICd0ZCcpO1xuICAgIGlmKGhhc1JlbW92ZVJvd0NvbHVtbihjb25maWdUYWJsZSkpe1xuICAgICAgYWRkUmVtb3ZlUm93Q2VsbChyb3cpO1xuICAgIH1cbiAgICB0YmwuYXBwZW5kKHJvdyk7XG4gICAgaW5kZXggKz0gMTtcbiAgfSk7XG4gIG9iai5hcHBlbmQodGJsKTtcblxuICBjb25zdCByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGUuZHRUYWJsZSB0cicpO1xuICBfLmZvckVhY2gocm93cywgKGVsZW1lbnQpID0+IHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0SGFuZGxlcik7XG4gIH0pO1xuXG4gIGNvbnN0IHJlbW92ZVJvd0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZC5yZW1vdmVSb3dCdG4nKTtcbiAgXy5mb3JFYWNoKHJlbW92ZVJvd0J1dHRvbnMsIChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVIYW5kbGVyKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG9iajtcbn07XG4vKipcbiAqIGFwcGxpY2F0aW9uXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY29uZmlnVGFibGVcbiAqIEBwYXJhbSB0ZXN0RGF0YVxuICogQHJldHVybnMgeyp9XG4gKi9cbmNvbnN0IHJ1bkFwcCA9IChvYmosIGNvbmZpZ1RhYmxlLCB0YWJsZURhdGEpID0+IHtcblxuICAvKipcbiAgICogISEhXG4gICAqL1xuICBzdGFja1N0b3JlLmlucHV0RGF0YSA9IHRhYmxlRGF0YTsgLy8gZml4bWUgLSBjbG9uZSBvciBjb3B5IG9iaiEhISEgIC0gdG9kb1xuXG4gIGlmKHRhYmxlRGF0YS5yb3dMaW1pdCl7XG4gICAgc3RhY2tTdG9yZS5wYWdlUm93c0xpbWl0ID0gdGFibGVEYXRhLnJvd0xpbWl0O1xuICB9XG4gIHJlbmRlckR0VGFibGUob2JqLCBjb25maWdUYWJsZSwgdGFibGVEYXRhKTtcbiAgcmV0dXJuIHJlbmRlckR0VGFibGUob2JqLCBjb25maWdUYWJsZSwgdGFibGVEYXRhKTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5leHBvcnQgeyBzdW0sIHJ1bkFwcCB9O1xuIl19