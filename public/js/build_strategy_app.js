var ENTRY_CONDITIONS = [];
var EXIT_CONDITIONS = [];

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

    document.getElementById("successModal").style.display = "none";
    document.getElementById("errorModal").style.display = "none";

    if (isMobile.any())
    {
        let main = document.getElementById("tableWrapperBuildStrategy");
        
        main.remove();
    }

    let status = document.getElementById("status").value;

    if (document.getElementById('successButton'))
    {
        document.getElementById('successButton')
        .addEventListener('click', function(){
            window.location.href = 'http://localhost:3000/profile';
        });
    }

    if (document.getElementById('errorButton'))
    {
        document.getElementById('errorButton')
            .addEventListener('click', hideErrorModal);
    }

    document.getElementById("successModal").style.fontSize = "16px";
    document.getElementById("successTitle").style.marginTop = "20px !important";
    document.getElementById("successModal").style.fontWeight = "500";
    document.getElementById("successTitle").style.marginBottom = "0px !important";
    document.getElementById("errorModal").style.fontSize = "16px";
    document.getElementById("errorTitle").style.marginTop = "20px !important";
    document.getElementById("errorModal").style.fontWeight = "500";
    document.getElementById("errorTitle").style.marginBottom = "0px !important";

    if (status == "Success")
    {
        displaySuccessModal();
    }
    else if (status != "")
    {
        displayErrorModal();
    }

    if (document.getElementById('addEntryConditionCloseButton'))
    {
        document.getElementById('addEntryConditionCloseButton')
            .addEventListener('click', hideEntryConditionModal);
    }

    if (document.getElementById('addExitConditionCloseButton'))
    {
        document.getElementById('addExitConditionCloseButton')
            .addEventListener('click', hideExitConditionModal);
    }

    document.getElementById("entryButtons").style.textAlign = "center";
    document.getElementById("exitButtons").style.textAlign = "center";

    document.getElementById("symbols").style.display = "none";
    document.getElementById("addEntryConditionModal").style.display = "none";
    document.getElementById("addExitConditionModal").style.display = "none";

    document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
    document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

    document.getElementById("entryConditionModalErrorMessage").style.display = "none";
    document.getElementById("exitConditionModalErrorMessage").style.display = "none";

    if (document.getElementById("sotong"))
    {
        document.getElementById("sotong").style.color = "red";
    }
    document.getElementById("entryConditionModalErrorMessage").style.color = "#ea3943";
    document.getElementById("exitConditionModalErrorMessage").style.color = "#ea3943";

    document.getElementById("addEntryConditionButton").style.color = "#3a78f2";
    document.getElementById("addExitConditionButton").style.color = "#3a78f2";

    document.getElementById("addEntryConditionButton").addEventListener("mouseover", function() {
        document.getElementById("addEntryConditionButton").style.cursor = "pointer";
    });
    document.getElementById("addExitConditionButton").addEventListener("mouseover", function() {
        document.getElementById("addExitConditionButton").style.cursor = "pointer";
    });

    document.getElementById("addEntryConditionModalButton").addEventListener('click', addEntryCondition);
    document.getElementById("addExitConditionModalButton").addEventListener('click', addExitCondition);

    document.getElementById("watchlist").addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        
        if (selectedValue == "custom")
        {
            document.getElementById("symbols").style.display = "block";
        }
        else
        {
            document.getElementById("symbols").style.display = "none";
        }
    });

    let initialListOfEntryConditions = document.getElementById("list_of_entry_conditions").value.split(";");
    let initialListOfExitConditions = document.getElementById("list_of_exit_conditions").value.split(";");

    for (var i = 0; i < initialListOfEntryConditions.length; i+=1)
    {
        ENTRY_CONDITIONS.push(initialListOfEntryConditions[i]);
    }

    for (var j = 0; j < initialListOfExitConditions.length; j+=1)
    {
        EXIT_CONDITIONS.push(initialListOfExitConditions[j]);
    }

    updateEntryConditionTable();
    updateExitConditionTable();
});

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('addEntryConditionButton'))
    {
        document.getElementById('addEntryConditionButton')
            .addEventListener('click', displayAddEntryConditionModal);
    }
});

function displayAddEntryConditionModal() 
{
    document.getElementById('pageMask').style.display = "block";
    var Y = window.pageYOffset;
    $( "#addEntryConditionModal" ).dialog({
        height: 380,
        width: 340,
        closeOnEscape: true,
        dialogClass: 'whiteBackground',
        position: { my: "center", at: "center", of: window },
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
        });
    $( "#addEntryConditionModal" ).show()
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('addExitConditionButton'))
    {
        document.getElementById('addExitConditionButton')
            .addEventListener('click', displayAddExitConditionModal);
    }
});

function displayAddExitConditionModal() 
{
    document.getElementById('pageMask').style.display = "block";
    var Y = window.pageYOffset;
    $( "#addExitConditionModal" ).dialog({
        height: 380,
        width: 340,
        closeOnEscape: true,
        dialogClass: 'whiteBackground',
        position: { my: "center", at: "center", of: window },
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
        });
    $( "#addExitConditionModal" ).show()
}

function addEntryCondition()
{
    let firstIndicator = document.getElementById("firstIndicatorEntry").value;
    let comparator = document.getElementById("comparatorEntry").value;
    let secondIndicator = document.getElementById("secondIndicatorEntry").value;
    let entryConditionSecondIndicatorParameter = document.getElementById("entryConditionSecondIndicatorParameter").value;
    let entryConditionFirstIndicatorParameter = "";

    if (document.getElementById("entryConditionFirstIndicatorParameter"))
    {
        entryConditionFirstIndicatorParameter = document.getElementById("entryConditionFirstIndicatorParameter").value;
    }

    let selectedValue = firstIndicator;

    if (entryConditionFirstIndicatorParameter != "")
    {
        selectedValue += "," + entryConditionFirstIndicatorParameter;
    }

    selectedValue += "!" + comparator + "!" + secondIndicator;

    if (entryConditionSecondIndicatorParameter != "")
    {
        selectedValue += "," + entryConditionSecondIndicatorParameter;
    }

    const allowedValues = ["AtLeastNTimesRange", "AtLeastNTimesVolume", "AtMostNTimesRange", "AtMostNTimesVolume", "UpByAtLeast", "UpByAtMost",
                            "DownByAtLeast", "DownByAtMost", "FallByAtLeast", "FallByAtMost", "RiseByAtLeast", "RiseByAtMost", "NPercent"];
    if (ENTRY_CONDITIONS.length > 5)
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Reached limit of 5 entry conditions.";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else if (!allowedValues.includes(secondIndicator) && entryConditionSecondIndicatorParameter != "" && entryConditionSecondIndicatorParameter.indexOf('.') !== -1)
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter an integer.";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else if (!allowedValues.includes(secondIndicator) && (parseInt(entryConditionSecondIndicatorParameter) < 0 || parseInt(entryConditionSecondIndicatorParameter) > 389))
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter a number between 0 and 389.";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else if (entryConditionSecondIndicatorParameter == "" && document.getElementById("entryConditionSecondIndicatorParameter").style.display == "block")
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter the parameters.";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "none";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";

        ENTRY_CONDITIONS.push(selectedValue);
        updateEntryConditionTable();

        hideEntryConditionModal();
    }
}

