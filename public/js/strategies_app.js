var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;
var STRATEGIES = [];
var FILTERED_STRATEGIES = [];
var right2InnerText = "arrow_drop_down";
var right3InnerText = "arrow_drop_down";
var right4InnerText = "arrow_drop_down";
var right5InnerText = "arrow_drop_down";

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
    })

    getData();
});

function buildTable()
{
    const downColor = "#fe3957";
    const upColor = "#00cf92";

    let table = document.getElementById("strategiesTable");
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
    header_title2.innerText = "Developed On";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    let left3 = document.createElement("a");
    left3.innerText = "Circulating Supply";
    header_title3.setAttribute("class", "marketsTableCirculatingSupply");
    let right3 = document.createElement("i");
    right3.innerText = right3InnerText;
    right3.setAttribute("class", "material-icons");
    right3.setAttribute("id", "circulatingSupplySort");
    right3.addEventListener('click', function(){ customSort("circulatingSupplySort") });
    right3.addEventListener('mouseover', function(){ right3.style.cursor = "pointer"; });
    right3.style.fontSize = "16px";
    header_title3.appendChild(left3);
    header_title3.appendChild(right3);
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    let left4 = document.createElement("a");
    left4.innerText = "Token Price";
    header_title4.setAttribute("class", "marketsTableRowName");
    let right4 = document.createElement("i");
    right4.innerText = right4InnerText;
    right4.setAttribute("class", "material-icons");
    right4.setAttribute("id", "tokenPriceSort");
    right4.addEventListener('click', function(){ customSort("tokenPriceSort") });
    right4.addEventListener('mouseover', function(){ right4.style.cursor = "pointer"; });
    right4.style.fontSize = "16px";
    header_title4.appendChild(left4);
    header_title4.appendChild(right4);
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    let left5 = document.createElement("a");
    left5.innerText = "Change";
    header_title5.setAttribute("class", "marketsTableRowName");
    let right5 = document.createElement("i");
    right5.innerText = right5InnerText;
    right5.setAttribute("class", "material-icons");
    right5.setAttribute("id", "changeSort");
    right5.addEventListener('click', function(){ customSort("changeSort") });
    right5.addEventListener('mouseover', function(){ right5.style.cursor = "pointer"; });
    right5.style.fontSize = "16px";
    header_title5.appendChild(left5);
    header_title5.appendChild(right5);
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    header_title6.innerText = "Actions";
    header_title6.setAttribute("class", "marketsTableRowData");
    header_title6.style.textAlign = "center";
    header_row.appendChild(header_title6);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for (let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let percent = ((100.0 * (FILTERED_STRATEGIES[i].sharePrice - 1)) / 1);

        let strategyName = document.createElement("td");
        let strategyNameLeft = document.createElement("a");
        strategyNameLeft.innerText = FILTERED_STRATEGIES[i].strategyName;
        let strategyID = FILTERED_STRATEGIES[i].strategyID;
        strategyNameLeft.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        strategyNameLeft.addEventListener('mouseover', function(){ strategyNameLeft.style.cursor = "pointer"; });
        strategyName.setAttribute("class", "marketsTableRowName");
        let strategyNameRight = document.createElement("a");
        strategyNameRight.innerText = FILTERED_STRATEGIES[i].symbol;
        strategyNameRight.style.color = "rgb(128,138,157)";
        strategyNameRight.style.paddingLeft = "10px";
        strategyNameRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
        strategyNameRight.addEventListener('mouseover', function(){ strategyNameRight.style.cursor = "pointer"; });
        strategyName.appendChild(strategyNameLeft);
        strategyName.appendChild(strategyNameRight);
        row.appendChild(strategyName);
        let developedOn = document.createElement("td");
        developedOn.innerText = FILTERED_STRATEGIES[i].inceptionDate;
        developedOn.setAttribute("class", "marketsTableRowName");
        row.appendChild(developedOn);
        let sharesBought = document.createElement("td");
        sharesBought.innerText = FILTERED_STRATEGIES[i].sharesBought;
        sharesBought.setAttribute("class", "marketsTableCirculatingSupply");
        sharesBought.style.fontWeight = "500";
        row.appendChild(sharesBought);
        let currentPrice = document.createElement("td");
        currentPrice.innerText = FILTERED_STRATEGIES[i].sharePrice.toFixed(4) + " TGEN";
        currentPrice.setAttribute("class", "marketsTableRowName");
        currentPrice.style.fontWeight = "500";
        row.appendChild(currentPrice);
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
        arrow.style.paddingTop = "4px";
        text.style.paddingTop = "7px";
        change.appendChild(arrow);
        change.appendChild(text);
        row.appendChild(change);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableRowData");
        actions.style.textAlign = "center";
        let viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.setAttribute("class", "viewButton");
        let ID = FILTERED_STRATEGIES[i].strategyID;
        viewButton.addEventListener('click', function(){ window.location.href = '/strategy_info/' + ID; });

        let loginStatus = document.getElementById("status").value;

        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.setAttribute("class", "buyButton");
        buyButton.addEventListener('click', function(){ window.location.href = '/buy_new_tokens/' + ID; });
        actions.appendChild(viewButton);

        if (loginStatus == "true")
        {
            actions.appendChild(buyButton);
        }

        row.appendChild(actions);

        if (FILTERED_STRATEGIES[i].backTestResultsID != "")
        {
            table_body.appendChild(row);
        }
    }

    table.appendChild(table_body);

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    document.getElementById("loadingPage").remove();
    document.getElementById("sotong").style.display = "block";
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
        let percent = ((100.0 * (STRATEGIES[i].sharePrice - 1)) / 1);
        let plus = (percent >= 0) ? '+' : '';

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = STRATEGIES[i].strategyName;
        let inceptionDate = document.createElement("div");
        inceptionDate.setAttribute("class", "tradingBotStoreProductPrice");
        inceptionDate.innerText = "Developed on: " + STRATEGIES[i].inceptionDate;
        inceptionDate.style.fontSize = "16px";
        topRow.appendChild(title);
        topRow.appendChild(inceptionDate);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        let sharesBought = document.createElement("div");
        sharesBought.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let sharesBoughtText = document.createElement("a");
        sharesBoughtText.setAttribute("class", "tradingBotStoreProductTopText");
        sharesBoughtText.innerText = "Circulating Supply";
        let sharesBoughtBR = document.createElement("br");
        let sharesBoughtData = document.createElement("a");
        sharesBoughtData.setAttribute("class", "tradingBotStoreProductBottomText");
        sharesBoughtData.innerText = STRATEGIES[i].sharesBought.toString();
        sharesBoughtData.style.fontWeight = "500";
        sharesBought.appendChild(sharesBoughtText);
        sharesBought.appendChild(sharesBoughtBR);
        sharesBought.appendChild(sharesBoughtData);
        let currentPrice = document.createElement("div");
        currentPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let currentPriceText = document.createElement("a");
        currentPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        currentPriceText.innerText = "Token Price";
        let currentPriceBR = document.createElement("br");
        let currentPriceData = document.createElement("a");
        currentPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        currentPriceData.innerText = STRATEGIES[i].sharePrice.toFixed(4) + " TGEN";
        currentPriceData.style.fontWeight = "500";
        currentPrice.appendChild(currentPriceText);
        currentPrice.appendChild(currentPriceBR);
        currentPrice.appendChild(currentPriceData);
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
        let ID = STRATEGIES[i].strategyID;
        viewButton.addEventListener('click', function(){ window.location.href = '/strategy_info/' + ID; });

        let loginStatus = document.getElementById("status").value;

        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.setAttribute("class", "buyButton");
        buyButton.addEventListener('click', function(){ window.location.href = '/buy_new_tokens/' + ID; });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);

        if (loginStatus == "true")
        {
            buttons.appendChild(buyButton);
        }

        bottomRow.appendChild(sharesBought);
        bottomRow.appendChild(currentPrice);
        bottomRow.appendChild(change);
        bottomRow.appendChild(buttons);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    document.getElementById("loadingPage").remove();
    document.getElementById("table").remove();
    document.getElementById("sotong").style.display = "block";
}

