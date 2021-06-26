var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;
var COMPONENTS = [];

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
    document.getElementById("componentInfoModal").style.display = "none";
    document.getElementById("componentInfoModal").style.textAlign = "center";

    document.getElementById("buyComponentModal").style.display = "none";
    document.getElementById("buyComponentModal").style.textAlign = "center";
    document.getElementById("successModalBuyComponent").style.display = "none";
    document.getElementById("errorModalBuyComponent").style.display = "none";

    if (document.getElementById('buyComponentButton'))
    {
        document.getElementById('buyComponentButton')
            .addEventListener('click', function()
            {
                displayBuyComponentModal();
            });
        document.getElementById('buyComponentButton')
            .addEventListener('mouseover', function()
            {
                document.getElementById('buyComponentButton').style.cursor = "pointer";
            });
    }

    if (document.getElementById('cancelBuyComponent'))
    {
        document.getElementById('cancelBuyComponent')
            .addEventListener('click', hideBuyComponentModal);
    }

    if (document.getElementById('closeComponentInfo'))
    {
        document.getElementById('closeComponentInfo')
            .addEventListener('click', hideComponentInfoModal);
    }

    if (document.getElementById('successButtonBuyComponent'))
    {
        document.getElementById('successButtonBuyComponent')
        .addEventListener('click', function(){
            window.location.href = '/my_components';
        });
    }

    if (document.getElementById('errorButtonBuyComponent'))
    {
        document.getElementById('errorButtonBuyComponent')
            .addEventListener('click', hideErrorModalBuyComponent);
    }

    document.getElementById('confirmBuyComponent').addEventListener('click', buyComponent);

    document.getElementById("successModalBuyComponent").style.fontSize = "16px";
    document.getElementById("successTitleBuyComponent").style.marginTop = "20px !important";
    document.getElementById("successModalBuyComponent").style.fontWeight = "500";
    document.getElementById("successTitleBuyComponent").style.marginBottom = "0px !important";
    document.getElementById("errorModalBuyComponent").style.fontSize = "16px";
    document.getElementById("errorTitleBuyComponent").style.marginTop = "20px !important";
    document.getElementById("errorModalBuyComponent").style.fontWeight = "500";
    document.getElementById("errorTitleBuyComponent").style.marginBottom = "0px !important";

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
        if (document.getElementById("addComponentButtonWeb"))
        {
            document.getElementById('addComponentButtonWeb').addEventListener('click', function(){
                window.location.href = '/add_component';
            });

            document.getElementById('addComponentButtonWeb').style.display = "block";
        }
    }

    getData();
});