function updateEntryConditionTable()
{
    let output = "";
    let table = document.getElementById("entryConditions");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    for (var i = 0; i < ENTRY_CONDITIONS.length; i+=1)
    {
        if (ENTRY_CONDITIONS[i] == "")
        {
            continue;
        }

        let components = ENTRY_CONDITIONS[i].split("!");
        let firstIndicator = components[0].split(",")[0];
        let comparator = components[1];
        let secondIndicator = components[2].split(",")[0];
        let secondIndicatorParameter = components[2].split(",")[1];
        let firstIndicatorParameter = components[0].split(",")[1];

        let modifiedName = "";

        if (firstIndicator == "CurrentCandle")
        {
            modifiedName = "Current candle ";
        }
        else if (firstIndicator == "EMA")
        {
            modifiedName = "EMA" + firstIndicatorParameter.toString() + " ";
        }
        else if (firstIndicator == "Gap")
        {
            modifiedName = "Gap ";
        }
        else if (firstIndicator == "NthCandle")
        {
            let suffix = "th";
            if ((firstIndicatorParameter % 10) == 1 && firstIndicatorParameter != 11)
            {
                suffix = "st";
            }
            else if ((firstIndicatorParameter % 10) == 2 && firstIndicatorParameter != 12)
            {
                suffix = "nd";
            }
            else if ((firstIndicatorParameter % 10) == 3 && firstIndicatorParameter != 13)
            {
                suffix = "rd";
            }
            modifiedName = firstIndicatorParameter.toString() + suffix + " candle ";
        }
        else if (firstIndicator == "PreviousNCandles")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles ";
        }
        else if (firstIndicator == "Signal")
        {
            modifiedName = "Signal ";
        }
        else if (firstIndicator == "SMA")
        {
            modifiedName = "SMA" + firstIndicatorParameter.toString() + " ";
        }

        //check comparator
        if (comparator == "BouncesHigherOff")
        {
            modifiedName += "bounces higher off ";
        }
        else if (comparator == "BouncesLowerOff")
        {
            modifiedName += "bounces lower off ";
        }
        else if (comparator == "BreaksAbove")
        {
            modifiedName += "breaks above ";
        }
        else if (comparator == "BreaksBelow")
        {
            modifiedName += "breaks below ";
        }
        else if (comparator == "Closes")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " close ";
            }
            else
            {
                modifiedName += " closes ";
            }
        }
        else if (comparator == "ClosesAbove")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " close above ";
            }
            else
            {
                modifiedName += " closes above ";
            }
        }
        else if (comparator == "ClosesBelow")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " close below ";
            }
            else
            {
                modifiedName += " closes below ";
            };
        }
        else if (comparator == "FallsTo")
        {
            modifiedName += "falls to ";
        }
        else if (comparator == "Has")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " have ";
            }
            else
            {
                modifiedName += " has ";
            }
        }
        else if (comparator == "RisesTo")
        {
            modifiedName += "rises to ";
        }
        else if (comparator == "UpByAtLeast")
        {
            modifiedName += "up by at least ";
        }
        else if (comparator == "UpByAtMost")
        {
            modifiedName += "up by at most ";
        }
        else if (comparator == "DownByAtLeast")
        {
            modifiedName += "down by at least ";
        }
        else if (comparator == "DownByAtMost")
        {
            modifiedName += "down by at most ";
        }
        else if (comparator == "GivenInFirst")
        {
            modifiedName += "given in first ";
        }
        else if (comparator == "FallByAtLeast")
        {
            modifiedName += " fall by at least ";
        }
        else if (comparator == "FallByAtMost")
        {
            modifiedName += " fall by at most ";
        }
        else if (comparator == "RiseByAtLeast")
        {
            modifiedName += " rise by at least ";
        }
        else if (comparator == "RiseByAtMost")
        {
            modifiedName += " rise by at most ";
        }
        else if (comparator == "CrossesAbove")
        {
            modifiedName += " crosses above ";
        }
        else if (comparator == "CrossesBelow")
        {
            modifiedName += " crosses below ";
        }

        //check second indicator
        if (secondIndicator == "AtLeastNTimesRange")
        {
            modifiedName += "at least " + secondIndicatorParameter.toString() + " times range";
        }
        else if (secondIndicator == "AtLeastNTimesVolume")
        {
            modifiedName += "at least " + secondIndicatorParameter.toString() + " times volume";
        }
        else if (secondIndicator == "AtMostNTimesRange")
        {
            modifiedName += "at most " + secondIndicatorParameter.toString() + " times range";
        }
        else if (secondIndicator == "AtMostNTimesVolume")
        {
            modifiedName += "at most " + secondIndicatorParameter.toString() + " times volume";
        }
        else if (secondIndicator == "Down")
        {
            modifiedName += "down";
        }
        else if (secondIndicator == "EMA")
        {
            modifiedName += "EMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "HigherRange")
        {
            modifiedName += "higher range";
        }
        else if (secondIndicator == "HigherVolume")
        {
            modifiedName += "higher volume";
        }
        else if (secondIndicator == "HighOfEntryBar")
        {
            modifiedName += "high of entry bar";
        }
        else if (secondIndicator == "HighOfFirstNMinutes")
        {
            modifiedName += "high of first " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "HighOfLastNMinutes")
        {
            modifiedName += "high of last " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "Interval")
        {
            modifiedName += "$" + secondIndicatorParameter.toString() + " interval";
        }
        else if (secondIndicator == "LongBottomTail")
        {
            modifiedName += "long bottom tail";
        }
        else if (secondIndicator == "LongTopTail")
        {
            modifiedName += "long top tail";
        }
        else if (secondIndicator == "LowerRange")
        {
            modifiedName += "lower range";
        }
        else if (secondIndicator == "LowerVolume")
        {
            modifiedName += "lower volume";
        }
        else if (secondIndicator == "LowOfEntryBar")
        {
            modifiedName += "low of entry bar";
        }
        else if (secondIndicator == "LowOfFirstNMinutes")
        {
            modifiedName += "low of first " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "LowOfLastNMinutes")
        {
            modifiedName += "low of last " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "PreviousCandleHigh")
        {
            modifiedName += "previous candle high";
        }
        else if (secondIndicator == "PreviousCandleLow")
        {
            modifiedName += "previous candle low";
        }
        else if (secondIndicator == "ProfitTarget")
        {
            modifiedName = secondIndicatorParameter.toString() + "% profit target";
        }
        else if (secondIndicator == "SMA")
        {
            modifiedName += "SMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "StopLoss")
        {
            modifiedName = secondIndicatorParameter.toString() + "% stop loss";
        }
        else if (secondIndicator == "Up")
        {
            modifiedName += "Up";
        }
        else if (secondIndicator == "VWAP")
        {
            modifiedName += "VWAP" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "NMinutes")
        {
            modifiedName += secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "NPercent")
        {
            modifiedName += secondIndicatorParameter.toString() + "%";
        }

        let row = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = modifiedName;
        row.appendChild(name);

        let del = document.createElement("td");
        del.setAttribute("class", "strategyTableDelete");
        let del1 = document.createElement("i");
        del1.setAttribute("class", "material-icons");
        del1.setAttribute("style", "font-size:14px !important");
        del1.style.color = "#ea3943";
        del1.innerText = "cancel";
        del1.addEventListener('mouseover', function(){ del1.style.cursor = "pointer"; });
        const id = ENTRY_CONDITIONS[i];
        del1.addEventListener('click', function(){ 
            deleteEntryCondition(id); });
        del.appendChild(del1);
        row.appendChild(del);

        table_body.appendChild(row);

        output += ENTRY_CONDITIONS[i] + ";";
    }

    table.appendChild(table_body);

    document.getElementById("list_of_entry_conditions").value = output;
}

function deleteEntryCondition(entryCondition)
{
    const index = ENTRY_CONDITIONS.indexOf(entryCondition);
    if (index > -1)
    {
        ENTRY_CONDITIONS.splice(index, 1);
    }

    updateEntryConditionTable();
}