function getData()
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        STRATEGIES = response.strategies;
        LENGTH = response.strategies.length;

        FILTERED_STRATEGIES = response.strategies;

        MAX_PAGES = Math.ceil(LENGTH / SIZE);

        STRATEGIES.sort((a, b) => a.percent - b.percent);

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
    xhttpRep.open("GET", '/get_all_strategies', true);
    xhttpRep.send();
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

function customSort(ID)
{
    if (document.getElementById(ID).innerText == "arrow_drop_down")
    {
        if (ID == "changeSort")
        {
            right5InnerText = "arrow_drop_up";
            FILTERED_STRATEGIES.sort((a, b) => a.percent - b.percent);
        }

        if (ID == "tokenPriceSort")
        {
            right4InnerText = "arrow_drop_up";
            FILTERED_STRATEGIES.sort((a, b) => a.sharePrice - b.sharePrice);
        }

        if (ID == "circulatingSupplySort")
        {
            right3InnerText = "arrow_drop_up";
            FILTERED_STRATEGIES.sort((a, b) => a.sharesBought - b.sharesBought);
        }
    }
    else
    {
        if (ID == "changeSort")
        {
            right5InnerText = "arrow_drop_down";
            FILTERED_STRATEGIES.sort((a, b) => b.percent - a.percent);
        }

        if (ID == "tokenPriceSort")
        {
            right4InnerText = "arrow_drop_down";
            FILTERED_STRATEGIES.sort((a, b) => b.sharePrice - a.sharePrice);
        }

        if (ID == "circulatingSupplySort")
        {
            right3InnerText = "arrow_drop_down";
            FILTERED_STRATEGIES.sort((a, b) => b.sharesBought - a.sharesBought);
        }
    }

    buildTable();
}