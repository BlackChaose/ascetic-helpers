(function($) {
  $.fn.printEl = function() {
    let self = this;
    this.map(function(el) {
      console.log(self[el].value);
    });
    return this;
  };

  $.fn.getSnap = function() {
    return this;
  };
}(jQuery));
