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

function initialize(google)
{
    GOOGLE = google;
    
    if (isMobile.any())
    {
        document.getElementById("chartWrapper").style.marginLeft = "0%";
        document.getElementById("chart2").style.paddingTop = "0px";
        document.getElementById("chart2").style.paddingBottom = "0px";
        document.getElementById("chart2").style.paddingLeft = "0px";
        document.getElementById("chart2").style.paddingRight = "0px";
        drawChart2();
        document.getElementById("chart2").style.display = "block";
        document.getElementById("chart2").style.zIndex = "1";
    }
    else
    {
        drawChart();
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    if (document.getElementById('productButton'))
    {
        let ID = document.getElementById('sianjitpua').value;

        if (ID != "")
        {
            document.getElementById('productButton').addEventListener('click', function(){
                window.location.href = '/checkout/' + encodeURIComponent(ID);
            });
        }
        
    }

    generateContent();
});

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

function drawChart2() {
    let rawData = document.getElementById("sotong").value;

    let data = JSON.parse(rawData);
    let history = data.strategyHistory;
    let dates = data.availableDates;
    var chart2 = new GOOGLE.visualization.AreaChart(document.getElementById('chart2'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Price']);

    let maxValue = 0.0;
    let minValue = 99999.0;

    for (var i = 0; i < history.length; i+=1)
    {
        let temp = new Date(dates[i]);
        let date = new Date(Date.UTC(dates[i].split("-")[0], parseInt(dates[i].split("-")[1]) - 1, dates[i].split("-")[2]) + (1000 * 60 * temp.getTimezoneOffset()));
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, history[i]]);
        maxValue = Math.max(maxValue, history[i]);
        minValue = Math.min(minValue, history[i]);
    }

    var data2 = GOOGLE.visualization.arrayToDataTable(output);

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

    chart2.draw(data2, options);
}

function generateContent()
{
    for (var i = 1; i < 7; i+=1)
    {
        let ID = "faq" + i.toString();
        let index = i.toString();
        document.getElementById(ID).addEventListener("click", function() {
            handleClick(index);
        })
    }

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
}

function handleClick(index)
{
    let faq = document.getElementById("faq" + index);
    let icon = document.getElementById("icon" + index);
    let text = document.getElementById("text" + index);

    if (text.style.display != "block")
    {
        text.style.display = "block";
        icon.innerText = "expand_less";
        icon.style.color = "#3a78f2";
        faq.style.borderColor = "#007cff";
    }
    else
    {
        text.style.display = "none";
        icon.innerText = "expand_more";
        icon.style.color = "hsla(0, 0%, 53%, 0.40)";
        faq.style.borderColor = "#e2e0eb";
    }
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