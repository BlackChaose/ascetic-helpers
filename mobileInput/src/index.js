import renderMobileInput from './mobileInputComponent';

/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  const config = {
    "domObject": document.getElementById('appInput'),
    "url": 'ajax_mobile_codes.php',
  };
  renderMobileInput(config);
});
/* eslint-enable */
