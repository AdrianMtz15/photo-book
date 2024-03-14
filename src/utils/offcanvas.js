const showOffCanvas = () => {
  var myOffcanvas = document.getElementById("staticBackdrop");
  var bsOffcanvas = new window.bootstrap.Offcanvas(myOffcanvas);

  if (bsOffcanvas && bsOffcanvas !== null) bsOffcanvas.show();
};

const hideOffCancas = () => {
  var myOffcanvas = document.getElementById("staticBackdrop");
  var bsOffcanvas = new window.bootstrap.Offcanvas(myOffcanvas);

  if (bsOffcanvas && bsOffcanvas !== null) bsOffcanvas.hide();
};
