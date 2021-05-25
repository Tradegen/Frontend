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
        window.location.href = 'https://www.tradegen.io/open_beta';
    })

    document.getElementById("getStarted2").addEventListener("click", function() {
        window.location.href = 'https://www.tradegen.io/open_beta';
    })

    document.getElementById("learnMore").addEventListener("click", function() {
      window.location.href = 'https://www.tradegen.io/about';
    })

    document.getElementById("viewStrategies").addEventListener("click", function() {
      window.location.href = 'https://www.tradegen.io/strategies';
    })

    INDEX = 0;

    for (var i = 2; i < 7; i+=1)
    {
        let ID = "faq" + i.toString();
        let index = i.toString();
        document.getElementById(ID).addEventListener("click", function() {
            handleClick(index);
        })
    }
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

function handleClick(index)
{
    let faq = document.getElementById("faq" + index);
    let icon = document.getElementById("icon" + index);
    let text = document.getElementById("text" + index);

    if (text.style.display != "block")
    {
        text.style.display = "block";
        icon.innerText = "expand_less";
        icon.style.color = "#3a78f2";
        faq.style.borderColor = "#007cff";
    }
    else
    {
        text.style.display = "none";
        icon.innerText = "expand_more";
        icon.style.color = "hsla(0, 0%, 53%, 0.40)";
        faq.style.borderColor = "#e2e0eb";
    }
}