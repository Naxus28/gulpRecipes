(function() {
  function firstFunction() {
    return "first";
  }
  console.log(firstFunction() + " function");

  function colorDiv(){
    document.querySelector('.one').style.background = 'green';
  }
  var clearEvent = window.setTimeout(colorDiv, 2000);
  window.clearinterval(clearEvent);
})();
