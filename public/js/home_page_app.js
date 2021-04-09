var IMAGES_WEB = ["/img/new_marketplace.JPG", "/img/new_strategies.JPG", "/img/new_full_profile.JPG", "/img/new_my_strategies.JPG"];
var IMAGES_MOBILE = ["/img/new_marketplace_phone.JPG", "/img/new_strategies_phone.JPG", "/img/new_profile_phone.JPG", "/img/new_my_strategies_phone.JPG"];
var INDEX;

var isMobile = { 
	Android: function() { 
        return navigator.userAgent.match(/Android/i);
    }, 
	BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    }, 
	iOS: function() {
        return navigator.userAgent.match(/iPhone|iPod/i);
    }, 
	Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    }, 
	Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    }, 
	any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

window.addEventListener('DOMContentLoaded', function() {

    if (isMobile.any())
    {
      document.getElementById("webSlideshow").remove();
    }
    
    document.getElementById("getStarted").addEventListener("click", function() {
        window.location.href = '/open_beta';
    })

    document.getElementById("getStarted2").addEventListener("click", function() {
        window.location.href = '/open_beta';
    })

    document.getElementById("learnMore").addEventListener("click", function() {
      window.location.href = '/about';
    })

    INDEX = 0;

    document.getElementById("1").addEventListener("click", function() {
      INDEX = 0;

      if (isMobile.any())
      {
        document.getElementById("marketplaceImageMobile").src = IMAGES_MOBILE[0];
      }
      else
      {
        document.getElementById("marketplaceImageWeb").src = IMAGES_WEB[0];
      }

      document.getElementById("1").style.color = "#3e85f7";
      document.getElementById("4").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("2").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("3").style.color = "rgba(161, 194, 250, 0.16)";
    });

    document.getElementById("2").addEventListener("click", function() {
      INDEX = 1;

      if (isMobile.any())
      {
        document.getElementById("marketplaceImageMobile").src = IMAGES_MOBILE[1];
      }
      else
      {
        document.getElementById("marketplaceImageWeb").src = IMAGES_WEB[1];
      }

      document.getElementById("2").style.color = "#3e85f7";
      document.getElementById("1").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("4").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("3").style.color = "rgba(161, 194, 250, 0.16)";
    });

    document.getElementById("3").addEventListener("click", function() {
      INDEX = 2;

      if (isMobile.any())
      {
        document.getElementById("marketplaceImageMobile").src = IMAGES_MOBILE[2];
      }
      else
      {
        document.getElementById("marketplaceImageWeb").src = IMAGES_WEB[2];
      }

      document.getElementById("3").style.color = "#3e85f7";
      document.getElementById("1").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("2").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("4").style.color = "rgba(161, 194, 250, 0.16)";
    });

    document.getElementById("4").addEventListener("click", function() {
      INDEX = 3;

      if (isMobile.any())
      {
        document.getElementById("marketplaceImageMobile").src = IMAGES_MOBILE[3];
      }
      else
      {
        document.getElementById("marketplaceImageWeb").src = IMAGES_WEB[3];
      }

      document.getElementById("4").style.color = "#3e85f7";
      document.getElementById("1").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("2").style.color = "rgba(161, 194, 250, 0.16)";
      document.getElementById("3").style.color = "rgba(161, 194, 250, 0.16)";
    })

    slideshow();

    setInterval(slideshow, 2000);
});

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function slideshow()
{
  if (INDEX == 0)
  {
    document.getElementById("1").style.color = "#3e85f7";
    document.getElementById("2").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("3").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("4").style.color = "rgba(161, 194, 250, 0.16)";
  }
  else if (INDEX == 1)
  {
    document.getElementById("2").style.color = "#3e85f7";
    document.getElementById("1").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("3").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("4").style.color = "rgba(161, 194, 250, 0.16)";
  }
  else if (INDEX == 2)
  {
    document.getElementById("3").style.color = "#3e85f7";
    document.getElementById("1").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("2").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("4").style.color = "rgba(161, 194, 250, 0.16)";
  }
  else if (INDEX == 3)
  {
    document.getElementById("4").style.color = "#3e85f7";
    document.getElementById("1").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("2").style.color = "rgba(161, 194, 250, 0.16)";
    document.getElementById("3").style.color = "rgba(161, 194, 250, 0.16)";
  }

  if (!isMobile.any())
  {
    document.getElementById("marketplaceImageWeb").src = IMAGES_WEB[INDEX];
  }
  else
  {
    document.getElementById("marketplaceImageMobile").src = IMAGES_MOBILE[INDEX];
  }

  INDEX = (INDEX + 1) % 4;
}