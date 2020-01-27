import {
  forEach, sortBy, reduce,
} from 'lodash';

const sendRequest = (url) => {
  /* eslint-disable */
  const xhttp = new XMLHttpRequest();

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
  /* eslint-enable */
};

const renderLabel = (obj) => {
  const labelInput = document.createElement('label'); // eslint-disable-line
  labelInput.for = obj.getElementsByTagName('input').id;
  labelInput.textContent = ' +';
  obj.appendChild(labelInput);
  return obj;
};

const mobileFormat = (arr) => {
  const str = reduce(arr, (acc, item, key) => {
    let res = acc;
    if (key === 2 || key === 5) {
      res += item;
      res += '-';
      return res;
    }
    res += item;
    return res;
  }, '');
  return str;
};

const renderDropDownList = (obj,
  SortedFlags,
  inputMobileDefault,
  inputCountryCodeDefault,
  hiddenInputName,
  borderStyle) => {
  const dropDownHeader = document.createElement('span'); // eslint-disable-line
  const dropDownInput = document.createElement('input'); // eslint-disable-line
  const dropDownList = document.createElement('div'); // eslint-disable-line
  const dropDownHiddenInput = document.createElement('input'); // eslint-disable-line
  const dropDownArrow = document.createElement('div'); // eslint-disable-line

  dropDownList.className = 'mobile_input--dropdown-list';
  dropDownHeader.className = 'mobile_input--dropdown-header';
  if (borderStyle === 'red') {
    dropDownInput.className = 'mobile_input--dropdown-input-red';
  } else if (borderStyle === 'define') {
    dropDownInput.className = 'mobile_input--dropdown-input';
  }


  dropDownInput.name = 'country_code';
  dropDownInput.readOnly = true;
  dropDownInput.placeholder = 'код';
  dropDownInput.maxLength = 4;
  dropDownInput.value = inputCountryCodeDefault;

  dropDownHiddenInput.type = 'hidden';
  dropDownHiddenInput.name = hiddenInputName || 'mobileInput_Mobile';

  dropDownHeader.appendChild(dropDownInput);

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

    imgFlag.style.backgroundImage = `url(../img/flags/${el.flag_picture_name})`;
    // imgFlag.style.backgroundImage = `url(img/flags/${el.flag_picture_name})`;

    li.appendChild(imgFlag);
    li.appendChild(liText);

    li.title = el.name_cyr;
    li.addEventListener('click', () => {
      dropDownInput.value = liText.textContent;
      dropDownList.style.display = 'none';
    });
    ul.appendChild(li);
  });

  dropDownList.appendChild(ul);

  const mobileInput = document.createElement('input'); // eslint-disable-line
  if (borderStyle === 'red') {
    mobileInput.className = 'mobile_input--mobile-input-red';
  } else if (borderStyle === 'define') {
    mobileInput.className = 'mobile_input--mobile-input';
  }

  mobileInput.pattern = '\\d{3}(\\s|-)\\d{3}(\\s|-)\\d{4}';
  mobileInput.placeholder = 'XXX-XXX-XXXX';
  mobileInput.title = 'номер мобильного телефона';
  mobileInput.type = 'tel';
  mobileInput.required = true;
  mobileInput.value = mobileFormat(inputMobileDefault);
  mobileInput.name = 'mobile_number';
  mobileInput.autocomplete = 'off';

  obj.appendChild(dropDownHeader);

  dropDownHeader.appendChild(dropDownArrow);

  obj.appendChild(mobileInput);

  obj.appendChild(dropDownList);

  dropDownHiddenInput.value = mobileFormat(inputMobileDefault);

  obj.appendChild(dropDownHiddenInput);

  const HiddenInputHandler = function () {
    dropDownHiddenInput.value = dropDownInput.value + mobileInput.value;
    return dropDownHiddenInput.value;
  };

  const getSelectionIndex = (e) => {
    if (e.target.selectionStart === e.target.selectionEnd) {
      if (e.target.selectionStart >= 0 && e.target.selectionStart < 3) {
        return { index: e.target.selectionStart, count: 1 };
      }
      if (e.target.selectionStart > 3 && e.target.selectionStart < 7) {
        return { index: e.target.selectionStart - 1, count: 1 };
      }
      if (e.target.selectionStart > 7 && e.target.selectionStart <= 12) {
        return { index: e.target.selectionStart - 2, count: 1 };
      }
    }
    // fixme:
    let count = 0;

    if (e.target.selectionStart >= 0 && e.target.selectionStart < 3
      && e.target.selectionEnd > 0 && e.target.selectionEnd < 3) {
      // console.log('1 =>');
      count = e.target.selectionEnd - e.target.selectionStart;
      return { index: e.target.selectionStart, cnt: count };
    }
    if (e.target.selectionStart > 3 && e.target.selectionStart < 7
    && e.target.selectionEnd > 3 && e.target.selectionEnd < 7) {
      // console.log('2 =>');
      count = e.target.selectionEnd - e.target.selectionStart;
      return { index: e.target.selectionStart - 1, cnt: count };
    }
    if (e.target.selectionStart > 7 && e.target.selectionStart <= 12
    && e.target.selectionEnd > 8 && e.target.selectionEnd <= 12) {
      // console.log('3 =>');
      count = e.target.selectionEnd - e.target.selectionStart;
      return { index: e.target.selectionStart - 2, cnt: count };
    }

    if (e.target.selectionStart >= 0 && e.target.selectionStart < 3
      && e.target.selectionEnd > 3 && e.target.selectionEnd <= 7) {
      // console.log('4 =>');
      count = e.target.selectionEnd - e.target.selectionStart - 1;
      return { index: e.target.selectionStart, cnt: count };
    }
    if (e.target.selectionStart >= 0 && e.target.selectionStart <= 3
      && e.target.selectionEnd > 7 && e.target.selectionEnd <= 12) {
      // console.log('5 =>');
      count = e.target.selectionEnd - e.target.selectionStart - 2;
      return { index: e.target.selectionStart, cnt: count };
    }
    if (e.target.selectionStart > 3 && e.target.selectionStart <= 7
      && e.target.selectionEnd >= 3 && e.target.selectionEnd <= 12) {
      // console.log('6 =>');
      count = e.target.selectionEnd - e.target.selectionStart - 1;
      return { index: e.target.selectionStart - 1, cnt: count };
    }
    return { index: e.target.selectionStart, count };
  };

  const keybuf = inputMobileDefault.split('');
  console.warn('inputMobileDefault.split: ', keybuf);
  // по умолчанию в буфер + обработка нажатий стрелок
  mobileInput.addEventListener('change', (e) => { console.log(e.key); });
  mobileInput.addEventListener('keydown', (e) => {
    console.log(e.key);
    console.warn(keybuf.length);
    // ArrowRight ArrowLeft ArrowUp ArrowDown Delete
    if (isNaN(parseInt(e.key, 10)) && e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Delete' // eslint-disable-line
    && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') { // eslint-disable-line
      e.preventDefault();
      return;
    }
    if (keybuf.length >= 10 && e.key !== 'Backspace'&& e.key !== 'Enter' && e.key !== 'Delete' // eslint-disable-line
      && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') {
      e.preventDefault();
      return;
    }
    /* fixme BROKEN! repair edit in input! */
    if (e.key === 'Backspace') {
      e.preventDefault();
      // mobileInput.value = '';
      // console.log(keybuf[e.target.selectionStart]);
      // console.log(e.target.selectionStart);
      // console.log(e.target.selectionEnd);
      console.log(getSelectionIndex(e));
      const spldt = getSelectionIndex(e);
      /* fixme  items.splice(1, 1, 1010); */
      mobileInput.value = '';
      keybuf.splice(spldt.index, spldt.count);
      console.warn('keybuf: ', keybuf);
      mobileInput.value = mobileFormat(keybuf);
      HiddenInputHandler();
      return;
    }
    /* fixme: */
    if (e.key === 'Delete') {
      e.preventDefault();
      mobileInput.value = '';
      /* fixme: */
      keybuf.pop();
      mobileInput.value = mobileFormat(keybuf);
      HiddenInputHandler();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      // mobileInput.value = '';
      if (e.target.selectionStart > 0) {
        e.target.selectionStart -= 1;
        e.target.selectionEnd -= 1;
      }

      /* fixme: */
      // keybuf.pop();
      // mobileInput.value = mobileFormat(keybuf);
      // HiddenInputHandler();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      // mobileInput.value = '';
      if (e.target.selectionStart >= 0 && e.target.selectionEnd <= 12) {
        e.target.selectionStart += 1;
      }

      /* fixme: */
      // keybuf.pop();
      // mobileInput.value = mobileFormat(keybuf);
      // HiddenInputHandler();
      return;
    }

    e.preventDefault();
    mobileInput.value = '';
    keybuf.push(e.key);
    mobileInput.value = mobileFormat(keybuf);
    HiddenInputHandler();
  });
  mobileInput.addEventListener('keyup', (e) => {
    console.log('Caret at: ', e.target.selectionStart);
  });

  dropDownList.addEventListener('mouseleave', () => {
    dropDownList.style.display = 'none';
    HiddenInputHandler();
  });

  dropDownInput.addEventListener('click', () => {
    dropDownList.style.display = (dropDownList.style.display === 'block') ? 'none' : 'block';
    HiddenInputHandler();
  });

  dropDownArrow.className = 'mobile_input--dropdown-header-arrow';
  dropDownArrow.textContent = '▼';
  dropDownArrow.addEventListener('click', () => {
    dropDownList.style.display = (dropDownList.style.display === 'block') ? 'none' : 'block';
    HiddenInputHandler();
  });

  mobileInput.addEventListener('focusin', () => {
    dropDownList.style.display = 'none';
    HiddenInputHandler();
  });

  return obj;
};

const upUsedCountry = (codes, countries) => {
  const upList = codes.filter((el) => countries.includes(el.name_lat));
  const result = upList.concat(codes);
  return result;
};

const formatCodes = (arr) => {
  const sortArr = sortBy(arr.mobile_codes, [(o) => o.mobile_code]);
  return upUsedCountry(sortArr, ['Russia']);
};

const renderMobileInput = (config) => {
  sendRequest(config.url)
    .then((MobileCodes) => {
      const SortedMobileCodes = formatCodes(MobileCodes);
      renderLabel(config.domObject);
      renderDropDownList(
        config.domObject,
        SortedMobileCodes,
        config.defaultMobile,
        config.defaultCountryCode,
        config.hiddenInputName,
        config.borderStyle,
      );
    })
    .catch((error) => console.log(error));
  return 0;
};

export default renderMobileInput;