function addExitCondition()
{
    let firstIndicator = document.getElementById("firstIndicatorExit").value;
    let comparator = document.getElementById("comparatorExit").value;
    let secondIndicator = document.getElementById("secondIndicatorExit").value;
    let exitConditionSecondIndicatorParameter = document.getElementById("exitConditionSecondIndicatorParameter").value;
    let exitConditionFirstIndicatorParameter = "";

    if (document.getElementById("exitConditionFirstIndicatorParameter"))
    {
        exitConditionFirstIndicatorParameter = document.getElementById("exitConditionFirstIndicatorParameter").value;
    }

    let selectedValue = firstIndicator;

    if (exitConditionFirstIndicatorParameter != "")
    {
        selectedValue += "," + exitConditionFirstIndicatorParameter;
    }

    selectedValue += "!" + comparator + "!" + secondIndicator;

    if (exitConditionSecondIndicatorParameter != "")
    {
        selectedValue += "," + exitConditionSecondIndicatorParameter;
    }

    const allowedValues = ["AtLeastNTimesRange", "AtLeastNTimesVolume", "AtMostNTimesRange", "AtMostNTimesVolume", "NPercent",
                            "DownByAtLeast", "DownByAtMost", "FallByAtLeast", "FallByAtMost", "RiseByAtLeast", "RiseByAtMost", "ProfitTarget", "StopLoss"];
    if (EXIT_CONDITIONS.length > 5)
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Reached limit of 5 entry conditions.";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else if (!allowedValues.includes(secondIndicator) && exitConditionSecondIndicatorParameter != "" && exitConditionSecondIndicatorParameter.indexOf('.') !== -1)
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter an integer";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else if (!allowedValues.includes(secondIndicator) && (parseInt(exitConditionSecondIndicatorParameter) < 0 || parseInt(exitConditionSecondIndicatorParameter) > 389))
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter a number between 0 and 389.";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else if (exitConditionSecondIndicatorParameter == "" && document.getElementById("exitConditionSecondIndicatorParameter").style.display == "block")
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter the parameters.";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";
    }
    else
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "none";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "";
        document.getElementById("exitConditionModalErrorMessage").innerText = "";

        EXIT_CONDITIONS.push(selectedValue);
        updateExitConditionTable();

        hideExitConditionModal();
    }
}

function updateExitConditionTable()
{
    let output = "";
    let table = document.getElementById("exitConditions");
    while (table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    let table_body = document.createElement("tbody");
    for (var i = 0; i < EXIT_CONDITIONS.length; i+=1)
    {
        if (EXIT_CONDITIONS[i] == "")
        {
            continue;
        }

        let components = EXIT_CONDITIONS[i].split("!");
        let firstIndicator = components[0].split(",")[0];
        let comparator = components[1];
        let secondIndicator = components[2].split(",")[0];
        let secondIndicatorParameter = components[2].split(",")[1];
        let firstIndicatorParameter = components[0].split(",")[1];

        let modifiedName = "";

        if (firstIndicator == "CurrentCandle")
        {
            modifiedName = "Current candle ";
        }
        else if (firstIndicator == "EMA")
        {
            modifiedName = "EMA" + firstIndicatorParameter.toString() + " ";
        }
        else if (firstIndicator == "Gap")
        {
            modifiedName = "Gap ";
        }
        else if (firstIndicator == "NthCandle")
        {
            let suffix = "th";
            if ((firstIndicatorParameter % 10) == 1 && firstIndicatorParameter != 11)
            {
                suffix = "st";
            }
            else if ((firstIndicatorParameter % 10) == 2 && firstIndicatorParameter != 12)
            {
                suffix = "nd";
            }
            else if ((firstIndicatorParameter % 10) == 3 && firstIndicatorParameter != 13)
            {
                suffix = "rd";
            }
            modifiedName = firstIndicatorParameter.toString() + suffix + " candle ";
        }
        else if (firstIndicator == "PreviousNCandles")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles ";
        }
        else if (firstIndicator == "Signal")
        {
            modifiedName = "Signal ";
        }
        else if (firstIndicator == "SMA")
        {
            modifiedName = "SMA" + firstIndicatorParameter.toString() + " ";
        }

        //check comparator
        if (comparator == "BouncesHigherOff")
        {
            modifiedName += "bounces higher off ";
        }
        else if (comparator == "BouncesLowerOff")
        {
            modifiedName += "bounces lower off ";
        }
        else if (comparator == "BreaksAbove")
        {
            modifiedName += "breaks above ";
        }
        else if (comparator == "BreaksBelow")
        {
            modifiedName += "breaks below ";
        }
        else if (comparator == "Closes")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " close ";
            }
            else
            {
                modifiedName += " closes ";
            }
        }
        else if (comparator == "ClosesAbove")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " close above ";
            }
            else
            {
                modifiedName += " closes above ";
            }
        }
        else if (comparator == "ClosesBelow")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " close below ";
            }
            else
            {
                modifiedName += " closes below ";
            };
        }
        else if (comparator == "FallsTo")
        {
            modifiedName += "falls to ";
        }
        else if (comparator == "Has")
        {
            if (firstIndicator == "PreviousNCandles")
            {
                modifiedName += " have ";
            }
            else
            {
                modifiedName += " has ";
            }
        }
        else if (comparator == "RisesTo")
        {
            modifiedName += "rises to ";
        }
        else if (comparator == "UpByAtLeast")
        {
            modifiedName += "up by at least ";
        }
        else if (comparator == "UpByAtMost")
        {
            modifiedName += "up by at most ";
        }
        else if (comparator == "DownByAtLeast")
        {
            modifiedName += "down by at least ";
        }
        else if (comparator == "DownByAtMost")
        {
            modifiedName += "down by at most ";
        }
        else if (comparator == "GivenInFirst")
        {
            modifiedName += "given in first ";
        }
        else if (comparator == "FallByAtLeast")
        {
            modifiedName += " fall by at least ";
        }
        else if (comparator == "FallByAtMost")
        {
            modifiedName += " fall by at most ";
        }
        else if (comparator == "RiseByAtLeast")
        {
            modifiedName += " rise by at least ";
        }
        else if (comparator == "RiseByAtMost")
        {
            modifiedName += " rise by at most ";
        }
        else if (comparator == "CrossesAbove")
        {
            modifiedName += " crosses above ";
        }
        else if (comparator == "CrossesBelow")
        {
            modifiedName += " crosses below ";
        }

        //check second indicator
        if (secondIndicator == "AtLeastNTimesRange")
        {
            modifiedName += "at least " + secondIndicatorParameter.toString() + " times range";
        }
        else if (secondIndicator == "AtLeastNTimesVolume")
        {
            modifiedName += "at least " + secondIndicatorParameter.toString() + " times volume";
        }
        else if (secondIndicator == "AtMostNTimesRange")
        {
            modifiedName += "at most " + secondIndicatorParameter.toString() + " times range";
        }
        else if (secondIndicator == "AtMostNTimesVolume")
        {
            modifiedName += "at most " + secondIndicatorParameter.toString() + " times volume";
        }
        else if (secondIndicator == "Down")
        {
            modifiedName += "down";
        }
        else if (secondIndicator == "EMA")
        {
            modifiedName += "EMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "HigherRange")
        {
            modifiedName += "higher range";
        }
        else if (secondIndicator == "HigherVolume")
        {
            modifiedName += "higher volume";
        }
        else if (secondIndicator == "HighOfEntryBar")
        {
            modifiedName += "high of entry bar";
        }
        else if (secondIndicator == "HighOfFirstNMinutes")
        {
            modifiedName += "high of first " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "HighOfLastNMinutes")
        {
            modifiedName += "high of last " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "Interval")
        {
            modifiedName += "$" + secondIndicatorParameter.toString() + " interval";
        }
        else if (secondIndicator == "LongBottomTail")
        {
            modifiedName += "long bottom tail";
        }
        else if (secondIndicator == "LongTopTail")
        {
            modifiedName += "long top tail";
        }
        else if (secondIndicator == "LowerRange")
        {
            modifiedName += "lower range";
        }
        else if (secondIndicator == "LowerVolume")
        {
            modifiedName += "lower volume";
        }
        else if (secondIndicator == "LowOfEntryBar")
        {
            modifiedName += "low of entry bar";
        }
        else if (secondIndicator == "LowOfFirstNMinutes")
        {
            modifiedName += "low of first " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "LowOfLastNMinutes")
        {
            modifiedName += "low of last " + secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "PreviousCandleHigh")
        {
            modifiedName += "previous candle high";
        }
        else if (secondIndicator == "PreviousCandleLow")
        {
            modifiedName += "previous candle low";
        }
        else if (secondIndicator == "SMA")
        {
            modifiedName += "SMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "Up")
        {
            modifiedName += "Up";
        }
        else if (secondIndicator == "VWAP")
        {
            modifiedName += "VWAP" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "NMinutes")
        {
            modifiedName += secondIndicatorParameter.toString() + " minutes";
        }
        else if (secondIndicator == "NPercent")
        {
            modifiedName += secondIndicatorParameter.toString() + "%";
        }
        else if (secondIndicator == "ProfitTarget")
        {
            modifiedName = secondIndicatorParameter.toString() + "% Profit target";
        }
        else if (secondIndicator == "StopLoss")
        {
            modifiedName = secondIndicatorParameter.toString() + "% Stop loss";
        }

        let row = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = modifiedName;
        row.appendChild(name);

        let del = document.createElement("td");
        del.setAttribute("class", "strategyTableDelete");
        let del1 = document.createElement("i");
        del1.setAttribute("class", "material-icons");
        del1.setAttribute("style", "font-size:14px !important");
        del1.style.color = "#ea3943";
        del1.innerText = "cancel";
        del1.addEventListener('mouseover', function(){ del1.style.cursor = "pointer"; });
        const id = EXIT_CONDITIONS[i];
        del1.addEventListener('click', function(){ 
            deleteExitCondition(id); });
        del.appendChild(del1);
        row.appendChild(del);

        table_body.appendChild(row);

        output += EXIT_CONDITIONS[i] + ";";
    }

    table.appendChild(table_body);

    document.getElementById("list_of_exit_conditions").value = output;
}

