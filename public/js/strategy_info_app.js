var GOOGLE;

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

let strategyStatus = document.getElementById("strategyStatus").value;

function initialize(google)
{
    GOOGLE = google;

    if (isMobile.any())
    {

        document.getElementById("chart4").style.paddingTop = "0px";
        document.getElementById("chart4").style.paddingBottom = "0px";
        document.getElementById("chart4").style.paddingLeft = "0px";
        document.getElementById("chart4").style.paddingRight = "0px";
        drawChart4();
        document.getElementById("chart4").style.display = "block";
        document.getElementById("chart4").style.zIndex = "1";
    }
    else
    {
        drawChart();
    }

    let ID = document.getElementById('sianjitpua').value;

    if (ID != "")
    {
        if (document.getElementById("tokenInfoButtonWeb"))
        {
            document.getElementById('tokenInfoButtonWeb').addEventListener('click', function(){
                window.location.href = '/token_info/' + encodeURIComponent(ID);
            });

            document.getElementById('tokenInfoButtonWeb').style.display = "block";
        }

        if (document.getElementById("tokenInfoButtonMobile"))
        {
            document.getElementById('tokenInfoButtonMobile').addEventListener('click', function(){
                window.location.href = '/token_info/' + encodeURIComponent(ID);
            });
        }

        if (document.getElementById("transactionsButtonWeb"))
        {
            document.getElementById('transactionsButtonWeb').addEventListener('click', function(){
                window.location.href = '/history/' + encodeURIComponent(ID);
            });

            document.getElementById('tradingBotButtonWeb').style.display = "block";
        }

        if (document.getElementById("transactionsButtonMobile"))
        {
            document.getElementById('transactionsButtonMobile').addEventListener('click', function(){
                window.location.href = '/history/' + encodeURIComponent(ID);
            });
        }
    }

    if (strategyStatus != "Live")
    {
        if (document.getElementById("tokenInfoButtonWeb"))
        {
            document.getElementById('tokenInfoButtonWeb').remove();
        }

        if (document.getElementById("tokenInfoButtonMobile"))
        {
            document.getElementById('tokenInfoButtonMobile').remove();
        }

        if (document.getElementById("transactionsButtonWeb"))
        {
            document.getElementById('transactionsButtonWeb').remove();
        }

        if (document.getElementById("transactionsButtonMobile"))
        {
            document.getElementById('transactionsButtonMobile').remove();
        }
    }
}

function drawChart() {
    let rawData = document.getElementById("sotong").value;
    let backtestData = JSON.parse(rawData);
    let dates = backtestData.availableDates;
    var chart = new GOOGLE.visualization.AreaChart(document.getElementById('chart'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let maxValue = -1.0;
    let minValue = 99999999.0;

    let output = [];
    output.push(['Date', 'Strategy']);

    for (var i = 0; i < backtestData.strategyHistory.length; i+=1)
    {
        let temp = new Date(dates[i]);
        if (!dates[i])
        {
            continue;
        }
        let date = new Date(Date.UTC(dates[i].split("-")[0], parseInt(dates[i].split("-")[1]) - 1, dates[i].split("-")[2]) + (1000 * 60 * temp.getTimezoneOffset()));
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, backtestData.strategyHistory[i]]);
        maxValue = Math.max(maxValue, backtestData.strategyHistory[i]);
        minValue = Math.min(minValue, backtestData.strategyHistory[i]);
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
            title: "Account Value",
            titleTextStyle: {
                fontSize: 16,
                italic: false
            },
        }
    };

    chart.draw(data, options);
}

function drawChart4() {
    let rawData = document.getElementById("sotong").value;

    let data = JSON.parse(rawData);
    let history = data.strategyHistory;
    let dates = data.availableDates;
    var chart4 = new GOOGLE.visualization.AreaChart(document.getElementById('chart4'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Price']);

    let maxValue = 0.0;
    let minValue = 99999.0;

    for (var i = 0; i < history.length; i+=1)
    {
        let temp = new Date(dates[i]);
        if (!dates[i])
        {
            continue;
        }
        let date = new Date(Date.UTC(dates[i].split("-")[0], parseInt(dates[i].split("-")[1]) - 1, dates[i].split("-")[2]) + (1000 * 60 * temp.getTimezoneOffset()));
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, history[i]]);
        maxValue = Math.max(maxValue, history[i]);
        minValue = Math.min(minValue, history[i]);
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
            minValue: Math.max(0.000, minValue - 10000),
            maxValue: maxValue + 10000,
            title: "Account Value",
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

    let totalReturn = parseFloat(document.getElementById("backtestResult_TotalReturn").innerText);

    if (totalReturn > 0)
    {
        document.getElementById("backtestResult_TotalReturn").innerText = "+" + totalReturn.toFixed(2) + "%";
        document.getElementById("backtestResult_TotalReturn").style.color = "#00cf92";
    }
    else if (totalReturn < 0)
    {
        document.getElementById("backtestResult_TotalReturn").style.color = "#fe3957";
    }
    else
    {
        document.getElementById("backtestResult_TotalReturn").style.color = "#9ea1a4";
    }

    document.getElementById("backtestResult_AverageWin").style.color = "#00cf92";
    document.getElementById("backtestResult_AverageLoss").style.color = "#fe3957";
    document.getElementById("backtestResult_MaxDrawdown").style.color = "#fe3957";


    let loginStatus = document.getElementById("status").value;

    if (loginStatus == "True")
    {
        let address = document.getElementById("userAddress").value;

        document.getElementById("developer").addEventListener('click', function(){ window.location.href = '/profile/' + encodeURIComponent(address); });
        document.getElementById("developer").addEventListener('mouseover', function(){ 
            document.getElementById("developer").style.cursor = "pointer";
        });
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