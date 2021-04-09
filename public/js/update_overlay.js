// get mobile browser
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
    updateOverlay();

    if (document.getElementById("headerGetStartedButton"))
    {
        document.getElementById("headerGetStartedButton").addEventListener("click", function() {
            window.location.href = '/open_beta';
        })
    }
});

function updateOverlay() {
    if(isMobile.any()) 
    {
        //hide backtest graph in mobile mode
        if (document.getElementById("chart"))
        {
            document.getElementById("chart").remove();
            document.getElementById("temp").remove();
        }

        //hide strategy info placeholder
        if (document.getElementById("strategyInfoDesktop"))
        {
            document.getElementById("strategyInfoDesktop").remove();
            document.getElementById("strategyInfoMobile").style.display = "block";
        }
    }
}