function deleteExitCondition(exitCondition)
{
    const index = EXIT_CONDITIONS.indexOf(exitCondition);
    if (index > -1)
    {
        EXIT_CONDITIONS.splice(index, 1);
    }

    updateExitConditionTable();
}

document.getElementById("firstIndicatorEntry").addEventListener('change', function() {
    const selectedValue = document.getElementById("firstIndicatorEntry").value;

    let comparatorEntry = document.getElementById("comparatorEntry");
    let secondIndicatorEntry = document.getElementById("secondIndicatorEntry");

    while (comparatorEntry.hasChildNodes())
    {
        comparatorEntry.removeChild(comparatorEntry.firstChild);
    }

    while (secondIndicatorEntry.hasChildNodes())
    {
        secondIndicatorEntry.removeChild(secondIndicatorEntry.firstChild);
    }

    let options = [];
    let options2 = [];

    if (selectedValue == "CurrentCandle")
    {
        options = makeComparatorsEntryCurrentCandle();
        options2 = makeOptionsEntryBouncesHigherOff();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";

        if (document.getElementById("entryConditionFirstIndicatorParameter"))
        {
            document.getElementById("entryConditionFirstIndicatorParameter").remove();
        }
    }
    else if (selectedValue == "EMA")
    {
        options = makeComparatorsEntryEMA();
        options2 = makeOptionsEntryCrossesAbove();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";

        if (document.getElementById("entryConditionFirstIndicatorParameter"))
        {
            document.getElementById("entryConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "EMA period");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "Gap")
    {
        options = makeComparatorsEntryGap();
        options2 = makeOptionsEntryGap();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";

        if (document.getElementById("entryConditionFirstIndicatorParameter"))
        {
            document.getElementById("entryConditionFirstIndicatorParameter").remove();
        }
    }
    else if (selectedValue == "NthCandle")
    {
        options = makeComparatorsEntryCurrentCandle();
        options2 = makeOptionsEntryBouncesHigherOff();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";

        if (document.getElementById("entryConditionFirstIndicatorParameter"))
        {
            document.getElementById("entryConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "Number of candles");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "PreviousNCandles")
    {
        options = makeComparatorsEntryPreviousNCandles();
        options2 = makeOptionsEntryCloses();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "none";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        if (document.getElementById("entryConditionFirstIndicatorParameter"))
        {
            document.getElementById("entryConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "Number of candles");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "Signal")
    {
        options = makeComparatorsEntrySignal();
        options2 = makeOptionsEntrySignal();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of minutes";

        if (document.getElementById("entryConditionFirstIndicatorParameter"))
        {
            document.getElementById("entryConditionFirstIndicatorParameter").remove();
        }
    }
    else if (selectedValue == "SMA")
    {
        options = makeComparatorsEntrySMA();
        options2 = makeOptionsEntryCrossesAbove();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "SMA period";

        if (document.getElementById("entryConditionFirstIndicatorParameter"))
        {
            document.getElementById("entryConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "entryConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "SMA period");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }

    for (var i = 0; i < options.length; i+=1)
    {
        comparatorEntry.appendChild(options[i]);
    }

    for (var j = 0; j < options2.length; j+=1)
    {
        secondIndicatorEntry.appendChild(options2[j]);
    }
    
});

document.getElementById("secondIndicatorEntry").addEventListener('change', function() {
    const selectedValue = document.getElementById("secondIndicatorEntry").value;

    document.getElementById("entryConditionModalErrorMessage").innerText = "";
    document.getElementById("exitConditionModalErrorMessage").innerText = "";
    
    if (selectedValue == "AtLeastNTimesRange")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "AtLeastNTimesVolume")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "AtMostNTimesRange")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "AtMostNTimesVolume")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "EMA")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "HighOfFirstNMinutes")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "HighOfLastNMinutes")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "Interval")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Price interval";
    }
    else if (selectedValue == "LowOfFirstNMinutes")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "LowOfLastNMinutes")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "SMA")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "SMA period";
    }
    else if (selectedValue == "VWAP")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "VWAP period";
    }
    else if (selectedValue == "UpByAtLeast")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "UpByAtMost")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "DownByAtLeast")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "DownByAtMost")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "FallByAtLeast")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent fall";
    }
    else if (selectedValue == "FallByAtMost")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent fall";
    }
    else if (selectedValue == "RiseByAtLeast")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else if (selectedValue == "RiseByAtMost")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "none";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";
    }
});

document.getElementById("firstIndicatorExit").addEventListener('change', function() {
    const selectedValue = document.getElementById("firstIndicatorExit").value;

    let comparatorExit = document.getElementById("comparatorExit");
    let secondIndicatorExit = document.getElementById("secondIndicatorExit");

    while (comparatorExit.hasChildNodes())
    {
        comparatorExit.removeChild(comparatorExit.firstChild);
    }

    while (secondIndicatorExit.hasChildNodes())
    {
        secondIndicatorExit.removeChild(secondIndicatorExit.firstChild);
    }

    let options = [];
    let options2 = [];

    if (selectedValue == "CurrentCandle")
    {
        options = makeComparatorsExitCurrentCandle();
        options2 = makeOptionsExitBouncesHigherOff();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";

        if (document.getElementById("exitConditionFirstIndicatorParameter"))
        {
            document.getElementById("exitConditionFirstIndicatorParameter").remove();
        }
    }
    else if (selectedValue == "EMA")
    {
        options = makeComparatorsExitEMA();
        options2 = makeOptionsExitCrossesAbove();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";

        if (document.getElementById("exitConditionFirstIndicatorParameter"))
        {
            document.getElementById("exitConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv2");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "EMA period");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "NthCandle")
    {
        options = makeComparatorsExitCurrentCandle();
        options2 = makeOptionsExitBouncesHigherOff();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";

        if (document.getElementById("exitConditionFirstIndicatorParameter"))
        {
            document.getElementById("exitConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv2");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "Number of candles");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "PreviousNCandles")
    {
        options = makeComparatorsExitPreviousNCandles();
        options2 = makeOptionsExitCloses();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "none";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        if (document.getElementById("exitConditionFirstIndicatorParameter"))
        {
            document.getElementById("exitConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv2");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "Number of candles");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "SMA")
    {
        options = makeComparatorsExitSMA();
        options2 = makeOptionsExitCrossesAbove();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "SMA period";

        if (document.getElementById("exitConditionFirstIndicatorParameter"))
        {
            document.getElementById("exitConditionFirstIndicatorParameter").remove();
        }

        let firstIndicatorDiv = document.getElementById("firstIndicatorDiv2");
        let firstIndicatorInput = document.createElement("input");
        firstIndicatorInput.setAttribute("type", "number");
        firstIndicatorInput.setAttribute("class", "strategyExplorerText");
        firstIndicatorInput.setAttribute("name", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("id", "exitConditionFirstIndicatorParameter");
        firstIndicatorInput.setAttribute("placeholder", "SMA period");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }

    for (var i = 0; i < options.length; i+=1)
    {
        comparatorExit.appendChild(options[i]);
    }

    for (var j = 0; j < options2.length; j+=1)
    {
        secondIndicatorExit.appendChild(options2[j]);
    }
    
});

document.getElementById("secondIndicatorExit").addEventListener('change', function() {
    const selectedValue = document.getElementById("secondIndicatorExit").value;

    document.getElementById("entryConditionModalErrorMessage").innerText = "";
    document.getElementById("exitConditionModalErrorMessage").innerText = "";
    
    if (selectedValue == "AtLeastNTimesRange")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "AtLeastNTimesVolume")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "AtMostNTimesRange")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "AtMostNTimesVolume")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "EMA")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "HighOfFirstNMinutes")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "HighOfLastNMinutes")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "Interval")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Price interval";
    }
    else if (selectedValue == "LowOfFirstNMinutes")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "LowOfLastNMinutes")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "ProfitTarget")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "% profit target";
    }
    else if (selectedValue == "SMA")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "SMA period";
    }
    else if (selectedValue == "StopLoss")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "% stop loss";
    }
    else if (selectedValue == "VWAP")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "VWAP period";
    }
    else if (selectedValue == "FallByAtLeast")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent fall";
    }
    else if (selectedValue == "FallByAtMost")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent most";
    }
    else if (selectedValue == "RiseByAtLeast")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else if (selectedValue == "RiseByAtMost")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "none";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";
    }
});

