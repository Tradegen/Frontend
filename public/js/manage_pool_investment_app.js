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

    if (document.getElementById('successButtonDeposit'))
    {
        document.getElementById('successButtonDeposit')
        .addEventListener('click', function(){
            window.location.href = '/invested_pools';
        });
    }

    if (document.getElementById('successButtonWithdraw'))
    {
        document.getElementById('successButtonWithdraw')
        .addEventListener('click', function(){
            window.location.href = '/invested_pools';
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

    document.getElementById('confirmDeposit').addEventListener('click', deposit);
    document.getElementById('confirmWithdraw').addEventListener('click', withdraw);

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
});

document.getElementById("deposit").addEventListener("input", function() {
    let value = document.getElementById("deposit").value;

    if (value.length == 0)
    {
        value = "";
    }

    let depositValue = (value == "") ? 0 : parseFloat(value);
 
    document.getElementById("amountDeposit").innerText = " $" + depositValue.toFixed(2);  
});

document.getElementById("withdraw").addEventListener("input", function() {
    let value = document.getElementById("withdraw").value;
    let performanceFee = parseFloat(document.getElementById("liapnee").value);
    let currentROI = parseFloat(document.getElementById("sianjitpua").value);

    if (value.length == 0)
    {
        value = "";
    }

    let withdrawValue = (value == "") ? 0 : parseFloat(value);
    let fee = ((currentROI / 100) * performanceFee * withdrawValue / 100).toFixed(2);
 
    document.getElementById("amountWithdraw").innerText = " $" + withdrawValue.toFixed(2);  
    document.getElementById("fee").innerText = "$" + fee; 
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

function deposit()
{
    let amountToDeposit = parseFloat(document.getElementById("deposit").value);
    let poolID = document.getElementById("sotong").value;
    let csrf = document.getElementById("atas").value;
    
    let temp = JSON.stringify({
        poolID: poolID,
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
    xhttpRep.open("POST", '/depositIntoPool', true);
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
    xhttpRep.open("POST", '/withdrawFromPool', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideWithdrawModal();
}

function hideSuccessModalDeposit() 
{
    $( "#successModalDeposit" ).dialog('close');
}

function hideSuccessModalWithdraw() 
{
    $( "#successModalWithdraw" ).dialog('close');
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
                window.location.href = '/invested_pools';
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
                window.location.href = '/invested_pools';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalWithdraw" ).show()
}

function hideErrorModalDeposit() 
{
    $( "#errorModalDeposit" ).dialog('close');
}

function hideErrorModalWithdraw() 
{
    $( "#errorModalWithdraw" ).dialog('close');
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