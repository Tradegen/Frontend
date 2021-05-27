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

    document.getElementById("editListingModal").style.display = "none";
    document.getElementById("editListingModal").style.textAlign = "center";

    document.getElementById("cancelListingModal").style.display = "none";
    document.getElementById("cancelListingModal").style.textAlign = "center";

    document.getElementById("stakeModal").style.display = "none";
    document.getElementById("stakeModal").style.textAlign = "center";

    document.getElementById("unstakeModal").style.display = "none";
    document.getElementById("unstakeModal").style.textAlign = "center";

    document.getElementById("depositModal").style.display = "none";
    document.getElementById("depositModal").style.textAlign = "center";

    document.getElementById("sellStrategyModal").style.display = "none";
    document.getElementById("sellStrategyModal").style.textAlign = "center";

    document.getElementById("deleteStrategyModal").style.display = "none";
    document.getElementById("deleteStrategyModal").style.textAlign = "center";

    document.getElementById("runBacktestModal").style.display = "none";
    document.getElementById("runBacktestModal").style.textAlign = "center";

    document.getElementById("successModalSell").style.display = "none";
    document.getElementById("errorModalSell").style.display = "none";

    document.getElementById("successModalDelete").style.display = "none";
    document.getElementById("errorModalDelete").style.display = "none";

    document.getElementById("successModalRunBacktest").style.display = "none";
    document.getElementById("errorModalRunBacktest").style.display = "none";

    document.getElementById('editUsernameIcon').addEventListener('click', displayEditUsernameModal);
    document.getElementById('stakeButton').addEventListener('click', displayStakeModal);
    document.getElementById('unstakeButton').addEventListener('click', displayUnstakeModal);
    document.getElementById('depositButton').addEventListener('click', displayDepositModal);

    document.getElementById("successModalUsername").style.display = "none";
    document.getElementById("successModalUsername").style.textAlign = "center";
    document.getElementById("errorModalUsername").style.display = "none";
    document.getElementById("errorModalUsername").style.textAlign = "center";

    document.getElementById("successModalEditListing").style.display = "none";
    document.getElementById("successModalEditListing").style.textAlign = "center";
    document.getElementById("errorModalEditListing").style.display = "none";
    document.getElementById("errorModalEditListing").style.textAlign = "center";

    document.getElementById("successModalCancelListing").style.display = "none";
    document.getElementById("successModalCancelListing").style.textAlign = "center";
    document.getElementById("errorModalCancelListing").style.display = "none";
    document.getElementById("errorModalCancelListing").style.textAlign = "center";

    document.getElementById("successModalStake").style.display = "none";
    document.getElementById("successModalStake").style.textAlign = "center";
    document.getElementById("errorModalStake").style.display = "none";
    document.getElementById("errorModalStake").style.textAlign = "center";

    document.getElementById("successModalUnstake").style.display = "none";
    document.getElementById("successModalUnstake").style.textAlign = "center";
    document.getElementById("errorModalUnstake").style.display = "none";
    document.getElementById("errorModalUnstake").style.textAlign = "center";

    document.getElementById("successModalDeposit").style.display = "none";
    document.getElementById("successModalDeposit").style.textAlign = "center";
    document.getElementById("errorModalDeposit").style.display = "none";
    document.getElementById("errorModalDeposit").style.textAlign = "center";

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

    if (document.getElementById('successButtonEditListing'))
    {
        document.getElementById('successButtonEditListing').addEventListener('click', hideSuccessModalEditListing);
    }

    if (document.getElementById('errorButtonEditListing'))
    {
        document.getElementById('errorButtonEditListing').addEventListener('click', hideErrorModalEditListing);
    }

    if (document.getElementById('successButtonCancelListing'))
    {
        document.getElementById('successButtonCancelListing').addEventListener('click', hideSuccessModalCancelListing);
    }

    if (document.getElementById('errorButtonCancelListing'))
    {
        document.getElementById('errorButtonCancelListing').addEventListener('click', hideErrorModalCancelListing);
    }

    if (document.getElementById('successButtonStake'))
    {
        document.getElementById('successButtonStake').addEventListener('click', hideSuccessModalStake);
    }

    if (document.getElementById('errorButtonStake'))
    {
        document.getElementById('errorButtonStake').addEventListener('click', hideErrorModalStake);
    }

    if (document.getElementById('successButtonUnstake'))
    {
        document.getElementById('successButtonUnstake').addEventListener('click', hideSuccessModalUnstake);
    }

    if (document.getElementById('errorButtonUnstake'))
    {
        document.getElementById('errorButtonUnstake').addEventListener('click', hideErrorModalUnstake);
    }  

    if (document.getElementById('successButtonDeposit'))
    {
        document.getElementById('successButtonDeposit').addEventListener('click', hideSuccessModalDeposit);
    }

    if (document.getElementById('errorButtonDeposit'))
    {
        document.getElementById('errorButtonDeposit').addEventListener('click', hideErrorModalDeposit);
    } 

    if (document.getElementById('successButtonSell'))
    {
        document.getElementById('successButtonSell')
            .addEventListener('click', function(){
                window.location.href = 'https://www.tradegen.io/profile';
            });
    }

    if (document.getElementById('errorButtonSell'))
    {
        document.getElementById('errorButtonSell')
            .addEventListener('click', hideErrorModalSell);
    }

    if (document.getElementById('successButtonDelete'))
    {
        document.getElementById('successButtonDelete')
            .addEventListener('click', function(){
                window.location.href = 'https://www.tradegen.io/profile';
            });
    }

    if (document.getElementById('errorButtonDelete'))
    {
        document.getElementById('errorButtonDelete')
            .addEventListener('click', hideErrorModalDelete);
    }

    if (document.getElementById('successButtonRunBacktest'))
    {
        document.getElementById('successButtonRunBacktest')
            .addEventListener('click', function(){
                window.location.href = 'https://www.tradegen.io/profile';
            });
    }

    if (document.getElementById('errorButtonRunBacktest'))
    {
        document.getElementById('errorButtonRunBacktest')
            .addEventListener('click', hideErrorModalRunBacktest);
    }

    if (document.getElementById('successButtonEditStrategy'))
    {
        document.getElementById('successButtonEditStrategy')
            .addEventListener('click', function(){
                window.location.href = 'https://www.tradegen.io/profile';
            });
    }

    if (document.getElementById('errorButtonEditStrategy'))
    {
        document.getElementById('errorButtonEditStrategy')
            .addEventListener('click', hideErrorModalEditStrategy);
    }

    document.getElementById("successModalUsername").style.fontSize = "16px";
    document.getElementById("successTitleUsername").style.marginTop = "20px !important";
    document.getElementById("successModalUsername").style.fontWeight = "500";
    document.getElementById("successTitleUsername").style.marginBottom = "0px !important";
    document.getElementById("errorModalUsername").style.fontSize = "16px";
    document.getElementById("errorTitleUsername").style.marginTop = "20px !important";
    document.getElementById("errorModalUsername").style.fontWeight = "500";
    document.getElementById("errorTitleUsername").style.marginBottom = "0px !important";

    document.getElementById("successModalEditListing").style.fontSize = "16px";
    document.getElementById("successTitleEditListing").style.marginTop = "20px !important";
    document.getElementById("successModalEditListing").style.fontWeight = "500";
    document.getElementById("successTitleEditListing").style.marginBottom = "0px !important";
    document.getElementById("errorModalEditListing").style.fontSize = "16px";
    document.getElementById("errorTitleEditListing").style.marginTop = "20px !important";
    document.getElementById("errorModalEditListing").style.fontWeight = "500";
    document.getElementById("errorTitleEditListing").style.marginBottom = "0px !important";

    document.getElementById("successModalCancelListing").style.fontSize = "16px";
    document.getElementById("successTitleCancelListing").style.marginTop = "20px !important";
    document.getElementById("successModalCancelListing").style.fontWeight = "500";
    document.getElementById("successTitleCancelListing").style.marginBottom = "0px !important";
    document.getElementById("errorModalCancelListing").style.fontSize = "16px";
    document.getElementById("errorTitleCancelListing").style.marginTop = "20px !important";
    document.getElementById("errorModalCancelListing").style.fontWeight = "500";
    document.getElementById("errorTitleCancelListing").style.marginBottom = "0px !important";

    document.getElementById("successModalStake").style.fontSize = "16px";
    document.getElementById("successTitleStake").style.marginTop = "20px !important";
    document.getElementById("successModalStake").style.fontWeight = "500";
    document.getElementById("successTitleStake").style.marginBottom = "0px !important";
    document.getElementById("errorModalStake").style.fontSize = "16px";
    document.getElementById("errorTitleStake").style.marginTop = "20px !important";
    document.getElementById("errorModalStake").style.fontWeight = "500";
    document.getElementById("errorTitleStake").style.marginBottom = "0px !important";

    document.getElementById("successModalUnstake").style.fontSize = "16px";
    document.getElementById("successTitleUnstake").style.marginTop = "20px !important";
    document.getElementById("successModalUnstake").style.fontWeight = "500";
    document.getElementById("successTitleUnstake").style.marginBottom = "0px !important";
    document.getElementById("errorModalUnstake").style.fontSize = "16px";
    document.getElementById("errorTitleUnstake").style.marginTop = "20px !important";
    document.getElementById("errorModalUnstake").style.fontWeight = "500";
    document.getElementById("errorTitleUnstake").style.marginBottom = "0px !important";

    document.getElementById("successModalDeposit").style.fontSize = "16px";
    document.getElementById("successTitleDeposit").style.marginTop = "20px !important";
    document.getElementById("successModalDeposit").style.fontWeight = "500";
    document.getElementById("successTitleDeposit").style.marginBottom = "0px !important";
    document.getElementById("errorModalDeposit").style.fontSize = "16px";
    document.getElementById("errorTitleDeposit").style.marginTop = "20px !important";
    document.getElementById("errorModalDeposit").style.fontWeight = "500";
    document.getElementById("errorTitleDeposit").style.marginBottom = "0px !important";

    document.getElementById("successModalSell").style.fontSize = "16px";
    document.getElementById("successTitleSell").style.marginTop = "20px !important";
    document.getElementById("successModalSell").style.fontWeight = "500";
    document.getElementById("successTitleSell").style.marginBottom = "0px !important";
    document.getElementById("errorModalSell").style.fontSize = "16px";
    document.getElementById("errorTitleSell").style.marginTop = "20px !important";
    document.getElementById("errorModalSell").style.fontWeight = "500";
    document.getElementById("errorTitleSell").style.marginBottom = "0px !important";

    document.getElementById("successModalDelete").style.fontSize = "16px";
    document.getElementById("successTitleDelete").style.marginTop = "20px !important";
    document.getElementById("successModalDelete").style.fontWeight = "500";
    document.getElementById("successTitleDelete").style.marginBottom = "0px !important";
    document.getElementById("errorModalDelete").style.fontSize = "16px";
    document.getElementById("errorTitleDelete").style.marginTop = "20px !important";
    document.getElementById("errorModalDelete").style.fontWeight = "500";
    document.getElementById("errorTitleDelete").style.marginBottom = "0px !important";

    document.getElementById("successModalRunBacktest").style.fontSize = "16px";
    document.getElementById("successTitleRunBacktest").style.marginTop = "20px !important";
    document.getElementById("successModalRunBacktest").style.fontWeight = "500";
    document.getElementById("successTitleRunBacktest").style.marginBottom = "0px !important";
    document.getElementById("errorModalRunBacktest").style.fontSize = "16px";
    document.getElementById("errorTitleRunBacktest").style.marginTop = "20px !important";
    document.getElementById("errorModalRunBacktest").style.fontWeight = "500";
    document.getElementById("errorTitleRunBacktest").style.marginBottom = "0px !important";

    document.getElementById("successModalEditStrategy").style.fontSize = "16px";
    document.getElementById("successTitleEditStrategy").style.marginTop = "20px !important";
    document.getElementById("successModalEditStrategy").style.fontWeight = "500";
    document.getElementById("successTitleEditStrategy").style.marginBottom = "0px !important";
    document.getElementById("errorModalEditStrategy").style.fontSize = "16px";
    document.getElementById("errorTitleEditStrategy").style.marginTop = "20px !important";
    document.getElementById("errorModalEditStrategy").style.fontWeight = "500";
    document.getElementById("errorTitleEditStrategy").style.marginBottom = "0px !important";

    document.getElementById("amountStake").innerText = "10.00 TGEN"; 
    document.getElementById("amountUnstake").innerText = "10.00 TGEN"; 
    document.getElementById("amountDeposit").innerText = "10.00 TGEN";

    document.getElementById("confirmDeleteButton").style.backgroundColor = "#fe3957";

    buildTable();
    buildTable2();

    document.getElementById("loadingPage").remove();
    document.getElementById("mainContent").style.display = "block";
});

