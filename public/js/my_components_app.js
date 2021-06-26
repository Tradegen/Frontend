var PAGE = 1;
var SIZE = 15;
var LENGTH = 1;
var MAX_PAGES = 1;

var PAGE2 = 1;
var SIZE2 = 15;
var LENGTH2 = 1;
var MAX_PAGES2 = 1;

var PURCHASED_COMPONENTS = [];
var DEVELOPED_COMPONENTS = [];

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
    document.getElementById("componentInfoModal").style.display = "none";
    document.getElementById("componentInfoModal").style.textAlign = "center";

    if (document.getElementById('closeComponentInfo'))
    {
        document.getElementById('closeComponentInfo')
            .addEventListener('click', hideComponentInfoModal);
    }

    //display fewer positions per page on mobile
    if (isMobile.any())
    {
        SIZE = 10;
        SIZE2 = 10;
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

    document.getElementById("decreasePage2").addEventListener("click", function() {
        if (PAGE2 > 1)
        {
            PAGE2 = PAGE2 - 1;
            if (isMobile.any())
            {
                buildPanels2();
            }
            else
            {
                buildTable2();
            }
        }
    });

    document.getElementById("increasePage2").addEventListener("click", function() {
        if (PAGE2 < MAX_PAGES2)
        {
            PAGE2 = PAGE2 + 1;
            if (isMobile.any())
            {
                buildPanels2();
            }
            else
            {
                buildTable2();
            }
        }
    });

    document.getElementById("decreasePage").addEventListener("mouseover", function() {
        document.getElementById("decreasePage").style.cursor = "pointer";
    });

    document.getElementById("increasePage").addEventListener("mouseover", function() {
        document.getElementById("increasePage").style.cursor = "pointer";
    });

    document.getElementById("decreasePage2").addEventListener("mouseover", function() {
        document.getElementById("decreasePage2").style.cursor = "pointer";
    });

    document.getElementById("increasePage2").addEventListener("mouseover", function() {
        document.getElementById("increasePage2").style.cursor = "pointer";
    });

    getData();
});

function buildTable()
{
    let table = document.getElementById("purchasedComponentsTable");
    table.setAttribute("class", "transactionsTable");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    let table_head = document.createElement("thead");
    let header_row = document.createElement("tr");
    let header_title1 = document.createElement("th");
    header_title1.innerText = "Component Name";
    header_title1.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1);
    let header_title2 = document.createElement("th");
    header_title2.innerText = "Type";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Developed On";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Developed By";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "Actions";
    header_title5.setAttribute("class", "marketsTableCirculatingSupply");
    header_row.appendChild(header_title5);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for(let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let componentName = document.createElement("td");
        componentName.innerText = PURCHASED_COMPONENTS[i].componentName;
        componentName.setAttribute("class", "marketsTableRowName");
        let componentType = document.createElement("td");
        componentType.innerText = PURCHASED_COMPONENTS[i].componentType;
        componentType.setAttribute("class", "marketsTableRowName");
        row.appendChild(componentType);
        let developedOn = document.createElement("td");
        let developedOnObject = new Date(PURCHASED_COMPONENTS[i].developedOn);
        developedOn.innerText = months[developedOnObject.getMonth()] + " " + developedOnObject.getDate() + ", " + developedOnObject.getFullYear();
        developedOn.setAttribute("class", "marketsTableRowName");
        row.appendChild(developedOn);
        let developedBy = document.createElement("td");
        developedBy.innerText = PURCHASED_COMPONENTS[i].developerUsername;
        let developerAddress = PURCHASED_COMPONENTS[i].developerAddress;
        if (loginStatus == "true" && PURCHASED_COMPONENTS[i].developerUsername != "Tradegen")
        {
            developedBy.addEventListener('click', function(){ window.location.href = '/profile/' + developerAddress; });
            developedBy.addEventListener('mouseover', function(){ developedBy.style.cursor = "pointer"; });
        }
        developedBy.setAttribute("class", "marketsTableRowName");
        row.appendChild(developedBy);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableCirculatingSupply");

        let viewButton = document.createElement("button");
        viewButton.innerText = "View Code";
        viewButton.setAttribute("class", "viewButton");
        viewButton.style.width = "90px";
        viewButton.addEventListener('click', function(){ window.location.href = 'https://explorer.celo.org/';});

        let infoButton = document.createElement("button");
        infoButton.innerText = "Info";
        infoButton.setAttribute("class", "viewButton");
        let componentDescription = PURCHASED_COMPONENTS[i].description;
        infoButton.addEventListener('click', function(){
            document.getElementById("componentDescription").innerText = componentDescription;
            displayComponentInfoModal();
        });

        actions.appendChild(viewButton);
        actions.appendChild(infoButton);
        row.appendChild(actions);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();
}

