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

if (document.getElementById('errorMessage'))
{
    document.getElementById("errorMessage").style.color = "#d41613";
}

document.getElementById("message").addEventListener("keydown", function() {
    if(event.key==='*' || event.key==='~' || event.key==='`' || event.key==='^' || event.key==='#' || event.key==='&' || event.key==='|' || event.key==='{' || event.key==='}' || event.key==='[' || event.key===']')
    {
        event.preventDefault();
    }
})

document.getElementById("firstName").addEventListener("keydown", function() {
    if(event.key==='*' || event.key==='~' || event.key==='`' || event.key==='^' || event.key==='#' || event.key==='&' || event.key==='|' || event.key==='{' || event.key==='}' || event.key==='[' || event.key===']')
    {
        event.preventDefault();
    }
})

document.getElementById("lastName").addEventListener("keydown", function() {
    if(event.key==='*' || event.key==='~' || event.key==='`' || event.key==='^' || event.key==='#' || event.key==='&' || event.key==='|' || event.key==='{' || event.key==='}' || event.key==='[' || event.key===']')
    {
        event.preventDefault();
    }
})

document.getElementById("email").addEventListener("keydown", function() {
    if(event.key==='*' || event.key==='~' || event.key==='`' || event.key==='^' || event.key==='#' || event.key==='&' || event.key==='|' || event.key==='{' || event.key==='}' || event.key==='[' || event.key===']')
    {
        event.preventDefault();
    }
})

document.getElementById("subject").addEventListener("keydown", function() {
    if(event.key==='*' || event.key==='~' || event.key==='`' || event.key==='^' || event.key==='#' || event.key==='&' || event.key==='|' || event.key==='{' || event.key==='}' || event.key==='[' || event.key===']')
    {
        event.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", async function() {

    document.getElementById("successModal").style.display = "none";
    document.getElementById("errorModal").style.display = "none";

    let status = document.getElementById("status").value;

    if (document.getElementById('successButton'))
    {
        document.getElementById('successButton')
        .addEventListener('click', function(){
            window.location.href = 'http://localhost:3000';
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

    if (status == "false")
    {
        displaySuccessModal();
    }
    else if (status == "true")
    {
        displayErrorModal();
    }
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
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#successModal" ).dialog({
        height: 45,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModal").dialog("close");
                window.location.href = 'http://localhost:3000';
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
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#errorModal" ).dialog({
        height: 45,
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