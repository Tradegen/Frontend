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

document.addEventListener("DOMContentLoaded", async function() {
    document.getElementById("editUsernameModal").style.display = "none";
    document.getElementById("editUsernameModal").style.textAlign = "center";

    document.getElementById("editSavedReferralCodeModal").style.display = "none";
    document.getElementById("editSavedReferralCodeModal").style.textAlign = "center";

    document.getElementById("depositCreditModal").style.display = "none";
    document.getElementById("depositCreditModal").style.textAlign = "center";

    document.getElementById("withdrawCreditModal").style.display = "none";
    document.getElementById("withdrawCreditModal").style.textAlign = "center";

    document.getElementById('editUsernameIcon').addEventListener('click', displayEditUsernameModal);
    document.getElementById('editSavedReferralCodeIcon').addEventListener('click', displayEditSavedReferralCodeModal);
    document.getElementById('depositButton').addEventListener('click', displayDepositCreditModal);
    document.getElementById('withdrawButton').addEventListener('click', displayWithdrawCreditModal);

    document.getElementById("successModalUsername").style.display = "none";
    document.getElementById("successModalUsername").style.textAlign = "center";
    document.getElementById("errorModalUsername").style.display = "none";
    document.getElementById("errorModalUsername").style.textAlign = "center";

    document.getElementById("successModalSavedReferralCode").style.display = "none";
    document.getElementById("successModalSavedReferralCode").style.textAlign = "center";
    document.getElementById("errorModalSavedReferralCode").style.display = "none";
    document.getElementById("errorModalSavedReferralCode").style.textAlign = "center";

    document.getElementById("successModalAddCredit").style.display = "none";
    document.getElementById("successModalAddCredit").style.textAlign = "center";
    document.getElementById("errorModalAddCredit").style.display = "none";
    document.getElementById("errorModalAddCredit").style.textAlign = "center";

    document.getElementById("successModalWithdrawCredit").style.display = "none";
    document.getElementById("successModalWithdrawCredit").style.textAlign = "center";
    document.getElementById("errorModalWithdrawCredit").style.display = "none";
    document.getElementById("errorModalWithdrawCredit").style.textAlign = "center";

    if (document.getElementById('successButtonUsername'))
    {
        document.getElementById('successButtonUsername').addEventListener('click', hideSuccessModalUsername);
        document.getElementById('successButtonUsername').addEventListener('mouseover', function() {
            document.getElementById('successButtonUsername').style.cursor = "pointer";
        });
    }

    if (document.getElementById('errorButtonUsername'))
    {
        document.getElementById('errorButtonUsername').addEventListener('click', hideErrorModalUsername);
    }

    if (document.getElementById('successButtonSavedReferralCode'))
    {
        document.getElementById('successButtonSavedReferralCode').addEventListener('click', hideSuccessModalSavedReferralCode);
    }

    if (document.getElementById('errorButtonSavedReferralCode'))
    {
        document.getElementById('errorButtonSavedReferralCode').addEventListener('click', hideErrorModalSavedReferralCode);
    }

    if (document.getElementById('successButtonAddCredit'))
    {
        document.getElementById('successButtonAddCredit').addEventListener('click', hideSuccessModalAddCredit);
    }

    if (document.getElementById('errorButtonAddCredit'))
    {
        document.getElementById('errorButtonAddCredit').addEventListener('click', hideErrorModalAddCredit);
    }

    if (document.getElementById('successButtonWithdrawCredit'))
    {
        document.getElementById('successButtonWithdrawCredit').addEventListener('click', hideSuccessModalWithdrawCredit);
    }

    if (document.getElementById('errorButtonWithdrawCredit'))
    {
        document.getElementById('errorButtonWithdrawCredit').addEventListener('click', hideErrorModalWithdrawCredit);
    }  


    document.getElementById("successModalUsername").style.fontSize = "16px";
    document.getElementById("successTitleUsername").style.marginTop = "20px !important";
    document.getElementById("successModalUsername").style.fontWeight = "500";
    document.getElementById("successTitleUsername").style.marginBottom = "0px !important";
    document.getElementById("errorModalUsername").style.fontSize = "16px";
    document.getElementById("errorTitleUsername").style.marginTop = "20px !important";
    document.getElementById("errorModalUsername").style.fontWeight = "500";
    document.getElementById("errorTitleUsername").style.marginBottom = "0px !important";

    document.getElementById("successModalSavedReferralCode").style.fontSize = "16px";
    document.getElementById("successTitleSavedReferralCode").style.marginTop = "20px !important";
    document.getElementById("successModalSavedReferralCode").style.fontWeight = "500";
    document.getElementById("successTitleSavedReferralCode").style.marginBottom = "0px !important";
    document.getElementById("errorModalSavedReferralCode").style.fontSize = "16px";
    document.getElementById("errorTitleSavedReferralCode").style.marginTop = "20px !important";
    document.getElementById("errorModalSavedReferralCode").style.fontWeight = "500";
    document.getElementById("errorTitleSavedReferralCode").style.marginBottom = "0px !important";

    document.getElementById("successModalAddCredit").style.fontSize = "16px";
    document.getElementById("successTitleAddCredit").style.marginTop = "20px !important";
    document.getElementById("successModalAddCredit").style.fontWeight = "500";
    document.getElementById("successTitleAddCredit").style.marginBottom = "0px !important";
    document.getElementById("errorModalAddCredit").style.fontSize = "16px";
    document.getElementById("errorTitleAddCredit").style.marginTop = "20px !important";
    document.getElementById("errorModalAddCredit").style.fontWeight = "500";
    document.getElementById("errorTitleAddCredit").style.marginBottom = "0px !important";

    document.getElementById("successModalWithdrawCredit").style.fontSize = "16px";
    document.getElementById("successTitleWithdrawCredit").style.marginTop = "20px !important";
    document.getElementById("successModalWithdrawCredit").style.fontWeight = "500";
    document.getElementById("successTitleWithdrawCredit").style.marginBottom = "0px !important";
    document.getElementById("errorModalWithdrawCredit").style.fontSize = "16px";
    document.getElementById("errorTitleWithdrawCredit").style.marginTop = "20px !important";
    document.getElementById("errorModalWithdrawCredit").style.fontWeight = "500";
    document.getElementById("errorTitleWithdrawCredit").style.marginBottom = "0px !important";

    document.getElementById("amount").innerText = "10.00 TGEN"; 
    document.getElementById("amountDeposit").innerText = "10.00 TGEN"; 

    buildTable();

    document.getElementById("loadingPage").remove();
    document.getElementById("mainContent").style.display = "block";
});

