window.addEventListener('DOMContentLoaded', function() {
    generateContent();

    document.getElementById("enterAppButton").addEventListener("click", function() {
        window.location.href = "/login";
    })
});

function generateContent()
{
    for (var i = 1; i < 5; i+=1)
    {
        let ID = "faq" + i.toString();
        let index = i.toString();
        document.getElementById(ID).addEventListener("click", function() {
            handleClick(index);
        })
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