function buildTable2()
{
    let table = document.getElementById("developedComponentsTable");
    table.setAttribute("class", "transactionsTable");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    let table_head = document.createElement("thead");
    let header_row = document.createElement("tr");
    let header_title1 = document.createElement("th");
    header_title1.innerText = "Component Name";
    header_title1.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title1);
    let header_title2 = document.createElement("th");
    header_title2.innerText = "Type";
    header_title2.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title2);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Developed On";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "Price";
    header_title5.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title5);
    let header_title6 = document.createElement("th");
    header_title6.innerText = "Number of Integrations";
    header_title6.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title6);
    let header_title7 = document.createElement("th");
    header_title7.innerText = "Status";
    header_title7.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title7);
    let header_title8 = document.createElement("th");
    header_title8.innerText = "Actions";
    header_title8.setAttribute("class", "marketsTableCirculatingSupply");
    header_row.appendChild(header_title8);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH2 - 1) - ((PAGE2 - 1) * SIZE2);
    let end = Math.max(-1, start - SIZE2);

    for(let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let componentName = document.createElement("td");
        componentName.innerText = DEVELOPED_COMPONENTS[i].componentName;
        componentName.setAttribute("class", "marketsTableRowName");
        let componentType = document.createElement("td");
        componentType.innerText = DEVELOPED_COMPONENTS[i].componentType;
        componentType.setAttribute("class", "marketsTableRowName");
        row.appendChild(componentType);
        let developedOn = document.createElement("td");
        let developedOnObject = new Date(DEVELOPED_COMPONENTS[i].developedOn);
        developedOn.innerText = months[developedOnObject.getMonth()] + " " + developedOnObject.getDate() + ", " + developedOnObject.getFullYear();
        developedOn.setAttribute("class", "marketsTableRowName");
        row.appendChild(developedOn);
        let price = document.createElement("td");
        price.innerText = DEVELOPED_COMPONENTS[i].price + " TGEN";
        price.setAttribute("class", "marketsTableRowName");
        row.appendChild(price);
        let numberOfIntegrations = document.createElement("td");
        numberOfIntegrations.innerText = DEVELOPED_COMPONENTS[i].numberOfIntegrations;
        numberOfIntegrations.setAttribute("class", "marketsTableRowName");
        row.appendChild(numberOfIntegrations);
        let status = document.createElement("td");
        status.innerText = DEVELOPED_COMPONENTS[i].status;
        status.setAttribute("class", "marketsTableRowName");
        row.appendChild(status);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableCirculatingSupply");

        let viewButton = document.createElement("button");
        viewButton.innerText = "View Code";
        viewButton.setAttribute("class", "viewButton");
        viewButton.style.width = "90px";
        viewButton.addEventListener('click', function(){ window.location.href = 'https://explorer.celo.org/';});

        let infoButton = document.createElement("button");
        infoButton.innerText = "Info";
        infoButton.setAttribute("class", "viewButton");
        let componentDescription = DEVELOPED_COMPONENTS[i].description;
        infoButton.addEventListener('click', function(){
            document.getElementById("componentDescription").innerText = componentDescription;
            displayComponentInfoModal();
        });

        actions.appendChild(viewButton);
        actions.appendChild(infoButton);
        row.appendChild(actions);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);

    document.getElementById("pageNumber").innerText = "Page " + PAGE2.toString() + " of " + MAX_PAGES2.toString();

    document.getElementById("loadingPage").remove();
    
    if (LENGTH2 > 0 || LENGTH > 0)
    {
        document.getElementById("mainContent").style.display = "block";
    }
    else
    {
        document.getElementById("boh").style.display = "block";
        document.getElementById("boh").innerText = "No components...yet!";
    }
}