document.getElementById("credits").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
})

document.getElementById("withdrawalAmount").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
})

document.getElementById("credits").addEventListener("input", function() {
    let value = document.getElementById("credits").value;

    if (value.length > 4)
    {
        value = value.slice(0, 4);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let creditValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("credits").value = creditValue;  
    document.getElementById("amountDeposit").innerText = creditValue.toFixed(2) + " TGEN";   
});

document.getElementById("withdrawalAmount").addEventListener("input", function() {
    let value = document.getElementById("withdrawalAmount").value;

    if (value.length > 4)
    {
        value = value.slice(0, 4);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let creditValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("withdrawalAmount").value = creditValue; 
    document.getElementById("amount").innerText = creditValue.toFixed(2) + " TGEN";   
});

function hideEditUsernameModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#editUsernameModal" ).dialog('close');
}

function displayEditUsernameModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 380) : 380;
    document.getElementById('pageMask').style.display = "block";
    $( "#editUsernameModal" ).dialog({
        height: 240,
        width: width,
        closeOnEscape: true,
        dialogClass: "whiteBackground",
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#editUsernameModal" ).show();

    document.getElementById('confirmEditButtonUsername').addEventListener('click', editUsername);
    document.getElementById('cancelEditButtonUsername').addEventListener('click', hideEditUsernameModal);
}

function editUsername()
{
    let newUsername = document.getElementById('newUsername').value;
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        newUsername: newUsername,
        csrf: csrf
      });

    if (newUsername.length == 0)
    {
        return;
    }

    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            document.getElementById('newUsername').value = newUsername;
            document.getElementById('username').innerText = " " + newUsername;
            displaySuccessModalUsername();
            return;
        }
        else
        {
            displayErrorModalUsername(response.response);
        }
    };

    xhttpRep.open("POST", '/edit_username', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideEditUsernameModal();
}

function hideEditSavedReferralCodeModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#editSavedReferralCodeModal" ).dialog('close');
}

function displayEditSavedReferralCodeModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 420) : 420;
    document.getElementById('pageMask').style.display = "block";
    $( "#editSavedReferralCodeModal" ).dialog({
        height: 240,
        width: width,
        closeOnEscape: true,
        dialogClass: "whiteBackground",
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#editSavedReferralCodeModal" ).show();

    document.getElementById('confirmEditButtonSavedReferralCode').addEventListener('click', editSavedReferralCode);
    document.getElementById('cancelEditButtonSavedReferralCode').addEventListener('click', hideEditSavedReferralCodeModal);
}

function editSavedReferralCode()
{
    let newSavedReferralCode = document.getElementById('newSavedReferralCode').value;
    let csrf = document.getElementById("sotong").value;

    if (newSavedReferralCode.length != 12)
    {
        return;
    }

    let temp = JSON.stringify({
        newSavedReferralCode: newSavedReferralCode,
        csrf: csrf
      });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            document.getElementById('newSavedReferralCode').value = newSavedReferralCode;
            document.getElementById('savedReferralCode').innerText = " " + newSavedReferralCode;
            displaySuccessModalSavedReferralCode();
            return;
        }
        else
        {
            displayErrorModalSavedReferralCode(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/edit_saved_referral_code', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideEditSavedReferralCodeModal();
}

document.getElementById("newUsername").addEventListener("input", function() {
    let value = document.getElementById("newUsername").value;
    let character = value.charAt(value.length - 1);

    if (value.length > 30)
    {
        value = value.slice(0, 30);
    }
    else if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("newUsername").value = value;    
});

document.getElementById("newSavedReferralCode").addEventListener("input", function() {
    let value = document.getElementById("newSavedReferralCode").value;
    let character = value.charAt(value.length - 1);

    const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let found = false;
    for (var i = 0; i < 36; i+=1)
    {
        if (allowedCharacters.charAt(i) == character)
        {
            found = true;
            break;
        }
    }

    if (value.length > 12)
    {
        value = value.slice(0, 12);
    }
    else if (!found)
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("newSavedReferralCode").value = value;  
});

function hideSuccessModalUsername() 
{
    $( "#successModalUsername" ).dialog('close');
}

function displaySuccessModalUsername() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModalUsername" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalUsername").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalUsername" ).show()
}

function hideErrorModalUsername() 
{
    $( "#errorModalUsername" ).dialog('close');
}

function displayErrorModalUsername(message) 
{
    document.getElementById("errorTextUsername").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalUsername" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalUsername").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalUsername" ).show()
}

function hideSuccessModalSavedReferralCode() 
{
    $( "#successModalSavedReferralCode" ).dialog('close');
}

function displaySuccessModalSavedReferralCode() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 300;
    var Y = window.pageYOffset;
    $( "#successModalSavedReferralCode" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalSavedReferralCode").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalSavedReferralCode" ).show()
}

function hideErrorModalSavedReferralCode() 
{
    $( "#errorModalSavedReferralCode" ).dialog('close');
}

function displayErrorModalSavedReferralCode(message) 
{
    document.getElementById("errorTextSavedReferralCode").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModalSavedReferralCode" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalSavedReferralCode").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalSavedReferralCode" ).show()
}

function hideDepositCreditModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#depositCreditModal" ).dialog('close');
}

function displayDepositCreditModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;
    document.getElementById('pageMask').style.display = "block";
    $( "#depositCreditModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#depositCreditModal" ).show();

    document.getElementById('confirmDeposit').addEventListener('click', addCredits);
    document.getElementById('cancelDeposit').addEventListener('click', hideDepositCreditModal);
}