document.getElementById("stakeAmount").addEventListener("input", function() {
    let value = document.getElementById("stakeAmount").value;

    if (value.length > 7)
    {
        value = value.slice(0, 7);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let stakeValue = (value == "") ? 0 : parseFloat(value);

    document.getElementById("stakeAmount").value = stakeValue;  
    document.getElementById("amountStake").innerText = stakeValue.toFixed(2) + " TGEN";   
});

document.getElementById("unstakeAmount").addEventListener("input", function() {
    let value = document.getElementById("unstakeAmount").value;

    if (value.length > 7)
    {
        value = value.slice(0, 7);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let unstakeValue = (value == "") ? 0 : parseFloat(value);

    document.getElementById("unstakeAmount").value = unstakeValue; 
    document.getElementById("amountUnstake").innerText = unstakeValue.toFixed(2) + " TGEN";   
});

document.getElementById("depositAmount").addEventListener("input", function() {
    let value = document.getElementById("depositAmount").value;

    if (value.length > 7)
    {
        value = value.slice(0, 7);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let depositValue = (value == "") ? 0 : parseFloat(value);

    document.getElementById("depositAmount").value = depositValue; 
    document.getElementById("amountDeposit").innerText = depositValue.toFixed(2) + " TGEN";   
});

document.getElementById("newPrice").addEventListener("input", function() {
    let value = document.getElementById("newPrice").value;

    if (value.length > 7)
    {
        value = value.slice(0, 7);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newPriceValue = (value == "") ? 0 : parseFloat(value);

    document.getElementById("newPrice").value = newPriceValue;  
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
                window.location.href = 'https://www.tradegen.io/profile';
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

function hideEditListingModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#editListingModal" ).dialog('close');
}

function displayEditListingModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 380) : 380;
    document.getElementById('pageMask').style.display = "block";
    $( "#editListingModal" ).dialog({
        height: 240,
        width: width,
        closeOnEscape: true,
        dialogClass: "whiteBackground",
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#editListingModal" ).show();

    document.getElementById('confirmEditButtonEditListing').addEventListener('click', editListing);
    document.getElementById('cancelEditButtonEditListing').addEventListener('click', hideEditListingModal);
}

function editListing()
{
    let newPrice = document.getElementById('newPrice').value;
    let marketplaceListingID = document.getElementById('marketplaceListingID').value;
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        newPrice: newPrice,
        marketplaceListingID: marketplaceListingID,
        csrf: csrf
      });

    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalEditListing();
            return;
        }
        else
        {
            displayErrorModalEditListing(response.response);
        }
    };

    xhttpRep.open("POST", '/edit_listing', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideEditListingModal();
}

function hideSuccessModalEditListing() 
{
    $( "#successModalEditListing" ).dialog('close');
}

function displaySuccessModalEditListing() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModalEditListing" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalEditListing").dialog("close");
                window.location.href = 'https://www.tradegen.io/settings';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalEditListing" ).show()
}

