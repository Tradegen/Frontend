var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;
var POSITIONS = [];
var FILTERED_POSITIONS = [];
var right11InnerText = "arrow_drop_down";
var right3InnerText = "arrow_drop_down";
var right4InnerText = "arrow_drop_down";
var right5InnerText = "arrow_drop_down";
var right6InnerText = "arrow_drop_down";

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
    //display fewer positions per page on mobile
    if (isMobile.any())
    {
        SIZE = 10;
        document.getElementById("web").remove();
    }

    document.getElementById("decreasePage").addEventListener("click", function() {
        if (PAGE > 1)
        {
            PAGE = PAGE - 1;
            if (isMobile.any())
            {
                buildPanels();
            }
            else
            {
                buildTable();
            }
        }
    });
    
    document.getElementById("increasePage").addEventListener("click", function() {
        if (PAGE < MAX_PAGES)
        {
            PAGE = PAGE + 1;
            if (isMobile.any())
            {
                buildPanels();
            }
            else
            {
                buildTable();
            }
        }
    });

    document.getElementById("decreasePage").addEventListener("mouseover", function() {
        document.getElementById("decreasePage").style.cursor = "pointer";
    });

    document.getElementById("increasePage").addEventListener("mouseover", function() {
        document.getElementById("increasePage").style.cursor = "pointer";
    });

    getData();
});