function buildTable()
{
    let table = document.getElementById("componentsTable");
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
    let header_title21 = document.createElement("th");
    header_title21.innerText = "Developed On";
    header_title21.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title21);
    let header_title3 = document.createElement("th");
    header_title3.innerText = "Developed By";
    header_title3.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title3);
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Number of Integrations";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    let header_title5 = document.createElement("th");
    header_title5.innerText = "Price";
    header_title5.setAttribute("class", "marketsTableRowName");
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

    let loginStatus = document.getElementById("status").value;

    for (let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let componentName = document.createElement("td");
        componentName.innerText = COMPONENTS[i].componentName;
        componentName.setAttribute("class", "marketsTableRowName");
        componentName.style.fontWeight = "500";
        row.appendChild(componentName);
        let componentType = document.createElement("td");
        componentType.innerText = COMPONENTS[i].componentType;
        componentType.setAttribute("class", "marketsTableRowName");
        componentType.style.fontWeight = "500";
        row.appendChild(componentType);
        let developedOn = document.createElement("td");
        let developedOnObject = new Date(COMPONENTS[i].developedOn);
        developedOn.innerText = months[developedOnObject.getMonth()] + " " + developedOnObject.getDate() + ", " + developedOnObject.getFullYear();
        developedOn.setAttribute("class", "marketsTableRowName");
        row.appendChild(developedOn);
        let developedBy = document.createElement("td");
        developedBy.innerText = COMPONENTS[i].developerUsername;
        let developerAddress = COMPONENTS[i].developerAddress;
        if (loginStatus == "true")
        {
            developedBy.addEventListener('click', function(){ window.location.href = '/profile/' + developerAddress; });
            developedBy.addEventListener('mouseover', function(){ developedBy.style.cursor = "pointer"; });
        }
        developedBy.setAttribute("class", "marketsTableRowName");
        row.appendChild(developedBy);
        let numberOfSales = document.createElement("td");
        numberOfSales.innerText = COMPONENTS[i].numberOfSales;
        numberOfSales.setAttribute("class", "marketsTableRowName");
        numberOfSales.style.fontWeight = "500";
        row.appendChild(numberOfSales);
        let price = document.createElement("td");
        price.innerText = COMPONENTS[i].price + " TGEN";
        price.setAttribute("class", "marketsTableRowName");
        price.style.fontWeight = "500";
        row.appendChild(price);

        let actions = document.createElement("td");
        actions.setAttribute("class", "marketsTableRowData");
        actions.style.textAlign = "center";

        let viewButton = document.createElement("button");
        viewButton.innerText = "View Code";
        viewButton.setAttribute("class", "viewButton");
        viewButton.style.width = "90px";
        viewButton.addEventListener('click', function(){ window.location.href = 'https://explorer.celo.org/';});

        let infoButton = document.createElement("button");
        infoButton.innerText = "Info";
        infoButton.setAttribute("class", "viewButton");
        let componentDescription = COMPONENTS[i].description;
        infoButton.addEventListener('click', function(){
            document.getElementById("componentDescription").innerText = componentDescription;
            displayComponentInfoModal();
        });

        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.setAttribute("class", "buyButton");
        let componentID = COMPONENTS[i].componentID;
        let amount = COMPONENTS[i].price.toFixed(2);
        buyButton.addEventListener('click', function(){
            document.getElementById("componentID").value = componentID;
            document.getElementById("amount").innerText = amount + " TGEN";
            displayBuyComponentModal();
        });

        actions.appendChild(viewButton);
        actions.appendChild(infoButton);

        if (loginStatus == "true")
        {
            actions.appendChild(buyButton);
        }

        row.appendChild(actions);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    if (COMPONENTS.length > 0)
    {
        document.getElementById("loadingPage").remove();
        document.getElementById("sotong").style.display = "block";
    }
    else
    {
        document.getElementById("loadingPage").innerText = "No components yet";
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
        title.innerText = COMPONENTS[i].componentName;
        let componentType = document.createElement("div");
        componentType.setAttribute("class", "tradingBotStoreProductTitle");
        componentType.innerText = COMPONENTS[i].componentType;
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
        let developedOnObject = new Date(COMPONENTS[i].developedOn);
        developedOnDaata.innerText = months[developedOnObject.getMonth()] + " " + developedOnObject.getDate() + ", " + developedOnObject.getFullYear();
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
        developedByData.innerText = COMPONENTS[i].developerUsername;
        developedByData.style.fontWeight = "500";
        developedBy.appendChild(developedByText);
        developedBy.appendChild(developedByBR);
        developedBy.appendChild(developedByData);
        let numberOfSales = document.createElement("div");
        numberOfSales.setAttribute("class", "tradingBotStoreProductFrequency block");
        let numberOfSalesText = document.createElement("a");
        numberOfSalesText.setAttribute("class", "tradingBotStoreProductTopText");
        numberOfSalesText.innerText = "Number of Integrations";
        let numberOfSalesBR = document.createElement("br");
        let numberOfSalesData = document.createElement("a");
        numberOfSalesData.setAttribute("class", "tradingBotStoreProductBottomText");
        numberOfSalesData.innerText = COMPONENTS[i].numberOfSales;
        numberOfSalesData.style.fontWeight = "500";
        numberOfSales.appendChild(numberOfSalesText);
        numberOfSales.appendChild(numberOfSalesBR);
        numberOfSales.appendChild(numberOfSalesData);
        let price = document.createElement("div");
        price.setAttribute("class", "tradingBotStoreProductFrequency block");
        let priceText = document.createElement("a");
        priceText.setAttribute("class", "tradingBotStoreProductTopText");
        priceText.innerText = "Performance Fee";
        let priceBR = document.createElement("br");
        let priceData = document.createElement("a");
        priceData.setAttribute("class", "tradingBotStoreProductBottomText");
        priceData.innerText = COMPONENTS[i].price + " TGEN";
        priceData.style.fontWeight = "500";
        price.appendChild(priceText);
        price.appendChild(priceBR);
        price.appendChild(priceData);

        let viewButton = document.createElement("button");
        viewButton.innerText = "View Code";
        viewButton.setAttribute("class", "viewButton");
        viewButton.style.width = "90px";
        viewButton.addEventListener('click', function(){ window.location.href = 'https://explorer.celo.org/';});

        let infoButton = document.createElement("button");
        infoButton.innerText = "Info";
        infoButton.setAttribute("class", "viewButton");
        let componentDescription = COMPONENTS[i].description;
        infoButton.addEventListener('click', function(){
            document.getElementById("componentDescription").innerText = componentDescription;
            displayComponentInfoModal();
        });

        let loginStatus = document.getElementById("status").value;

        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.setAttribute("class", "buyButton");
        let componentID = COMPONENTS[i].componentID;
        let amount = COMPONENTS[i].price.toFixed(2);
        buyButton.addEventListener('click', function(){
            document.getElementById("componentID").value = componentID;
            document.getElementById("amount").innerText = amount + " TGEN";
            displayBuyComponentModal();
        });

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "tradingBotStoreProductButton");
        buttons.appendChild(viewButton);
        buttons.appendChild(infoButton);

        if (loginStatus == "true")
        {
            buttons.appendChild(buyButton);
        }

        bottomRow.appendChild(developedOn);
        bottomRow.appendChild(developedBy);
        bottomRow.appendChild(numberOfSales);
        bottomRow.appendChild(price);
        bottomRow.appendChild(buttons);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    if (COMPONENTS.length > 0)
    {
        document.getElementById("loadingPage").remove();
        document.getElementById("table").remove();
        document.getElementById("sotong").style.display = "block";
    }
    else
    {
        document.getElementById("loadingPage").innerText = "No components yet";
    }
}