document.getElementById("entryConditionSecondIndicatorParameter").addEventListener("input", function() {
    let value = document.getElementById("entryConditionSecondIndicatorParameter").value;

    if (parseFloat(value) > 389)
    {
        value = value.slice(0, value.length - 1);
    }

    if (value.indexOf(".") != -1)
    {
        value = value.slice(0, (value.indexOf("."))+3);
    } 

    document.getElementById("entryConditionSecondIndicatorParameter").value = value;    
});

document.getElementById("exitConditionSecondIndicatorParameter").addEventListener("input", function() {
    let value = document.getElementById("exitConditionSecondIndicatorParameter").value;

    if (parseFloat(value) > 389)
    {
        value = value.slice(0, value.length - 1);
    }

    if (value.indexOf(".") != -1)
    {
        value = value.slice(0, (value.indexOf("."))+3);
    } 

    document.getElementById("exitConditionSecondIndicatorParameter").value = value;    
});

document.getElementById("strategyName").addEventListener("input", function() {
    let value = document.getElementById("strategyName").value;
    let character = value.charAt(value.length - 1);

    if (value.length > 30)
    {
        value = value.slice(0, 30);
    }
    else if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("strategyName").value = value;    
});

document.getElementById("description").addEventListener("input", function() {
    let value = document.getElementById("description").value;
    let character = value.charAt(value.length - 1);

    if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("description").value = value;    
});

document.getElementById("symbols").addEventListener("input", function() {
    let value = document.getElementById("symbols").value;
    let character = value.charAt(value.length - 1);

    const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ,';
    let found = false;
    for (var i = 0; i < 27; i+=1)
    {
        if (allowedCharacters.charAt(i) == character)
        {
            found = true;
            break;
        }
    }

    if (value.length > 100)
    {
        value = value.slice(0, 100);
    }
    else if (!found)
    {
        value = value.slice(0, value.length - 1);
    }
    
    if (value.length == 1 && character == ',')
    {
        value = value.slice(0, 0);
    }
    else if (value.length > 1 && character == ',' && value.charAt(value.length - 2) == ',')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("symbols").value = value;  
});

document.getElementById("maxAllocation").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("maxConcurrentTrades").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("startTime").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("endTime").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("maxAllocation").addEventListener("input", function() {
    let value = document.getElementById("maxAllocation").value;

    if (value.length > 2)
    {
        value = value.slice(0, 3);

        if (value != "100")
        {
            value = value.slice(0, 2);
        }
    }

    if (value.length == 0)
    {
        value = "";
    }

    let allocationValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("maxAllocation").value = allocationValue;    
});

document.getElementById("maxConcurrentTrades").addEventListener("input", function() {
    let value = document.getElementById("maxConcurrentTrades").value;

    if (value.length > 1)
    {
        value = value.slice(0, 1);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("maxConcurrentTrades").value = (value == "") ? value : newValue;    
});

document.getElementById("startTime").addEventListener("input", function() {
    let value = document.getElementById("startTime").value;

    if (value.length > 3)
    {
        value = value.slice(0, 3);
    }
    else if (value.length == 3)
    {
        if (parseInt(value) > 389)
        {
            value = value.slice(0, 2);
        }
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("startTime").value = newValue;    
});

document.getElementById("endTime").addEventListener("input", function() {
    let value = document.getElementById("endTime").value;

    if (value.length > 3)
    {
        value = value.slice(0, 3);
    }
    else if (value.length == 3)
    {
        if (parseInt(value) > 389)
        {
            value = value.slice(0, 2);
        }
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("endTime").value = newValue;    
});

function hideEntryConditionModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#addEntryConditionModal" ).dialog('close');
}

function hideExitConditionModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#addExitConditionModal" ).dialog('close');
}

function hideSuccessModal() 
{
    $( "#successModal" ).dialog('close');
}

function displaySuccessModal() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;

    $( "#successModal" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModal").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModal" ).show()
}

function hideErrorModal() 
{
    $( "#errorModal" ).dialog('close');
}

function displayErrorModal() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;

    $( "#errorModal" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModal").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModal" ).show()
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

document.getElementById("comparatorEntry").addEventListener('change', function() {
    const selectedValue = document.getElementById("comparatorEntry").value;

    let secondIndicatorEntry = document.getElementById("secondIndicatorEntry");

    while (secondIndicatorEntry.hasChildNodes())
    {
        secondIndicatorEntry.removeChild(secondIndicatorEntry.firstChild);
    }

    let options = [];

    if (selectedValue == "Closes")
    {
        options = makeOptionsEntryCloses();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "none";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";
    }
    else if (selectedValue == "BreaksAbove")
    {
        options = makeOptionsEntryBreaksAbove();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "BreaksBelow")
    {
        options = makeOptionsEntryBreaksBelow();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "ClosesAbove")
    {
        options = makeOptionsEntryClosesAbove();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "ClosesBelow")
    {
        options = makeOptionsEntryClosesBelow();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "Has")
    {
        options = makeOptionsEntryHas();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "BouncesHigherOff")
    {
        options = makeOptionsEntryBouncesHigherOff();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "BouncesLowerOff")
    {
        options = makeOptionsEntryBouncesLowerOff();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "FallsTo")
    {
        options = makeOptionsEntryFallsTo();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "RisesTo")
    {
        options = makeOptionsEntryRisesTo();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "DownByAtLeast")
    {
        options = makeOptionsEntryGap();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "DownByAtMost")
    {
        options = makeOptionsEntryGap();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "UpByAtLeast")
    {
        options = makeOptionsEntryGap();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "UpByAtMost")
    {
        options = makeOptionsEntryGap();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent gap";
    }
    else if (selectedValue == "GivenInFirst")
    {
        options = makeOptionsEntrySignal();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of minutes";
    }
    else if (selectedValue == "FallByAtLeast")
    {
        options = makeOptionsEntryPreviousNCandles();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent fall";
    }
    else if (selectedValue == "FallByAtMost")
    {
        options = makeOptionsEntryPreviousNCandles();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent fall";
    }
    else if (selectedValue == "RiseByAtLeast")
    {
        options = makeOptionsEntryPreviousNCandles();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else if (selectedValue == "RiseByAtMost")
    {
        options = makeOptionsEntryPreviousNCandles();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else if (selectedValue == "CrossesAbove")
    {
        options = makeOptionsEntryCrossesAbove();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "CrossesBelow")
    {
        options = makeOptionsEntryCrossesBelow();

        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("entryConditionSecondIndicatorParameter").value = "";
        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }

    for (var i = 0; i < options.length; i+=1)
    {
        secondIndicatorEntry.appendChild(options[i]);
    }
});

function makeOptionsEntryCloses()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "Down";
    option1.id = "entry_SecondIndicator_Down";
    option1.innerText = "Down";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Up";
    option2.id = "entry_SecondIndicator_Up";
    option2.innerText = "Up";
    options.push(option2);

    return options;
}

function makeOptionsEntryBreaksAbove()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "HighOfFirstNMinutes";
    option2.id = "entry_SecondIndicator_HighOfFirstNMinutes";
    option2.innerText = "High of first N minutes";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfLastNMinutes";
    option3.id = "entry_SecondIndicator_HighOfLastNMinutes";
    option3.innerText = "High of last N minutes";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "Interval";
    option4.id = "entry_SecondIndicator_Interval";
    option4.innerText = "Interval";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "PreviousCandleHigh";
    option5.id = "entry_SecondIndicator_PreviousCandleHigh";
    option5.innerText = "Previous candle high";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "SMA";
    option6.id = "entry_SecondIndicator_SMA";
    option6.innerText = "SMA";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "VWAP";
    option7.id = "entry_SecondIndicator_VWAP";
    option7.innerText = "VWAP";
    options.push(option7);

    return options;
}