function hideErrorModalEditListing() 
{
    $( "#errorModalEditListing" ).dialog('close');
}

function displayErrorModalEditListing(message) 
{
    document.getElementById("errorTextEditListing").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalEditListing" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalEditListing").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalEditListing" ).show()
}

function hideCancelListingModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#cancelListingModal" ).dialog('close');
}

function displayCancelListingModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 380) : 380;
    document.getElementById('pageMask').style.display = "block";
    $( "#cancelListingModal" ).dialog({
        height: 240,
        width: width,
        closeOnEscape: true,
        dialogClass: "whiteBackground",
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#cancelListingModal" ).show();

    document.getElementById('confirmCancelListingButton').addEventListener('click', cancelListing);
    document.getElementById('cancelCancelListingButton').addEventListener('click', hideCancelListingModal);
}

function cancelListing()
{
    let marketplaceListingID = document.getElementById("marketplaceListingID").value;
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        marketplaceListingID: marketplaceListingID,
        csrf: csrf
      });

    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalCancelListing();
            return;
        }
        else
        {
            displayErrorModalCancelListing(response.response);
        }
    };

    xhttpRep.open("POST", '/cancel_listing', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideCancelListingModal();
}

function hideSuccessModalCancelListing() 
{
    $( "#successModalCancelListing" ).dialog('close');
}

function displaySuccessModalCancelListing() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModalCancelListing" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalCancelListing").dialog("close");
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalCancelListing" ).show()
}

function hideErrorModalCancelListing() 
{
    $( "#errorModalCancelListing" ).dialog('close');
}

function displayErrorModalCancelListing(message) 
{
    document.getElementById("errorTextCancelListing").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalCancelListing" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalCancelListing").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalCancelListing" ).show()
}

function hideStakeModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#stakeModal" ).dialog('close');
}

function displayStakeModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;
    document.getElementById('pageMask').style.display = "block";
    $( "#stakeModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#stakeModal" ).show();

    document.getElementById('confirmStake').addEventListener('click', stake);
    document.getElementById('cancelStake').addEventListener('click', hideStakeModal);
}

function stake()
{
    let amount = document.getElementById('stakeAmount').value;
    let csrf = document.getElementById("sotong").value;

    let temp = JSON.stringify({
        stakeAmount: amount,
        csrf: csrf
      });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalStake();
            return;
        }
        else
        {
            displayErrorModalStake(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/stake', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideStakeModal();
}

function hideSuccessModalStake() 
{
    $( "#successModalStake" ).dialog('close');
}

function displaySuccessModalStake() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 320;
    var Y = window.pageYOffset;
    $( "#successModalStake" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalStake").dialog("close");
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalStake" ).show()
}

function hideErrorModalStake() 
{
    $( "#errorModalStake" ).dialog('close');
}

function displayErrorModalStake(message) 
{
    document.getElementById("errorTextStake").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalStake" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalStake").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalStake" ).show()
}

function hideUnstakeModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#unstakeModal" ).dialog('close');
}

function displayUnstakeModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;
    document.getElementById('pageMask').style.display = "block";
    $( "#unstakeModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#unstakeModal" ).show();

    document.getElementById('confirmUnstake').addEventListener('click', unstake);
    document.getElementById('cancelUnstake').addEventListener('click', hideUnstakeModal);
}

function unstake()
{
    let amount = document.getElementById('unstakeAmount').value;
    let csrf = document.getElementById("sotong").value;

    let temp = JSON.stringify({
        unstakeAmount: amount,
        csrf: csrf
      });

    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalUnstake();
            return;
        }
        else
        {
            displayErrorModalUnstake(response.response);
        }
    };

    xhttpRep.open("POST", '/unstake', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideUnstakeModal();
}

function hideSuccessModalUnstake() 
{
    $( "#successModalUnstake" ).dialog('close');
}

function displaySuccessModalUnstake() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 320;
    var Y = window.pageYOffset;
    $( "#successModalUnstake" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalUnstake").dialog("close");
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalUnstake" ).show()
}

function hideErrorModalUnstake() 
{
    $( "#errorModalUnstake" ).dialog('close');
}

function displayErrorModalUnstake(message) 
{
    document.getElementById("errorTextUnstake").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalUnstake" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalUnstake").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalUnstake" ).show()
}

function hideDepositModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#depositModal" ).dialog('close');
}

function displayDepositModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;
    document.getElementById('pageMask').style.display = "block";
    $( "#depositModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#depositModal" ).show();

    document.getElementById('confirmDeposit').addEventListener('click', deposit);
    document.getElementById('cancelDeposit').addEventListener('click', hideDepositModal);
}