function buildTable()
{
    const downColor = "#fe3957";
    const upColor = "#00cf92";

    let table = document.getElementById("positionsTable");
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
    header_title2.innerText = "Entry Date";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title11 = document.createElement("th");
    let left11 = document.createElement("a");
    left11.innerText = "Tokens";
    header_title11.setAttribute("class", "marketsTableRowName");
    let right11 = document.createElement("i");
    right11.innerText = right11InnerText;
    right11.setAttribute("class", "material-icons");
    right11.setAttribute("id", "tokenSort");
    right11.addEventListener('click', function(){ customSort("tokenSort") });
    right11.addEventListener('mouseover', function(){ right11.style.cursor = "pointer"; });
    right11.style.fontSize = "16px";
    header_title11.appendChild(left11);
    header_title11.appendChild(right11);
    header_row.appendChild(header_title11);
    let header_title1111 = document.createElement("th");
    header_title1111.innerText = "Class";
    header_title1111.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1111);
    let header_title3 = document.createElement("th");
    let left3 = document.createElement("a");
    left3.innerText = "Entry Price";
    header_title3.setAttribute("class", "marketsTableRowName");
    let right3 = document.createElement("i");
    right3.innerText = right3InnerText;
    right3.setAttribute("class", "material-icons");
    right3.setAttribute("id", "entryPriceSort");
    right3.addEventListener('click', function(){ customSort("entryPriceSort") });
    right3.addEventListener('mouseover', function(){ right3.style.cursor = "pointer"; });
    right3.style.fontSize = "16px";
    header_title3.appendChild(left3);
    header_title3.appendChild(right3);
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    let left4 = document.createElement("a");
    left4.innerText = "Current Price";
    header_title4.setAttribute("class", "marketsTableRowName");
    let right4 = document.createElement("i");
    right4.innerText = right4InnerText;
    right4.setAttribute("class", "material-icons");
    right4.setAttribute("id", "currentPriceSort");
    right4.addEventListener('click', function(){ customSort("currentPriceSort") });
    right4.addEventListener('mouseover', function(){ right4.style.cursor = "pointer"; });
    right4.style.fontSize = "16px";
    header_title4.appendChild(left4);
    header_title4.appendChild(right4);
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    let left5 = document.createElement("a");
    left5.innerText = "Current Value";
    header_title5.setAttribute("class", "marketsTableRowName");
    let right5 = document.createElement("i");
    right5.innerText = right5InnerText;
    right5.setAttribute("class", "material-icons");
    right5.setAttribute("id", "currentValueSort");
    right5.addEventListener('click', function(){ customSort("currentValueSort") });
    right5.addEventListener('mouseover', function(){ right5.style.cursor = "pointer"; });
    right5.style.fontSize = "16px";
    header_title5.appendChild(left5);
    header_title5.appendChild(right5);
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    let left6 = document.createElement("a");
    left6.innerText = "Change";
    header_title6.setAttribute("class", "marketsTableRowName");
    let right6 = document.createElement("i");
    right6.innerText = right6InnerText;
    right6.setAttribute("class", "material-icons");
    right6.setAttribute("id", "changeSort");
    right6.addEventListener('click', function(){ customSort("changeSort") });
    right6.addEventListener('mouseover', function(){ right6.style.cursor = "pointer"; });
    right6.style.fontSize = "16px";
    header_title6.appendChild(left6);
    header_title6.appendChild(right6);
    header_row.appendChild(header_title6);
    let header_title7 = document.createElement("th");
    header_title7.innerText = "Actions";
    header_title7.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title7);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for(let i = start; i > end; i--){
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let percent = (100 * (FILTERED_POSITIONS[i].currentPrice - FILTERED_POSITIONS[i].entryPrice)) / FILTERED_POSITIONS[i].entryPrice;
        let value = FILTERED_POSITIONS[i].currentPrice * FILTERED_POSITIONS[i].shares;

        let strategyName = document.createElement("td");
        let strategyNameLink = document.createElement("a");
        strategyNameLink.innerText = FILTERED_POSITIONS[i].strategyName;
        let strategyID = FILTERED_POSITIONS[i].strategyID;
        strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
        strategyName.setAttribute("class", "marketsTableRowName");
        strategyName.appendChild(strategyNameLink);
        row.appendChild(strategyName);
        let entryDate = document.createElement("td");
        entryDate.innerText = FILTERED_POSITIONS[i].entryDate;
        entryDate.setAttribute("class", "marketsTableRowName");
        row.appendChild(entryDate);
        let shares = document.createElement("td");
        shares.innerText = FILTERED_POSITIONS[i].shares;
        shares.setAttribute("class", "marketsTableRowName");
        row.appendChild(shares);
        let shareClass = document.createElement("td");
        shareClass.innerText = FILTERED_POSITIONS[i].shareClass;
        shareClass.setAttribute("class", "marketsTableRowName");
        row.appendChild(shareClass);
        let entryPrice = document.createElement("td");
        entryPrice.innerText = FILTERED_POSITIONS[i].entryPrice.toFixed(4) + " TGEN";
        entryPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(entryPrice);
        let currentPrice = document.createElement("td");
        currentPrice.innerText = FILTERED_POSITIONS[i].currentPrice.toFixed(4) + " TGEN";
        currentPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(currentPrice);
        let currentValue = document.createElement("td");
        currentValue.innerText = value.toFixed(4) + " TGEN";
        currentValue.setAttribute("class", "marketsTableRowName");
        row.appendChild(currentValue);
        let change = document.createElement("td");
        let arrow = document.createElement("i");
        let text= document.createElement("a");
        arrow.setAttribute("class", "material-icons");
        if (percent > 0)
        {
            change.style.color = upColor;
            arrow.innerText = "arrow_drop_up";
            arrow.style.color = upColor;
        }
        else if (percent == 0)
        {
            change.style.color = "#737373";
            arrow.innerText = "arrow_right";
            arrow.style.color = "#737373";
        }
        else
        {
            change.style.color = downColor;
            arrow.innerText = "arrow_drop_down";
            arrow.style.color = downColor;
            percent *= -1;
        }
        text.innerText = percent.toFixed(2) + "%";
        change.setAttribute("class", "marketsTableRowName");
        change.style.display = "flex";
        text.style.paddingTop = "3px";
        change.appendChild(arrow);
        change.appendChild(text);
        row.appendChild(change);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableRowName");
        let viewButton = document.createElement("i");
        viewButton.innerText = "timeline";
        viewButton.setAttribute("class", "material-icons actionIcon");
        let ID = FILTERED_POSITIONS[i].address;
        viewButton.addEventListener('click', function(){ window.location.href = '/position_info/' + ID; });
        actions.appendChild(viewButton);
        row.appendChild(actions);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    document.getElementById("loadingPage").remove();
    
    if (LENGTH > 0)
    {
        document.getElementById("mainContent").style.display = "block";
    }
    else
    {
        document.getElementById("boh").style.display = "block";
        document.getElementById("boh").innerText = "No positions...yet!";
    }
}