function makeOptionsEntryBreaksBelow()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "entry_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "LowOfFirstNMinutes";
    option3.id = "entry_SecondIndicator_LowOfFirstNMinutes";
    option3.innerText = "Low of first N minutes";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "LowOfLastNMinutes";
    option4.id = "entry_SecondIndicator_LowOfLastNMinutes";
    option4.innerText = "Low of last N minutes";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "PreviousCandleLow";
    option5.id = "entry_SecondIndicator_PreviousCandleLow";
    option5.innerText = "Previous candle low";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "SMA";
    option6.id = "entry_SecondIndicator_SMA";
    option6.innerText = "SMA";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "VWAP";
    option7.id = "entry_SecondIndicator_VWAP";
    option7.innerText = "VWAP";
    options.push(option7);

    return options;
}

function makeOptionsEntryClosesAbove()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "HighOfFirstNMinutes";
    option2.id = "entry_SecondIndicator_HighOfFirstNMinutes";
    option2.innerText = "High of first N minutes";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfLastNMinutes";
    option3.id = "entry_SecondIndicator_HighOfLastNMinutes";
    option3.innerText = "High of last N minutes";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "PreviousCandleHigh";
    option4.id = "entry_SecondIndicator_PreviousCandleHigh";
    option4.innerText = "Previous candle high";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "SMA";
    option5.id = "entry_SecondIndicator_SMA";
    option5.innerText = "SMA";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "VWAP";
    option6.id = "entry_SecondIndicator_VWAP";
    option6.innerText = "VWAP";
    options.push(option6);

    return options;
}

function makeOptionsEntryClosesBelow()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "LowOfFirstNMinutes";
    option2.id = "entry_SecondIndicator_LowOfFirstNMinutes";
    option2.innerText = "Low of first N minutes";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "LowOfLastNMinutes";
    option3.id = "entry_SecondIndicator_LowOfLastNMinutes";
    option3.innerText = "Low of last N minutes";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "PreviousCandleLow";
    option4.id = "entry_SecondIndicator_PreviousCandleLow";
    option4.innerText = "Previous candle low";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "SMA";
    option5.id = "entry_SecondIndicator_SMA";
    option5.innerText = "SMA";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "VWAP";
    option6.id = "entry_SecondIndicator_VWAP";
    option6.innerText = "VWAP";
    options.push(option6);

    return options;
}

function makeOptionsEntryHas()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "AtLeastNTimesRange";
    option1.id = "entry_SecondIndicator_AtLeastNTimesRange";
    option1.innerText = "At least N times range";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "AtLeastNTimesVolume";
    option2.id = "entry_SecondIndicator_AtLeastNTimesVolume";
    option2.innerText = "At least N times volume";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "AtMostNTimesRange";
    option3.id = "entry_SecondIndicator_AtMostNTimesRange";
    option3.innerText = "At most N times range";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "AtMostNTimesVolume";
    option4.id = "entry_SecondIndicator_AtMostNTimesVolume";
    option4.innerText = "At most N times volume";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "HigherRange";
    option5.id = "entry_SecondIndicator_HigherRange";
    option5.innerText = "Higher range";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "HigherVolume";
    option6.id = "entry_SecondIndicator_HigherVolume";
    option6.innerText = "Higher volume";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "LongBottomTail";
    option7.id = "entry_SecondIndicator_LongBottomTail";
    option7.innerText = "Long bottom tail";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "LongTopTail";
    option8.id = "entry_SecondIndicator_LongTopTail";
    option8.innerText = "Long top tail";
    options.push(option8);

    let option9 = document.createElement("option");
    option9.value = "LowerRange";
    option9.id = "entry_SecondIndicator_LowerRange";
    option9.innerText = "Lower range";
    options.push(option9);

    let option10 = document.createElement("option");
    option10.value = "LowerVolume";
    option10.id = "entry_SecondIndicator_LowerVolume";
    option10.innerText = "Lower volume";
    options.push(option10);

    return options;
}

function makeOptionsEntryBouncesHigherOff()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "entry_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "entry_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "entry_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsEntryBouncesLowerOff()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "entry_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "entry_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "entry_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsEntryFallsTo()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "entry_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "entry_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "entry_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsEntryRisesTo()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "entry_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "entry_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "entry_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsEntryGap()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "NPercent";
    option1.id = "entry_SecondIndicator_NPercent";
    option1.innerText = "N percent";
    options.push(option1);

    return options;
}

function makeOptionsEntrySignal()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "NMinutes";
    option1.id = "entry_SecondIndicator_NMinutes";
    option1.innerText = "N minutes";
    options.push(option1);

    return options;
}

function makeOptionsEntryPreviousNCandles()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "NPercent";
    option1.id = "entry_SecondIndicator_NPercent";
    option1.innerText = "N percent";
    options.push(option1);

    return options;
}

function makeOptionsEntryCrossesAbove()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "SMA";
    option2.id = "entry_SecondIndicator_SMA";
    option2.innerText = "SMA";
    options.push(option2);

    return options;
}

function makeOptionsEntryCrossesBelow()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "entry_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "SMA";
    option2.id = "entry_SecondIndicator_SMA";
    option2.innerText = "SMA";
    options.push(option2);

    return options;
}

document.getElementById("comparatorExit").addEventListener('change', function() {
    const selectedValue = document.getElementById("comparatorExit").value;

    let secondIndicatorExit = document.getElementById("secondIndicatorExit");

    while (secondIndicatorExit.hasChildNodes())
    {
        secondIndicatorExit.removeChild(secondIndicatorExit.firstChild);
    }

    let options = [];

    if (selectedValue == "Closes")
    {
        options = makeOptionsExitCloses();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "none";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";
    }
    else if (selectedValue == "BreaksAbove")
    {
        options = makeOptionsExitBreaksAbove();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "BreaksBelow")
    {
        options = makeOptionsExitBreaksBelow();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "ClosesAbove")
    {
        options = makeOptionsExitClosesAbove();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "ClosesBelow")
    {
        options = makeOptionsExitClosesBelow();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "Has")
    {
        options = makeOptionsExitHas();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Multiplier";
    }
    else if (selectedValue == "BouncesHigherOff")
    {
        options = makeOptionsExitBouncesHigherOff();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "BouncesLowerOff")
    {
        options = makeOptionsExitBouncesLowerOff();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "FallsTo")
    {
        options = makeOptionsExitFallsTo();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "RisesTo")
    {
        options = makeOptionsExitRisesTo();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "FallByAtLeast")
    {
        options = makeOptionsExitPreviousNCandles();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent fall";
    }
    else if (selectedValue == "FallByAtMost")
    {
        options = makeOptionsExitPreviousNCandles();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent fall";
    }
    else if (selectedValue == "RiseByAtLeast")
    {
        options = makeOptionsExitPreviousNCandles();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else if (selectedValue == "RiseByAtMost")
    {
        options = makeOptionsExitPreviousNCandles();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Percent rise";
    }
    else if (selectedValue == "CrossesAbove")
    {
        options = makeOptionsExitCrossesAbove();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "CrossesBelow")
    {
        options = makeOptionsExitCrossesBelow();

        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";
        document.getElementById("exitConditionSecondIndicatorParameter").value = "";
        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }

    for (var i = 0; i < options.length; i+=1)
    {
        secondIndicatorExit.appendChild(options[i]);
    }
});

function makeOptionsExitCloses()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "Down";
    option1.id = "exit_SecondIndicator_Down";
    option1.innerText = "Down";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Up";
    option2.id = "exit_SecondIndicator_Up";
    option2.innerText = "Up";
    options.push(option2);

    return options;
}