function deposit()
{
    let amount = document.getElementById('depositAmount').value;
    let csrf = document.getElementById("sotong").value;

    let temp = JSON.stringify({
        depositAmount: amount,
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
        }
    };

    xhttpRep.open("POST", '/deposit2', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideDepositModal();
}

function hideSuccessModalDeposit() 
{
    $( "#successModalDeposit" ).dialog('close');
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
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalDeposit" ).show()
}

function hideErrorModalDeposit() 
{
    $( "#errorModalDeposit" ).dialog('close');
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
    let developedStrategies = JSON.parse(dataString).developedStrategies;

    const downColor = "#fe3957";
    const upColor = "#00cf92";

    if (developedStrategies.length == 0)
    {
        document.getElementById("developedStrategiesDiv").style.display = "none";
    }

    let table3 = document.getElementById("developedStrategiesTable");
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
    header_title232.innerText = "Developed On";
    header_title232.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title232);
    let header_title233 = document.createElement("th");
    header_title233.innerText = "Today's Return";
    header_title233.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title233);
    let header_titleBuffer = document.createElement("th");
    header_titleBuffer.innerText = "";
    header_titleBuffer.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_titleBuffer);
    let header_title23 = document.createElement("th");
    header_title23.innerText = "Total Return";
    header_title23.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title23);
    let header_title73 = document.createElement("th");
    let header_title2322 = document.createElement("th");
    header_title2322.innerText = "Status";
    header_title2322.setAttribute("class", "marketsTableRowName");
    header_row3.appendChild(header_title2322);
    header_title73.innerText = "Actions";
    header_title73.setAttribute("class", "marketsTableRowData");
    header_title73.style.textAlign = "center";
    header_row3.appendChild(header_title73);

    table_head3.appendChild(header_row3);
    table3.appendChild(table_head3);

    for(let i = 0; i < developedStrategies.length; i++)
    {
        let row = document.createElement("tr");

        let strategyName = document.createElement("td");
        let strategyNameLink = document.createElement("a");
        strategyNameLink.innerText = developedStrategies[i].strategyName;
        let strategyID = developedStrategies[i].strategyID;
        strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
        strategyName.setAttribute("class", "marketsTableRowName");
        strategyName.appendChild(strategyNameLink);
        row.appendChild(strategyName);
        let developedOn = document.createElement("td");
        developedOn.innerText = developedStrategies[i].developedOn;
        developedOn.setAttribute("class", "marketsTableRowName");
        row.appendChild(developedOn);

        let todayReturn = document.createElement("td");
        let arrow3 = document.createElement("i");
        let text3 = document.createElement("a");
        arrow3.setAttribute("class", "material-icons");
        let percent3 = developedStrategies[i].todayReturn * 100;
        if (percent3 > 0)
        {
            todayReturn.style.color = upColor;
            arrow3.innerText = "arrow_drop_up";
            arrow3.style.color = upColor;
        }
        else if (percent3 == 0)
        {
            todayReturn.style.color = "#737373";
            arrow3.innerText = "arrow_right";
            arrow3.style.color = "#737373";
        }
        else
        {
            todayReturn.style.color = downColor;
            arrow3.innerText = "arrow_drop_down";
            arrow3.style.color = downColor;
            percent3 *= -1;
        }
        text3.innerText = percent3.toFixed(2) + "%";
        todayReturn.setAttribute("class", "marketsTableRowName");
        todayReturn.style.display = "flex";
        arrow3.style.paddingTop = "4px";
        text3.style.paddingTop = "7px";
        todayReturn.appendChild(arrow3);
        todayReturn.appendChild(text3);
        row.appendChild(todayReturn);

        let buff = document.createElement("td");
        buff.innerText = "";
        buff.setAttribute("class", "marketsTableRowName");
        row.appendChild(buff);

        let totalReturn = document.createElement("td");
        let arrow2 = document.createElement("i");
        let text2 = document.createElement("a");
        arrow2.setAttribute("class", "material-icons");
        let percent2 = developedStrategies[i].totalReturn;
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

        let status = document.createElement("td");
        status.innerText = developedStrategies[i].status;
        status.setAttribute("class", "marketsTableRowName");
        if (developedStrategies[i].status == "Live" || developedStrategies[i].status == "Backtest complete" || developedStrategies[i].status == "Approved")
        {
            status.style.color = "#18c96e";
        }
        else if (developedStrategies[i].status == "Pending approval" || developedStrategies[i].status == "Running backtest" || developedStrategies[i].status == "Submitted for review")
        {
            status.style.color = "#f2bd5c";
        }
        else if (developedStrategies[i].status == "Backtest contains errors" || developedStrategies[i].status == "Not active")
        {
            status.style.color = downColor;
        }
        row.appendChild(status);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableRowData");
        actions.style.textAlign = "center";
        let viewButton = document.createElement("i");
        viewButton.innerText = "timeline";
        viewButton.setAttribute("class", "material-icons actionIcon");
        let ID = developedStrategies[i].strategyID;
        viewButton.addEventListener('click', function(){ window.location.href = '/strategy_info/' + ID; });
        let detailsButton = document.createElement("i");
        detailsButton.innerText = "info";
        detailsButton.setAttribute("class", "material-icons actionIcon");
        detailsButton.style.color = "#9ea1a4";
        detailsButton.addEventListener('click', function(){ populateStrategyDiv(developedStrategies[i].strategyID.toString()); });
        let deleteButton = document.createElement("i");
        deleteButton.innerText = "delete";
        deleteButton.setAttribute("class", "material-icons actionIcon");
        deleteButton.style.color = downColor;
        deleteButton.addEventListener('click', function(){ displayDeleteStrategyModal(developedStrategies[i].strategyID.toString()); });
        let sellButton = document.createElement("i");
        sellButton.innerText = "sell";
        sellButton.setAttribute("class", "material-icons actionIcon");
        sellButton.style.color = upColor;
        sellButton.addEventListener('click', function(){ displaySellStrategyModal(developedStrategies[i].strategyID.toString()); });
        let runBacktestButton = document.createElement("i");
        runBacktestButton.innerText = "build";
        runBacktestButton.setAttribute("class", "material-icons actionIcon");
        runBacktestButton.addEventListener('click', function(){ displayRunBacktestModal(developedStrategies[i].strategyID.toString()); });
        let editStrategyButton = document.createElement("i");
        editStrategyButton.innerText = "create";
        editStrategyButton.setAttribute("class", "material-icons actionIcon");
        editStrategyButton.addEventListener('click', function(){ populateEditStrategyModal(developedStrategies[i].strategyID.toString()); });

        if (developedStrategies[i].status == "Not active")
        {
            actions.appendChild(deleteButton);
            actions.appendChild(detailsButton);
            actions.appendChild(editStrategyButton);
            actions.appendChild(runBacktestButton);
        }
        else if (developedStrategies[i].status == "Running backtest")
        {
            actions.appendChild(detailsButton);
        }
        else if (developedStrategies[i].status == "Backtest contains errors")
        {
            actions.appendChild(deleteButton);
            actions.appendChild(detailsButton);
            actions.appendChild(editStrategyButton);
            actions.appendChild(runBacktestButton);
        }
        else if (developedStrategies[i].status == "Backtest complete")
        {
            actions.appendChild(deleteButton);
            actions.appendChild(viewButton);
            actions.appendChild(detailsButton);
            actions.appendChild(editStrategyButton);
            actions.appendChild(sellButton);
        }
        else if (developedStrategies[i].status == "Pending approval")
        {
            actions.appendChild(viewButton);
            actions.appendChild(detailsButton);
        }
        else if (developedStrategies[i].status == "Live")
        {
            actions.appendChild(viewButton);
            actions.appendChild(detailsButton);
        }
        else if (developedStrategies[i].status == "Submitted for review")
        {
            actions.appendChild(viewButton);
            actions.appendChild(detailsButton);
        }
        else if (developedStrategies[i].status == "Approved")
        {
            actions.appendChild(viewButton);
            actions.appendChild(detailsButton);
        }

        row.appendChild(actions);
        table_body3.appendChild(row);
    }

    table3.appendChild(table_body3);
}

function buildTable2()
{
    let dataString2 = document.getElementById("dataString2").value;
    let positionsForSale = JSON.parse(dataString2).marketplaceListings;

    const downColor = "#fe3957";
    const upColor = "#00cf92";

    let table = document.getElementById("positionsForSaleTable");
    table.setAttribute("class", "transactionsTable");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    let table_head = document.createElement("thead");
    let header_row = document.createElement("tr");
    let header_title1 = document.createElement("th");
    header_title1.innerText = "Strategy Name";
    header_title1.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1);
    let header_title2 = document.createElement("th");
    header_title2.innerText = "Tokens";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Market Price";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Advertised Price";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "% vs. Market Price";
    header_title5.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    header_title6.innerText = "Actions";
    header_title6.setAttribute("class", "marketsTableRowData");
    header_title6.style.textAlign = "center";
    header_row.appendChild(header_title6);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    for (let i = 0; i < positionsForSale.length; i++)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let percent = positionsForSale[i].percent;

        let strategyName = document.createElement("td");
        let strategyNameLink = document.createElement("a");
        strategyNameLink.innerText = positionsForSale[i].strategyName;
        let strategyID = positionsForSale[i].strategyID;
        strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
        strategyName.setAttribute("class", "marketsTableRowName");
        let strategyNameRight = document.createElement("a");
        strategyNameRight.innerText = positionsForSale[i].strategySymbol;
        strategyNameRight.style.color = "rgb(128,138,157)";
        strategyNameRight.style.paddingLeft = "10px";
        strategyNameRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
        strategyNameRight.addEventListener('mouseover', function(){ strategyNameRight.style.cursor = "pointer"; });
        strategyName.appendChild(strategyNameLink);
        strategyName.appendChild(strategyNameRight);
        row.appendChild(strategyName);
        let numberOfTokens = document.createElement("td");
        numberOfTokens.innerText = positionsForSale[i].numberOfTokens;
        numberOfTokens.setAttribute("class", "marketsTableRowName");
        row.appendChild(numberOfTokens);
        let marketPrice = document.createElement("td");
        marketPrice.innerText = positionsForSale[i].marketPrice.toFixed(4) + " TGEN";
        marketPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(marketPrice);
        let advertisedPrice = document.createElement("td");
        advertisedPrice.innerText = positionsForSale[i].advertisedPrice.toFixed(4) + " TGEN";
        advertisedPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(advertisedPrice);
        let change = document.createElement("td");
        let arrow = document.createElement("i");
        let text= document.createElement("a");
        arrow.setAttribute("class", "material-icons");
        if (percent < 0)
        {
            change.style.color = downColor;
            arrow.innerText = "arrow_drop_down";
            arrow.style.color = downColor;
            percent *= -1;
        }
        else if (percent == 0)
        {
            change.style.color = "#737373";
            arrow.innerText = "arrow_right";
            arrow.style.color = "#737373";
        }
        else
        {
            change.style.color = upColor;
            arrow.innerText = "arrow_drop_up";
            arrow.style.color = upColor;
        }
        text.innerText = percent.toFixed(2) + "%";
        change.setAttribute("class", "marketsTableRowName");
        change.style.display = "flex";
        arrow.style.paddingTop = "4px";
        text.style.paddingTop = "7px";
        change.appendChild(arrow);
        change.appendChild(text);
        row.appendChild(change);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableRowData");
        actions.style.textAlign = "center";
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.setAttribute("class", "buyButton");
        let thisMarketplaceListingID = positionsForSale[i].marketplaceListingID;
        editButton.addEventListener('click', function(){ 
            document.getElementById("marketplaceListingID").value = thisMarketplaceListingID;
            displayEditListingModal();
         });
        let cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.setAttribute("class", "cancelButton");
        let marketplaceListingID = positionsForSale[i].marketplaceListingID;
        cancelButton.addEventListener('click', function(){ displayCancelListingModal() });
        actions.appendChild(cancelButton);
        actions.appendChild(editButton);
        
        row.appendChild(actions);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);
    
    if (positionsForSale.length > 0)
    {
        document.getElementById("positionsForSaleDiv").style.display = "block";
    }
}

