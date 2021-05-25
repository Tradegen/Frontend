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
            window.location.href = 'https://www.tradegen.io/profile';
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

    const allowedValues = ["FallByAtLeast", "FallByAtMost", "RiseByAtLeast", "RiseByAtMost", "NPercent"];
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
    else if (!allowedValues.includes(secondIndicator) && (parseInt(entryConditionSecondIndicatorParameter) < 0 || parseInt(entryConditionSecondIndicatorParameter) > 100))
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter a number between 0 and 100.";
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

        if (firstIndicator == "LatestPrice")
        {
            modifiedName = "Latest price ";
        }
        else if (firstIndicator == "EMA")
        {
            modifiedName = "EMA" + firstIndicatorParameter.toString() + " ";
        }
        else if (firstIndicator == "NthPriceUpdate")
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
            modifiedName = firstIndicatorParameter.toString() + suffix + " price update ";
        }
        else if (firstIndicator == "PreviousNPriceUpdates")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " price updates ";
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
            if (firstIndicator == "PreviousNPriceUpdates")
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
            if (firstIndicator == "PreviousNPriceUpdates")
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
        else if (comparator == "RisesTo")
        {
            modifiedName += "rises to ";
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
        if (secondIndicator == "Down")
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
        else if (secondIndicator == "HighOfFirstNPriceUpdates")
        {
            modifiedName += "high of first " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "HighOfLastNPriceUpdates")
        {
            modifiedName += "high of last " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "Interval")
        {
            modifiedName += "$" + secondIndicatorParameter.toString() + " interval";
        }
        else if (secondIndicator == "LowOfFirstNPriceUpdates")
        {
            modifiedName += "low of first " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "LowOfLastNPriceUpdates")
        {
            modifiedName += "low of last " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "SMA")
        {
            modifiedName += "SMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "Up")
        {
            modifiedName += "Up";
        }
        else if (secondIndicator == "NPriceUpdates")
        {
            modifiedName += secondIndicatorParameter.toString() + " price updates";
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

    const allowedValues = ["NPercent", "FallByAtLeast", "FallByAtMost", "RiseByAtLeast", "RiseByAtMost"];
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
    else if (!allowedValues.includes(secondIndicator) && (parseInt(exitConditionSecondIndicatorParameter) < 0 || parseInt(exitConditionSecondIndicatorParameter) > 100))
    {
        document.getElementById("entryConditionModalErrorMessage").style.display = "block";
        document.getElementById("exitConditionModalErrorMessage").style.display = "none";

        document.getElementById("entryConditionModalErrorMessage").innerText = "Please enter a number between 0 and 100.";
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

        if (firstIndicator == "LatestPrice")
        {
            modifiedName = "Latest price ";
        }
        else if (firstIndicator == "EMA")
        {
            modifiedName = "EMA" + firstIndicatorParameter.toString() + " ";
        }
        else if (firstIndicator == "NthPriceUpdate")
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
            modifiedName = firstIndicatorParameter.toString() + suffix + " price update ";
        }
        else if (firstIndicator == "PreviousNPriceUpdates")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " price updates ";
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
            if (firstIndicator == "PreviousNPriceUpdates")
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
            if (firstIndicator == "PreviousNPriceUpdates")
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
            if (firstIndicator == "PreviousNPriceUpdates")
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
        else if (comparator == "RisesTo")
        {
            modifiedName += "rises to ";
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
        if (secondIndicator == "Down")
        {
            modifiedName += "down";
        }
        else if (secondIndicator == "EMA")
        {
            modifiedName += "EMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "HighOfFirstNPriceUpdates")
        {
            modifiedName += "high of first " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "HighOfLastNPriceUpdates")
        {
            modifiedName += "high of last " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "Interval")
        {
            modifiedName += "$" + secondIndicatorParameter.toString() + " interval";
        }
        else if (secondIndicator == "LowOfFirstNPriceUpdates")
        {
            modifiedName += "low of first " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "LowOfLastNPriceUpdates")
        {
            modifiedName += "low of last " + secondIndicatorParameter.toString() + " price updates";
        }
        else if (secondIndicator == "SMA")
        {
            modifiedName += "SMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "Up")
        {
            modifiedName += "Up";
        }
        else if (secondIndicator == "NPriceUpdates")
        {
            modifiedName += secondIndicatorParameter.toString() + " price updates";
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

    if (selectedValue == "LatestPrice")
    {
        options = makeComparatorsEntryLatestPrice();
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
    else if (selectedValue == "NthPriceUpdate")
    {
        options = makeComparatorsEntryPriceUpdate();
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
        firstIndicatorInput.setAttribute("placeholder", "Number of price updates");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "PreviousNPriceUpdates")
    {
        options = makeComparatorsEntryPreviousNPriceUpdates();
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
        firstIndicatorInput.setAttribute("placeholder", "Number of price updates");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
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
    
    if (selectedValue == "EMA")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "HighOfFirstNPriceUpdates")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "HighOfLastNPriceUpdates")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "Interval")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Price interval";
    }
    else if (selectedValue == "LowOfFirstNPriceUpdates")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "LowOfLastNPriceUpdates")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "SMA")
    {
        document.getElementById("entryConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("entryConditionSecondIndicatorParameter").value = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("entryConditionSecondIndicatorParameter").placeholder = "SMA period";
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

    if (selectedValue == "LatestPrice")
    {
        options = makeComparatorsExitLatestPrice();
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
    else if (selectedValue == "NthPriceUpdate")
    {
        options = makeComparatorsExitLatestPrice();
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
        firstIndicatorInput.setAttribute("placeholder", "Number of price updates");
        firstIndicatorInput.style.marginTop = "15px";
        firstIndicatorDiv.appendChild(firstIndicatorInput);
    }
    else if (selectedValue == "PreviousNPriceUpdates")
    {
        options = makeComparatorsExitPreviousNPriceUpdates();
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
        firstIndicatorInput.setAttribute("placeholder", "Number of price updates");
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
    
    if (selectedValue == "EMA")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "EMA period";
    }
    else if (selectedValue == "HighOfFirstNPriceUpdates")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "HighOfLastNPriceUpdates")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "Interval")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Price interval";
    }
    else if (selectedValue == "LowOfFirstNPriceUpdates")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "LowOfLastNPriceUpdates")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "Number of price updates";
    }
    else if (selectedValue == "SMA")
    {
        document.getElementById("exitConditionSecondIndicatorParameter").style.display = "block";

        document.getElementById("exitConditionSecondIndicatorParameter").value = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "";

        document.getElementById("exitConditionSecondIndicatorParameter").placeholder = "SMA period";
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

    if (parseFloat(value) > 100)
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

    if (parseFloat(value) > 100)
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

document.getElementById("maxTradeDuration").addEventListener("input", function() {
    let value = document.getElementById("maxTradeDuration").value;

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

    let durationValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("maxTradeDuration").value = durationValue;    
});

document.getElementById("profitTarget").addEventListener("input", function() {
    let value = document.getElementById("maxTradeDuration").value;

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

    let durationValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("profitTarget").value = durationValue;    
});

document.getElementById("stopLoss").addEventListener("input", function() {
    let value = document.getElementById("stopLoss").value;

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

    let durationValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("stopLoss").value = durationValue;    
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
                window.location.href = 'https://www.tradegen.io/profile';
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
    option2.value = "HighOfFirstNPriceUpdates";
    option2.id = "entry_SecondIndicator_HighOfFirstNPriceUpdates";
    option2.innerText = "High of first N price updates";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfLastNPriceUpdates";
    option3.id = "entry_SecondIndicator_HighOfLastNPriceUpdates";
    option3.innerText = "High of last N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "Interval";
    option4.id = "entry_SecondIndicator_Interval";
    option4.innerText = "Interval";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "SMA";
    option5.id = "entry_SecondIndicator_SMA";
    option5.innerText = "SMA";
    options.push(option5);

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
    option3.id = "entry_SecondIndicator_LowOfFirstNPriceUpdates";
    option3.innerText = "Low of first N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "LowOfLastNMinutes";
    option4.id = "entry_SecondIndicator_LowOfLastNPriceUpdates";
    option4.innerText = "Low of last N price updates";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "SMA";
    option5.id = "entry_SecondIndicator_SMA";
    option5.innerText = "SMA";
    options.push(option5);

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
    option2.id = "entry_SecondIndicator_HighOfFirstNPriceUpdates";
    option2.innerText = "High of first N price updates";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfLastNPriceUpdates";
    option3.id = "entry_SecondIndicator_HighOfLastNPriceUpdates";
    option3.innerText = "High of last N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "SMA";
    option4.id = "entry_SecondIndicator_SMA";
    option4.innerText = "SMA";
    options.push(option4);

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
    option2.id = "entry_SecondIndicator_LowOfFirstNPriceUpdates";
    option2.innerText = "Low of first N price updates";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "LowOfLastNMinutes";
    option3.id = "entry_SecondIndicator_LowOfLastNPriceUpdates";
    option3.innerText = "Low of last N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "SMA";
    option4.id = "entry_SecondIndicator_SMA";
    option4.innerText = "SMA";
    options.push(option4);

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

    return options;
}

function makeOptionsEntryPreviousNPriceUpdates()
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
    option2.value = "HighOfFirstNPriceUpdates";
    option2.id = "exit_SecondIndicator_HighOfFirstNPriceUpdates";
    option2.innerText = "High of first N price updates";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfLastNPriceUpdates";
    option3.id = "exit_SecondIndicator_HighOfLastNPriceUpdates";
    option3.innerText = "High of last N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "Interval";
    option4.id = "exit_SecondIndicator_Interval";
    option4.innerText = "Interval";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "SMA";
    option5.id = "exit_SecondIndicator_SMA";
    option5.innerText = "SMA";
    options.push(option5);

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
    option3.value = "LowOfFirstNPriceUpdates";
    option3.id = "exit_SecondIndicator_LowOfFirstNPriceUpdates";
    option3.innerText = "Low of first N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "LowOfLastNPriceUpdates";
    option4.id = "exit_SecondIndicator_LowOfLastNPriceUpdates";
    option4.innerText = "Low of last N price updates";
    options.push(option4);

    let option5 = document.createElement("option");
    option5.value = "SMA";
    option5.id = "exit_SecondIndicator_SMA";
    option5.innerText = "SMA";
    options.push(option5);

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
    option2.value = "HighOfFirstNPriceUpdates";
    option2.id = "exit_SecondIndicator_HighOfFirstNPriceUpdates";
    option2.innerText = "High of first N price updates";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "HighOfLastNPriceUpdates";
    option3.id = "exit_SecondIndicator_HighOfLastNPriceUpdates";
    option3.innerText = "High of last N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "SMA";
    option4.id = "exit_SecondIndicator_SMA";
    option4.innerText = "SMA";
    options.push(option4);

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
    option2.value = "LowOfFirstNPriceUpdates";
    option2.id = "exit_SecondIndicator_LowOfFirstNPriceUpdates";
    option2.innerText = "Low of first N price updates";
    options.push(option2);

    let option3 = document.createElement("option");
    option3.value = "LowOfLastNPriceUpdates";
    option3.id = "exit_SecondIndicator_LowOfLastNPriceUpdates";
    option3.innerText = "Low of last N price updates";
    options.push(option3);

    let option4 = document.createElement("option");
    option4.value = "SMA";
    option4.id = "exit_SecondIndicator_SMA";
    option4.innerText = "SMA";
    options.push(option4);

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

    return options;
}

function makeOptionsExitPreviousNPriceUpdates()
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

function makeComparatorsEntryLatestPrice()
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
    option9.value = "RisesTo";
    option9.id = "entry_Comparator_RisesTo";
    option9.innerText = "Rises to";
    options.push(option9);

    return options;
}

function makeComparatorsEntryPreviousNPriceUpdates()
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

function makeComparatorsExitLatestPrice()
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
    option9.value = "RisesTo";
    option9.id = "exit_Comparator_RisesTo";
    option9.innerText = "Rises to";
    options.push(option9);

    return options;
}

function makeComparatorsExitPreviousNPriceUpdates()
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
