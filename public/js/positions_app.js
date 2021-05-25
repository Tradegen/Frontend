var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;

var positions = [];

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
    header_title2.innerText = "LP Tokens";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title11 = document.createElement("th");
    header_title11.innerText = "Amount Invested";
    header_title11.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title11);
    let header_title1111 = document.createElement("th");
    header_title1111.innerText = "% of Pool";
    header_title1111.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1111);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Current Pool Size";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Max Pool Size";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "Today's Return";
    header_title5.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    header_title6.innerText = "Available Yield";
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

        let strategyName = document.createElement("td");
        let strategyNameLeft = document.createElement("a");
        strategyNameLeft.innerText = positions[i].strategyName;
        let strategyID = positions[i].strategyID;
        strategyNameLeft.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        strategyNameLeft.addEventListener('mouseover', function(){ strategyNameLeft.style.cursor = "pointer"; });
        strategyName.setAttribute("class", "marketsTableRowName");
        let strategyNameRight = document.createElement("a");
        strategyNameRight.innerText = positions[i].strategySymbol;
        strategyNameRight.style.color = "rgb(128,138,157)";
        strategyNameRight.style.paddingLeft = "10px";
        strategyNameRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
        strategyNameRight.addEventListener('mouseover', function(){ strategyNameRight.style.cursor = "pointer"; });
        strategyName.appendChild(strategyNameLeft);
        strategyName.appendChild(strategyNameRight);
        row.appendChild(strategyName);
        let numberOfLPTokens = document.createElement("td");
        let numberOfLPTokensLeft = document.createElement("a");
        numberOfLPTokensLeft.innerText = positions[i].numberOfLPTokens;
        numberOfLPTokensLeft.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        numberOfLPTokensLeft.addEventListener('mouseover', function(){ numberOfLPTokensLeft.style.cursor = "pointer"; });
        numberOfLPTokens.setAttribute("class", "marketsTableRowName");
        let numberOfLPTokensRight = document.createElement("a");
        numberOfLPTokensRight.innerText = positions[i].strategySymbol;
        numberOfLPTokensRight.style.color = "rgb(128,138,157)";
        numberOfLPTokensRight.style.paddingLeft = "10px";
        numberOfLPTokensRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
        numberOfLPTokensRight.addEventListener('mouseover', function(){ numberOfLPTokensRight.style.cursor = "pointer"; });
        numberOfLPTokens.appendChild(numberOfLPTokensLeft);
        numberOfLPTokens.appendChild(numberOfLPTokensRight);
        row.appendChild(numberOfLPTokens);
        let amountInvested = document.createElement("td");
        amountInvested.innerText = positions[i].amountInvested.toFixed(2) + " TGEN";
        amountInvested.setAttribute("class", "marketsTableRowName");
        row.appendChild(amountInvested);
        let percentOfPool = document.createElement("td");
        percentOfPool.innerText = positions[i].percentOfPool.toFixed(2) + "%";
        percentOfPool.setAttribute("class", "marketsTableRowName");
        row.appendChild(percentOfPool);
        let currentPoolSize = document.createElement("td");
        currentPoolSize.innerText = positions[i].currentPoolSize.toFixed(2) + " TGEN";
        currentPoolSize.setAttribute("class", "marketsTableRowName");
        row.appendChild(currentPoolSize);
        let maxPoolSize = document.createElement("td");
        maxPoolSize.innerText = positions[i].maxPoolSize.toFixed(2) + " TGEN";
        maxPoolSize.setAttribute("class", "marketsTableRowName");
        row.appendChild(maxPoolSize);

        let todayReturn = document.createElement("td");
        let arrow = document.createElement("i");
        let text= document.createElement("a");
        arrow.setAttribute("class", "material-icons");
        if (positions[i].todayReturn > 0)
        {
            todayReturn.style.color = upColor;
            arrow.innerText = "arrow_drop_up";
            arrow.style.color = upColor;
        }
        else if (positions[i].todayReturn == 0)
        {
            todayReturn.style.color = "#737373";
            arrow.innerText = "arrow_right";
            arrow.style.color = "#737373";
        }
        else
        {
            todayReturn.style.color = downColor;
            arrow.innerText = "arrow_drop_down";
            arrow.style.color = downColor;
            percent *= -1;
        }
        text.innerText = positions[i].todayReturn.toFixed(2) + "%";
        todayReturn.setAttribute("class", "marketsTableRowName");
        todayReturn.style.display = "flex";
        text.style.paddingTop = "3px";
        todayReturn.appendChild(arrow);
        todayReturn.appendChild(text);
        row.appendChild(todayReturn);

        let availableYield = document.createElement("td");
        availableYield.innerText = positions[i].availableYield.toFixed(4) + " TGEN";
        availableYield.setAttribute("class", "marketsTableRowName");
        row.appendChild(availableYield);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableCirculatingSupply");
        let viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.setAttribute("class", "viewButton");
        viewButton.addEventListener('click', function(){ 
            window.location.href = 'https://www.tradegen.io/token_info/' + encodeURIComponent(strategyID);
        });
        viewButton.addEventListener('mouseover', function(){ viewButton.style.cursor = "pointer"; });
        let manageButton = document.createElement("button");
        manageButton.innerText = "Manage";
        manageButton.setAttribute("class", "buyButton");
        manageButton.addEventListener('click', function(){ 
            window.location.href = 'https://www.tradegen.io/manage_pool/' + encodeURIComponent(strategyID);
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
        let plus = (percent >= 0) ? '+' : '';

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = positions[i].strategyName; 
        let strategyID = positions[i].strategyID;
        title.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        title.addEventListener('mouseover', function(){ title.style.cursor = "pointer"; });
        let amountInvested = document.createElement("div");
        amountInvested.setAttribute("class", "tradingBotStoreProductPrice");
        amountInvested.innerText = positions[i].amountInvested;
        amountInvested.style.fontSize = "16px";
        topRow.appendChild(title);
        topRow.appendChild(amountInvested);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        let numberOfLPTokens = document.createElement("div");
        numberOfLPTokens.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let numberOfLPTokensText = document.createElement("a");
        numberOfLPTokensText.setAttribute("class", "tradingBotStoreProductTopText");
        numberOfLPTokensText.innerText = "LP Tokens";
        let numberOfLPTokensBR = document.createElement("br");
        let numberOfLPTokensData = document.createElement("a");
        numberOfLPTokensData.setAttribute("class", "tradingBotStoreProductBottomText");
        numberOfLPTokensData.innerText = positions[i].numberOfLPTokens.toString() + " " + positions[i].strategySymbol;
        numberOfLPTokensData.style.fontWeight = "500";
        numberOfLPTokens.appendChild(numberOfLPTokensText);
        numberOfLPTokens.appendChild(numberOfLPTokensBR);
        numberOfLPTokens.appendChild(numberOfLPTokensData);
        let percentOfPool = document.createElement("div");
        percentOfPool.setAttribute("class", "tradingBotStoreProductFrequency block");
        let percentOfPoolText = document.createElement("a");
        percentOfPoolText.setAttribute("class", "tradingBotStoreProductTopText");
        percentOfPoolText.innerText = "% of Pool";
        let percentOfPoolBR = document.createElement("br");
        let percentOfPoolData = document.createElement("a");
        percentOfPoolData.setAttribute("class", "tradingBotStoreProductBottomText");
        percentOfPoolData.innerText = positions[i].percentOfPool.toFixed(2) + "%";
        percentOfPoolData.style.fontWeight = "500";
        percentOfPool.appendChild(percentOfPoolText);
        percentOfPool.appendChild(percentOfPoolBR);
        percentOfPool.appendChild(percentOfPoolData);
        let currentPoolSize = document.createElement("div");
        currentPoolSize.setAttribute("class", "tradingBotStoreProductFrequency block");
        let currentPoolSizeText = document.createElement("a");
        currentPoolSizeText.setAttribute("class", "tradingBotStoreProductTopText");
        currentPoolSizeText.innerText = "Current Pool Size";
        let currentPoolSizeBR = document.createElement("br");
        let currentPoolSizeData = document.createElement("a");
        currentPoolSizeData.setAttribute("class", "tradingBotStoreProductBottomText");
        currentPoolSizeData.innerText = positions[i].currentPoolSize.toFixed(2) + " TGEN";
        currentPoolSizeData.style.fontWeight = "500";
        currentPoolSize.appendChild(currentPoolSizeText);
        currentPoolSize.appendChild(currentPoolSizeBR);
        currentPoolSize.appendChild(currentPoolSizeData);
        let maxPoolSize = document.createElement("div");
        maxPoolSize.setAttribute("class", "tradingBotStoreProductFrequency block");
        let maxPoolSizeText = document.createElement("a");
        maxPoolSizeText.setAttribute("class", "tradingBotStoreProductTopText");
        maxPoolSizeText.innerText = "Max Pool Size";
        let maxPoolSizeBR = document.createElement("br");
        let maxPoolSizeData = document.createElement("a");
        maxPoolSizeData.setAttribute("class", "tradingBotStoreProductBottomText");
        maxPoolSizeData.innerText = positions[i].maxPoolSize.toFixed(2) + " TGEN";
        maxPoolSizeData.style.fontWeight = "500";
        maxPoolSize.appendChild(maxPoolSizeText);
        maxPoolSize.appendChild(maxPoolSizeBR);
        maxPoolSize.appendChild(maxPoolSizeData);

        let todayReturn = document.createElement("div");
        todayReturn.setAttribute("class", "tradingBotStoreProductFrequency block");
        let todayReturnText = document.createElement("a");
        todayReturnText.setAttribute("class", "tradingBotStoreProductTopText");
        todayReturnText.innerText = "Today's Return";
        let todayReturnBR = document.createElement("br");
        let todayReturnData = document.createElement("div");
        todayReturnData.setAttribute("class", "tradingBotStoreProductBottomText");
        let todayReturnAmount = document.createElement("a");
        todayReturnAmount.innerText = plus + positions[i].todayReturn.toFixed(2) + "%";
        todayReturnData.style.fontWeight = "500";
        if (positions[i].todayReturn > 0)
        {
            todayReturnData.style.color = upColor;
        }
        else if (positions[i].todayReturn == 0)
        {
            todayReturnData.style.color = "#737373";
        }
        else
        {
            todayReturnData.style.color = downColor;
        }
        todayReturnData.appendChild(todayReturnAmount);
        todayReturn.appendChild(todayReturnText);
        todayReturn.appendChild(todayReturnBR);
        todayReturn.appendChild(todayReturnData);

        let availableYield = document.createElement("div");
        availableYield.setAttribute("class", "tradingBotStoreProductFrequency block");
        let availableYieldText = document.createElement("a");
        availableYieldText.setAttribute("class", "tradingBotStoreProductTopText");
        availableYieldText.innerText = "Available Yield";
        let availableYieldBR = document.createElement("br");
        let availableYieldData = document.createElement("a");
        availableYieldData.setAttribute("class", "tradingBotStoreProductBottomText");
        availableYieldData.innerText = positions[i].availableYield.toFixed(4) + " TGEN";
        availableYieldData.style.fontWeight = "500";
        availableYield.appendChild(availableYieldText);
        availableYield.appendChild(availableYieldBR);
        availableYield.appendChild(availableYieldData);

        let viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.setAttribute("class", "viewButton");
        viewButton.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });

        let manageButton = document.createElement("button");
        manageButton.innerText = "Manage";
        manageButton.setAttribute("class", "buyButton");
        manageButton.addEventListener('click', function(){ window.location.href = '/manage_pool/' + strategyID; });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);
        buttons.appendChild(manageButton);

        bottomRow.appendChild(numberOfLPTokens);
        bottomRow.appendChild(percentOfPool);
        bottomRow.appendChild(currentPoolSize);
        bottomRow.appendChild(maxPoolSize);
        bottomRow.appendChild(todayReturn);
        bottomRow.appendChild(availableYield);
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

        LENGTH = response.positions.length;

        MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);

        positions = response.positions;

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
    xhttpRep.open("GET", '/get_positions', true);
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