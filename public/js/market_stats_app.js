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
        document.getElementById("chart3").style.paddingTop = "0px";
        document.getElementById("chart3").style.paddingBottom = "0px";
        document.getElementById("chart3").style.paddingLeft = "0px";
        document.getElementById("chart3").style.paddingRight = "0px";
        drawChart3();
        document.getElementById("chart3").style.display = "block";
        document.getElementById("chart3").style.zIndex = "1";
    }
    else
    {
        document.getElementById("backtestParent2").style.display = "block";
        drawChart2();
    }
}

function drawChart2() {
    let rawData = document.getElementById("sotong2").value;

    let data = JSON.parse(rawData);
    let history = data.history;
    var chart2 = new GOOGLE.visualization.AreaChart(document.getElementById('chart2'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Total Value Locked']);

    for (var i = 0; i < history.length; i+=1)
    {
        let temp = new Date(history[i].date);
        let date = new Date(Date.UTC(history[i].date.split("-")[0], parseInt(history[i].date.split("-")[1]) - 1, history[i].date.split("-")[2]) + (1000 * 60 * temp.getTimezoneOffset()));
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, history[i].totalValueLocked]);
    }

    var data2 = GOOGLE.visualization.arrayToDataTable(output);

    var options = {
        curveType: 'function',
        legend: { position: 'none' },
        chartArea: {'width': '85%', 'height': '75%', 'left': '12%', 'top': '8%'},
        areaOpacity: 0.1,
        crosshair: {
            color: 'black',
            trigger: 'both'
        },
        explorer: {
        },
        tooltip: {},
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
            title: "Total Value Locked ($)",
            titleTextStyle: {
                fontSize: 16,
                italic: false
            }
        }
    };

    chart2.draw(data2, options);
}

function drawChart3() {
    let rawData = document.getElementById("sotong2").value;

    let data = JSON.parse(rawData);
    let history = data.history;
    var chart3 = new GOOGLE.visualization.AreaChart(document.getElementById('chart3'));

    var dateFormat = new google.visualization.DateFormat({pattern: "MMM d, yyyy"});

    let output = [];
    output.push(['Date', 'Total Value Locked']);

    for (var i = 0; i < history.length; i+=1)
    {
        let temp = new Date(history[i].date);
        let date = new Date(Date.UTC(history[i].date.split("-")[0], parseInt(history[i].date.split("-")[1]) - 1, history[i].date.split("-")[2]) + (1000 * 60 * temp.getTimezoneOffset()));
        let options = {
            v: date,  
            f: dateFormat.formatValue(date)
        }
        output.push([options, history[i].totalValueLocked]);
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
            title: "Total Value Locked ($)",
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

document.addEventListener("DOMContentLoaded", async function() {
    let loginStatus = document.getElementById("status").value;

    if (loginStatus == "True")
    {
        document.getElementById("buyTokensSpan").style.display = "block";
    }
});