import '@babel/polyfill';
import renderMobileInput from './mobileInputComponent';

/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  if(window.location.pathname === '/experty/expert_change_dom.php') {
    const config = {
      "domObject": document.getElementById('appInput'),
      "url": 'ajax_mobile_codes.php',
      "defaultMobile": document.getElementById('appInput').dataset.mobileVal,
      "defaultCountryCode": document.getElementById('appInput').dataset.mobileCode,
      "hiddenInputName": document.getElementById('appInput').dataset.nameInput,
      "borderStyle": document.getElementById('appInput').dataset.borderStyle,
    };
    renderMobileInput(config);
  }
});
/* eslint-enable */
