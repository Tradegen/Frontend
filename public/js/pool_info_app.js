var GOOGLE;
var PAGE = 1;
var SIZE = 25;
var LENGTH = 1;
var MAX_PAGES = 1;

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

function initialize(google)
{
    GOOGLE = google;
    SIZE = isMobile.any() ? 10 : 25;
    LENGTH = JSON.parse(document.getElementById("dataString3").value).transactionHistory.length;
    MAX_PAGES = Math.max(Math.ceil(LENGTH / SIZE), 1);

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

    if (isMobile.any())
    {
        document.getElementById("chart4").style.paddingTop = "0px";
        document.getElementById("chart4").style.paddingBottom = "0px";
        document.getElementById("chart4").style.paddingLeft = "0px";
        document.getElementById("chart4").style.paddingRight = "0px";
        drawChart4();
        document.getElementById("chart4").style.display = "block";
        document.getElementById("chart4").style.zIndex = "1";

        document.getElementById("chart3").style.paddingTop = "0px";
        document.getElementById("chart3").style.paddingBottom = "0px";
        document.getElementById("chart3").style.paddingLeft = "0px";
        document.getElementById("chart3").style.paddingRight = "0px";
        drawChart3();
        document.getElementById("chart3").style.display = "block";
        document.getElementById("chart3").style.zIndex = "1";

        document.getElementById("backtestParent").remove();
        document.getElementById("backtestParent2").remove();
        buildPanels();
    }
    else
    {
        drawAssetChart();
        drawChart();
        drawChart2();
        buildTable();
    }

    let ID = document.getElementById('sianjitpua').value;
    let loginStatus = document.getElementById("status").value;

    if (ID != "" && loginStatus == "True")
    {
        if (document.getElementById("investButtonWeb"))
        {
            document.getElementById('investButtonWeb').addEventListener('click', function(){
                window.location.href = '/manage_pool_investment/' + encodeURIComponent(ID);
            });

            document.getElementById('investButtonWeb').style.display = "block";
        }

        if (document.getElementById("investButtonMobile"))
        {
            document.getElementById('investButtonMobile').addEventListener('click', function(){
                window.location.href = '/manage_pool_investment/' + encodeURIComponent(ID);
            });
        }
    }
}

function drawAssetChart() {
    let rawData = document.getElementById("dataString4").value;
    let positions = JSON.parse(rawData).positions;
    var chart = new GOOGLE.visualization.PieChart(document.getElementById('assetChart'));

    let output = [];
    output.push(['Symbol', 'Amount Invested']);

    for (var i = 0; i < positions.length; i+=1)
    {
        output.push([positions[i].assetSymbol, (positions[i].numberOfTokens * positions[i].averagePrice)]);
    }

    var data = GOOGLE.visualization.arrayToDataTable(output);

    var options = {
        backgroundColor: "#fbfbfb",
        fontSize: 14
    };

    chart.draw(data, options);
}

function drawChart() {
    let rawData = document.getElementById("dataString").value;
    let tokenHistory = JSON.parse(rawData).tokenHistory;
    var chart = new GOOGLE.visualization.AreaChart(document.getElementById('chart'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Token Price']);

    for (var i = 0; i < tokenHistory.length; i+=1)
    {
        let date = new Date(tokenHistory[i].timestamp);
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, tokenHistory[i].tokenPrice]);
    }

    var data = GOOGLE.visualization.arrayToDataTable(output);

    var options = {
        curveType: 'function',
        legend: { position: 'none' },
        chartArea: {'width': '85%', 'height': '65%', 'left': '12%', 'top': '0px'},
        crosshair: {
            color: 'black',
            trigger: 'both'
        },
        explorer: {
        },
        tooltip: {},
        areaOpacity: 0.1,
        hAxis: {
            slantedText: true,
            maxAlternation: 1,
            slantedTextAngle: 50,
            minorGridlines: {
                count: 0
            },
            textStyle: {
                fontSize: 14
            }
        },
        vAxis: {
            title: "Token Price ($)",
            titleTextStyle: {
                fontSize: 16,
                italic: false
            },
        }
    };

    chart.draw(data, options);
}