function populateStrategyDiv(id)
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);
        const strategyData = response;

        let symbolOutput = "";

        for (var i = 0; i < Math.min(strategyData.symbols.length, 6); i+=1)
            {
                symbolOutput += strategyData.symbols[i];

                if (i < Math.min(strategyData.symbols.length, 6) - 1)
                {
                    symbolOutput += ", ";
                }
            }

            if (strategyData.symbols.length > 6)
            {
                symbolOutput += "...";
            }

        let watchlistName = "";

        if (strategyData.watchlist == "indexETFs")
        {
            watchlistName = "Index ETFs";
        }
        else if (strategyData.watchlist == "FAANG")
        {
            watchlistName = "FAANG stocks";
        }
        else if (strategyData.watchlist == "software")
        {
            watchlistName = "Software stocks";
        }
        else if (strategyData.watchlist == "travel")
        {
            watchlistName = "Travel stocks";
        }
        else if (strategyData.watchlist == "morningBreakouts")
        {
            watchlistName = "Morning breakouts";
        }
        else if (strategyData.watchlist == "custom")
        {
            watchlistName = "Custom stock list";
        }

        //initialise strategy data div with first strategy
        let name = document.getElementById("strategyDataName");
        name.innerText = strategyData.strategyName;
        let description = document.getElementById("strategyDataDescription");
        description.innerText = strategyData.description;
        let watchlist = document.getElementById("strategyDataWatchlist");
        watchlist.innerText = watchlistName;
        let symbol = document.getElementById("strategyDataSymbols");
        symbol.innerText = symbolOutput;
        let maxAllocation = document.getElementById("strategyDataMaxAllocation");
        maxAllocation.innerText = strategyData.maxAllocation.toString() + "%";
        let maxConcurrentTrades = document.getElementById("strategyDataMaxConcurrentTrades");
        maxConcurrentTrades.innerText = strategyData.maxConcurrentTrades;
        let positionWeight = document.getElementById("strategyDataPositionWeight");
        positionWeight.innerText = strategyData.distribution;
        let timeframe = document.getElementById("strategyDataTimeframe");
        timeframe.innerText =  strategyData.timeframe + " mins";
        let start = document.getElementById("strategyDataStart");
        start.innerText = strategyData.startTime + " minutes after market open.";
        let end = document.getElementById("strategyDataEnd");
        end.innerText = strategyData.endTime + " minutes before market close.";
        let direction = document.getElementById("strategyDataDirection");
        direction.innerText = strategyData.direction;

        let entryConditionList = document.getElementById("entryConditionList");
        let exitConditionList = document.getElementById("exitConditionList");
        
        while (entryConditionList.hasChildNodes())
        {
            entryConditionList.removeChild(entryConditionList.firstChild);
        }
        while (exitConditionList.hasChildNodes())
        {
            exitConditionList.removeChild(exitConditionList.firstChild);
        }

        for (var k = 0; k < strategyData.entryConditions.length; k+=1)
        {
            let firstIndicator = strategyData.entryConditions[k].firstIndicator;
            let firstIndicatorParameter = strategyData.entryConditions[k].firstIndicatorParams;
            let secondIndicator = strategyData.entryConditions[k].secondIndicator;
            let secondIndicatorParameter = strategyData.entryConditions[k].secondIndicatorParams;
            let comparator = strategyData.entryConditions[k].comparator;

            let modifiedName = "";

            if (firstIndicator == "CurrentCandle")
            {
                modifiedName = "Current candle ";
            }
            else if (firstIndicator == "EMA")
            {
                modifiedName = "EMA" + firstIndicatorParameter.toString() + " ";
            }
            else if (firstIndicator == "Gap")
            {
                modifiedName = "Gap ";
            }
            else if (firstIndicator == "NthCandle")
            {
                let suffix = "th";
                if ((firstIndicatorParameter % 10) == 1 && firstIndicatorParameter != 11)
                {
                    suffix = "st";
                }
                else if ((firstIndicatorParameter % 10) == 2 && firstIndicatorParameter != 12)
                {
                    suffix = "nd";
                }
                else if ((firstIndicatorParameter % 10) == 3 && firstIndicatorParameter != 13)
                {
                    suffix = "rd";
                }
                modifiedName = firstIndicatorParameter.toString() + suffix + " candle ";
            }
            else if (firstIndicator == "PreviousNCandles")
            {
                modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles ";
            }
            else if (firstIndicator == "Signal")
            {
                modifiedName = "Signal ";
            }
            else if (firstIndicator == "SMA")
            {
                modifiedName = "SMA" + firstIndicatorParameter.toString() + " ";
            }

            //check comparator
            if (comparator == "BouncesHigherOff")
            {
                modifiedName += "bounces higher off ";
            }
            else if (comparator == "BouncesLowerOff")
            {
                modifiedName += "bounces lower off ";
            }
            else if (comparator == "BreaksAbove")
            {
                modifiedName += "breaks above ";
            }
            else if (comparator == "BreaksBelow")
            {
                modifiedName += "breaks below ";
            }
            else if (comparator == "Closes")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " close ";
                }
                else
                {
                    modifiedName += " closes ";
                }
            }
            else if (comparator == "ClosesAbove")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " close above ";
                }
                else
                {
                    modifiedName += " closes above ";
                }
            }
            else if (comparator == "ClosesBelow")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " close below ";
                }
                else
                {
                    modifiedName += " closes below ";
                };
            }
            else if (comparator == "FallsTo")
            {
                modifiedName += "falls to ";
            }
            else if (comparator == "Has")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " have ";
                }
                else
                {
                    modifiedName += " has ";
                }
            }
            else if (comparator == "RisesTo")
            {
                modifiedName += "rises to ";
            }
            else if (comparator == "UpByAtLeast")
            {
                modifiedName += "up by at least ";
            }
            else if (comparator == "UpByAtMost")
            {
                modifiedName += "up by at most ";
            }
            else if (comparator == "DownByAtLeast")
            {
                modifiedName += "down by at least ";
            }
            else if (comparator == "DownByAtMost")
            {
                modifiedName += "down by at most ";
            }
            else if (comparator == "GivenInFirst")
            {
                modifiedName += "given in first ";
            }
            else if (comparator == "FallByAtLeast")
            {
                modifiedName += " fall by at least ";
            }
            else if (comparator == "FallByAtMost")
            {
                modifiedName += " fall by at most ";
            }
            else if (comparator == "RiseByAtLeast")
            {
                modifiedName += " rise by at least ";
            }
            else if (comparator == "RiseByAtMost")
            {
                modifiedName += " rise by at most ";
            }
            else if (comparator == "CrossesAbove")
            {
                modifiedName += " crosses above ";
            }
            else if (comparator == "CrossesBelow")
            {
                modifiedName += " crosses below ";
            }

            //check second indicator
            if (secondIndicator == "AtLeastNTimesRange")
            {
                modifiedName += "at least " + secondIndicatorParameter.toString() + " times range";
            }
            else if (secondIndicator == "AtLeastNTimesVolume")
            {
                modifiedName += "at least " + secondIndicatorParameter.toString() + " times volume";
            }
            else if (secondIndicator == "AtMostNTimesRange")
            {
                modifiedName += "at most " + secondIndicatorParameter.toString() + " times range";
            }
            else if (secondIndicator == "AtMostNTimesVolume")
            {
                modifiedName += "at most " + secondIndicatorParameter.toString() + " times volume";
            }
            else if (secondIndicator == "Down")
            {
                modifiedName += "down";
            }
            else if (secondIndicator == "EMA")
            {
                modifiedName += "EMA" + secondIndicatorParameter.toString();
            }
            else if (secondIndicator == "HigherRange")
            {
                modifiedName += "higher range";
            }
            else if (secondIndicator == "HigherVolume")
            {
                modifiedName += "higher volume";
            }
            else if (secondIndicator == "HighOfEntryBar")
            {
                modifiedName += "high of entry bar";
            }
            else if (secondIndicator == "HighOfFirstNMinutes")
            {
                modifiedName += "high of first " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "HighOfLastNMinutes")
            {
                modifiedName += "high of last " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "Interval")
            {
                modifiedName += "$" + secondIndicatorParameter.toString() + " interval";
            }
            else if (secondIndicator == "LongBottomTail")
            {
                modifiedName += "long bottom tail";
            }
            else if (secondIndicator == "LongTopTail")
            {
                modifiedName += "long top tail";
            }
            else if (secondIndicator == "LowerRange")
            {
                modifiedName += "lower range";
            }
            else if (secondIndicator == "LowerVolume")
            {
                modifiedName += "lower volume";
            }
            else if (secondIndicator == "LowOfEntryBar")
            {
                modifiedName += "low of entry bar";
            }
            else if (secondIndicator == "LowOfFirstNMinutes")
            {
                modifiedName += "low of first " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "LowOfLastNMinutes")
            {
                modifiedName += "low of last " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "PreviousCandleHigh")
            {
                modifiedName += "previous candle high";
            }
            else if (secondIndicator == "PreviousCandleLow")
            {
                modifiedName += "previous candle low";
            }
            else if (secondIndicator == "SMA")
            {
                modifiedName += "SMA" + secondIndicatorParameter.toString();
            }
            else if (secondIndicator == "Up")
            {
                modifiedName += "Up";
            }
            else if (secondIndicator == "VWAP")
            {
                modifiedName += "VWAP" + secondIndicatorParameter.toString();
            }
            else if (secondIndicator == "NMinutes")
            {
                modifiedName += secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "NPercent")
            {
                modifiedName += secondIndicatorParameter.toString() + "%";
            }
            

            let listElement = document.createElement("li");
            listElement.innerText = modifiedName;
            entryConditionList.appendChild(listElement);
        }

        for (var k = 0; k < strategyData.exitConditions.length; k+=1)
        {
            let firstIndicator = strategyData.exitConditions[k].firstIndicator;
            let firstIndicatorParameter = strategyData.exitConditions[k].firstIndicatorParams;
            let secondIndicator = strategyData.exitConditions[k].secondIndicator;
            let secondIndicatorParameter = strategyData.exitConditions[k].secondIndicatorParams;
            let comparator = strategyData.exitConditions[k].comparator;

            let modifiedName = "";

            if (firstIndicator == "CurrentCandle")
            {
                modifiedName = "Current candle ";
            }
            else if (firstIndicator == "EMA")
            {
                modifiedName = "EMA" + firstIndicatorParameter.toString() + " ";
            }
            else if (firstIndicator == "Gap")
            {
                modifiedName = "Gap ";
            }
            else if (firstIndicator == "NthCandle")
            {
                let suffix = "th";
                if ((firstIndicatorParameter % 10) == 1 && firstIndicatorParameter != 11)
                {
                    suffix = "st";
                }
                else if ((firstIndicatorParameter % 10) == 2 && firstIndicatorParameter != 12)
                {
                    suffix = "nd";
                }
                else if ((firstIndicatorParameter % 10) == 3 && firstIndicatorParameter != 13)
                {
                    suffix = "rd";
                }
                modifiedName = firstIndicatorParameter.toString() + suffix + " candle ";
            }
            else if (firstIndicator == "PreviousNCandles")
            {
                modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles ";
            }
            else if (firstIndicator == "Signal")
            {
                modifiedName = "Signal ";
            }
            else if (firstIndicator == "SMA")
            {
                modifiedName = "SMA" + firstIndicatorParameter.toString() + " ";
            }

            //check comparator
            if (comparator == "BouncesHigherOff")
            {
                modifiedName += "bounces higher off ";
            }
            else if (comparator == "BouncesLowerOff")
            {
                modifiedName += "bounces lower off ";
            }
            else if (comparator == "BreaksAbove")
            {
                modifiedName += "breaks above ";
            }
            else if (comparator == "BreaksBelow")
            {
                modifiedName += "breaks below ";
            }
            else if (comparator == "Closes")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " close ";
                }
                else
                {
                    modifiedName += " closes ";
                }
            }
            else if (comparator == "ClosesAbove")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " close above ";
                }
                else
                {
                    modifiedName += " closes above ";
                }
            }
            else if (comparator == "ClosesBelow")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " close below ";
                }
                else
                {
                    modifiedName += " closes below ";
                };
            }
            else if (comparator == "FallsTo")
            {
                modifiedName += "falls to ";
            }
            else if (comparator == "Has")
            {
                if (firstIndicator == "PreviousNCandles")
                {
                    modifiedName += " have ";
                }
                else
                {
                    modifiedName += " has ";
                }
            }
            else if (comparator == "RisesTo")
            {
                modifiedName += "rises to ";
            }
            else if (comparator == "UpByAtLeast")
            {
                modifiedName += "up by at least ";
            }
            else if (comparator == "UpByAtMost")
            {
                modifiedName += "up by at most ";
            }
            else if (comparator == "DownByAtLeast")
            {
                modifiedName += "down by at least ";
            }
            else if (comparator == "DownByAtMost")
            {
                modifiedName += "down by at most ";
            }
            else if (comparator == "GivenInFirst")
            {
                modifiedName += "given in first ";
            }
            else if (comparator == "FallByAtLeast")
            {
                modifiedName += " fall by at least ";
            }
            else if (comparator == "FallByAtMost")
            {
                modifiedName += " fall by at most ";
            }
            else if (comparator == "RiseByAtLeast")
            {
                modifiedName += " rise by at least ";
            }
            else if (comparator == "RiseByAtMost")
            {
                modifiedName += " rise by at most ";
            }
            else if (comparator == "CrossesAbove")
            {
                modifiedName += " crosses above ";
            }
            else if (comparator == "CrossesBelow")
            {
                modifiedName += " crosses below ";
            }

            //check second indicator
            if (secondIndicator == "AtLeastNTimesRange")
            {
                modifiedName += "at least " + secondIndicatorParameter.toString() + " times range";
            }
            else if (secondIndicator == "AtLeastNTimesVolume")
            {
                modifiedName += "at least " + secondIndicatorParameter.toString() + " times volume";
            }
            else if (secondIndicator == "AtMostNTimesRange")
            {
                modifiedName += "at most " + secondIndicatorParameter.toString() + " times range";
            }
            else if (secondIndicator == "AtMostNTimesVolume")
            {
                modifiedName += "at most " + secondIndicatorParameter.toString() + " times volume";
            }
            else if (secondIndicator == "Down")
            {
                modifiedName += "down";
            }
            else if (secondIndicator == "EMA")
            {
                modifiedName += "EMA" + secondIndicatorParameter.toString();
            }
            else if (secondIndicator == "HigherRange")
            {
                modifiedName += "higher range";
            }
            else if (secondIndicator == "HigherVolume")
            {
                modifiedName += "higher volume";
            }
            else if (secondIndicator == "HighOfEntryBar")
            {
                modifiedName += "high of entry bar";
            }
            else if (secondIndicator == "HighOfFirstNMinutes")
            {
                modifiedName += "high of first " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "HighOfLastNMinutes")
            {
                modifiedName += "high of last " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "Interval")
            {
                modifiedName += "$" + secondIndicatorParameter.toString() + " interval";
            }
            else if (secondIndicator == "LongBottomTail")
            {
                modifiedName += "long bottom tail";
            }
            else if (secondIndicator == "LongTopTail")
            {
                modifiedName += "long top tail";
            }
            else if (secondIndicator == "LowerRange")
            {
                modifiedName += "lower range";
            }
            else if (secondIndicator == "LowerVolume")
            {
                modifiedName += "lower volume";
            }
            else if (secondIndicator == "LowOfEntryBar")
            {
                modifiedName += "low of entry bar";
            }
            else if (secondIndicator == "LowOfFirstNMinutes")
            {
                modifiedName += "low of first " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "LowOfLastNMinutes")
            {
                modifiedName += "low of last " + secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "PreviousCandleHigh")
            {
                modifiedName += "previous candle high";
            }
            else if (secondIndicator == "PreviousCandleLow")
            {
                modifiedName += "previous candle low";
            }
            else if (secondIndicator == "ProfitTarget")
            {
                modifiedName = secondIndicatorParameter.toString() + "% profit target";
            }
            else if (secondIndicator == "SMA")
            {
                modifiedName += "SMA" + secondIndicatorParameter.toString();
            }
            else if (secondIndicator == "StopLoss")
            {
                modifiedName = secondIndicatorParameter.toString() + "% stop loss";
            }
            else if (secondIndicator == "Up")
            {
                modifiedName += "Up";
            }
            else if (secondIndicator == "VWAP")
            {
                modifiedName += "VWAP" + secondIndicatorParameter.toString();
            }
            else if (secondIndicator == "NMinutes")
            {
                modifiedName += secondIndicatorParameter.toString() + " minutes";
            }
            else if (secondIndicator == "NPercent")
            {
                modifiedName += secondIndicatorParameter.toString() + "%";
            }

            let listElement = document.createElement("li");
            listElement.innerText = modifiedName;
            exitConditionList.appendChild(listElement);
        }

        displayStrategyDetailsModal();
    };

    xhttpRep.open("GET", '/get_strategy_details/' + encodeURIComponent(id), false);
    xhttpRep.send();
}

function displayStrategyDetailsModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 450) : 450;
    let height = (isMobile.any()) ? 750 : 650;
    document.getElementById('pageMask').style.display = "block";
    $( "#strategyDetailsModal" ).dialog({
        height: height,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#strategyDetailsModal" ).show();

    document.getElementById('closeStrategyDetailsModal').addEventListener('click', hideStrategyDetailsModal);
}

function hideStrategyDetailsModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#strategyDetailsModal" ).dialog('close');
}

function hideSellStrategyModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#sellStrategyModal" ).dialog('close');
}

function displaySellStrategyModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 520) : 520;
    document.getElementById('pageMask').style.display = "block";
    $( "#sellStrategyModal" ).dialog({
        height: 400,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#sellStrategyModal" ).show();

    document.getElementById('confirmSellButton').addEventListener('click', function(){ sellStrategy(id); });
    document.getElementById('cancelSellButton').addEventListener('click', hideSellStrategyModal);
}

function sellStrategy(id)
{
    let symbol = parseFloat(document.getElementById('strategySymbol').value);
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        strategyID: id,
        symbol: symbol,
        csrf: csrf
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

    xhttpRep.open("POST", '/sell_strategy', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideSellStrategyModal();
}

function displayDeleteStrategyModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 420) : 420;
    document.getElementById('pageMask').style.display = "block";
    $( "#deleteStrategyModal" ).dialog({
        height: 210,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#deleteStrategyModal" ).show()

    document.getElementById('confirmDeleteButton').addEventListener('click', function(){ deleteStrategy(id); });
    document.getElementById('cancelDeleteButton').addEventListener('click', hideDeleteStrategyModal);
}

function hideDeleteStrategyModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#deleteStrategyModal" ).dialog('close');
}

function deleteStrategy(id)
{
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        csrf: csrf,
        strategyID: id
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalDelete();
            
            return;
        }
        else
        {
            displayErrorModalDelete(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/delete_strategy', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideDeleteStrategyModal();
}

document.getElementById("strategySymbol").addEventListener("input", function() {
    let value = document.getElementById("strategySymbol").value;

    if (value.length > 5)
    {
        value = value.slice(0, value.length - 1);
    }

    if (value.length == 0)
    {
        value = "";
    }

    document.getElementById("strategySymbol").value = value;    
});

function hideSuccessModalSell() 
{
    $( "#successModalSell" ).dialog('close');
}

function displaySuccessModalSell() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 230;
    var Y = window.pageYOffset;
    $( "#successModalSell" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalSell").dialog("close");
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalSell" ).show()
}

function hideErrorModalSell() 
{
    $( "#errorModalSell" ).dialog('close');
}

function displayErrorModalSell(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#errorModalSell" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalSell").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalSell" ).show()
}

function hideSuccessModalDelete() 
{
    $( "#successModalDelete" ).dialog('close');
}

function displaySuccessModalDelete() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 220;
    var Y = window.pageYOffset;
    $( "#successModalDelete" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalDelete").dialog("close");
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalDelete" ).show()
}

function hideErrorModalDelete() 
{
    $( "#errorModalDelete" ).dialog('close');
}

function displayErrorModalDelete(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#errorModalDelete" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalDelete").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalDelete" ).show()
}

function displayRunBacktestModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 420) : 420;
    document.getElementById('pageMask').style.display = "block";
    $( "#runBacktestModal" ).dialog({
        height: 210,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#runBacktestModal" ).show()

    document.getElementById('confirmRunBacktestButton').addEventListener('click', function(){ runBacktest(id); });
    document.getElementById('cancelRunBacktestButton').addEventListener('click', hideRunBacktestModal);
}

function hideRunBacktestModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#runBacktestModal" ).dialog('close');
}

function runBacktest(id)
{
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        csrf: csrf,
        strategyID: id
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalRunBacktest();
            
            return;
        }
        else
        {
            displayErrorModalRunBacktest(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/start_backtest', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideRunBacktestModal();
}

function hideSuccessModalRunBacktest() 
{
    $( "#successModalRunBacktest" ).dialog('close');
}

function displaySuccessModalRunBacktest() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModalRunBacktest" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalRunBacktest").dialog("close");
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalRunBacktest" ).show()
}

