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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("payWithAccountBalanceModal").style.display = "none";
    document.getElementById("payWithAccountBalanceModal").style.textAlign = "center";
    document.getElementById("successModal").style.display = "none";
    document.getElementById("errorModal").style.display = "none";

    if (document.getElementById('payWithBalance'))
    {
        document.getElementById('payWithBalance')
            .addEventListener('click', displayModal);
    }

    if (document.getElementById('cancelPayment'))
    {
        document.getElementById('cancelPayment')
            .addEventListener('click', hideModal);
    }

    if (document.getElementById('successButton'))
    {
        document.getElementById('successButton')
        .addEventListener('click', function(){
            window.location.href = '/settings';
        });
    }

    if (document.getElementById('errorButton'))
    {
        document.getElementById('errorButton')
            .addEventListener('click', hideErrorModal);
    }

    if (document.getElementById('confirmPayment'))
    {
        document.getElementById('confirmPayment')
            .addEventListener('click', checkout);
    }

    document.getElementById("successModal").style.fontSize = "16px";
    document.getElementById("successTitle").style.marginTop = "20px !important";
    document.getElementById("successModal").style.fontWeight = "500";
    document.getElementById("successTitle").style.marginBottom = "0px !important";
    document.getElementById("errorModal").style.fontSize = "16px";
    document.getElementById("errorTitle").style.marginTop = "20px !important";
    document.getElementById("errorModal").style.fontWeight = "500";
    document.getElementById("errorTitle").style.marginBottom = "0px !important";

    let address = document.getElementById("address").value;
    let strategyID = document.getElementById("sotong").value;

    document.getElementById("strategyNameLink").addEventListener('click', function(){ window.location.href = '/strategy_info/' + encodeURIComponent(strategyID); });
    document.getElementById("strategyNameLink").addEventListener('mouseover', function(){ 
        document.getElementById("strategyNameLink").style.cursor = "pointer";
    });

    document.getElementById("developerLink").addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(address); });
    document.getElementById("developerLink").addEventListener('mouseover', function(){ 
        document.getElementById("developerLink").style.cursor = "pointer";
    });
});

function hideModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#payWithAccountBalanceModal" ).dialog('close');
}

function displayModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;

    document.getElementById('pageMask').style.display = "block";
    $( "#payWithAccountBalanceModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#payWithAccountBalanceModal" ).show()
}

function hideSuccessModal() 
{
    $( "#successModal" ).dialog('close');
}

function displaySuccessModal() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModal" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModal").dialog("close");
                window.location.href = '/settings';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModal" ).show()
}

function hideErrorModal() 
{
    $( "#errorModal" ).dialog('close');
}

function displayErrorModal(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModal" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModal").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModal" ).show()
}

function checkout()
{
    let csrf = document.getElementById("tualiapnee").value;
    let strategyID = document.getElementById("sotong").value;
    let price = document.getElementById("sianjitpua").value;

    let temp = JSON.stringify({
        strategyID: strategyID,
        price: price,
        csrf: csrf
      });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModal();
            return;
        }
        else
        {
            displayErrorModal(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/process_checkout', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideModal();
}