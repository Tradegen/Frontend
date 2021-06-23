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

    document.getElementById("successModal").style.display = "none";
    document.getElementById("errorModal").style.display = "none";

    if (isMobile.any())
    {
        let main = document.getElementById("tableWrapperCreatePool");
        
        main.remove();
    }

    let status = document.getElementById("status").value;

    if (document.getElementById('successButton'))
    {
        document.getElementById('successButton')
        .addEventListener('click', function(){
            window.location.href = 'http://localhost:3000/profile';
        });
    }

    if (document.getElementById('errorButton'))
    {
        document.getElementById('errorButton')
            .addEventListener('click', hideErrorModal);
    }

    document.getElementById("successModal").style.fontSize = "16px";
    document.getElementById("successTitle").style.marginTop = "20px !important";
    document.getElementById("successModal").style.fontWeight = "500";
    document.getElementById("successTitle").style.marginBottom = "0px !important";
    document.getElementById("errorModal").style.fontSize = "16px";
    document.getElementById("errorTitle").style.marginTop = "20px !important";
    document.getElementById("errorModal").style.fontWeight = "500";
    document.getElementById("errorTitle").style.marginBottom = "0px !important";

    if (status == "Success")
    {
        displaySuccessModal();
    }
    else if (status != "")
    {
        displayErrorModal();
    }
});

document.getElementById("poolName").addEventListener("input", function() {
    let value = document.getElementById("poolName").value;
    let character = value.charAt(value.length - 1);

    if (value.length > 30)
    {
        value = value.slice(0, 30);
    }
    else if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("poolName").value = value;    
});

document.getElementById("description").addEventListener("input", function() {
    let value = document.getElementById("description").value;
    let character = value.charAt(value.length - 1);

    if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("description").value = value;    
});

document.getElementById("performanceFee").addEventListener("input", function() {
    let value = document.getElementById("performanceFee").value;

    if (value.length > 2)
    {
        value = value.slice(0, 3);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let performanceFeeValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("performanceFee").value = performanceFeeValue;    
});

document.getElementById("initialInvestment").addEventListener("input", function() {
    let value = document.getElementById("initialInvestment").value;

    if (value.length == 0)
    {
        value = "";
    }

    let investmentValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("initialInvestment").value = investmentValue;    
});

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
                window.location.href = 'http://localhost:3000/profile';
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

function displayErrorModal() 
{
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