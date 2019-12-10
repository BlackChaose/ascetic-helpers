import { _ } from 'lodash';
/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  const objApp = document.getElementById('appInput');
  const objLabel = document.createElement('label');
  const objSelectCode = document.createElement('select');
  const objInput = document.createElement('input');
  const flagPrefix = 'img/flags/';
  const codes = {};

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      codes.list = JSON.parse(xhttp.response);
      console.log(codes.list);
      _.forEach(codes.list.mobile_codes, (el) => {
        console.warn("!::: ", el);
        let option = document.createElement('option');

        console.warn(el.mobile_code);

        option.textContent = el.mobile_code;

        console.warn(el.name_cyr);

        option.title = el.name_cyr;

        option.style.backgroundImage = `url(${flagPrefix}${el.flag_picture_name})`;

        objSelectCode.append(option);
      });

      objSelectCode.className = 'select_mobile_code';
      objLabel.for = 'select_code';
      objLabel.textContent = ' + ';

      objInput.type = 'tel';
      objInput.placeholder= '000 000 00 00';
      objInput.pattern = "[0-9]{10}";
      objApp.append(objLabel);
      objApp.append(objSelectCode);
      objApp.append(objInput);
    }
  };
  xhttp.open('POST', 'ajax_mobile_codes.php', true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.send('mobile_codes=get');
  /* eslint-enable */
});
