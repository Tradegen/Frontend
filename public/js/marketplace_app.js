var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;
var LISTINGS = [];
var FILTERED_LISTINGS = [];
var right2InnerText = "arrow_drop_down";
var right3InnerText = "arrow_drop_down";
var right4InnerText = "arrow_drop_down";
var right5InnerText = "arrow_drop_down";

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
    })

    getData();
});

function buildTable()
{
    const downColor = "#fe3957";
    const upColor = "#00cf92";

    let table = document.getElementById("marketplaceTable");
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
    let header_title11 = document.createElement("th");
    header_title11.innerText = "Seller";
    header_title11.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title11);
    let header_title2 = document.createElement("th");
    let left2 = document.createElement("a");
    left2.innerText = "Tokens";
    header_title2.setAttribute("class", "marketsTableRowName");
    let right2 = document.createElement("i");
    right2.innerText = right2InnerText;
    right2.setAttribute("class", "material-icons");
    right2.setAttribute("id", "tokenSort");
    right2.addEventListener('click', function(){ customSort("tokenSort") });
    right2.addEventListener('mouseover', function(){ right2.style.cursor = "pointer"; });
    right2.style.fontSize = "16px";
    header_title2.appendChild(left2);
    header_title2.appendChild(right2);
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    let left3 = document.createElement("a");
    left3.innerText = "Market Price";
    header_title3.setAttribute("class", "marketsTableRowName");
    let right3 = document.createElement("i");
    right3.innerText = right3InnerText;
    right3.setAttribute("class", "material-icons");
    right3.setAttribute("id", "marketPriceSort");
    right3.addEventListener('click', function(){ customSort("marketPriceSort") });
    right3.addEventListener('mouseover', function(){ right3.style.cursor = "pointer"; });
    right3.style.fontSize = "16px";
    header_title3.appendChild(left3);
    header_title3.appendChild(right3);
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    let left4 = document.createElement("a");
    left4.innerText = "Advertised Price";
    header_title4.setAttribute("class", "marketsTableRowName");
    let right4 = document.createElement("i");
    right4.innerText = right4InnerText;
    right4.setAttribute("class", "material-icons");
    right4.setAttribute("id", "advertisedPriceSort");
    right4.addEventListener('click', function(){ customSort("advertisedPriceSort") });
    right4.addEventListener('mouseover', function(){ right4.style.cursor = "pointer"; });
    right4.style.fontSize = "16px";
    header_title4.appendChild(left4);
    header_title4.appendChild(right4);
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    let left5 = document.createElement("a");
    left5.innerText = "% vs Market Price";
    header_title5.setAttribute("class", "marketsTableRowName");
    let right5 = document.createElement("i");
    right5.innerText = right5InnerText;
    right5.setAttribute("class", "material-icons");
    right5.setAttribute("id", "newTokenPriceSort");
    right5.addEventListener('click', function(){ customSort("newTokenPriceSort") });
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

        let percent = (100 * (FILTERED_LISTINGS[i].listingPrice - FILTERED_LISTINGS[i].sharePrice)) / FILTERED_LISTINGS[i].sharePrice;

        let strategyName = document.createElement("td");
        let strategyNameLink = document.createElement("a");
        strategyNameLink.innerText = FILTERED_LISTINGS[i].strategyName;
        let strategyID = FILTERED_LISTINGS[i].strategyID;
        strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
        strategyName.setAttribute("class", "marketsTableRowName");
        let strategyNameRight = document.createElement("a");
        strategyNameRight.innerText = FILTERED_LISTINGS[i].symbol;
        strategyNameRight.style.color = "rgb(128,138,157)";
        strategyNameRight.style.paddingLeft = "10px";
        strategyNameRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
        strategyNameRight.addEventListener('mouseover', function(){ strategyNameRight.style.cursor = "pointer"; });
        strategyName.appendChild(strategyNameLink);
        strategyName.appendChild(strategyNameRight);
        row.appendChild(strategyName);
        let seller = document.createElement("td");
        let sellerLink = document.createElement("a");
        sellerLink.innerText = FILTERED_LISTINGS[i].seller;
        let sellerAddress = FILTERED_LISTINGS[i].sellerAddress;
        sellerLink.addEventListener('click', function(){ window.location.href = '/profile/' + sellerAddress; });
        sellerLink.addEventListener('mouseover', function(){ sellerLink.style.cursor = "pointer"; });
        seller.setAttribute("class", "marketsTableRowName");
        seller.appendChild(sellerLink);
        row.appendChild(seller);
        let numberOfShares = document.createElement("td");
        numberOfShares.innerText = FILTERED_LISTINGS[i].numberOfShares;
        numberOfShares.setAttribute("class", "marketsTableRowName");
        row.appendChild(numberOfShares);
        let marketPrice = document.createElement("td");
        marketPrice.innerText = FILTERED_LISTINGS[i].sharePrice.toFixed(4) + " TGEN";
        marketPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(marketPrice);
        let advertisedPrice = document.createElement("td");
        advertisedPrice.innerText = FILTERED_LISTINGS[i].listingPrice.toFixed(4) + " TGEN";
        advertisedPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(advertisedPrice);
        let change = document.createElement("td");
        let arrow = document.createElement("i");
        let text= document.createElement("a");
        arrow.setAttribute("class", "material-icons");
        if (percent < 0)
        {
            change.style.color = upColor;
            arrow.innerText = "arrow_drop_down";
            arrow.style.color = upColor;
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
            change.style.color = downColor;
            arrow.innerText = "arrow_drop_up";
            arrow.style.color = downColor;
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
        viewButton.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.setAttribute("class", "buyButton");
        let positionID = FILTERED_LISTINGS[i].positionID;
        buyButton.addEventListener('click', function(){ window.location.href = '/buy_position/' + positionID; });
        actions.appendChild(viewButton);
        if (FILTERED_LISTINGS[i].userID != document.getElementById("sotong").value)
        {
            actions.appendChild(buyButton);
        }
        
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
        document.getElementById("boh").innerText = "No marketplace listings...yet!";
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
        let plus = (LISTINGS[i].listingPrice > LISTINGS[i].sharePrice) ? '+' : '';
        let percent = (100 * (LISTINGS[i].listingPrice - LISTINGS[i].sharePrice)) / LISTINGS[i].sharePrice;

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = LISTINGS[i].strategyName;
        let strategyID = LISTINGS[i].strategyID;
        title.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
        title.addEventListener('mouseover', function(){ title.style.cursor = "pointer"; });
        topRow.appendChild(title);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        bottomRow.style.borderWidth = "0px";
        let seller = document.createElement("div");
        seller.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let sellerText = document.createElement("a");
        sellerText.setAttribute("class", "tradingBotStoreProductTopText");
        sellerText.innerText = "Seller";
        let sellerBR = document.createElement("br");
        let sellerData = document.createElement("a");
        sellerData.setAttribute("class", "tradingBotStoreProductBottomText");
        sellerData.innerText = LISTINGS[i].seller;
        sellerData.style.fontWeight = "500";
        let sellerAddress = LISTINGS[i].sellerAddress;
        sellerData.addEventListener('click', function(){ window.location.href = '/profile/' + sellerAddress; });
        sellerData.addEventListener('mouseover', function(){ sellerData.style.cursor = "pointer"; });
        seller.appendChild(sellerText);
        seller.appendChild(sellerBR);
        seller.appendChild(sellerData);
        let size = document.createElement("div");
        size.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let sizeText = document.createElement("a");
        sizeText.setAttribute("class", "tradingBotStoreProductTopText");
        sizeText.innerText = "Size";
        let sizeBR = document.createElement("br");
        let sizeData = document.createElement("a");
        sizeData.setAttribute("class", "tradingBotStoreProductBottomText");
        sizeData.innerText = LISTINGS[i].numberOfShares.toString() + " tokens";
        sizeData.style.fontWeight = "500";
        size.appendChild(sizeText);
        size.appendChild(sizeBR);
        size.appendChild(sizeData);
        let currentPrice = document.createElement("div");
        currentPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let currentPriceText = document.createElement("a");
        currentPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        currentPriceText.innerText = "Token Price";
        let currentPriceBR = document.createElement("br");
        let currentPriceData = document.createElement("a");
        currentPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        currentPriceData.innerText = LISTINGS[i].sharePrice.toFixed(4) + " TGEN";
        currentPriceData.style.fontWeight = "500";
        currentPrice.appendChild(currentPriceText);
        currentPrice.appendChild(currentPriceBR);
        currentPrice.appendChild(currentPriceData);
        let advertisedPrice = document.createElement("div");
        advertisedPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let advertisedPriceText = document.createElement("a");
        advertisedPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        advertisedPriceText.innerText = "Advertised Price";
        let advertisedPriceBR = document.createElement("br");
        let advertisedPriceData = document.createElement("a");
        advertisedPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        advertisedPriceData.innerText = LISTINGS[i].listingPrice.toFixed(4) + " TGEN";
        advertisedPriceData.style.fontWeight = "500";
        advertisedPrice.appendChild(advertisedPriceText);
        advertisedPrice.appendChild(advertisedPriceBR);
        advertisedPrice.appendChild(advertisedPriceData);

        let change = document.createElement("div");
        change.setAttribute("class", "tradingBotStoreProductFrequency block");
        let changeText = document.createElement("a");
        changeText.setAttribute("class", "tradingBotStoreProductTopText");
        changeText.innerText = "% vs Market Price";
        let changeBR = document.createElement("br");
        let changeData = document.createElement("div");
        changeData.setAttribute("class", "tradingBotStoreProductBottomText");
        let changeAmount = document.createElement("a");
        changeAmount.innerText = plus + percent.toFixed(2) + "%";
        changeData.style.fontWeight = "500";
        if (percent < 0)
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
        let address = LISTINGS[i].address;
        viewButton.addEventListener('click', function(){ window.location.href = '/strategy_info/' + address; });

        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.setAttribute("class", "buyButton");
        let positionID = LISTINGS[i].positionID
        buyButton.addEventListener('click', function(){ window.location.href = '/buy_position/' + positionID; });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);

        if (LISTINGS[i].userID != document.getElementById("sotong").value)
        {
            buttons.appendChild(buyButton);
        }

        bottomRow.append(seller);
        bottomRow.appendChild(size);
        bottomRow.appendChild(currentPrice);
        bottomRow.appendChild(advertisedPrice);
        bottomRow.appendChild(change);
        bottomRow.appendChild(buttons);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    document.getElementById("loadingPage").remove();
    document.getElementById("table").remove();

    if (LENGTH > 0)
    {
        document.getElementById("mainContent").style.display = "block";
    }
    else
    {
        document.getElementById("boh").style.display = "block";
        document.getElementById("boh").innerText = "No marketplace listings...yet!";
    }
}