function drawChart2() {
    let rawData = document.getElementById("dataString2").value;
    let poolHistory = JSON.parse(rawData).poolHistory;
    var chart2 = new GOOGLE.visualization.AreaChart(document.getElementById('chart2'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Pool Value ($)']);

    for (var i = 0; i < poolHistory.length; i+=1)
    {
        let date = new Date(poolHistory[i].timestamp);
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, poolHistory[i].poolValue]);
    }

    var data = GOOGLE.visualization.arrayToDataTable(output);

    var options = {
        curveType: 'function',
        legend: { position: 'none' },
        chartArea: {'width': '85%', 'height': '65%', 'left': '12%', 'top': '0px'},
        crosshair: {
            color: 'black',
            trigger: 'both'
        },
        explorer: {
        },
        tooltip: {},
        areaOpacity: 0.1,
        hAxis: {
            slantedText: true,
            maxAlternation: 1,
            slantedTextAngle: 50,
            minorGridlines: {
                count: 0
            },
            textStyle: {
                fontSize: 14
            }
        },
        vAxis: {
            title: "Pool Value ($)",
            titleTextStyle: {
                fontSize: 16,
                italic: false
            },
        }
    };

    chart2.draw(data, options);
}

function drawChart3() {
    let rawData = document.getElementById("dataString2").value;
    let data = JSON.parse(rawData);
    let history = data.poolHistory;
    var chart3 = new GOOGLE.visualization.AreaChart(document.getElementById('chart3'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Pool Value ($)']);

    for (var i = 0; i < history.length; i+=1)
    {
        let date = new Date(history[i].timestamp);
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, history[i].poolValue]);
    }

    var data3 = GOOGLE.visualization.arrayToDataTable(output);

    var options = {
        curveType: 'function',
        legend: { position: 'none' },
        chartArea: {'width': '80%', 'height': '90%', 'top': '8%', 'left': '20%'},
        areaOpacity: 0.1,
        height: 350,
        width: 0.7 * screen.width,
        crosshair: {
            color: 'black',
            trigger: 'both'
        },
        explorer: {
        },
        tooltip: {},
        vAxis: {
            title: "Pool Value ($)",
            titleTextStyle: {
                fontSize: 16,
                italic: false
            },
            gridlines: {
                count: 5
            },
            minorGridlines: {
                count: 0
            }
        }
    };

    chart3.draw(data3, options);
}

function drawChart4() {
    let rawData = document.getElementById("dataString").value;
    let data = JSON.parse(rawData);
    let history = data.tokenHistory;
    var chart4 = new GOOGLE.visualization.AreaChart(document.getElementById('chart4'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Token Price ($)']);

    for (var i = 0; i < history.length; i+=1)
    {
        let date = new Date(history[i].timestamp);
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, history[i].tokenPrice]);
    }

    var data4 = GOOGLE.visualization.arrayToDataTable(output);

    var options = {
        curveType: 'function',
        legend: { position: 'none' },
        chartArea: {'width': '80%', 'height': '90%', 'top': '8%', 'left': '20%'},
        areaOpacity: 0.1,
        height: 350,
        width: 0.7 * screen.width,
        crosshair: {
            color: 'black',
            trigger: 'both'
        },
        explorer: {
        },
        tooltip: {},
        vAxis: {
            title: "Token Price ($)",
            titleTextStyle: {
                fontSize: 16,
                italic: false
            },
            gridlines: {
                count: 5
            },
            minorGridlines: {
                count: 0
            }
        }
    };

    chart4.draw(data4, options);
}

document.addEventListener("DOMContentLoaded", async function() {
    let loginStatus = document.getElementById("status").value;

    if (loginStatus == "True")
    {
        let address = document.getElementById("managerAddress").value;

        if (isMobile.any())
        {
            document.getElementById("managerMobile").addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(address); });
            document.getElementById("managerMobile").addEventListener('mouseover', function(){ 
                document.getElementById("managerMobile").style.cursor = "pointer";
            });
        }
        else
        {
            document.getElementById("managerWeb").addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(address); });
            document.getElementById("managerWeb").addEventListener('mouseover', function(){ 
                document.getElementById("managerWeb").style.cursor = "pointer";
            });
        }
    }
});

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