function hideErrorModalRunBacktest() 
{
    $( "#errorModalRunBacktest" ).dialog('close');
}

function displayErrorModalRunBacktest(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#errorModalRunBacktest" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalRunBacktest").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalRunBacktest" ).show()
}

function displayEditStrategyModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 560) : 560;
    let height = (isMobile.any()) ? 720 : 620;
    document.getElementById('pageMask').style.display = "block";
    $( "#editStrategyModal" ).dialog({
        height: height,
        width: width,
        closeOnEscape: true,
        dialogClass: 'whiteBackground',
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#editStrategyModal" ).show()

    document.getElementById('confirmEditStrategyButton').addEventListener('click', function(){ editStrategy(id); });
    document.getElementById('cancelEditStrategyButton').addEventListener('click', hideEditStrategyModal);
}

function hideEditStrategyModal() 
{
    document.getElementById("symbolsEdit").style.display = "none";
    document.getElementById("watchlistEdit").selectedIndex = "0";
    document.getElementById('pageMask').style.display = "none";
    $( "#editStrategyModal" ).dialog('close');
}

function editStrategy(id)
{
    let csrf = document.getElementById("sotong").value;
    let name = document.getElementById("strategyNameEdit").value;
    let description = document.getElementById("descriptionEdit").value;
    let watchlist = document.getElementById("watchlistEdit").value;
    let symbols = document.getElementById("symbolsEdit").value;
    let timeframe = document.getElementById("timeframeEdit").value;
    let maxAllocation = document.getElementById("maxAllocationEdit").value;
    let maxConcurrentTrades = document.getElementById("maxConcurrentTradesEdit").value;
    let positionWeight = document.getElementById("positionWeightEdit").value;
    let startTime = document.getElementById("startTimeEdit").value;
    let endTime = document.getElementById("endTimeEdit").value;
    let direction = document.getElementById("directionEdit").value;

    let temp = JSON.stringify({
        csrf: csrf,
        strategyID: id,
        strategyName: name,
        description: description,
        watchlist: watchlist,
        symbols: symbols,
        timeframe: timeframe,
        maxAllocation: maxAllocation,
        maxConcurrentTrades,
        positionWeight: positionWeight,
        startTime: startTime,
        endTime: endTime,
        direction: direction
    });

    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalEditStrategy();
            return;
        }
        else
        {
            displayErrorModalEditStrategy(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/edit_strategy', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideEditStrategyModal();
}

function hideSuccessModalEditStrategy() 
{
    $( "#successModalEditStrategy" ).dialog('close');
}

function displaySuccessModalEditStrategy() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#successModalEditStrategy" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalEditStrategy").dialog("close");
                window.location.href = 'https://www.tradegen.io/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalEditStrategy" ).show()
}

function hideErrorModalEditStrategy() 
{
    $( "#errorModalEditStrategy" ).dialog('close');
}

function displayErrorModalEditStrategy(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 300;
    var Y = window.pageYOffset;
    $( "#errorModalEditStrategy" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalEditStrategy").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalEditStrategy" ).show()
}

document.getElementById("watchlistEdit").addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    
    if (selectedValue == "custom")
    {
        document.getElementById("symbolsEdit").style.display = "block";
    }
    else
    {
        document.getElementById("symbolsEdit").style.display = "none";
    }
});