function getData()
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        LISTINGS = response.listings;
        LENGTH = response.listings.length;

        FILTERED_LISTINGS = response.listings;

        MAX_PAGES = Math.ceil(LENGTH / SIZE);

        LISTINGS.sort((a, b) => b.percent - a.percent);

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
    xhttpRep.open("GET", '/get_marketplace_listings', true);
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

function customSort(ID)
{
    if (document.getElementById(ID).innerText == "arrow_drop_down")
    {
        if (ID == "newTokenPriceSort")
        {
            right5InnerText = "arrow_drop_up";
            FILTERED_LISTINGS.sort((a, b) => a.percent - b.percent);
        }

        if (ID == "advertisedPriceSort")
        {
            right4InnerText = "arrow_drop_up";
            FILTERED_LISTINGS.sort((a, b) => a.listingPrice - b.listingPrice);
        }

        if (ID == "marketPriceSort")
        {
            right3InnerText = "arrow_drop_up";
            FILTERED_LISTINGS.sort((a, b) => a.sharePrice - b.sharePrice);
        }

        if (ID == "tokenSort")
        {
            right2InnerText = "arrow_drop_up";
            FILTERED_LISTINGS.sort((a, b) => a.numberOfShares - b.numberOfShares);
        }
    }
    else
    {
        if (ID == "newTokenPriceSort")
        {
            right5InnerText = "arrow_drop_down";
            FILTERED_LISTINGS.sort((a, b) => b.percent - a.percent);
        }

        if (ID == "advertisedPriceSort")
        {
            right4InnerText = "arrow_drop_down";
            FILTERED_LISTINGS.sort((a, b) => b.listingPrice - a.listingPrice);
        }

        if (ID == "marketPriceSort")
        {
            right3InnerText = "arrow_drop_down";
            FILTERED_LISTINGS.sort((a, b) => b.sharePrice - a.sharePrice);
        }

        if (ID == "tokenSort")
        {
            right2InnerText = "arrow_drop_down";
            FILTERED_LISTINGS.sort((a, b) => b.numberOfShares - a.numberOfShares);
        }
    }

    buildTable();
}