function buildPanels()
{
    let mainDiv = document.getElementById("panels");
    while (mainDiv.hasChildNodes())
    {
        mainDiv.removeChild(mainDiv.firstChild);
    }

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for (let i = start; i > end; i--)
    {
        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = PURCHASED_COMPONENTS[i].componentName;
        let componentType = document.createElement("div");
        componentType.setAttribute("class", "tradingBotStoreProductTitle");
        componentType.innerText = PURCHASED_COMPONENTS[i].componentType;
        topRow.appendChild(title);
        topRow.appendChild(componentType);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        let developedOn = document.createElement("div");
        developedOn.setAttribute("class", "tradingBotStoreProductFrequency block");
        let developedOnText = document.createElement("a");
        developedOnText.setAttribute("class", "tradingBotStoreProductTopText");
        developedOnText.innerText = "Developed On";
        let developedOnBR = document.createElement("br");
        let developedOnData = document.createElement("a");
        developedOnData.setAttribute("class", "tradingBotStoreProductBottomText");
        let developedOnObject = new Date(PURCHASED_COMPONENTS[i].developedOn);
        developedOnData.innerText = months[developedOnObject.getMonth()] + " " + developedOnObject.getDate() + ", " + developedOnObject.getFullYear();
        developedOnData.style.fontWeight = "500";
        developedOn.appendChild(developedOnText);
        developedOn.appendChild(developedOnBR);
        developedOn.appendChild(developedOnData);
        let developedBy = document.createElement("div");
        developedBy.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let developedByText = document.createElement("a");
        developedByText.setAttribute("class", "tradingBotStoreProductTopText");
        developedByText.innerText = "Developed By";
        let developedByBR = document.createElement("br");
        let developedByData = document.createElement("a");
        developedByData.setAttribute("class", "tradingBotStoreProductBottomText");
        developedByData.innerText = PURCHASED_COMPONENTS[i].developerUsername;
        developedByData.style.fontWeight = "500";
        developedBy.appendChild(developedByText);
        developedBy.appendChild(developedByBR);
        developedBy.appendChild(developedByData);

        let viewButton = document.createElement("button");
        viewButton.innerText = "View Code";
        viewButton.setAttribute("class", "viewButton");
        viewButton.style.width = "90px";
        viewButton.addEventListener('click', function(){ window.location.href = 'https://explorer.celo.org/';});

        let infoButton = document.createElement("button");
        infoButton.innerText = "Info";
        infoButton.setAttribute("class", "viewButton");
        let componentDescription = PURCHASED_COMPONENTS[i].description;
        infoButton.addEventListener('click', function(){
            document.getElementById("componentDescription").innerText = componentDescription;
            displayComponentInfoModal();
        });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);
        buttons.appendChild(infoButton);

        bottomRow.appendChild(developedOn);
        bottomRow.appendChild(developedBy);
        bottomRow.appendChild(buttons);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();
}

