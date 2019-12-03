import { _ } from 'lodash';

//fixme: add pagination, search, count rows
//todo посмотри что можно сделать с валидацией номера телефона напримера - т.е. получать инфу по кодификатору например.

const sum = (a, b) => a + b;
/* eslint-disable */
const buildRow = (parentObj, oneRowObjects, tag) => {
  console.log(typeof(parentObj), parentObj);
  console.log(typeof(oneRowObjects), oneRowObjects, _.head(oneRowObjects));
  const row = document.createElement('tr');
  _.reduce(oneRowObjects, (acc, el) => {
    const cell = document.createElement(tag);
    console.log(el);
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

const isOdd = (num) => { return num % 2;}


const runApp = (obj, configTable, testData) => {

  const tbl = document.createElement('table');
  tbl.append(buildTableHeader(obj, configTable.headers[0]));

  let index = 0;
  _.forEach(testData, (element) => {
    const row = buildRow(obj, element, 'td');
    row.className = (isOdd(index)) ? 'odd' : 'even';
    tbl.append(row);
    index += 1;
  });

  obj.append(tbl);

  return obj;
};
/* eslint-enable */
export { sum, runApp };
