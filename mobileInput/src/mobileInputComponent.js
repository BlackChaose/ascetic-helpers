import { _ } from 'lodash';

// todo add render dropdown for codes by counties with flags images (because select not work with flags);
// todo add input with configurable mask and validation function //html5 + html4 && IE 10/11 support;
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

const renderMobileInput = (config) => {
  console.log('!', config, 'version lodash: ', _.VERSION);
  sendRequest(config.url)
    .then((obj) => { console.log(obj); renderLabel(config.domObject); })
    .catch((error) => console.log(error));
  return 0;
};

export default renderMobileInput;