function buildPanels2()
{
    let mainDiv = document.getElementById("panels2");
    while (mainDiv.hasChildNodes())
    {
        mainDiv.removeChild(mainDiv.firstChild);
    }

    let start = (LENGTH2 - 1) - ((PAGE2 - 1) * SIZE2);
    let end = Math.max(-1, start - SIZE2);

    for (let i = start; i > end; i--)
    {
        let div = document.createElement("div");
        div.setAttribute("class", "tradingBotStoreProductInfo");

        let topRow = document.createElement("div");
        topRow.setAttribute("class", "tradingBotStoreProductTopRow");
        let title = document.createElement("div");
        title.setAttribute("class", "tradingBotStoreProductTitle");
        title.innerText = DEVELOPED_COMPONENTS[i].componentName;
        let componentType = document.createElement("div");
        componentType.setAttribute("class", "tradingBotStoreProductTitle");
        componentType.innerText = DEVELOPED_COMPONENTS[i].componentType;
        topRow.appendChild(title);
        topRow.appendChild(componentType);

        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
        let developedOn = document.createElement("div");
        developedOn.setAttribute("class", "tradingBotStoreProductFrequency block");
        let developedOnText = document.createElement("a");
        developedOnText.setAttribute("class", "tradingBotStoreProductTopText");
        developedOnText.innerText = "Developed On";
        let developedOnBR = document.createElement("br");
        let developedOnData = document.createElement("a");
        developedOnData.setAttribute("class", "tradingBotStoreProductBottomText");
        let developedOnObject = new Date(DEVELOPED_COMPONENTS[i].developedOn);
        developedOnData.innerText = months[developedOnObject.getMonth()] + " " + developedOnObject.getDate() + ", " + developedOnObject.getFullYear();
        developedOnData.style.fontWeight = "500";
        developedOn.appendChild(developedOnText);
        developedOn.appendChild(developedOnBR);
        developedOn.appendChild(developedOnData);
        let price = document.createElement("div");
        price.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let priceText = document.createElement("a");
        priceText.setAttribute("class", "tradingBotStoreProductTopText");
        priceText.innerText = "Price";
        let priceBR = document.createElement("br");
        let priceData = document.createElement("a");
        priceData.setAttribute("class", "tradingBotStoreProductBottomText");
        priceData.innerText = DEVELOPED_COMPONENTS[i].price + " TGEN";
        priceData.style.fontWeight = "500";
        price.appendChild(priceText);
        price.appendChild(priceBR);
        price.appendChild(priceData);
        let numberOfIntegrations = document.createElement("div");
        numberOfIntegrations.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let numberOfIntegrationsText = document.createElement("a");
        numberOfIntegrationsText.setAttribute("class", "tradingBotStoreProductTopText");
        numberOfIntegrationsText.innerText = "Number of Integrations";
        let numberOfIntegrationsBR = document.createElement("br");
        let numberOfIntegrationsData = document.createElement("a");
        numberOfIntegrationsData.setAttribute("class", "tradingBotStoreProductBottomText");
        numberOfIntegrationsData.innerText = DEVELOPED_COMPONENTS[i].numberOfSales;
        numberOfIntegrationsData.style.fontWeight = "500";
        numberOfIntegrations.appendChild(numberOfIntegrationsText);
        numberOfIntegrations.appendChild(numberOfIntegrationsBR);
        numberOfIntegrations.appendChild(numberOfIntegrationsData);
        let status = document.createElement("div");
        status.setAttribute("class", "tradingBotStoreProductAccuracy block");
        let statusText = document.createElement("a");
        statusText.setAttribute("class", "tradingBotStoreProductTopText");
        statusText.innerText = "Status";
        let statusBR = document.createElement("br");
        let statusData = document.createElement("a");
        statusData.setAttribute("class", "tradingBotStoreProductBottomText");
        statusData.innerText = DEVELOPED_COMPONENTS[i].status;
        statusData.style.fontWeight = "500";
        status.appendChild(statusText);
        status.appendChild(statusBR);
        status.appendChild(statusData);

        let viewButton = document.createElement("button");
        viewButton.innerText = "View Code";
        viewButton.setAttribute("class", "viewButton");
        viewButton.style.width = "90px";
        viewButton.addEventListener('click', function(){ window.location.href = 'https://explorer.celo.org/';});

        let infoButton = document.createElement("button");
        infoButton.innerText = "Info";
        infoButton.setAttribute("class", "viewButton");
        let componentDescription = PURCHASED_COMPONENTS[i].description;
        infoButton.addEventListener('click', function(){
            document.getElementById("componentDescription").innerText = componentDescription;
            displayComponentInfoModal();
        });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);
        buttons.appendChild(infoButton);

        bottomRow.appendChild(developedOn);
        bottomRow.appendChild(price);
        bottomRow.appendChild(numberOfIntegrations);
        bottomRow.appendChild(status);
        bottomRow.appendChild(buttons);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber2").innerText = "Page " + PAGE2.toString() + " of " + MAX_PAGES2.toString();

    if (DEVELOPED_COMPONENTS.length > 0 || PURCHASED_COMPONENTS)
    {
        document.getElementById("loadingPage").remove();
        document.getElementById("table2").remove();
        document.getElementById("table").remove();
        document.getElementById("sotong").style.display = "block";
    }
}

function getData()
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        LENGTH = response.purchasedComponents.length;
        LENGTH2 = response.developedComponents.length;

        MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);
        MAX_PAGES2 = Math.max(Math.ceil(LENGTH2 / SIZE2), 1);

        PURCHASED_COMPONENTS = response.purchasedComponents;
        DEVELOPED_COMPONENTS = response.developedComponents;

        //render panels for mobile
        if(isMobile.any()) 
        {
            buildPanels();
            buildPanels2();
        }
        else//render table for desktop
        {
            buildTable();
            buildTable2();
        }
    }
    xhttpRep.open("GET", '/get_my_components', true);
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

function hideComponentInfoModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#componentInfoModal" ).dialog('close');
}

function displayComponentInfoModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;

    document.getElementById('pageMask').style.display = "block";
    $( "#componentInfoModal" ).dialog({
        height: 240,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#componentInfoModal" ).show()
}