function buildPanels()
{
    const downColor = "#fe3957";
    const upColor = "#00cf92";

    let mainDiv = document.getElementById("panels");
    while (mainDiv.hasChildNodes())
    {
        mainDiv.removeChild(mainDiv.firstChild);
    }

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for (let i = start; i > end; i--)
    {
        let percent = (100 * (FILTERED_POSITIONS[i].currentPrice - FILTERED_POSITIONS[i].entryPrice)) / FILTERED_POSITIONS[i].entryPrice;
        let value = FILTERED_POSITIONS[i].currentPrice * FILTERED_POSITIONS[i].shares
        let plus = (percent >= 0) ? '+' : '';

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = FILTERED_POSITIONS[i].strategyName;
        let strategyID = FILTERED_POSITIONS[i].strategyID;
        title.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        title.addEventListener('mouseover', function(){ title.style.cursor = "pointer"; });
        let entryDate = document.createElement("div");
        entryDate.setAttribute("class", "tradingBotStoreProductPrice");
        entryDate.innerText = "Purchased on: " + FILTERED_POSITIONS[i].entryDate;
        entryDate.style.fontSize = "16px";
        topRow.appendChild(title);
        topRow.appendChild(entryDate);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        let size = document.createElement("div");
        size.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let sizeText = document.createElement("a");
        sizeText.setAttribute("class", "tradingBotStoreProductTopText");
        sizeText.innerText = "Size";
        let sizeBR = document.createElement("br");
        let sizeData = document.createElement("a");
        sizeData.setAttribute("class", "tradingBotStoreProductBottomText");
        sizeData.innerText = FILTERED_POSITIONS[i].shares.toString() + " tokens";
        sizeData.style.fontWeight = "500";
        size.appendChild(sizeText);
        size.appendChild(sizeBR);
        size.appendChild(sizeData);
        let shareClass = document.createElement("div");
        shareClass.setAttribute("class", "tradingBotStoreProductFrequency block");
        let shareClassText = document.createElement("a");
        shareClassText.setAttribute("class", "tradingBotStoreProductTopText");
        shareClassText.innerText = "Token Class";
        let shareClassBR = document.createElement("br");
        let shareClassData = document.createElement("a");
        shareClassData.setAttribute("class", "tradingBotStoreProductBottomText");
        shareClassData.innerText = FILTERED_POSITIONS[i].shareClass.toFixed(4) + " TGEN";
        shareClassData.style.fontWeight = "500";
        shareClass.appendChild(shareClassText);
        shareClass.appendChild(shareClassBR);
        shareClass.appendChild(shareClassData);
        let entryPrice = document.createElement("div");
        entryPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let entryPriceText = document.createElement("a");
        entryPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        entryPriceText.innerText = "Entry Price";
        let entryPriceBR = document.createElement("br");
        let entryPriceData = document.createElement("a");
        entryPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        entryPriceData.innerText = FILTERED_POSITIONS[i].entryPrice.toFixed(4) + " TGEN";
        entryPriceData.style.fontWeight = "500";
        entryPrice.appendChild(entryPriceText);
        entryPrice.appendChild(entryPriceBR);
        entryPrice.appendChild(entryPriceData);
        let currentPrice = document.createElement("div");
        currentPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let currentPriceText = document.createElement("a");
        currentPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        currentPriceText.innerText = "Share Price";
        let currentPriceBR = document.createElement("br");
        let currentPriceData = document.createElement("a");
        currentPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        currentPriceData.innerText = FILTERED_POSITIONS[i].currentPrice.toFixed(4) + " TGEN";
        currentPriceData.style.fontWeight = "500";
        currentPrice.appendChild(currentPriceText);
        currentPrice.appendChild(currentPriceBR);
        currentPrice.appendChild(currentPriceData);
        let currentValue = document.createElement("div");
        currentValue.setAttribute("class", "tradingBotStoreProductFrequency block");
        let currentValueText = document.createElement("a");
        currentValueText.setAttribute("class", "tradingBotStoreProductTopText");
        currentValueText.innerText = "Current Value";
        let currentValueBR = document.createElement("br");
        let currentValueData = document.createElement("a");
        currentValueData.setAttribute("class", "tradingBotStoreProductBottomText");
        currentValueData.innerText = value.toFixed(4) + " TGEN";
        currentValueData.style.fontWeight = "500";
        currentValue.appendChild(currentValueText);
        currentValue.appendChild(currentValueBR);
        currentValue.appendChild(currentValueData);

        let change = document.createElement("div");
        change.setAttribute("class", "tradingBotStoreProductFrequency block");
        let changeText = document.createElement("a");
        changeText.setAttribute("class", "tradingBotStoreProductTopText");
        changeText.innerText = "Change";
        let changeBR = document.createElement("br");
        let changeData = document.createElement("div");
        changeData.setAttribute("class", "tradingBotStoreProductBottomText");
        let changeAmount = document.createElement("a");
        changeAmount.innerText = plus + percent.toFixed(2) + "%";
        changeData.style.fontWeight = "500";
        if (percent > 0)
        {
            changeData.style.color = upColor;
        }
        else if (percent == 0)
        {
            changeData.style.color = "#737373";
        }
        else
        {
            changeData.style.color = downColor;
        }
        changeData.appendChild(changeAmount);
        change.appendChild(changeText);
        change.appendChild(changeBR);
        change.appendChild(changeData);

        let viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.setAttribute("class", "viewButton");
        let ID = FILTERED_POSITIONS[i].address;
        viewButton.addEventListener('click', function(){ window.location.href = '/position_info/' + ID; });;

        let sellButton = document.createElement("button");
        sellButton.innerText = "Sell";
        sellButton.setAttribute("class", "buyButton");
        sellButton.addEventListener('click', function(){ displayModal(FILTERED_POSITIONS[i].positionID.toString()); });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);

        bottomRow.appendChild(size);
        bottomRow.appendChild(shareClass);
        bottomRow.appendChild(entryPrice);
        bottomRow.appendChild(currentPrice);
        bottomRow.appendChild(currentValue);
        bottomRow.appendChild(change);
        bottomRow.appendChild(buttons);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    document.getElementById("loadingPage").remove();
    document.getElementById("table").remove();
    document.getElementById("mainContent").style.display = "block";
}

