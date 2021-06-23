var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;
var TRANSACTIONS = [];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    const downColor = "#ea3943";
    const upColor = "#18c96e";

    let table = document.getElementById("transactionsTable");
    table.setAttribute("class", "transactionsTable");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    let table_head = document.createElement("thead");
    let header_row = document.createElement("tr");
    let header_title1 = document.createElement("th");
    header_title1.innerText = "Entry Time";
    header_title1.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1);
    let header_title2 = document.createElement("th");
    header_title2.innerText = "Symbol";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Size";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "Entry Price";
    header_title5.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    header_title6.innerText = "Exit Time";
    header_title6.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title6);
    let header_title7 = document.createElement("th");
    header_title7.innerText = "Exit Price";
    header_title7.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title7);
    let header_title8 = document.createElement("th");
    header_title8.innerText = "ROI";
    header_title8.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title8);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for (let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let plus = (TRANSACTIONS[i].roi >= 0) ? '+' : '';

        let entryTime = document.createElement("td");
        let entryDateObject = new Date(TRANSACTIONS[i].entryTime);
        entryTime.innerText = months[entryDateObject.getMonth()] + " " + entryDateObject.getDate() + ", " + entryDateObject.getFullYear() + " " + entryDateObject.getHours() + ":" + ((entryDateObject.getMinutes() < 10) ? "0" + entryDateObject.getMinutes() : entryDateObject.getMinutes());
        entryTime.setAttribute("class", "marketsTableRowName");
        row.appendChild(entryTime);
        let symbol = document.createElement("td");
        symbol.innerText = TRANSACTIONS[i].symbol;
        symbol.setAttribute("class", "marketsTableRowName");
        row.appendChild(symbol);
        let size = document.createElement("td");
        size.innerText = TRANSACTIONS[i].size;
        row.appendChild(size);
        size.setAttribute("class", "marketsTableRowName");
        let entryPrice = document.createElement("td");
        entryPrice.innerText = "$" + TRANSACTIONS[i].entryPrice;
        entryPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(entryPrice);
        let exitTime = document.createElement("td");
        let exitDateObject = new Date(TRANSACTIONS[i].exitTime);
        exitTime.innerText = months[exitDateObject.getMonth()] + " " + exitDateObject.getDate() + ", " + exitDateObject.getFullYear() + " " + exitDateObject.getHours() + ":" + ((exitDateObject.getMinutes() < 10) ? "0" + exitDateObject.getMinutes() : exitDateObject.getMinutes());
        exitTime.setAttribute("class", "marketsTableRowName");
        row.appendChild(exitTime);
        let exitPrice = document.createElement("td");
        exitPrice.innerText = "$" + TRANSACTIONS[i].exitPrice;
        exitPrice.setAttribute("class", "marketsTableRowName");
        row.appendChild(exitPrice);
        let ROI = document.createElement("td");
        ROI.innerText = plus + TRANSACTIONS[i].roi + "%";
        if (plus == '+')
        {
            ROI.style.color = upColor;
        }
        else
        {
            ROI.style.color = downColor;
        }
        ROI.setAttribute("class", "marketsTableRowName");
        row.appendChild(ROI);

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
        document.getElementById("boh").innerText = "No transactions...yet!";
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
        let plus = (TRANSACTIONS[i].roi >= 0) ? '+' : '';

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        let entryDateObject = new Date(TRANSACTIONS[i].entryTime);
        title.innerText = months[entryDateObject.getMonth()] + " " + entryDateObject.getDate() + ", " + entryDateObject.getFullYear() + " " + entryDateObject.getHours() + ":" + ((entryDateObject.getMinutes() < 10) ? "0" + entryDateObject.getMinutes() : entryDateObject.getMinutes());
        title.innerText = TRANSACTIONS[i].date;
        topRow.appendChild(title);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        bottomRow.style.borderWidth = "0px";
        let symbol = document.createElement("div");
        symbol.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let symbolText = document.createElement("a");
        symbolText.setAttribute("class", "tradingBotStoreProductTopText");
        symbolText.innerText = "Symbol";
        let symbolBR = document.createElement("br");
        let symbolData = document.createElement("a");
        symbolData.setAttribute("class", "tradingBotStoreProductBottomText");
        symbolData.innerText = TRANSACTIONS[i].symbol;
        symbolData.style.fontWeight = "500";
        symbol.appendChild(symbolText);
        symbol.appendChild(symbolBR);
        symbol.appendChild(symbolData);
        let size = document.createElement("div");
        size.setAttribute("class", "tradingBotStoreProductFrequency block");
        let sizeText = document.createElement("a");
        sizeText.setAttribute("class", "tradingBotStoreProductTopText");
        sizeText.innerText = "Size";
        let sizeBR = document.createElement("br");
        let sizeData = document.createElement("a");
        sizeData.setAttribute("class", "tradingBotStoreProductBottomText");
        sizeData.innerText = TRANSACTIONS[i].size;
        sizeData.style.fontWeight = "500";
        size.appendChild(sizeText);
        size.appendChild(sizeBR);
        size.appendChild(sizeData);
        let entryPrice = document.createElement("div");
        entryPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let entryPriceText = document.createElement("a");
        entryPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        entryPriceText.innerText = "Entry Price";
        let entryPriceBR = document.createElement("br");
        let entryPriceData = document.createElement("a");
        entryPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        entryPriceData.innerText = "$" + TRANSACTIONS[i].entryPrice;
        entryPriceData.style.fontWeight = "500";
        entryPrice.appendChild(entryPriceText);
        entryPrice.appendChild(entryPriceBR);
        entryPrice.appendChild(entryPriceData);
        let exitTime = document.createElement("div");
        exitTime.setAttribute("class", "tradingBotStoreProductFrequency block");
        let exitTimeText = document.createElement("a");
        exitTimeText.setAttribute("class", "tradingBotStoreProductTopText");
        exitTimeText.innerText = "Exit Time";
        let exitTimeBR = document.createElement("br");
        let exitTimeData = document.createElement("a");
        exitTimeData.setAttribute("class", "tradingBotStoreProductBottomText");
        let exitDateObject = new Date(TRANSACTIONS[i].exitTime);
        exitTimeData.innerText = months[exitDateObject.getMonth()] + " " + exitDateObject.getDate() + ", " + exitDateObject.getFullYear() + " " + exitDateObject.getHours() + ":" + ((exitDateObject.getMinutes() < 10) ? "0" + exitDateObject.getMinutes() : exitDateObject.getMinutes());
        exitTimeData.style.fontWeight = "500";
        exitTime.appendChild(exitTimeText);
        exitTime.appendChild(exitTimeBR);
        exitTime.appendChild(exitTimeData);
        let exitPrice = document.createElement("div");
        exitPrice.setAttribute("class", "tradingBotStoreProductFrequency block");
        let exitPriceText = document.createElement("a");
        exitPriceText.setAttribute("class", "tradingBotStoreProductTopText");
        exitPriceText.innerText = "Exit Price";
        let exitPriceBR = document.createElement("br");
        let exitPriceData = document.createElement("a");
        exitPriceData.setAttribute("class", "tradingBotStoreProductBottomText");
        exitPriceData.innerText = "$" + TRANSACTIONS[i].exitPrice;
        exitPriceData.style.fontWeight = "500";
        exitPrice.appendChild(exitPriceText);
        exitPrice.appendChild(exitPriceBR);
        exitPrice.appendChild(exitPriceData);
        let ROI = document.createElement("div");
        ROI.setAttribute("class", "tradingBotStoreProductFrequency block");
        let ROIText = document.createElement("a");
        ROIText.setAttribute("class", "tradingBotStoreProductTopText");
        ROIText.innerText = "ROI";
        let ROIBR = document.createElement("br");
        let ROIData = document.createElement("a");
        ROIData.setAttribute("class", "tradingBotStoreProductBottomText");
        ROIData.innerText = plus + TRANSACTIONS[i].roi.toFixed(2) +  "%";
        ROIData.style.fontWeight = "500";
        if (TRANSACTIONS[i].roi >= 0)
        {
            ROI.style.color = upColor;
        }
        else
        {
            ROI.style.color = downColor;
        }
        ROI.appendChild(ROIText);
        ROI.appendChild(ROIBR);
        ROI.appendChild(ROIData);

        bottomRow.appendChild(date);
        bottomRow.appendChild(amount);
        bottomRow.appendChild(description);

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
    let strategyID = document.getElementById("sianjitpua").value;
    let temp2 = JSON.stringify({strategyID: strategyID});
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        TRANSACTIONS = response.history;
        LENGTH = response.history.length;

        MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);

        document.getElementById("title").innerText = "Transaction History - " + response.strategyName;

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
    xhttpRep.open("POST", '/get_history', true);
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

function filterResults(transactionType)
{
    let newResults = [];

    for (var i = 0; i < TRANSACTIONS.length; i++)
    {
        if (transactionType == "All" || TRANSACTIONS[i].type == transactionType)
        {
            newResults.push(TRANSACTIONS[i]);
        }
    }

    FILTERED_RESULTS = newResults;
    LENGTH = newResults.length;
    MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);

    if (isMobile.any())
    {
        buildPanels();
    }
    else
    {
        buildTable();
    }
}