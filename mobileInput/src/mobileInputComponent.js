import { _ } from 'lodash';

// todo add render dropdown
// todo for codes by counties with flags images (because select not work with flags);
// todo add input with configurable mask and
// todo validation function //html5 + html4 && IE 10/11 support;
// todo
const sendRequest = (url) => {
  /* eslint-disable */
  const xhttp = new XMLHttpRequest();
  /* eslint-enable */
  const req = new Promise(((resolve, reject) => {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) { // eslint-disable-line
        const result = xhttp.responseText;
        resolve(JSON.parse(result));
      } else if (this.readyState === 4 && this.status !== 200) {
        reject(new Error(`Error! ${this.readyState} ${this.status}`));
      }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('mobile_codes=get');
  }));
  return req;
};

const renderLabel = (obj) => {
  const labelInput = document.createElement('label'); // eslint-disable-line
  labelInput.for = obj.getElementsByTagName('input').id;
  labelInput.textContent = ' +';
  obj.append(labelInput);
  return obj;
};

const renderDropDownList = (obj) => {
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
  dropDownHeader.style.border = '1px solid black';
  dropDownHeader.style.borderRadius = '4px';
  dropDownHeader.style.cursor = 'pointer';
  dropDownHeader.style.width = '60px';

  obj.append(dropDownHeader);
  obj.append(dropDownList);

  dropDownHeader.addEventListener('click', () => {
    dropDownList.style.display = (dropDownList.style.display === 'block') ? 'none' : 'block';
    return dropDownList;
  });
  return obj;
};

const renderInput = (obj) => {
  // todo release this function! fixme!!!
  console.log('in renderInput function!');
  return obj;
};

const renderMobileInput = (config) => {
  console.log('!', config, 'version lodash: ', _.VERSION);
  sendRequest(config.url)
    .then((obj) => {
      console.log(obj);
      renderLabel(config.domObject);
      renderDropDownList(config.domObject);
      renderInput(config.domObject);
    })
    .catch((error) => console.log(error));
  return 0;
};

export default renderMobileInput;