function getData()
{
    let address = document.getElementById("sotong2").value;
    let temp2 = JSON.stringify({address: address});
    console.log(address);
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        POSITIONS = response.positions;
        LENGTH = response.positions.length;

        MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);

        FILTERED_POSITIONS = response.positions;

        document.getElementById("username").innerText = response.username;

        //render panels for mobile
        if(isMobile.any()) 
        {
            buildPanels();
        }
        else//render table for desktop
        {
            buildTable();
        }
    }
    xhttpRep.open("POST", '/get_public_positions', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp2);
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

function customSort(ID)
{
    if (document.getElementById(ID).innerText == "arrow_drop_down")
    {
        if (ID == "changeSort")
        {
            right6InnerText = "arrow_drop_up";
            FILTERED_POSITIONS.sort((a, b) => a.percent - b.percent);
        }

        if (ID == "currentValueSort")
        {
            right5InnerText = "arrow_drop_up";
            FILTERED_POSITIONS.sort((a, b) => a.value - b.value);
        }

        if (ID == "currentPriceSort")
        {
            right4InnerText = "arrow_drop_up";
            FILTERED_POSITIONS.sort((a, b) => a.currentPrice - b.currentPrice);
        }

        if (ID == "entryPriceSort")
        {
            right3InnerText = "arrow_drop_up";
            FILTERED_POSITIONS.sort((a, b) => a.entryPrice - b.entryPrice);
        }

        if (ID == "tokenSort")
        {
            right11InnerText = "arrow_drop_up";
            FILTERED_POSITIONS.sort((a, b) => a.shares - b.shares);
        }
    }
    else
    {
        if (ID == "changeSort")
        {
            right6InnerText = "arrow_drop_down";
            FILTERED_POSITIONS.sort((a, b) => b.percent - a.percent);
        }

        if (ID == "currentValueSort")
        {
            right5InnerText = "arrow_drop_down";
            FILTERED_POSITIONS.sort((a, b) => b.value - a.value);
        }

        if (ID == "currentPriceSort")
        {
            right4InnerText = "arrow_drop_down";
            FILTERED_POSITIONS.sort((a, b) => b.currentPrice - a.currentPrice);
        }

        if (ID == "entryPriceSort")
        {
            right3InnerText = "arrow_drop_down";
            FILTERED_POSITIONS.sort((a, b) => b.entryPrice - a.entryPrice);
        }

        if (ID == "tokenSort")
        {
            right11InnerText = "arrow_drop_down";
            FILTERED_POSITIONS.sort((a, b) => b.shares - a.shares);
        }
    }

    buildTable();
}