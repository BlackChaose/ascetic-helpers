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

  const ul= document.createElement('ul'); // eslint-disable-line
  ul.className = 'mobile_input--dropdown-ul';

  const liBufs = [];
  _.forEach(Flags.mobile_codes, (el) => {
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
    .then((Flags) => {
      console.log(Flags);
      renderLabel(config.domObject);
      renderDropDownList(config.domObject, Flags);
      renderInput(config.domObject);
    })
    .catch((error) => console.log(error));
  return 0;
};

export default renderMobileInput;