function addCredits()
{
    let amount = document.getElementById('credits').value;
    let csrf = document.getElementById("sotong").value;

    let temp = JSON.stringify({
        numberOfCredits: amount,
        csrf: csrf
      });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalAddCredit();
            return;
        }
        else
        {
            displayErrorModalAddCredit(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/add_credits', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideDepositCreditModal();
}

function hideSuccessModalAddCredit() 
{
    $( "#successModalAddCredit" ).dialog('close');
}

function displaySuccessModalAddCredit() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModalAddCredit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalAddCredit").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalAddCredit" ).show()
}

function hideErrorModalAddCredit() 
{
    $( "#errorModalAddCredit" ).dialog('close');
}

function displayErrorModalAddCredit(message) 
{
    document.getElementById("errorTextAddCredit").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalAddCredit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalAddCredit").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalAddCredit" ).show()
}

function hideWithdrawCreditModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#withdrawCreditModal" ).dialog('close');
}

function displayWithdrawCreditModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;
    document.getElementById('pageMask').style.display = "block";
    $( "#withdrawCreditModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#withdrawCreditModal" ).show();

    document.getElementById('confirmWithdrawal').addEventListener('click', withdrawCredit);
    document.getElementById('cancelWithdrawal').addEventListener('click', hideWithdrawCreditModal);
}

function withdrawCredit()
{
    let amount = document.getElementById('withdrawalAmount').value;
    let csrf = document.getElementById("sotong").value;

    let temp = JSON.stringify({
        amountToWithdraw: amount,
        csrf: csrf
      });

    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalWithdrawCredit();
            return;
        }
        else
        {
            displayErrorModalWithdrawCredit(response.response);
        }
    };

    xhttpRep.open("POST", '/withdraw_credits', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideWithdrawCreditModal();
}

function hideSuccessModalWithdrawCredit() 
{
    $( "#successModalWithdrawCredit" ).dialog('close');
}

function displaySuccessModalWithdrawCredit() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModalWithdrawCredit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalWithdrawCredit").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalWithdrawCredit" ).show()
}

function hideErrorModalWithdrawCredit() 
{
    $( "#errorModalWithdrawCredit" ).dialog('close');
}

function displayErrorModalWithdrawCredit(message) 
{
    document.getElementById("errorTextWithdrawCredit").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModalWithdrawCredit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalWithdrawCredit").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalWithdrawCredit" ).show()
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

