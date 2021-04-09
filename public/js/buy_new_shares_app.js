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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("payWithAccountBalanceModal").style.display = "none";
    document.getElementById("payWithAccountBalanceModal").style.textAlign = "center";
    document.getElementById("successModal").style.display = "none";
    document.getElementById("errorModal").style.display = "none";

    if (document.getElementById('payWithBalance'))
    {
        document.getElementById('payWithBalance')
            .addEventListener('click', function()
            {
                if (document.getElementById("shares").value != "")
                {
                    displayModal();
                }
            });
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
            window.location.href = '/positions';
        });
    }

    if (document.getElementById('errorButton'))
    {
        document.getElementById('errorButton')
            .addEventListener('click', hideErrorModal);
    }

    document.getElementById('confirmPayment').addEventListener('click', payWithAccountBalance);
    
    let marketPrice = document.getElementById("sianjitpua").value;

    document.getElementById("cost").innerText = parseFloat(marketPrice).toFixed(4) + " QOIN";
    document.getElementById("totalPrice").innerText = " " + parseFloat(marketPrice).toFixed(4) + " QOIN";

    document.getElementById("successModal").style.fontSize = "16px";
    document.getElementById("successTitle").style.marginTop = "20px !important";
    document.getElementById("successModal").style.fontWeight = "500";
    document.getElementById("successTitle").style.marginBottom = "0px !important";
    document.getElementById("errorModal").style.fontSize = "16px";
    document.getElementById("errorTitle").style.marginTop = "20px !important";
    document.getElementById("errorModal").style.fontWeight = "500";
    document.getElementById("errorTitle").style.marginBottom = "0px !important";
});

document.getElementById("shares").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
})

document.getElementById("shares").addEventListener("input", function() {
    let value = document.getElementById("shares").value;
    let marketPrice = document.getElementById("sianjitpua").value;

    if (value.length > 3)
    {
        value = value.slice(0, 4);

        if (value != "1000")
        {
            value = value.slice(0, 3);
        }
    }

    if (value.length == 0)
    {
        value = "";
    }

    let sharesBoughtValue = (value == "") ? 0 : parseInt(value);
    let total = (parseFloat(marketPrice) * sharesBoughtValue).toFixed(2);

    document.getElementById("shares").value = (value == "") ? value : sharesBoughtValue;    
    document.getElementById("sharesBought").innerText = sharesBoughtValue + " / 1000 tokens";  
    document.getElementById("totalPrice").innerText = " " + total + " QOIN";  
    document.getElementById("cost").innerText = " " + total + " QOIN";  
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
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#payWithAccountBalanceModal" ).show()
}

function payWithAccountBalance()
{
    let shares = parseInt(document.getElementById("shares").value);
    let strategyID = document.getElementById("sotong").value;
    let csrf = document.getElementById("atas").value;
    
    let temp = JSON.stringify({
        strategyID: strategyID,
        numberOfShares: shares,
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
    xhttpRep.open("POST", '/buy_new_shares_with_account_balance', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideModal();
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
                window.location.href = '/positions';
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