function getData()
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        COMPONENTS = response.components;
        LENGTH = response.components.length;

        MAX_PAGES = Math.ceil(LENGTH / SIZE);

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
    xhttpRep.open("GET", '/get_all_components', true);
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

function hideBuyComponentModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#buyComponentModal" ).dialog('close');
}

function displayBuyComponentModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 480) : 480;

    document.getElementById('pageMask').style.display = "block";
    $( "#buyComponentModal" ).dialog({
        height: 220,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#buyComponentModal" ).show()
}

function buyComponent()
{
    let csrf = document.getElementById("atas").value;
    let componentID = document.getElementById("componentID").value;
    
    let temp = JSON.stringify({
        componentID: componentID,
        csrf: csrf
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalBuyComponent();
            return;
        }
        else
        {
            displayErrorModalBuyComponent(response.response);
            return;
        }
    };
    xhttpRep.open("POST", '/buy_component', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideBuyComponentModal();
}

function hideSuccessModalBuyComponent() 
{
    $( "#successModalBuyComponent" ).dialog('close');
}

function displaySuccessModalBuyComponent() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 320;
    var Y = window.pageYOffset;
    $( "#successModalBuyComponent" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalBuyComponent").dialog("close");
                window.location.href = '/my_components';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalBuyComponent" ).show()
}

function hideErrorModalBuyComponent() 
{
    $( "#errorModalBuyComponent" ).dialog('close');
}

function displayErrorModalBuyComponent(message) 
{
    document.getElementById("errorTextBuyComponent").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#errorModalBuyComponent" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalBuyComponent").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalBuyComponent" ).show()
}