function buildTable()
{
    let rawData = document.getElementById("dataString3").value;
    let data = JSON.parse(rawData);
    let transactionHistory = data.transactionHistory;

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
    header_title1.innerText = "Date";
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
    let header_title4 = document.createElement("th");
    header_title4.innerText = "Price";
    header_title4.setAttribute("class", "marketsTableRowName");
    header_row.appendChild(header_title4);
    table_head.appendChild(header_row);
    table.appendChild(table_head);

    let start = (LENGTH - 1) - ((PAGE - 1) * SIZE);
    let end = Math.max(-1, start - SIZE);

    for (let i = start; i > end; i--)
    {
        let row = document.createElement("tr");
        row.setAttribute("class", "tableRowHover");

        let date = document.createElement("td");
        let dateObject = new Date(transactionHistory[i].timestamp);
        date.innerText = months[dateObject.getMonth()] + " " + dateObject.getDate() + ", " + dateObject.getFullYear() + " " + dateObject.getHours() + ":" + ((dateObject.getMinutes() < 10) ? "0" + dateObject.getMinutes() : dateObject.getMinutes());
        date.setAttribute("class", "marketsTableRowName");
        row.appendChild(date);
        let symbol = document.createElement("td");
        symbol.innerText = transactionHistory[i].assetSymbol;
        symbol.setAttribute("class", "marketsTableRowName");
        row.appendChild(symbol);
        let size = document.createElement("td");
        size.innerText = transactionHistory[i].numberOfTokens;
        row.appendChild(size);
        size.setAttribute("class", "marketsTableRowName");
        let price = document.createElement("td");
        price.innerText = "$" + transactionHistory[i].price;
        price.setAttribute("class", "marketsTableRowName");
        row.appendChild(price);

        table_body.appendChild(row);
    }

    table.appendChild(table_body);

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();
    
    if (LENGTH > 0)
    {
        document.getElementById("transactionDiv").style.display = "block";
    }
}

function buildPanels()
{
    let rawData = document.getElementById("dataString3").value;
    let data = JSON.parse(rawData);
    let transactionHistory = data.transactionHistory;

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
        let dateObject = new Date(transactionHistory[i].timestamp);
        title.innerText = months[dateObject.getMonth()] + " " + dateObject.getDate() + ", " + dateObject.getFullYear() + " " + dateObject.getHours() + ":" + ((dateObject.getMinutes() < 10) ? "0" + dateObject.getMinutes() : dateObject.getMinutes());
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
        symbolData.innerText = transactionHistory[i].assetSymbol;
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
        sizeData.innerText = transactionHistory[i].numberOfTokens;
        sizeData.style.fontWeight = "500";
        size.appendChild(sizeText);
        size.appendChild(sizeBR);
        size.appendChild(sizeData);
        let price = document.createElement("div");
        price.setAttribute("class", "tradingBotStoreProductFrequency block");
        let priceText = document.createElement("a");
        priceText.setAttribute("class", "tradingBotStoreProductTopText");
        priceText.innerText = "Entry Price";
        let priceBR = document.createElement("br");
        let priceData = document.createElement("a");
        priceData.setAttribute("class", "tradingBotStoreProductBottomText");
        priceData.innerText = "$" + transactionHistory[i].price;
        priceData.style.fontWeight = "500";
        price.appendChild(priceText);
        price.appendChild(priceBR);
        price.appendChild(priceData);

        bottomRow.appendChild(symbol);
        bottomRow.appendChild(size);
        bottomRow.appendChild(price);

        div.appendChild(topRow);
        div.appendChild(bottomRow);

        mainDiv.appendChild(div);
    }

    document.getElementById("pageNumber").innerText = "Page " + PAGE.toString() + " of " + MAX_PAGES.toString();

    document.getElementById("table").remove();

    if (LENGTH > 0)
    {
        document.getElementById("transactionDiv").style.display = "block";
    }
}