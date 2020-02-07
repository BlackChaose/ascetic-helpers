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
  labelInput.className = 'label_for--dropdown_input';
  labelInput.for = obj.getElementsByTagName('input').id;
  labelInput.textContent = '+';
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

const mobileClear = (str) => str.match(/\d/g);

const renderDropDownList = (obj,  // eslint-disable-line
                            SortedFlags, // eslint-disable-line
                            inputMobileDefault, // eslint-disable-line
                            inputCountryCodeDefault, // eslint-disable-line
                            hiddenInputName, // eslint-disable-line
                            borderStyle) => { // eslint-disable-line
  const dropDownHeader = document.createElement('span'); // eslint-disable-line
  const dropDownInput = document.createElement('input'); // eslint-disable-line
  const dropDownList = document.createElement('div'); // eslint-disable-line
  const dropDownHiddenInput = document.createElement('input'); // eslint-disable-line
  const dropDownArrow = document.createElement('div'); // eslint-disable-line
  const spanWrapForMobileInput = document.createElement('span'); // eslint-disable-line

  spanWrapForMobileInput.className = 'mobile_input--mobile-wrapper';

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
  mobileInput.setAttribute('value', mobileFormat(inputMobileDefault));
  mobileInput.name = 'mobile_number';
  mobileInput.autocomplete = 'off';

  obj.appendChild(dropDownHeader);

  dropDownHeader.appendChild(dropDownArrow);

  spanWrapForMobileInput.appendChild(mobileInput);
  obj.appendChild(spanWrapForMobileInput);

  obj.appendChild(dropDownList);

  dropDownHiddenInput.value = mobileFormat(inputMobileDefault);

  obj.appendChild(dropDownHiddenInput);

  const HiddenInputHandler = function () {
    dropDownHiddenInput.value = dropDownInput.value + mobileInput.value;
    return dropDownHiddenInput.value;
  };

  const setSelectionIndex = (e, index) => {
    e.target.selectionStart = index;
    e.target.selectionEnd = e.target.selectionStart;
    return index;
  };

  const delSelection = (e, buffer) => {
    const currentCaret = e.target.selectionStart;
    const currentEnd = mobileInput.value.length;
    e.preventDefault();
    const indexes = {
      caret: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      digits: [0, 1, 2, null, 4, 5, 6, null, 8, 9, 10, 11, null],
      buffer: [0, 1, 2, null, 3, 4, 5, null, 6, 7, 8, 9, null],
      index: [0, 1, 2, 4, 4, 5, 6, 8, 8, 9, 10, 11, 12],
    };
    switch (e.key) {
      case 'Backspace': {
        if (currentCaret === 0 && e.target.selectionEnd === 0) { return; }
        if (e.target.selectionStart === e.target.selectionEnd) {
          if (indexes.buffer[e.target.selectionStart - 1] !== null) {
            buffer.splice(indexes.buffer[e.target.selectionStart - 1], 1);
          }
          mobileInput.value = '';
          mobileInput.value = mobileFormat(buffer);
          if (indexes.buffer[e.target.selectionStart] === null) {
            setSelectionIndex(e, currentCaret - 2);
          } else {
            setSelectionIndex(e, currentCaret - 1);
          }
          break;
        }
        const delPart = mobileInput.value;
        const delPartRes = delPart.substring(0, e.target.selectionStart) + delPart.substring(e.target.selectionEnd, delPart.length);// eslint-disable-line
        const delPartsCnt = mobileClear(delPart.substring(e.target.selectionStart, e.target.selectionEnd)).length;// eslint-disable-line
        buffer.splice(indexes.buffer[e.target.selectionStart], delPartsCnt);
        mobileInput.value = mobileFormat(mobileClear(delPartRes));
        break;
      }
      case 'Delete': {
        if (currentCaret === currentEnd && e.target.selectionStart === currentEnd) { return; }
        if (e.target.selectionStart === e.target.selectionEnd) {
          if (indexes.buffer[e.target.selectionStart] !== null) {
            buffer.splice(indexes.buffer[e.target.selectionStart], 1);
          }
          mobileInput.value = '';
          mobileInput.value = mobileFormat(buffer);
          if (indexes.buffer[e.target.selectionStart] === null) {
            setSelectionIndex(e, currentCaret + 1);
          } else {
            setSelectionIndex(e, currentCaret);
          }
          break;
        }
        const delPart = mobileInput.value;
        const delPartRes = delPart.substring(0, e.target.selectionStart) + delPart.substring(e.target.selectionEnd, delPart.length);// eslint-disable-line
        const delPartsCnt = mobileClear(delPart.substring(e.target.selectionStart, e.target.selectionEnd)).length;// eslint-disable-line
        buffer.splice(indexes.buffer[e.target.selectionStart], delPartsCnt);
        mobileInput.value = mobileFormat(mobileClear(delPartRes));
        break;
      }
      default:
        return buffer;// eslint-disable-line
    }
    return buffer;// eslint-disable-line
  };
  const insSymbol = (e, buffer) => {
    const currentCaret = e.target.selectionStart;
    const indexes = {
      caret: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      buf: [0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9],
      index: [0, 1, 2, 4, 4, 5, 6, 8, 8, 9, 10, 11],
    };
    const curPos = indexes.buf[currentCaret];
    if (curPos < buffer.length) {
      const part1 = buffer.slice(0, curPos);
      const part2 = buffer.slice(curPos, buffer.length);
      part1.push(e.key);
      const res = part1.concat(part2);
      buffer.splice(0, buffer.length);
      res.map((el) => {
        buffer.push(el);
        return el;
      });
    } else {
      buffer.push(e.key);
    }
    return indexes.index[currentCaret] + 1;
  };

  const keybuf = inputMobileDefault.split('');

  // по умолчанию в буфер + обработка нажатий стрелок
  mobileInput.addEventListener('keydown', (e) => {
    // ArrowRight ArrowLeft ArrowUp ArrowDown Delete
    if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(e.key)) {
      return;
    }
    if (isNaN(parseInt(e.key, 10)) && e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Delete' // eslint-disable-line
      && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') { // eslint-disable-line
      e.preventDefault();
      return;
    }
    if (keybuf.length >= 10 && e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Delete' // eslint-disable-line
      && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Backspace') {
      delSelection(e, keybuf);
      return;
    }
    if (e.key === 'Delete') {
      delSelection(e, keybuf);
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (e.target.selectionStart > 0) {
        e.target.selectionStart -= 1;
        e.target.selectionEnd -= 1;
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (e.target.selectionStart >= 0 && e.target.selectionEnd <= 12) {
        e.target.selectionStart += 1;
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    // fixme (add shift + key? use e.shiftKey https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey

    e.preventDefault();
    const cursorPosition = insSymbol(e, keybuf);

    mobileInput.value = mobileFormat(keybuf);
    mobileInput.setSelectionRange(cursorPosition, cursorPosition);
    HiddenInputHandler();
  });
  // mobileInput.addEventListener('keyup', (e) => {
  // });

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
    });

  return 0;
};

export default renderMobileInput;