function makeOptionsExitBreaksAbove()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "HighOfEntryBar";
    option2.id = "exit_SecondIndicator_HighOfEntryBar";
    option2.innerText = "High of entry bar";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfFirstNMinutes";
    option3.id = "exit_SecondIndicator_HighOfFirstNMinutes";
    option3.innerText = "High of first N minutes";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "HighOfLastNMinutes";
    option4.id = "exit_SecondIndicator_HighOfLastNMinutes";
    option4.innerText = "High of last N minutes";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "Interval";
    option5.id = "exit_SecondIndicator_Interval";
    option5.innerText = "Interval";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "PreviousCandleHigh";
    option6.id = "exit_SecondIndicator_PreviousCandleHigh";
    option6.innerText = "Previous candle high";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "ProfitTarget";
    option7.id = "exit_SecondIndicator_ProfitTarget";
    option7.innerText = "Profit target";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "SMA";
    option8.id = "exit_SecondIndicator_SMA";
    option8.innerText = "SMA";
    options.push(option8);

    let option9 = document.createElement("option");
    option9.value = "VWAP";
    option9.id = "exit_SecondIndicator_VWAP";
    option9.innerText = "VWAP";
    options.push(option9);

    return options;
}

function makeOptionsExitBreaksBelow()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "exit_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "LowOfEntryBar";
    option3.id = "exit_SecondIndicator_LowOfEntryBar";
    option3.innerText = "Low of entry bar";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "LowOfFirstNMinutes";
    option4.id = "exit_SecondIndicator_LowOfFirstNMinutes";
    option4.innerText = "Low of first N minutes";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "LowOfLastNMinutes";
    option5.id = "exit_SecondIndicator_LowOfLastNMinutes";
    option5.innerText = "Low of last N minutes";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "PreviousCandleLow";
    option6.id = "exit_SecondIndicator_PreviousCandleLow";
    option6.innerText = "Previous candle low";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "SMA";
    option7.id = "exit_SecondIndicator_SMA";
    option7.innerText = "SMA";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "StopLoss";
    option8.id = "exit_SecondIndicator_StopLoss";
    option8.innerText = "Stop loss";
    options.push(option8);

    let option9 = document.createElement("option");
    option9.value = "VWAP";
    option9.id = "exit_SecondIndicator_VWAP";
    option9.innerText = "VWAP";
    options.push(option9);

    return options;
}

function makeOptionsExitClosesAbove()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "HighOfEntryBar";
    option2.id = "exit_SecondIndicator_HighOfEntryBar";
    option2.innerText = "High of entry bar";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfFirstNMinutes";
    option3.id = "exit_SecondIndicator_HighOfFirstNMinutes";
    option3.innerText = "High of first N minutes";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "HighOfLastNMinutes";
    option4.id = "exit_SecondIndicator_HighOfLastNMinutes";
    option4.innerText = "High of last N minutes";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "PreviousCandleHigh";
    option5.id = "exit_SecondIndicator_PreviousCandleHigh";
    option5.innerText = "Previous candle high";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "ProfitTarget";
    option6.id = "exit_SecondIndicator_ProfitTarget";
    option6.innerText = "Profit target";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "SMA";
    option7.id = "exit_SecondIndicator_SMA";
    option7.innerText = "SMA";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "VWAP";
    option8.id = "exit_SecondIndicator_VWAP";
    option8.innerText = "VWAP";
    options.push(option8);

    return options;
}

function makeOptionsExitClosesBelow()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "LowOfEntryBar";
    option2.id = "exit_SecondIndicator_LowOfEntryBar";
    option2.innerText = "Low of entry bar";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "LowOfFirstNMinutes";
    option3.id = "exit_SecondIndicator_LowOfFirstNMinutes";
    option3.innerText = "Low of first N minutes";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "LowOfLastNMinutes";
    option4.id = "exit_SecondIndicator_LowOfLastNMinutes";
    option4.innerText = "Low of last N minutes";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "PreviousCandleLow";
    option5.id = "exit_SecondIndicator_PreviousCandleLow";
    option5.innerText = "Previous candle low";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "SMA";
    option6.id = "exit_SecondIndicator_SMA";
    option6.innerText = "SMA";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "StopLoss";
    option7.id = "exit_SecondIndicator_StopLoss";
    option7.innerText = "StopLoss";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "VWAP";
    option8.id = "exit_SecondIndicator_VWAP";
    option8.innerText = "VWAP";
    options.push(option8);

    return options;
}

function makeOptionsExitHas()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "AtLeastNTimesRange";
    option1.id = "exit_SecondIndicator_AtLeastNTimesRange";
    option1.innerText = "At least N times range";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "AtLeastNTimesVolume";
    option2.id = "exit_SecondIndicator_AtLeastNTimesVolume";
    option2.innerText = "At least N times volume";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "AtMostNTimesRange";
    option3.id = "exit_SecondIndicator_AtMostNTimesRange";
    option3.innerText = "At most N times range";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "AtMostNTimesVolume";
    option4.id = "exit_SecondIndicator_AtMostNTimesVolume";
    option4.innerText = "At most N times volume";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "HigherRange";
    option5.id = "exit_SecondIndicator_HigherRange";
    option5.innerText = "Higher range";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "HigherVolume";
    option6.id = "exit_SecondIndicator_HigherVolume";
    option6.innerText = "Higher volume";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "LongBottomTail";
    option7.id = "exit_SecondIndicator_LongBottomTail";
    option7.innerText = "Long bottom tail";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "LongTopTail";
    option8.id = "exit_SecondIndicator_LongTopTail";
    option8.innerText = "Long top tail";
    options.push(option8);

    let option9 = document.createElement("option");
    option9.value = "LowerRange";
    option9.id = "exit_SecondIndicator_LowerRange";
    option9.innerText = "Lower range";
    options.push(option9);

    let option10 = document.createElement("option");
    option10.value = "LowerVolume";
    option10.id = "exit_SecondIndicator_LowerVolume";
    option10.innerText = "Lower volume";
    options.push(option10);

    return options;
}

function makeOptionsExitBouncesHigherOff()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "exit_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "exit_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "exit_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsExitBouncesLowerOff()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "exit_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "exit_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "exit_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsExitFallsTo()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "exit_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "exit_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "exit_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsExitRisesTo()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "Interval";
    option2.id = "exit_SecondIndicator_Interval";
    option2.innerText = "Interval";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "SMA";
    option3.id = "exit_SecondIndicator_SMA";
    option3.innerText = "SMA";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "VWAP";
    option4.id = "exit_SecondIndicator_VWAP";
    option4.innerText = "VWAP";
    options.push(option4);

    return options;
}

function makeOptionsExitPreviousNCandles()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "NPercent";
    option1.id = "exit_SecondIndicator_NPercent";
    option1.innerText = "N percent";
    options.push(option1);

    return options;
}

function makeOptionsExitCrossesAbove()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "SMA";
    option2.id = "exit_SecondIndicator_SMA";
    option2.innerText = "SMA";
    options.push(option2);

    return options;
}

function makeOptionsExitCrossesBelow()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "EMA";
    option1.id = "exit_SecondIndicator_EMA";
    option1.innerText = "EMA";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "SMA";
    option2.id = "exit_SecondIndicator_SMA";
    option2.innerText = "SMA";
    options.push(option2);

    return options;
}


