import { _ } from 'lodash';


//  fixme: add pagination, search, count rows
//  todo посмотри что можно сделать с валидацией номера телефона напримера
//  - т.е. получать инфу по кодификатору например.

const sum = (a, b) => a + b;
/* eslint-disable */
let stackStore = {"version": "1.0.0"};
stackStore.count = 0;

const buildRow = (parentObj, oneRowObjects, tag) => {
  const row = document.createElement('tr');
  _.reduce(oneRowObjects, (acc, el) => {
    const cell = document.createElement(tag);
    //console.log(el);
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

const isOdd = (num) => { return num % 2;};

const addRemoveRowCell = (obj) => {
    let colRemove = document.createElement('td');
    colRemove.className = 'removeRowBtn';
    let buttonRemove = document.createElement('i');
    buttonRemove.className="fa fa-remove";
    colRemove.append(buttonRemove);
    obj.append(colRemove);
    return obj;
};

const addRemoveRowHeaderCell = (obj) => {
  let colRemove = document.createElement('th');
  let buttonRemove = document.createElement('i');
  buttonRemove.className="fa fa-remove";
  colRemove.append(buttonRemove);
  obj.append(colRemove);
  return obj;
};

const hasRemoveRowColumn = (obj) => obj.columnDeleteRow;

const selectHandler = (e) => {
  console.log('event.currentTarget =>', e.currentTarget);
};

const removeHandler = (e) => {

  //console.log('=> ',e.target.parentElement, '=>> ', e.target.parentNode.parentNode);
  e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
  // fixme: add stack for store removed mail-lists
  // fixme: add stack for store final list of rows ( and check it befor send)
  // fixme: add this two stascks to configTable - for store data

  stackStore.count = stackStore.count + 1;
  console.log('stackStore => ', stackStore);

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
  if(hasRemoveRowColumn(configTable)){
    addRemoveRowHeaderCell(header);
  }

  tbl.append(header);


  let index = 0;
  _.forEach(testData, (element) => {
    const row = buildRow(obj, element, 'td');
    //row.className = (isOdd(index)) ? 'odd' : 'even';
    if(hasRemoveRowColumn(configTable)){
      addRemoveRowCell(row);
    }
    tbl.append(row);
    index += 1;
  });
  obj.append(tbl);

  /**
   * !!!
   */
  stackStore.inputData = testData; // fixme - clone or copy obj!!!!  - todo

  const rows = document.querySelectorAll('table.dtTable tr');
  _.forEach(rows, (element) => {
    element.addEventListener('click', selectHandler);
  });

  const removeRowButtons = document.querySelectorAll('td.removeRowBtn');
  _.forEach(removeRowButtons, (button) => {
    button.addEventListener('click', removeHandler);
  });

  return obj;
};
/* eslint-enable */
export { sum, runApp };
