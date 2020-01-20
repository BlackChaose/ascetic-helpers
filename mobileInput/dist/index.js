"use strict";

require("@babel/polyfill");

var _mobileInputComponent = _interopRequireDefault(require("./mobileInputComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
document.addEventListener('DOMContentLoaded', function () {
  var config = {
    "domObject": document.getElementById('appInput'),
    "url": 'ajax_mobile_codes.php',
    "defaultMobile": document.getElementById('appInput').dataset.mobileVal,
    "defaultCountryCode": document.getElementById('appInput').dataset.mobileCode,
    "hiddenInputName": document.getElementById('appInput').dataset.nameInput,
    "borderStyle": document.getElementById('appInput').dataset.borderStyle
  };
  (0, _mobileInputComponent.default)(config);
});
/* eslint-enable */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25maWciLCJnZXRFbGVtZW50QnlJZCIsImRhdGFzZXQiLCJtb2JpbGVWYWwiLCJtb2JpbGVDb2RlIiwibmFtZUlucHV0IiwiYm9yZGVyU3R5bGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7Ozs7QUFFQTtBQUNBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xELE1BQU1DLE1BQU0sR0FBRztBQUNiLGlCQUFhRixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsVUFBeEIsQ0FEQTtBQUViLFdBQU8sdUJBRk07QUFHYixxQkFBaUJILFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixVQUF4QixFQUFvQ0MsT0FBcEMsQ0FBNENDLFNBSGhEO0FBSWIsMEJBQXNCTCxRQUFRLENBQUNHLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NDLE9BQXBDLENBQTRDRSxVQUpyRDtBQUtiLHVCQUFrQk4sUUFBUSxDQUFDRyxjQUFULENBQXdCLFVBQXhCLEVBQW9DQyxPQUFwQyxDQUE0Q0csU0FMakQ7QUFNYixtQkFBY1AsUUFBUSxDQUFDRyxjQUFULENBQXdCLFVBQXhCLEVBQW9DQyxPQUFwQyxDQUE0Q0k7QUFON0MsR0FBZjtBQVFBLHFDQUFrQk4sTUFBbEI7QUFDRCxDQVZEO0FBV0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG5pbXBvcnQgcmVuZGVyTW9iaWxlSW5wdXQgZnJvbSAnLi9tb2JpbGVJbnB1dENvbXBvbmVudCc7XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgXCJkb21PYmplY3RcIjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcElucHV0JyksXG4gICAgXCJ1cmxcIjogJ2FqYXhfbW9iaWxlX2NvZGVzLnBocCcsXG4gICAgXCJkZWZhdWx0TW9iaWxlXCI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBJbnB1dCcpLmRhdGFzZXQubW9iaWxlVmFsLFxuICAgIFwiZGVmYXVsdENvdW50cnlDb2RlXCI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBJbnB1dCcpLmRhdGFzZXQubW9iaWxlQ29kZSxcbiAgICBcImhpZGRlbklucHV0TmFtZVwiOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBJbnB1dCcpLmRhdGFzZXQubmFtZUlucHV0LFxuICAgIFwiYm9yZGVyU3R5bGVcIjpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwSW5wdXQnKS5kYXRhc2V0LmJvcmRlclN0eWxlLFxuICB9O1xuICByZW5kZXJNb2JpbGVJbnB1dChjb25maWcpO1xufSk7XG4vKiBlc2xpbnQtZW5hYmxlICovXG4iXX0=