function buildTable()
{
    let dataString = document.getElementById("dataString").value;
    let tradingBots = JSON.parse(dataString).tradingBots;

    const downColor = "#fe3957";
    const upColor = "#00cf92";

    if (tradingBots.length == 0)
    {
        document.getElementById("tradingBotsDiv").style.display = "none";
    }

    let table3 = document.getElementById("tradingBotsTable");
    table3.setAttribute("class", "transactionsTable");
    while (table3.hasChildNodes())
    {
        table3.removeChild(table3.firstChild);
    }
    let table_body3 = document.createElement("tbody");
    let table_head3 = document.createElement("thead");
    let header_row3 = document.createElement("tr");
    let header_title13 = document.createElement("th");
    header_title13.innerText = "Strategy Name";
    header_title13.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title13);
    let header_title232 = document.createElement("th");
    header_title232.innerText = "Total Return";
    header_title232.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title232);
    let header_title233 = document.createElement("th");
    header_title233.innerText = "Purchased For";
    header_title233.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title233);
    let header_title23 = document.createElement("th");
    header_title23.innerText = "Trades";
    header_title23.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title23);
    let header_title73 = document.createElement("th");
    let header_title2322 = document.createElement("th");
    header_title2322.innerText = "Today's Change";
    header_title2322.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title2322);
    header_title73.innerText = "Actions";
    header_title73.setAttribute("class", "marketsTableRowData");
    header_title73.style.textAlign = "center";
    header_row3.appendChild(header_title73);

    table_head3.appendChild(header_row3);
    table3.appendChild(table_head3);

    for(let i = 0; i < tradingBots.length; i++)
    {
        let row = document.createElement("tr");

        let strategyName = document.createElement("td");
        let strategyNameLink = document.createElement("a");
        strategyNameLink.innerText = tradingBots[i].strategyName;
        let strategyID = tradingBots[i].strategyID;
        strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
        strategyName.setAttribute("class", "marketsTableRowName");
        strategyName.appendChild(strategyNameLink);
        row.appendChild(strategyName);
        let totalReturn = document.createElement("td");
        let arrow2 = document.createElement("i");
        let text2 = document.createElement("a");
        arrow2.setAttribute("class", "material-icons");
        let percent2 = tradingBots[i].totalReturn;
        if (percent2 > 0)
        {
            totalReturn.style.color = upColor;
            arrow2.innerText = "arrow_drop_up";
            arrow2.style.color = upColor;
        }
        else if (percent2 == 0)
        {
            totalReturn.style.color = "#737373";
            arrow2.innerText = "arrow_right";
            arrow2.style.color = "#737373";
        }
        else
        {
            totalReturn.style.color = downColor;
            arrow2.innerText = "arrow_drop_down";
            arrow2.style.color = downColor;
            percent2 *= -1;
        }
        text2.innerText = percent2.toFixed(2) + "%";
        totalReturn.setAttribute("class", "marketsTableRowName");
        totalReturn.style.display = "flex";
        arrow2.style.paddingTop = "4px";
        text2.style.paddingTop = "7px";
        totalReturn.appendChild(arrow2);
        totalReturn.appendChild(text2);
        row.appendChild(totalReturn);
        let purchasedFor = document.createElement("td");
        purchasedFor.innerText = tradingBots[i].salePrice + " TGEN";
        purchasedFor.setAttribute("class", "marketsTableRowName");
        row.appendChild(purchasedFor);
        let numberOfTrades = document.createElement("td");
        numberOfTrades.innerText = tradingBots[i].numberOfTrades;
        numberOfTrades.setAttribute("class", "marketsTableRowName");
        row.appendChild(numberOfTrades);
        let todayChange = document.createElement("td");
        let arrow3 = document.createElement("i");
        let text3 = document.createElement("a");
        arrow3.setAttribute("class", "material-icons");
        let percent3 = tradingBots[i].todayChange * 100;
        if (percent3 > 0)
        {
            todayChange.style.color = upColor;
            arrow3.innerText = "arrow_drop_up";
            arrow3.style.color = upColor;
        }
        else if (percent3 == 0)
        {
            todayChange.style.color = "#737373";
            arrow3.innerText = "arrow_right";
            arrow3.style.color = "#737373";
        }
        else
        {
            todayChange.style.color = downColor;
            arrow3.innerText = "arrow_drop_down";
            arrow3.style.color = downColor;
            percent3 *= -1;
        }
        text3.innerText = percent3.toFixed(2) + "%";
        todayChange.setAttribute("class", "marketsTableRowName");
        todayChange.style.display = "flex";
        arrow3.style.paddingTop = "4px";
        text3.style.paddingTop = "7px";
        todayChange.appendChild(arrow3);
        todayChange.appendChild(text3);
        row.appendChild(todayChange);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableRowData");
        actions.style.textAlign = "center";
        let docsButton = document.createElement("button");
        docsButton.innerText = "Docs";
        docsButton.setAttribute("class", "viewButton");
        let historyButton = document.createElement("button");
        historyButton.innerText = "History";
        historyButton.setAttribute("class", "viewButton");
        historyButton.style.width = "70px";
        historyButton.addEventListener('click', function(){ window.location.href = '/history/' + strategyID; });
        let downloadButton = document.createElement("button");
        downloadButton.innerText = "Download";
        downloadButton.setAttribute("class", "runBacktestButton");
        downloadButton.style.fontWeight = "500";

        actions.appendChild(docsButton);
        actions.appendChild(historyButton);
        actions.appendChild(downloadButton);

        row.appendChild(actions);
        table_body3.appendChild(row);
    }

    table3.appendChild(table_body3);
}