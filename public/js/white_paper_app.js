window.addEventListener('DOMContentLoaded', function() {
    updateOverlay();
    
    document.getElementById("white_paper").addEventListener("click", function() {
        window.location.href = 'https://storage.googleapis.com/stocks2-301304.appspot.com/Tradegen%20Whitepaper%20V1.3.pdf';
    });
    document.getElementById("token_info").addEventListener("click", function() {
      window.location.href = '/token';
  })
});

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (isMobile.any())
  {
    return;
  }
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}