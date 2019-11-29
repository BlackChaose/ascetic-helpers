const sum = (a, b) => a + b;

const runApp = (obj) => {
  /* eslint-disable */
  const tbl = document.createElement('table');
  const tblHead = document.createElement('th');
  const tblTr = document.createElement('tr');
  const tblTd = document.createElement('td');
  /* eslint-enable */
  tblHead.textContent = 'example';
  tblTd.textContent = 'content';
  tblTr.append(tblTd);
  tblHead.append(tblTr);
  tbl.append(tblHead);
  obj.append(tbl);
  return obj;
};

export { sum, runApp };
