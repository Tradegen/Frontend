var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;

var POOLS = [];

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

    let table = document.getElementById("poolsTable");
    table.setAttribute("class", "transactionsTable");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    let table_head = document.createElement("thead");
    let header_row = document.createElement("tr");
    let header_title1 = document.createElement("th");
    header_title1.innerText = "Pool Name";
    header_title1.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1);
    let header_title2 = document.createElement("th");
    header_title2.innerText = "Amount Invested";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Number of Tokens";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Average Price";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "Current Price";
    header_title5.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    header_title6.innerText = "Total Return";
    header_title6.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title6);
    let header_title7 = document.createElement("th");
    header_title7.innerText = "Actions";
    header_title7.setAttribute("class", "marketsTableCirculatingSupply");
    header_row.appendChild(header_title7);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for(let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let poolName = document.createElement("td");
        let poolNameLeft = document.createElement("a");
        poolNameLeft.innerText = POOLS[i].poolName;
        let poolID = POOLS[i].poolID;
        poolNameLeft.addEventListener('click', function(){ window.location.href = '/pool_info/' + poolID; });
        poolNameLeft.addEventListener('mouseover', function(){ poolNameLeft.style.cursor = "pointer"; });
        poolName.setAttribute("class", "marketsTableRowName");
        poolName.appendChild(poolNameLeft);
        row.appendChild(poolName);
        let amountInvested = document.createElement("td");
        amountInvested.innerText = "$" + (POOLS[i].averageTokenPrice * POOLS[i].numberOfTokens).toFixed(2);
        amountInvested.setAttribute("class", "marketsTableRowName");
        row.appendChild(amountInvested);
        let numberOfTokens = document.createElement("td");
        numberOfTokens.innerText = POOLS[i].numberOfTokens;
        numberOfTokens.setAttribute("class", "marketsTableRowName");
        row.appendChild(numberOfTokens);
        let averagePrice = document.createElement("td");
        averagePrice.innerText = "$" + POOLS[i].averageTokenPrice.toFixed(2);
        averagePrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(averagePrice);
        let currentPrice = document.createElement("td");
        currentPrice.innerText = "$" + (POOLS[i].poolValue / POOLS[i].circulatingSupply).toFixed(2);
        currentPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(currentPrice);

        let totalReturn = document.createElement("td");
        let arrow = document.createElement("i");
        let text= document.createElement("a");
        arrow.setAttribute("class", "material-icons");
        if (POOLS[i].totalReturn > 0)
        {
            totalReturn.style.color = upColor;
            arrow.innerText = "arrow_drop_up";
            arrow.style.color = upColor;
        }
        else if (POOLS[i].totalReturn == 0)
        {
            totalReturn.style.color = "#737373";
            arrow.innerText = "arrow_right";
            arrow.style.color = "#737373";
        }
        else
        {
            totalReturn.style.color = downColor;
            arrow.innerText = "arrow_drop_down";
            arrow.style.color = downColor;
            percent *= -1;
        }
        text.innerText = POOLS[i].totalReturn.toFixed(2) + "%";
        totalReturn.setAttribute("class", "marketsTableRowName");
        totalReturn.style.display = "flex";
        text.style.paddingTop = "3px";
        totalReturn.appendChild(arrow);
        totalReturn.appendChild(text);
        row.appendChild(totalReturn);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableCirculatingSupply");
        let viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.setAttribute("class", "viewButton");
        viewButton.addEventListener('click', function(){ 
            window.location.href = '/token_info/' + encodeURIComponent(poolID);
        });
        viewButton.addEventListener('mouseover', function(){ viewButton.style.cursor = "pointer"; });
        let manageButton = document.createElement("button");
        manageButton.innerText = "Manage";
        manageButton.setAttribute("class", "buyButton");
        manageButton.addEventListener('click', function(){ 
            window.location.href = '/manage_pool_investment/' + encodeURIComponent(poolID);
        });
        manageButton.style.marginLeft = "10px";
        manageButton.style.width = "80px";
        manageButton.addEventListener('mouseover', function(){ manageButton.style.cursor = "pointer"; });

        actions.appendChild(viewButton);
        actions.appendChild(manageButton);
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
        document.getElementById("boh").innerText = "No pools...yet!";
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
        let plus = (POOLS[i].totalReturn >= 0) ? '+' : '';

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = POOLS[i].poolName; 
        let poolID = POOLS[i].poolID;
        title.addEventListener('click', function(){ window.location.href = '/pool_info/' + poolID; });
        title.addEventListener('mouseover', function(){ title.style.cursor = "pointer"; });
        let amountInvested = document.createElement("div");
        amountInvested.setAttribute("class", "tradingBotStoreProductPrice");
        amountInvested.innerText = "$" + (POOLS[i].averageTokenPrice * POOLS[i].numberOfTokens).toFixed(2);
        amountInvested.style.fontSize = "16px";
        topRow.appendChild(title);
        topRow.appendChild(amountInvested);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        let numberOfTokens = document.createElement("div");
        numberOfTokens.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let numberOfTokensText = document.createElement("a");
        numberOfTokensText.setAttribute("class", "tradingBotStoreProductTopText");
        numberOfTokensText.innerText = "Number of Tokens";
        let numberOfTokensBR = document.createElement("br");
        let numberOfTokensData = document.createElement("a");
        numberOfTokensData.setAttribute("class", "tradingBotStoreProductBottomText");
        numberOfTokensData.innerText = POOLS[i].numberOfTokens;
        numberOfTokensData.style.fontWeight = "500";
        numberOfTokens.appendChild(numberOfTokensText);
        numberOfTokens.appendChild(numberOfTokensBR);
        numberOfTokens.appendChild(numberOfTokensData);
        let averagePrice = document.createElement("div");
        averagePrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let averagePriceText = document.createElement("a");
        averagePriceText.setAttribute("class", "tradingBotStoreProductTopText");
        averagePriceText.innerText = "Average Price";
        let averagePriceBR = document.createElement("br");
        let averagePriceData = document.createElement("a");
        averagePriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        averagePriceData.innerText = "$" + POOLS[i].averagePrice.toFixed(2);
        averagePriceData.style.fontWeight = "500";
        averagePrice.appendChild(averagePriceText);
        averagePrice.appendChild(averagePriceBR);
        averagePrice.appendChild(averagePriceData);
        let currentPrice = document.createElement("div");
        currentPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let currentPriceText = document.createElement("a");
        currentPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        currentPriceText.innerText = "Current Price";
        let currentPriceBR = document.createElement("br");
        let currentPriceData = document.createElement("a");
        currentPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        currentPriceData.innerText = "$" + (POOLS[i].poolValue / POOLS[i].circulatingSupply).toFixed(2);
        currentPriceData.style.fontWeight = "500";
        currentPrice.appendChild(currentPriceText);
        currentPrice.appendChild(currentPriceBR);
        currentPrice.appendChild(currentPriceData);

        let totalReturn = document.createElement("div");
        totalReturn.setAttribute("class", "tradingBotStoreProductFrequency block");
        let totalReturnText = document.createElement("a");
        totalReturnText.setAttribute("class", "tradingBotStoreProductTopText");
        totalReturnText.innerText = "Total Return";
        let totalReturnBR = document.createElement("br");
        let totalReturnData = document.createElement("div");
        totalReturnData.setAttribute("class", "tradingBotStoreProductBottomText");
        let totalReturnAmount = document.createElement("a");
        totalReturnAmount.innerText = plus + POOLS[i].totalReturn.toFixed(2) + "%";
        totalReturnData.style.fontWeight = "500";
        if (POOLS[i].totalReturn > 0)
        {
            totalReturnData.style.color = upColor;
        }
        else if (POOLS[i].totalReturn == 0)
        {
            totalReturnData.style.color = "#737373";
        }
        else
        {
            totalReturnData.style.color = downColor;
        }
        totalReturnData.appendChild(totalReturnAmount);
        totalReturn.appendChild(totalReturnText);
        totalReturn.appendChild(totalReturnBR);
        totalReturn.appendChild(totalReturnData);

        let viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.setAttribute("class", "viewButton");
        viewButton.addEventListener('click', function(){ window.location.href = '/pool_info/' + poolID; });

        let manageButton = document.createElement("button");
        manageButton.innerText = "Manage";
        manageButton.setAttribute("class", "buyButton");
        manageButton.addEventListener('click', function(){ window.location.href = '/manage_pool_investment/' + poolID; });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);
        buttons.appendChild(manageButton);

        bottomRow.appendChild(numberOfTokens);
        bottomRow.appendChild(averagePrice);
        bottomRow.appendChild(currentPrice);
        bottomRow.appendChild(totalReturn);
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
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        LENGTH = response.pools.length;

        MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);

        POOLS = response.pools;

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
    xhttpRep.open("GET", '/get_invested_pools', true);
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
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}