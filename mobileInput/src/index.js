import renderMobileInput from './mobileInputComponent';

/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  const config = {
    "domObject": document.getElementById('appInput'),
    "url": 'ajax_mobile_codes.php',
    "defaultMobile": document.getElementById('appInput').dataset.mobileVal,
    "defaultCountryCode": document.getElementById('appInput').dataset.mobileCode,
    "hiddenInputName":document.getElementById('appInput').dataset.nameInput,
    "borderStyle":document.getElementById('appInput').dataset.borderStyle,
  };
  renderMobileInput(config);
});
/* eslint-enable */
