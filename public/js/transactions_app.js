var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;
var TRANSACTIONS = [];
var FILTERED_RESULTS = [];

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

    document.getElementById("transactionType").addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        
        if (selectedValue == "all")
        {
            filterResults("All");
        }
        else if (selectedValue == "deposit")
        {
            filterResults("Deposit");
        }
        else if (selectedValue == "withdrawal")
        {
            filterResults("Withdrawal");
        }
        else if (selectedValue == "royalty")
        {
            filterResults("Royalty");
        }
        else if (selectedValue == "stake")
        {
            filterResults("Stake");
        }
        else if (selectedValue == "unstake")
        {
            filterResults("Unstake");
        }
        else if (selectedValue == "faucet")
        {
            filterResults("Faucet");
        }
    });

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
    header_title1.innerText = "Description";
    header_title1.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1);
    let header_title2 = document.createElement("th");
    header_title2.innerText = "Type";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Date";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Amount";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    const plusTypes = ["Deposit", "Royalty", "Faucet", "Stake"];

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for (let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let found = false;
        for (var k = 0; k < plusTypes.length; k+=1)
        {
            if (FILTERED_RESULTS[i].type == plusTypes[k])
            {
                found = true;
            }
        }

        let plus = (found == true) ? '+' : '-';

        let dateString = new Date(FILTERED_RESULTS[i].timestamp).toLocaleDateString();

        let description = document.createElement("td");
        description.innerText = FILTERED_RESULTS[i].description;
        description.setAttribute("class", "marketsTableRowName");
        row.appendChild(description);
        let type = document.createElement("td");
        type.innerText = FILTERED_RESULTS[i].type;
        type.setAttribute("class", "marketsTableRowName");
        row.appendChild(type);
        let date = document.createElement("td");
        date.innerText = dateString;
        date.setAttribute("class", "marketsTableRowName");
        row.appendChild(date);
        let amount = document.createElement("td");
        amount.innerText = plus + FILTERED_RESULTS[i].amount.toFixed(4) + " TGEN";
        if (found == true)
        {
            amount.style.color = upColor;
        }
        else
        {
            amount.style.color = downColor;
        }
        amount.setAttribute("class", "marketsTableRowName");
        row.appendChild(amount);

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

    const plusTypes = ["Deposit", "Royalty", "Faucet", "Stake"];

    let mainDiv = document.getElementById("panels");
    while (mainDiv.hasChildNodes())
    {
        mainDiv.removeChild(mainDiv.firstChild);
    }

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for (let i = start; i > end; i--)
    {
        let found = false;
        for (var k = 0; k < plusTypes.length; k+=1)
        {
            if (FILTERED_RESULTS[i].type == plusTypes[k])
            {
                found = true;
            }
        }

        let plus = (found == true) ? '+' : '-';

        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = FILTERED_RESULTS[i].type;
        topRow.appendChild(title);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        bottomRow.style.borderWidth = "0px";
        let date = document.createElement("div");
        date.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let dateText = document.createElement("a");
        dateText.setAttribute("class", "tradingBotStoreProductTopText");
        dateText.innerText = "Date";
        let dateBR = document.createElement("br");
        let dateData = document.createElement("a");
        dateData.setAttribute("class", "tradingBotStoreProductBottomText");
        dateData.innerText = FILTERED_RESULTS[i].date;
        dateData.style.fontWeight = "500";
        date.appendChild(dateText);
        date.appendChild(dateBR);
        date.appendChild(dateData);
        let type = document.createElement("div");
        type.setAttribute("class", "tradingBotStoreProductFrequency block");
        let typeText = document.createElement("a");
        typeText.setAttribute("class", "tradingBotStoreProductTopText");
        typeText.innerText = "Type";
        let typeBR = document.createElement("br");
        let typeData = document.createElement("a");
        typeData.setAttribute("class", "tradingBotStoreProductBottomText");
        typeData.innerText = FILTERED_RESULTS[i].type;
        typeData.style.fontWeight = "500";
        type.appendChild(typeText);
        type.appendChild(typeBR);
        type.appendChild(typeData);
        let amount = document.createElement("div");
        amount.setAttribute("class", "tradingBotStoreProductFrequency block");
        let amountText = document.createElement("a");
        amountText.setAttribute("class", "tradingBotStoreProductTopText");
        amountText.innerText = "Amount";
        let amountBR = document.createElement("br");
        let amountData = document.createElement("a");
        amountData.setAttribute("class", "tradingBotStoreProductBottomText");
        amountData.innerText = plus + FILTERED_RESULTS[i].amount.toFixed(4) +  " TGEN";
        amountData.style.fontWeight = "500";
        if (found == true)
        {
            amount.style.color = upColor;
        }
        else
        {
            amount.style.color = downColor;
        }
        amount.appendChild(amountText);
        amount.appendChild(amountBR);
        amount.appendChild(amountData);
        let description = document.createElement("div");
        description.setAttribute("class", "tradingBotStoreProductFrequency block");
        let descriptionText = document.createElement("a");
        descriptionText.setAttribute("class", "tradingBotStoreProductTopText");
        descriptionText.innerText = "Description";
        let descriptionBR = document.createElement("br");
        let descriptionData = document.createElement("a");
        descriptionData.setAttribute("class", "tradingBotStoreProductBottomText");
        descriptionData.innerText = FILTERED_RESULTS[i].description;
        descriptionData.style.fontWeight = "500";
        descriptionData.style.fontSize = "16px";
        description.style.marginBottom = "30px";
        description.appendChild(descriptionText);
        description.appendChild(descriptionBR);
        description.appendChild(descriptionData);

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
        document.getElementById("boh").innerText = "No transactions...yet!";
    }
}

function getData()
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        TRANSACTIONS = response.transactions;
        LENGTH = response.transactions.length;

        MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);

        FILTERED_RESULTS = response.transactions;

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
    xhttpRep.open("GET", '/get_transactions', true);
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