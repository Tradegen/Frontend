var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;
var POOLS = [];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    });

    let loginStatus = document.getElementById("status").value;

    if (loginStatus == "true")
    {
        if (document.getElementById("createPoolButtonWeb"))
        {
            document.getElementById('createPoolButtonWeb').addEventListener('click', function(){
                window.location.href = '/create_pool';
            });

            document.getElementById('createPoolButtonWeb').style.display = "block";
        }
    }

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
    header_title2.innerText = "Created On";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title21 = document.createElement("th");
    header_title21.innerText = "Managed By";
    header_title21.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title21);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Pool Value";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Performance Fee";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "Number of Investors";
    header_title5.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    header_title6.innerText = "Total Return";
    header_title6.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title6);
    let header_title7 = document.createElement("th");
    header_title7.innerText = "Actions";
    header_title7.setAttribute("class", "marketsTableRowData");
    header_title7.style.textAlign = "center";
    header_row.appendChild(header_title7);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    let loginStatus = document.getElementById("status").value;

    for (let i = start; i > end; i--)
    {
        let percent = POOLS[i].totalReturn;

        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let poolName = document.createElement("td");
        poolName.innerText = POOLS[i].poolName;
        poolName.setAttribute("class", "marketsTableRowName");
        poolName.style.fontWeight = "500";
        row.appendChild(poolName);
        let createdOn = document.createElement("td");
        let createdOnObject = new Date(POOLS[i].createdOn);
        createdOn.innerText = months[createdOnObject.getMonth()] + " " + createdOnObject.getDate() + ", " + createdOnObject.getFullYear();
        createdOn.setAttribute("class", "marketsTableRowName");
        row.appendChild(createdOn);
        let managedBy = document.createElement("td");
        managedBy.innerText = POOLS[i].managerUsername;
        let managerAddress = POOLS[i].managerAddress;
        if (loginStatus == "true")
        {
            managedBy.addEventListener('click', function(){ window.location.href = '/profile/' + managerAddress; });
            managedBy.addEventListener('mouseover', function(){ managedBy.style.cursor = "pointer"; });
        }
        managedBy.setAttribute("class", "marketsTableRowName");
        row.appendChild(managedBy);
        let poolValue = document.createElement("td");
        poolValue.innerText = "$" + POOLS[i].poolValue.toFixed(2);
        poolValue.setAttribute("class", "marketsTableRowName");
        poolValue.style.fontWeight = "500";
        row.appendChild(poolValue);
        let performanceFee = document.createElement("td");
        performanceFee.innerText = POOLS[i].performanceFee + "%";
        performanceFee.setAttribute("class", "marketsTableRowName");
        performanceFee.style.fontWeight = "500";
        row.appendChild(performanceFee);
        let numberOfInvestors = document.createElement("td");
        numberOfInvestors.innerText = POOLS[i].numberOfInvestors;
        numberOfInvestors.setAttribute("class", "marketsTableRowName");
        numberOfInvestors.style.fontWeight = "500";
        row.appendChild(numberOfInvestors);
        let totalReturn = document.createElement("td");
        let arrow = document.createElement("i");
        let text= document.createElement("a");
        arrow.setAttribute("class", "material-icons");
        if (percent > 0)
        {
            totalReturn.style.color = upColor;
            arrow.innerText = "arrow_drop_up";
            arrow.style.color = upColor;
        }
        else if (percent == 0)
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
        text.innerText = percent.toFixed(2) + "%";
        totalReturn.setAttribute("class", "marketsTableRowName");
        totalReturn.style.display = "flex";
        arrow.style.paddingTop = "4px";
        text.style.paddingTop = "7px";
        totalReturn.appendChild(arrow);
        totalReturn.appendChild(text);
        row.appendChild(totalReturn);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableRowData");
        actions.style.textAlign = "center";
        let viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.setAttribute("class", "viewButton");
        let ID = POOLS[i].poolID;
        viewButton.addEventListener('click', function(){ window.location.href = '/pool_info/' + encodeURIComponent(ID); });

        let buyButton = document.createElement("button");
        buyButton.innerText = "Trade";
        buyButton.setAttribute("class", "buyButton");
        buyButton.addEventListener('click', function(){ window.location.href = '/manage_pool_investment/' + encodeURIComponent(ID); });
        actions.appendChild(viewButton);

        if (loginStatus == "true")
        {
            actions.appendChild(buyButton);
        }

        row.appendChild(actions);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    if (POOLS.length > 0)
    {
        document.getElementById("loadingPage").remove();
        document.getElementById("sotong").style.display = "block";
    }
    else
    {
        document.getElementById("loadingPage").innerText = "No pools yet";
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
        let percent = POOLS[i].totalReturn;
        let plus = (percent >= 0) ? '+' : '';

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = POOLS[i].poolName;
        let inceptionDate = document.createElement("div");
        inceptionDate.setAttribute("class", "tradingBotStoreProductPrice");
        let createdOnObject = new Date(POOLS[i].createdOn);
        inceptionDate.innerText = "Created on: " + months[createdOnObject.getMonth()] + " " + createdOnObject.getDate() + ", " + createdOnObject.getFullYear();
        inceptionDate.style.fontSize = "16px";
        topRow.appendChild(title);
        topRow.appendChild(inceptionDate);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        let managedBy = document.createElement("div");
        managedBy.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let managedByText = document.createElement("a");
        managedByText.setAttribute("class", "tradingBotStoreProductTopText");
        managedByText.innerText = "Managed By";
        let managedByBR = document.createElement("br");
        let managedByData = document.createElement("a");
        managedByData.setAttribute("class", "tradingBotStoreProductBottomText");
        managedByData.innerText = POOLS[i].managerUsername;
        managedByData.style.fontWeight = "500";
        managedBy.appendChild(managedByText);
        managedBy.appendChild(managedByBR);
        managedBy.appendChild(managedByData);
        let poolValue = document.createElement("div");
        poolValue.setAttribute("class", "tradingBotStoreProductFrequency block");
        let poolValueText = document.createElement("a");
        poolValueText.setAttribute("class", "tradingBotStoreProductTopText");
        poolValueText.innerText = "Pool Value";
        let poolValueBR = document.createElement("br");
        let poolValueData = document.createElement("a");
        poolValueData.setAttribute("class", "tradingBotStoreProductBottomText");
        poolValueData.innerText = "$" + POOLS[i].poolValue.toFixed(2);
        poolValueData.style.fontWeight = "500";
        poolValue.appendChild(poolValueText);
        poolValue.appendChild(poolValueBR);
        poolValue.appendChild(poolValueData);
        let performanceFee = document.createElement("div");
        performanceFee.setAttribute("class", "tradingBotStoreProductFrequency block");
        let performanceFeeText = document.createElement("a");
        performanceFeeText.setAttribute("class", "tradingBotStoreProductTopText");
        performanceFeeText.innerText = "Performance Fee";
        let performanceFeeBR = document.createElement("br");
        let performanceFeeData = document.createElement("a");
        performanceFeeData.setAttribute("class", "tradingBotStoreProductBottomText");
        performanceFeeData.innerText = POOLS[i].performanceFee + "%";
        performanceFeeData.style.fontWeight = "500";
        performanceFee.appendChild(performanceFeeText);
        performanceFee.appendChild(performanceFeeBR);
        performanceFee.appendChild(performanceFeeData);
        let numberOfInvestors = document.createElement("div");
        numberOfInvestors.setAttribute("class", "tradingBotStoreProductFrequency block");
        let numberOfInvestorsText = document.createElement("a");
        numberOfInvestorsText.setAttribute("class", "tradingBotStoreProductTopText");
        numberOfInvestorsText.innerText = "Number of Investors";
        let numberOfInvestorsBR = document.createElement("br");
        let numberOfInvestorsData = document.createElement("a");
        numberOfInvestorsData.setAttribute("class", "tradingBotStoreProductBottomText");
        numberOfInvestorsData.innerText = POOLS[i].numberOfInvestors;
        numberOfInvestorsData.style.fontWeight = "500";
        numberOfInvestors.appendChild(numberOfInvestorsText);
        numberOfInvestors.appendChild(numberOfInvestorsBR);
        numberOfInvestors.appendChild(numberOfInvestorsData);
        let totalReturn = document.createElement("div");
        totalReturn.setAttribute("class", "tradingBotStoreProductFrequency block");
        let totalReturnText = document.createElement("a");
        totalReturnText.setAttribute("class", "tradingBotStoreProductTopText");
        totalReturnText.innerText = "Total Return";
        let totalReturnBR = document.createElement("br");
        let totalReturnData = document.createElement("div");
        totalReturnData.setAttribute("class", "tradingBotStoreProductBottomText");
        let totalReturnAmount = document.createElement("a");
        totalReturnAmount.innerText = plus + percent.toFixed(2) + "%";
        totalReturnData.style.fontWeight = "500";
        if (percent > 0)
        {
            totalReturnData.style.color = upColor;
        }
        else if (percent == 0)
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
        let ID = POOLS[i].poolID;
        viewButton.addEventListener('click', function(){ window.location.href = '/pool_info/' + encodeURIComponent(ID); });

        let loginStatus = document.getElementById("status").value;

        let buyButton = document.createElement("button");
        buyButton.innerText = "Trade";
        buyButton.setAttribute("class", "buyButton");
        buyButton.addEventListener('click', function(){ window.location.href = '/manage_pool_investment/' + encodeURIComponent(ID); });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);

        if (loginStatus == "true")
        {
            buttons.appendChild(buyButton);
        }

        bottomRow.appendChild(managedBy);
        bottomRow.appendChild(poolValue);
        bottomRow.appendChild(performanceFee);
        bottomRow.appendChild(numberOfInvestors);
        bottomRow.appendChild(totalReturn);
        bottomRow.appendChild(buttons);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    if (POOLS.length > 0)
    {
        document.getElementById("loadingPage").remove();
        document.getElementById("table").remove();
        document.getElementById("sotong").style.display = "block";
    }
    else
    {
        document.getElementById("loadingPage").innerText = "No pools yet";
    }
}

function getData()
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        POOLS = response.pools;
        LENGTH = response.pools.length;

        MAX_PAGES = Math.ceil(LENGTH / SIZE);

        POOLS.sort((a, b) => a.percent - b.percent);

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
    xhttpRep.open("GET", '/get_all_pools', true);
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