//COMPARATORS

function makeComparatorsEntryCurrentCandle()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "BouncesHigherOff";
    option1.id = "entry_Comparator_BouncesHigherOff";
    option1.innerText = "Bounces higher off";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "BouncesLowerOff";
    option2.id = "entry_Comparator_BouncesLowerOff";
    option2.innerText = "Bounces lower off";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "BreaksAbove";
    option3.id = "entry_Comparator_BreaksAbove";
    option3.innerText = "Breaks above";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "BreaksBelow";
    option4.id = "entry_Comparator_BreaksBelow";
    option4.innerText = "Breaks below";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "Closes";
    option5.id = "entry_Comparator_Closes";
    option5.innerText = "Closes";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "ClosesAbove";
    option6.id = "entry_Comparator_ClosesAbove";
    option6.innerText = "Closes above";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "ClosesBelow";
    option7.id = "entry_Comparator_ClosesBelow";
    option7.innerText = "Closes below";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "FallsTo";
    option8.id = "entry_Comparator_FallsTo";
    option8.innerText = "Falls to";
    options.push(option8);

    let option9 = document.createElement("option");
    option9.value = "Has";
    option9.id = "entry_Comparator_Has";
    option9.innerText = "Has";
    options.push(option9);

    let option10 = document.createElement("option");
    option10.value = "RisesTo";
    option10.id = "entry_Comparator_RisesTo";
    option10.innerText = "Rises to";
    options.push(option10);

    return options;
}

function makeComparatorsEntryGap()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "DownByAtLeast";
    option1.id = "entry_Comparator_DownByAtLeast";
    option1.innerText = "Down by at least";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "DownByAtMost";
    option2.id = "entry_Comparator_DownByAtMost";
    option2.innerText = "Down by at most";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "UpByAtLeast";
    option3.id = "entry_Comparator_UpByAtLeast";
    option3.innerText = "Up by at least";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "UpByAtMost";
    option4.id = "entry_Comparator_UpByAtMost";
    option4.innerText = "Up by at most";
    options.push(option4);

    return options;
}

function makeComparatorsEntryPreviousNCandles()
{
    let options = [];

    let option0 = document.createElement("option");
    option0.value = "Closes";
    option0.id = "entry_Comparator_Closes";
    option0.innerText = "Close";
    options.push(option0);

    let option01 = document.createElement("option");
    option01.value = "ClosesAbove";
    option01.id = "entry_Comparator_ClosesAbove";
    option01.innerText = "Close above";
    options.push(option01);

    let option02 = document.createElement("option");
    option02.value = "ClosesBelow";
    option02.id = "entry_Comparator_ClosesBelow";
    option02.innerText = "Close below";
    options.push(option02);

    let option1 = document.createElement("option");
    option1.value = "FallByAtLeast";
    option1.id = "entry_Comparator_FallByAtLeast";
    option1.innerText = "Fall by at least";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "FallByAtMost";
    option2.id = "entry_Comparator_FallByAtMost";
    option2.innerText = "Fall by at most";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "Has";
    option3.id = "entry_Comparator_Has";
    option3.innerText = "Have";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "RiseByAtLeast";
    option4.id = "entry_Comparator_RiseByAtLeast";
    option4.innerText = "Rise by at least";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "RiseByAtMost";
    option5.id = "entry_Comparator_RiseByAtMost";
    option5.innerText = "Rise by at most";
    options.push(option5);

    return options;
}

function makeComparatorsEntrySignal()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "GivenInFirst";
    option1.id = "entry_Comparator_GivenInFirst";
    option1.innerText = "Given in first";
    options.push(option1);

    return options;
}

function makeComparatorsEntryEMA()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "CrossesAbove";
    option1.id = "entry_Comparator_CrossesAbove";
    option1.innerText = "Crosses above";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "CrossesBelow";
    option2.id = "entry_Comparator_CrossesBelow";
    option2.innerText = "Crosses below";
    options.push(option2);

    return options;
}

function makeComparatorsEntrySMA()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "CrossesAbove";
    option1.id = "entry_Comparator_CrossesAbove";
    option1.innerText = "Crosses above";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "CrossesBelow";
    option2.id = "entry_Comparator_CrossesBelow";
    option2.innerText = "Crosses below";
    options.push(option2);

    return options;
}

function makeComparatorsExitCurrentCandle()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "BouncesHigherOff";
    option1.id = "exit_Comparator_BouncesHigherOff";
    option1.innerText = "Bounces higher off";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "BouncesLowerOff";
    option2.id = "exit_Comparator_BouncesLowerOff";
    option2.innerText = "Bounces lower off";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "BreaksAbove";
    option3.id = "exit_Comparator_BreaksAbove";
    option3.innerText = "Breaks above";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "BreaksBelow";
    option4.id = "exit_Comparator_BreaksBelow";
    option4.innerText = "Breaks below";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "Closes";
    option5.id = "exit_Comparator_Closes";
    option5.innerText = "Closes";
    options.push(option5);

    let option6 = document.createElement("option");
    option6.value = "ClosesAbove";
    option6.id = "exit_Comparator_ClosesAbove";
    option6.innerText = "Closes above";
    options.push(option6);

    let option7 = document.createElement("option");
    option7.value = "ClosesBelow";
    option7.id = "exit_Comparator_ClosesBelow";
    option7.innerText = "Closes below";
    options.push(option7);

    let option8 = document.createElement("option");
    option8.value = "FallsTo";
    option8.id = "exit_Comparator_FallsTo";
    option8.innerText = "Falls to";
    options.push(option8);

    let option9 = document.createElement("option");
    option9.value = "Has";
    option9.id = "exit_Comparator_Has";
    option9.innerText = "Has";
    options.push(option9);

    let option10 = document.createElement("option");
    option10.value = "RisesTo";
    option10.id = "exit_Comparator_RisesTo";
    option10.innerText = "Rises to";
    options.push(option10);

    return options;
}

function makeComparatorsExitPreviousNCandles()
{
    let options = [];

    let option0 = document.createElement("option");
    option0.value = "Closes";
    option0.id = "exit_Comparator_Closes";
    option0.innerText = "Close";
    options.push(option0);

    let option01 = document.createElement("option");
    option01.value = "ClosesAbove";
    option01.id = "exit_Comparator_ClosesAbove";
    option01.innerText = "Close above";
    options.push(option01);

    let option02 = document.createElement("option");
    option02.value = "ClosesBelow";
    option02.id = "exit_Comparator_ClosesBelow";
    option02.innerText = "Close below";
    options.push(option02);

    let option1 = document.createElement("option");
    option1.value = "FallByAtLeast";
    option1.id = "exit_Comparator_FallByAtLeast";
    option1.innerText = "Fall by at least";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "FallByAtMost";
    option2.id = "exit_Comparator_FallByAtMost";
    option2.innerText = "Fall by at most";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "Has";
    option3.id = "exit_Comparator_Has";
    option3.innerText = "Have";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "RiseByAtLeast";
    option4.id = "exit_Comparator_RiseByAtLeast";
    option4.innerText = "Rise by at least";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "RiseByAtMost";
    option5.id = "exit_Comparator_RiseByAtMost";
    option5.innerText = "Rise by at most";
    options.push(option5);


    return options;
}

function makeComparatorsExitEMA()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "CrossesAbove";
    option1.id = "exit_Comparator_CrossesAbove";
    option1.innerText = "Crosses above";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "CrossesBelow";
    option2.id = "exit_Comparator_CrossesBelow";
    option2.innerText = "Crosses below";
    options.push(option2);

    return options;
}

function makeComparatorsExitSMA()
{
    let options = [];

    let option1 = document.createElement("option");
    option1.value = "CrossesAbove";
    option1.id = "exit_Comparator_CrossesAbove";
    option1.innerText = "Crosses above";
    options.push(option1);

    let option2 = document.createElement("option");
    option2.value = "CrossesBelow";
    option2.id = "exit_Comparator_CrossesBelow";
    option2.innerText = "Crosses below";
    options.push(option2);

    return options;
}
