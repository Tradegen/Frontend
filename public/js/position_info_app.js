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

let strategyStatus = document.getElementById("strategyStatus").value;

if (strategyStatus == "Live")
{
    document.getElementById("marketPrice").style.display = "block";
    document.getElementById("sharesBought").style.display = "block";
}

let loginStatus = document.getElementById("status").value;

document.addEventListener("DOMContentLoaded", async function() {
    let strategyID = document.getElementById("strategyID").value;
    document.getElementById("strategyName").addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
    document.getElementById("strategyName").addEventListener('mouseover', function(){ 
        document.getElementById("strategyName").style.cursor = "pointer";
    });

    if (document.getElementById("listingPrice"))
    {
        let positionID = document.getElementById("positionID").value;
        document.getElementById("listingPrice").addEventListener('click', function(){ window.location.href = '/buy_position/' + positionID; });
        document.getElementById("listingPrice").addEventListener('mouseover', function(){ 
            document.getElementById("listingPrice").style.cursor = "pointer";
        });
    }

    document.getElementById("symbol").addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
    document.getElementById("symbol").addEventListener('mouseover', function(){ 
        document.getElementById("symbol").style.cursor = "pointer";
    });

    const downColor = "#fe3957";
    const upColor = "#00cf92";

    let roi = parseFloat(document.getElementById("roi").innerText.split("%")[0]);

    if (roi > 0)
    {
        document.getElementById("roi").style.color = upColor;
        document.getElementById("roi").innerText = "+" + document.getElementById("roi").innerText;
    }
    else if (roi < 0)
    {
        document.getElementById("roi").style.color = downColor;
    }

    //render panels for mobile
    if(isMobile.any()) 
    {
        buildPanels();
    }
    else//render table for desktop
    {
        buildTable();
    }

    let address = document.getElementById("userAddress").value;

    document.getElementById("owner").addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(address); });
    document.getElementById("owner").addEventListener('mouseover', function(){ 
        document.getElementById("owner").style.cursor = "pointer";
    });
});

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
    let rawData = document.getElementById("sotong").value;
    let transactionHistoryData = JSON.parse(rawData).transactionHistory;

    let table = document.getElementById("transactionHistoryTable");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    let table_head = document.createElement("thead");
    let header_row = document.createElement("tr");
    let header_title1 = document.createElement("th");
    header_title1.innerText = "Date";
    header_title1.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1);
    let header_title2 = document.createElement("th");
    header_title2.innerText = "Price";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "From";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "To";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    for(let i = 0; i < transactionHistoryData.length; i++){
        let row = document.createElement("tr");

        let date = document.createElement("td");
        date.innerText = transactionHistoryData[i].date;
        strategyName.setAttribute("class", "marketsTableRowName");
        row.appendChild(date);
        let price = document.createElement("td");
        price.innerText =transactionHistoryData[i].price.toFixed(4) + " TGEN / token";
        price.setAttribute("class", "marketsTableRowName");
        row.appendChild(price);
        let userFrom = document.createElement("td");
        let userFromLink = document.createElement("a");
        userFromLink.innerText = transactionHistoryData[i].userFrom;
        let addressFrom = transactionHistoryData[i].addressFrom;
        userFromLink.addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(addressFrom); });
        userFromLink.addEventListener('mouseover', function(){ userFromLink.style.cursor = "pointer"; });
        userFrom.setAttribute("class", "marketsTableRowName");
        userFrom.appendChild(userFromLink);
        row.appendChild(userFrom);
        let userTo = document.createElement("td");
        let userToLink = document.createElement("a");
        userToLink.innerText = transactionHistoryData[i].userTo;
        let addressTo = transactionHistoryData[i].addressTo;
        userToLink.addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(addressTo); });
        userToLink.addEventListener('mouseover', function(){ userTo.style.cursor = "pointer"; });
        userTo.setAttribute("class", "marketsTableRowName");
        userTo.appendChild(userToLink);
        row.appendChild(userTo);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);
}

function buildPanels()
{
    let rawData = document.getElementById("sotong").value;
    let transactionHistoryData = JSON.parse(rawData).transactionHistory;

    let mainDiv = document.getElementById("panels");
    while (mainDiv.hasChildNodes())
    {
        mainDiv.removeChild(mainDiv.firstChild);
    }

    for (let i = 0; i < transactionHistoryData.length; i++)
    {
        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let date = document.createElement("div");
        date.setAttribute("class", "tradingBotStoreProductTitle");
        date.innerText = transactionHistoryData[i].date;
        topRow.appendChild(date);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        bottomRow.style.borderWidth = "0px";
        let price = document.createElement("div");
        price.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let priceText = document.createElement("a");
        priceText.setAttribute("class", "tradingBotStoreProductTopText");
        priceText.innerText = "Price";
        let priceBR = document.createElement("br");
        let priceData = document.createElement("a");
        priceData.setAttribute("class", "tradingBotStoreProductBottomText");
        priceData.innerText = transactionHistoryData[i].price.toFixed(4) + " TGEN / token";
        priceData.style.fontWeight = "500";
        price.appendChild(priceText);
        price.appendChild(priceBR);
        price.appendChild(priceData);
        let userFrom = document.createElement("div");
        userFrom.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let userFromText = document.createElement("a");
        userFromText.setAttribute("class", "tradingBotStoreProductTopText");
        userFromText.innerText = "From";
        let userFromBR = document.createElement("br");
        let userFromData = document.createElement("a");
        userFromData.setAttribute("class", "tradingBotStoreProductBottomText");
        userFromData.innerText = transactionHistoryData[i].userFrom;
        userFromData.style.fontWeight = "500";
        let addressFrom = transactionHistoryData[i].addressFrom;
        userFromData.addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(addressFrom); });
        userFromData.addEventListener('mouseover', function(){ userFromData.style.cursor = "pointer"; });
        userFrom.appendChild(userFromText);
        userFrom.appendChild(userFromBR);
        userFrom.appendChild(userFromData);
        let userTo = document.createElement("div");
        userTo.setAttribute("class", "tradingBotStoreProductAccuracy block extraMarginBottom");
        let userToText = document.createElement("a");
        userToText.setAttribute("class", "tradingBotStoreProductTopText");
        userToText.innerText = "To";
        let userToBR = document.createElement("br");
        let userToData = document.createElement("a");
        userToData.setAttribute("class", "tradingBotStoreProductBottomText");
        userToData.innerText = transactionHistoryData[i].userTo;
        userToData.style.fontWeight = "500";
        let addressTo = transactionHistoryData[i].addressTo;
        userToData.addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(addressTo); });
        userToData.addEventListener('mouseover', function(){ userToData.style.cursor = "pointer"; });
        userTo.appendChild(userToText);
        userTo.appendChild(userToBR);
        userTo.appendChild(userToData);

        bottomRow.appendChild(price);
        bottomRow.appendChild(userFrom);
        bottomRow.appendChild(userTo);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }
    document.getElementById("transactionHistoryDiv").remove();
}