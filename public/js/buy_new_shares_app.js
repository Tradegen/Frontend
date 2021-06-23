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
    document.getElementById("depositModal").style.display = "none";
    document.getElementById("depositModal").style.textAlign = "center";
    document.getElementById("successModalDeposit").style.display = "none";
    document.getElementById("errorModalDeposit").style.display = "none";

    document.getElementById("withdrawModal").style.display = "none";
    document.getElementById("withdrawModal").style.textAlign = "center";
    document.getElementById("successModalWithdraw").style.display = "none";
    document.getElementById("errorModalWithdraw").style.display = "none";

    document.getElementById("claimModal").style.display = "none";
    document.getElementById("claimModal").style.textAlign = "center";
    document.getElementById("successModalClaim").style.display = "none";
    document.getElementById("errorModalClaim").style.display = "none";

    document.getElementById("sellTokensModal").style.display = "none";
    document.getElementById("sellTokensModal").style.textAlign = "center";
    document.getElementById("successModalSellTokens").style.display = "none";
    document.getElementById("errorModalSellTokens").style.display = "none";

    if (document.getElementById('depositButton'))
    {
        document.getElementById('depositButton')
            .addEventListener('click', function()
            {
                if (document.getElementById("deposit").value != "")
                {
                    displayDepositModal();
                }
            });
        document.getElementById('depositButton')
            .addEventListener('mouseover', function()
            {
                document.getElementById('depositButton').style.cursor = "pointer";
            });
    }

    if (document.getElementById('withdrawButton'))
    {
        document.getElementById('withdrawButton')
            .addEventListener('click', function()
            {
                if (document.getElementById("withdraw").value != "")
                {
                    displayWithdrawModal();
                }
            });
        document.getElementById('withdrawButton')
        .addEventListener('mouseover', function()
        {
            document.getElementById('withdrawButton').style.cursor = "pointer";
        });
    }

    if (document.getElementById('claimButton'))
    {
        document.getElementById('claimButton')
            .addEventListener('click', function()
            {
                if (document.getElementById("availableYield").innerText != "0")
                {
                    displayClaimModal();
                }
            });
        document.getElementById('claimButton')
        .addEventListener('mouseover', function()
        {
            document.getElementById('claimButton').style.cursor = "pointer";
        });
    }

    if (document.getElementById('sellTokensButton'))
    {
        document.getElementById('sellTokensButton')
            .addEventListener('click', function()
            {
                if (document.getElementById("numberOfTokens").innerText != "0")
                {
                    displaySellTokensModal();
                }
            });
        document.getElementById('sellTokensButton')
        .addEventListener('mouseover', function()
        {
            document.getElementById('sellTokensButton').style.cursor = "pointer";
        });
    }

    if (document.getElementById('cancelDeposit'))
    {
        document.getElementById('cancelDeposit')
            .addEventListener('click', hideDepositModal);
    }

    if (document.getElementById('cancelWithdraw'))
    {
        document.getElementById('cancelWithdraw')
            .addEventListener('click', hideWithdrawModal);
    }

    if (document.getElementById('cancelClaim'))
    {
        document.getElementById('cancelClaim')
            .addEventListener('click', hideClaimModal);
    }

    if (document.getElementById('cancelSell'))
    {
        document.getElementById('cancelSell')
            .addEventListener('click', hideSellModal);
    }

    if (document.getElementById('successButtonDeposit'))
    {
        document.getElementById('successButtonDeposit')
        .addEventListener('click', function(){
            window.location.href = 'http://localhost:3000/positions';
        });
    }

    if (document.getElementById('successButtonWithdraw'))
    {
        document.getElementById('successButtonWithdraw')
        .addEventListener('click', function(){
            window.location.href = 'http://localhost:3000/positions';
        });
    }

    if (document.getElementById('successButtonClaim'))
    {
        document.getElementById('successButtonClaim')
        .addEventListener('click', function(){
            window.location.href = 'http://localhost:3000/profile';
        });
    }

    if (document.getElementById('successButtonSell'))
    {
        document.getElementById('successButtonSell')
        .addEventListener('click', function(){
            window.location.href = 'http://localhost:3000/settings';
        });
    }

    if (document.getElementById('errorButtonDeposit'))
    {
        document.getElementById('errorButtonDeposit')
            .addEventListener('click', hideErrorModalDeposit);
    }

    if (document.getElementById('errorButtonWithdraw'))
    {
        document.getElementById('errorButtonWithdraw')
            .addEventListener('click', hideErrorModalWithdraw);
    }

    if (document.getElementById('errorButtonClaim'))
    {
        document.getElementById('errorButtonClaim')
            .addEventListener('click', hideErrorModalClaim);
    }

    if (document.getElementById('errorButtonSell'))
    {
        document.getElementById('errorButtonSell')
            .addEventListener('click', hideErrorModalSell);
    }

    document.getElementById('confirmDeposit').addEventListener('click', deposit);
    document.getElementById('confirmWithdraw').addEventListener('click', withdraw);
    document.getElementById('confirmClaim').addEventListener('click', claim);
    document.getElementById('confirmSell').addEventListener('click', sellTokens);

    document.getElementById("successModalDeposit").style.fontSize = "16px";
    document.getElementById("successTitleDeposit").style.marginTop = "20px !important";
    document.getElementById("successModalDeposit").style.fontWeight = "500";
    document.getElementById("successTitleDeposit").style.marginBottom = "0px !important";
    document.getElementById("errorModalDeposit").style.fontSize = "16px";
    document.getElementById("errorTitleDeposit").style.marginTop = "20px !important";
    document.getElementById("errorModalDeposit").style.fontWeight = "500";
    document.getElementById("errorTitleDeposit").style.marginBottom = "0px !important";

    document.getElementById("successModalWithdraw").style.fontSize = "16px";
    document.getElementById("successTitleWithdraw").style.marginTop = "20px !important";
    document.getElementById("successModalWithdraw").style.fontWeight = "500";
    document.getElementById("successTitleWithdraw").style.marginBottom = "0px !important";
    document.getElementById("errorModalWithdraw").style.fontSize = "16px";
    document.getElementById("errorTitleWithdraw").style.marginTop = "20px !important";
    document.getElementById("errorModalWithdraw").style.fontWeight = "500";
    document.getElementById("errorTitleWithdraw").style.marginBottom = "0px !important";

    document.getElementById("successModalClaim").style.fontSize = "16px";
    document.getElementById("successTitleClaim").style.marginTop = "20px !important";
    document.getElementById("successModalClaim").style.fontWeight = "500";
    document.getElementById("successTitleClaim").style.marginBottom = "0px !important";
    document.getElementById("errorModalClaim").style.fontSize = "16px";
    document.getElementById("errorTitleClaim").style.marginTop = "20px !important";
    document.getElementById("errorModalClaim").style.fontWeight = "500";
    document.getElementById("errorTitleClaim").style.marginBottom = "0px !important";

    document.getElementById("successModalSellTokens").style.fontSize = "16px";
    document.getElementById("successTitleSellTokens").style.marginTop = "20px !important";
    document.getElementById("successModalSellTokens").style.fontWeight = "500";
    document.getElementById("successTitleSellTokens").style.marginBottom = "0px !important";
    document.getElementById("errorModalSellTokens").style.fontSize = "16px";
    document.getElementById("errorTitleSellTokens").style.marginTop = "20px !important";
    document.getElementById("errorModalSellTokens").style.fontWeight = "500";
    document.getElementById("errorTitleSellTokens").style.marginBottom = "0px !important";
});