function populateEditStrategyModal(id)
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);
        const strategyData = response;

        let symbolOutput = "";

        for (var i = 0; i < strategyData.symbols.length; i+=1)
        {
            symbolOutput += strategyData.symbols[i];

            if (i < strategyData.symbols.length - 1)
            {
                symbolOutput += ",";
            }
        }

        let index = "0";

        if (strategyData.watchlist == "morningBreakouts")
        {
            index = "0";
        }
        else if (strategyData.watchlist == "indexETFs")
        {
            index = "1";
        }
        else if (strategyData.watchlist == "FAANG")
        {
            index = "2";
        }
        else if (strategyData.watchlist == "software")
        {
            index = "3";
        }
        else if (strategyData.watchlist == "travel")
        {
            index = "4";
        }
        else if (strategyData.watchlist == "custom")
        {
            index = "5";
            document.getElementById("symbolsEdit").style.display = "block";
        }

        let directionIndex = "0";
        if (strategyData.direction == "long")
        {
            directionIndex = "0";
        }
        else
        {
            directionIndex = "1";
        }

        let positionWeightIndex = "0";
        if (strategyData.distribution == "Equal weights")
        {
            positionWeightIndex = "0";
        }
        else
        {
            positionWeightIndex = "1";
        }

        let timeframeIndex = "0";
        if (strategyData.timeframe == 1)
        {
            timeframeIndex = "0";
        }
        else if (strategyData.timeframe == 5)
        {
            timeframeIndex = "1";
        }
        else if (strategyData.timeframe == 10)
        {
            timeframeIndex = "2";
        }
        else
        {
            timeframeIndex = "3";
        }

        //initialise strategy data div with first strategy
        let name = document.getElementById("strategyNameEdit");
        name.value = strategyData.strategyName;
        let description = document.getElementById("descriptionEdit");
        description.value = strategyData.description;
        let symbol = document.getElementById("symbolsEdit");
        symbol.value = symbolOutput;
        let maxAllocation = document.getElementById("maxAllocationEdit");
        maxAllocation.value = strategyData.maxAllocation
        let maxConcurrentTrades = document.getElementById("maxConcurrentTradesEdit");
        maxConcurrentTrades.value = strategyData.maxConcurrentTrades;
        let start = document.getElementById("startTimeEdit");
        start.value = strategyData.startTime;
        let end = document.getElementById("endTimeEdit");
        end.value = strategyData.endTime;
        let watchlist = document.getElementById("watchlistEdit");
        watchlist.selectedIndex = index;
        let direction = document.getElementById("directionEdit");
        direction.selectedIndex = directionIndex;
        let positionWeight = document.getElementById("positionWeightEdit");
        positionWeight.selectedIndex = positionWeightIndex;
        let timeframe = document.getElementById("timeframeEdit");
        timeframe.selectedIndex = timeframeIndex;

        displayEditStrategyModal(id);
    };

    xhttpRep.open("GET", '/get_strategy_details/' + encodeURIComponent(id), false);
    xhttpRep.send();
}

document.getElementById("strategyNameEdit").addEventListener("input", function() {
    let value = document.getElementById("strategyNameEdit").value;
    let character = value.charAt(value.length - 1);

    if (value.length > 30)
    {
        value = value.slice(0, 30);
    }
    else if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("strategyNameEdit").value = value;    
});

document.getElementById("descriptionEdit").addEventListener("input", function() {
    let value = document.getElementById("descriptionEdit").value;
    let character = value.charAt(value.length - 1);

    if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("descriptionEdit").value = value;    
});

document.getElementById("symbolsEdit").addEventListener("input", function() {
    let value = document.getElementById("symbolsEdit").value;
    let character = value.charAt(value.length - 1);

    const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ,';
    let found = false;
    for (var i = 0; i < 27; i+=1)
    {
        if (allowedCharacters.charAt(i) == character)
        {
            found = true;
            break;
        }
    }

    if (value.length > 100)
    {
        value = value.slice(0, 100);
    }
    else if (!found)
    {
        value = value.slice(0, value.length - 1);
    }
    
    if (value.length == 1 && character == ',')
    {
        value = value.slice(0, 0);
    }
    else if (value.length > 1 && character == ',' && value.charAt(value.length - 2) == ',')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("symbolsEdit").value = value;  
});

document.getElementById("maxAllocationEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("maxConcurrentTradesEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("startTimeEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("endTimeEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("maxAllocationEdit").addEventListener("input", function() {
    let value = document.getElementById("maxAllocationEdit").value;

    if (value.length > 2)
    {
        value = value.slice(0, 3);

        if (value != "100")
        {
            value = value.slice(0, 2);
        }
    }

    if (value.length == 0)
    {
        value = "";
    }

    let allocationValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("maxAllocationEdit").value = allocationValue;    
});

document.getElementById("maxConcurrentTradesEdit").addEventListener("input", function() {
    let value = document.getElementById("maxConcurrentTradesEdit").value;

    if (value.length > 1)
    {
        value = value.slice(0, 1);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("maxConcurrentTradesEdit").value = (value == "") ? value : newValue;    
});

document.getElementById("startTimeEdit").addEventListener("input", function() {
    let value = document.getElementById("startTimeEdit").value;

    if (value.length > 3)
    {
        value = value.slice(0, 3);
    }
    else if (value.length == 3)
    {
        if (parseInt(value) > 389)
        {
            value = value.slice(0, 2);
        }
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("startTimeEdit").value = newValue;    
});

document.getElementById("endTimeEdit").addEventListener("input", function() {
    let value = document.getElementById("endTimeEdit").value;

    if (value.length > 3)
    {
        value = value.slice(0, 3);
    }
    else if (value.length == 3)
    {
        if (parseInt(value) > 389)
        {
            value = value.slice(0, 2);
        }
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("endTimeEdit").value = newValue;    
});