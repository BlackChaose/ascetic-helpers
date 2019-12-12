import {
  forEach, sortBy, VERSION,
} from 'lodash';

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

const renderDropDownList = (obj, SortedFlags) => {
  const dropDownHeader = document.createElement('span'); // eslint-disable-line
  const dropDownInput = document.createElement('input'); // eslint-disable-line
  const dropDownList = document.createElement('div'); // eslint-disable-line

  dropDownList.className = 'mobile_input--dropdown-list';
  dropDownHeader.className = 'mobile_input--dropdown-header';
  dropDownInput.className = 'mobile_input--dropdown-input';

  dropDownInput.placeholder = 'код';
  dropDownInput.maxLength = 4;

  dropDownHeader.append(dropDownInput);

  const ul = document.createElement('ul'); // eslint-disable-line
  ul.className = 'mobile_input--dropdown-ul';

  forEach(SortedFlags, (el) => {
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
    li.addEventListener('click', () => {
      dropDownInput.value = liText.textContent;
      dropDownList.style.display = (dropDownList.style.display === 'block') ? 'none' : 'block';
    });
    ul.append(li);
  });

  dropDownList.append(ul);

  const mobileInput = document.createElement('input'); // eslint-disable-line
  mobileInput.className = 'mobile_input--mobile-input';

  obj.append(dropDownHeader);

  obj.append(mobileInput);

  obj.append(dropDownList);

  // dropDownHeader.addEventListener('click', () => {
  //   dropDownList.style.display = (dropDownList.style.display === 'block') ? 'none' : 'block';
  //   return dropDownList;
  // });

  // dropDownInput.addEventListener('input', (e) => {
  //   e.stopPropagation();
  //   console.log('!!! ', e.target);
  //   console.log('value: ', e.currentTarget.value);
  // });

  dropDownInput.addEventListener('focusin', () => {
    dropDownList.style.display = (dropDownList.style.display === 'block') ? 'none' : 'block';
  });

  dropDownInput.addEventListener('focusout', (e) => {
    console.log('focusout', e.target);
    // fixme: !!! - event!
    // dropDownList.style.display = (dropDownList.style.display === 'block') ? 'none' : 'block';
    /* eslint-disable */
    const searchElement = SortedFlags.filter((el) => {
      return el.mobile_code === dropDownInput.value;
    });
    /* eslint-enable */
    if (searchElement.count === 0) {
      console.error('error!');
    } else {
      console.log(searchElement);
    }
  });
  return obj;
};

const upUsedCountry = (codes, countries) => {
  console.log(codes);
  const upList = codes.filter((el) => countries.includes(el.name_lat));
  const result = upList.concat(codes);
  console.log(result);
  return result;
};

const formatCodes = (arr) => {
  const sortArr = sortBy(arr.mobile_codes, [(o) => o.name_cyr]);
  return upUsedCountry(sortArr, ['Russia', 'Belarus', 'Finland', 'Kazakhstan', 'Kyrgyzstan', 'Azerbaijan', 'Armenia', 'Moldova', 'Tajikistan', 'Uzbekistan']);
};

const renderMobileInput = (config) => {
  console.log('!', config, 'version lodash: ', VERSION);
  sendRequest(config.url)
    .then((MobileCodes) => {
      const SortedMobileCodes = formatCodes(MobileCodes);
      renderLabel(config.domObject);
      renderDropDownList(config.domObject, SortedMobileCodes);
    })
    .catch((error) => console.log(error));
  return 0;
};

export default renderMobileInput;