document.getElementById("deposit").addEventListener("input", function() {
    let value = document.getElementById("deposit").value;

    if (value.length == 0)
    {
        value = "";
    }

    let depositValue = (value == "") ? 0 : parseFloat(value);
    let fee = (0.003 * depositValue).toFixed(2);
 
    document.getElementById("amountDeposit").innerText = " $" + depositValue;  
    document.getElementById("fee").innerText = "$" + fee; 
});

document.getElementById("withdraw").addEventListener("input", function() {
    let value = document.getElementById("withdraw").value;

    if (value.length == 0)
    {
        value = "";
    }

    let withdrawValue = (value == "") ? 0 : parseFloat(value);
 
    document.getElementById("amountWithdraw").innerText = " $" + withdrawValue;  
});

document.getElementById("numberOfTokens").addEventListener("input", function() {
    let value = document.getElementById("numberOfTokens").value;

    if (value.length == 0)
    {
        value = "";
    }

    let numberOfTokensValue = (value == "") ? 0 : parseFloat(value);
 
    document.getElementById("numberOfTokens").value = numberOfTokensValue;  
});

document.getElementById("listingPrice").addEventListener("input", function() {
    let value = document.getElementById("listingPrice").value;

    if (value.length == 0)
    {
        value = "";
    }

    let listingPriceValue = (value == "") ? 0 : parseFloat(value);
 
    document.getElementById("listingPrice").value = listingPriceValue;  
});

function hideDepositModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#depositModal" ).dialog('close');
}

function hideWithdrawModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#withdrawModal" ).dialog('close');
}

function hideClaimModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#claimModal" ).dialog('close');
}

function hideSellModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#sellTokensModal" ).dialog('close');
}

function displayDepositModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;

    document.getElementById('pageMask').style.display = "block";
    $( "#depositModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#depositModal" ).show()
}

function displayWithdrawModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;

    document.getElementById('pageMask').style.display = "block";
    $( "#withdrawModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#withdrawModal" ).show()
}

function displayClaimModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;

    document.getElementById('pageMask').style.display = "block";
    $( "#claimModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#claimModal" ).show()
}

function displaySellTokensModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;

    document.getElementById('pageMask').style.display = "block";
    $( "#sellTokensModal" ).dialog({
        height: 360,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#sellTokensModal" ).show()
}

function deposit()
{
    let amountToDeposit = parseFloat(document.getElementById("deposit").value);
    let strategyID = document.getElementById("sotong").value;
    let csrf = document.getElementById("atas").value;
    
    let temp = JSON.stringify({
        strategyID: strategyID,
        amountToDeposit: amountToDeposit,
        csrf: csrf
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalDeposit();
            return;
        }
        else
        {
            displayErrorModalDeposit(response.response);
            return;
        }
    };
    xhttpRep.open("POST", '/deposit', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideDepositModal();
}

function withdraw()
{
    let amountToWithdraw = parseFloat(document.getElementById("withdraw").value);
    let strategyID = document.getElementById("sotong").value;
    let csrf = document.getElementById("atas").value;
    
    let temp = JSON.stringify({
        strategyID: strategyID,
        amountToWithdraw: amountToWithdraw,
        csrf: csrf
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalWithdraw();
            return;
        }
        else
        {
            displayErrorModalWithdraw(response.response);
            return;
        }
    };
    xhttpRep.open("POST", '/withdraw', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideWithdrawModal();
}

function claim()
{
    let strategyID = document.getElementById("sotong").value;
    let csrf = document.getElementById("atas").value;
    
    let temp = JSON.stringify({
        strategyID: strategyID,
        csrf: csrf
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalClaim();
            return;
        }
        else
        {
            displayErrorModalClaim(response.response);
            return;
        }
    };
    xhttpRep.open("POST", '/claim', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideClaimModal();
}

function sellTokens()
{
    let strategyID = document.getElementById("sotong").value;
    let csrf = document.getElementById("atas").value;
    let numberOfTokens = parseFloat(document.getElementById("numberOfTokens").value);
    let price = parseFloat(document.getElementById("listingPrice").value);
    
    let temp = JSON.stringify({
        strategyID: strategyID,
        csrf: csrf,
        numberOfTokens: numberOfTokens,
        price: price
    });
    
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalSell();
            return;
        }
        else
        {
            displayErrorModalSell(response.response);
            return;
        }
    };
    xhttpRep.open("POST", '/sellTokens', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideSellModal();
}

function hideSuccessModalDeposit() 
{
    $( "#successModalDeposit" ).dialog('close');
}

function hideSuccessModalWithdraw() 
{
    $( "#successModalWithdraw" ).dialog('close');
}

function hideSuccessModalClaim() 
{
    $( "#successModalClaim" ).dialog('close');
}

function hideSuccessModalSell() 
{
    $( "#successModalSellTokens" ).dialog('close');
}

function displaySuccessModalDeposit() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 320;
    var Y = window.pageYOffset;
    $( "#successModalDeposit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalDeposit").dialog("close");
                window.location.href = 'http://localhost:3000/positions';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalDeposit" ).show()
}

function displaySuccessModalWithdraw() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 320;
    var Y = window.pageYOffset;
    $( "#successModalWithdraw" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalWithdraw").dialog("close");
                window.location.href = 'http://localhost:3000/positions';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalWithdraw" ).show()
}

function displaySuccessModalClaim() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 320;
    var Y = window.pageYOffset;
    $( "#successModalClaim" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalClaim").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalClaim" ).show()
}

function displaySuccessModalSell() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 320;
    var Y = window.pageYOffset;
    $( "#successModalSellTokens" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalSellTokens").dialog("close");
                window.location.href = 'http://localhost:3000/settings';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalSellTokens" ).show()
}

function hideErrorModalDeposit() 
{
    $( "#errorModalDeposit" ).dialog('close');
}

function hideErrorModalWithdraw() 
{
    $( "#errorModalWithdraw" ).dialog('close');
}

function hideErrorModalClaim() 
{
    $( "#errorModalClaim" ).dialog('close');
}

function hideErrorModalSell() 
{
    $( "#errorModalSellTokens" ).dialog('close');
}

function displayErrorModalDeposit(message) 
{
    document.getElementById("errorTextDeposit").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModalDeposit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalDeposit").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalDeposit" ).show()
}

function displayErrorModalWithdraw(message) 
{
    document.getElementById("errorTextWithdraw").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModalWithdraw" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalWithdraw").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalWithdraw" ).show()
}

function displayErrorModalClaim(message) 
{
    document.getElementById("errorTextClaim").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModalClaim" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalClaim").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalClaim" ).show()
}

function displayErrorModalSell(message) 
{
    document.getElementById("errorTextSellTokens").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModalSellTokens" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalSellTokens").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalSellTokens" ).show()
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