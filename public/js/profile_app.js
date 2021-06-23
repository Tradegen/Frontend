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
    document.getElementById("cancelListingModal").style.display = "none";
    document.getElementById("cancelListingModal").style.textAlign = "center";

    document.getElementById("editListingModal").style.display = "none";
    document.getElementById("editListingModal").style.textAlign = "center";

    document.getElementById("successModalCancel").style.display = "none";
    document.getElementById("errorModalCancel").style.display = "none";

    document.getElementById("successModalEdit").style.display = "none";
    document.getElementById("errorModalEdit").style.display = "none";

    if (document.getElementById('successButtonCancel'))
    {
        document.getElementById('successButtonCancel')
            .addEventListener('click', function(){
                window.location.href = 'http://localhost:3000/profile';
            });
    }

    if (document.getElementById('errorButtonCancel'))
    {
        document.getElementById('errorButtonCancel')
            .addEventListener('click', hideErrorModalCancel);
    }

    if (document.getElementById('successButtonEdit'))
    {
        document.getElementById('successButtonEdit')
            .addEventListener('click', function() {
                window.location.href = 'http://localhost:3000/profile';
            });
    }

    if (document.getElementById('errorButtonEdit'))
    {
        document.getElementById('errorButtonEdit')
            .addEventListener('click', hideErrorModalEdit);
    }

    document.getElementById("successModalCancel").style.fontSize = "16px";
    document.getElementById("successTitleCancel").style.marginTop = "20px !important";
    document.getElementById("successModalCancel").style.fontWeight = "500";
    document.getElementById("successTitleCancel").style.marginBottom = "0px !important";
    document.getElementById("errorModalCancel").style.fontSize = "16px";
    document.getElementById("errorTitleCancel").style.marginTop = "20px !important";
    document.getElementById("errorModalCancel").style.fontWeight = "500";
    document.getElementById("errorTitleCancel").style.marginBottom = "0px !important";

    document.getElementById("successModalEdit").style.fontSize = "16px";
    document.getElementById("successTitleEdit").style.marginTop = "20px !important";
    document.getElementById("successModalEdit").style.fontWeight = "500";
    document.getElementById("successTitleEdit").style.marginBottom = "0px !important";
    document.getElementById("errorModalEdit").style.fontSize = "16px";
    document.getElementById("errorTitleEdit").style.marginTop = "20px !important";
    document.getElementById("errorModalEdit").style.fontWeight = "500";
    document.getElementById("errorTitleEdit").style.marginBottom = "0px !important";

    generateContent();
});

function generateContent()
{
    let address = document.getElementById("sotong2").value;
    
    let temp = JSON.stringify({
        address: address
    });

    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        const downColor = "#fe3957";
        const upColor = "#00cf92";

        let match = response.match;

        let plus = (response.netReturn > 0) ? '+' : '';

        let username = document.getElementById("username");
        username.innerText = response.username;
        let numberOfStrategiesVotedFor = document.getElementById("numberOfStrategiesVotedFor");
        numberOfStrategiesVotedFor.innerText = response.numberOfVotes.toString();
        let totalNumberOfLPTokens = document.getElementById("totalNumberOfSharesOwned");
        totalNumberOfLPTokens.innerText = response.totalNumberOfLPTokens.toFixed(2);
        let netWorth = document.getElementById("netWorth");
        netWorth.innerText = "$" + response.netWorth.toFixed(2);
        let totalYieldClaimed = document.getElementById("totalYieldClaimed");
        totalYieldClaimed.innerText = plus + response.totalYieldClaimed.toFixed(4) + " TGEN";
        let memberSince = document.getElementById("memberSince");
        memberSince.innerText = response.memberSince;

        //Live Strategies table
        const strategies = response.liveStrategies;

        if (strategies.length == 0)
        {
            document.getElementById("liveStrategiesDiv").style.display = "none";
        }

        let table = document.getElementById("liveStrategiesTable");
        table.setAttribute("class", "transactionsTable");
        while (table.hasChildNodes())
        {
            table.removeChild(table.firstChild);
        }
        let table_body = document.createElement("tbody");
        let table_head = document.createElement("thead");
        let header_row = document.createElement("tr");
        let header_title1 = document.createElement("th");
        header_title1.innerText = "Strategy Name";
        header_title1.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title1);
        let header_title2 = document.createElement("th");
        header_title2.innerText = "Deployed On";
        header_title2.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title2);
        let header_title3 = document.createElement("th");
        header_title3.innerText = "Circulating Supply";
        header_title3.setAttribute("class", "marketsTableCirculatingSupply");
        header_row.appendChild(header_title3);
        let header_title41 = document.createElement("th");
        header_title41.innerText = "Current Pool Size";
        header_title41.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title41);
        let header_title422 = document.createElement("th");
        header_title422.innerText = "Max Pool Size";
        header_title422.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title422);
        let header_title423 = document.createElement("th");
        header_title423.innerText = "Total Yield Generated";
        header_title423.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title423);
        let header_title55 = document.createElement("th");
        header_title55.innerText = "Today's Return";
        header_title55.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title55);
        let header_titleBuffer = document.createElement("th");
        header_titleBuffer.innerText = "";
        header_titleBuffer.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_titleBuffer);
        let header_title5 = document.createElement("th");
        header_title5.innerText = "Total Return";
        header_title5.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title5);
        let header_title7 = document.createElement("th");
        header_title7.innerText = "Actions";
        header_title7.setAttribute("class", "marketsTableRowData");
        header_title7.style.textAlign = "center";
        header_row.appendChild(header_title7);
        table_head.appendChild(header_row);
        table.appendChild(table_head);

        for(let i = 0; i < strategies.length; i++){
            let row = document.createElement("tr");

            let percent = strategies[i].totalReturn;

            let strategyName = document.createElement("td");
            let strategyNameLeft = document.createElement("a");
            strategyNameLeft.innerText = strategies[i].strategyName;
            let strategyID = strategies[i].strategyID;
            strategyNameLeft.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
            strategyNameLeft.addEventListener('mouseover', function(){ strategyNameLeft.style.cursor = "pointer"; });
            strategyName.setAttribute("class", "marketsTableRowName");
            let strategyNameRight = document.createElement("a");
            strategyNameRight.innerText = strategies[i].strategySymbol;
            strategyNameRight.style.color = "rgb(128,138,157)";
            strategyNameRight.style.paddingLeft = "10px";
            strategyNameRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
            strategyNameRight.addEventListener('mouseover', function(){ strategyNameRight.style.cursor = "pointer"; });
            strategyName.appendChild(strategyNameLeft);
            strategyName.appendChild(strategyNameRight);
            row.appendChild(strategyName);
            let deployedOn = document.createElement("td");
            deployedOn.innerText = strategies[i].deployedOn;
            deployedOn.setAttribute("class", "marketsTableRowName");
            row.appendChild(deployedOn);
            let sharesBought = document.createElement("td");
            let sharesBoughtLeft = document.createElement("a");
            sharesBoughtLeft.innerText = strategies[i].sharesBought.toFixed(2);
            sharesBought.setAttribute("class", "marketsTableCirculatingSupply");
            let sharesBoughtRight = document.createElement("a");
            sharesBoughtRight.innerText = strategies[i].strategySymbol;
            sharesBoughtRight.style.color = "rgb(128,138,157)";
            sharesBoughtRight.style.paddingLeft = "10px";
            sharesBoughtRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
            sharesBoughtRight.addEventListener('mouseover', function(){ sharesBoughtRight.style.cursor = "pointer"; });
            sharesBought.appendChild(sharesBoughtLeft);
            sharesBought.appendChild(sharesBoughtRight);
            row.appendChild(sharesBought);
            let currentPoolSize = document.createElement("td");
            currentPoolSize.innerText = "$" + strategies[i].currentPoolSize.toFixed(2);
            currentPoolSize.setAttribute("class", "marketsTableRowName");
            row.appendChild(currentPoolSize);
            let maxPoolSize = document.createElement("td");
            maxPoolSize.innerText = "$" + strategies[i].maxPoolSize.toFixed(2);
            maxPoolSize.setAttribute("class", "marketsTableRowName");
            row.appendChild(maxPoolSize);
            let totalYieldGenerated = document.createElement("td");
            totalYieldGenerated.innerText = "$" + strategies[i].totalYieldGenerated.toFixed(2);
            totalYieldGenerated.setAttribute("class", "marketsTableRowName");
            row.appendChild(totalYieldGenerated);
            let todayChange = document.createElement("td");
            let arrow1 = document.createElement("i");
            let text1 = document.createElement("a");
            arrow1.setAttribute("class", "material-icons");
            let percent1 = 100 * strategies[i].todayChange;
            if (percent1 > 0)
            {
                todayChange.style.color = upColor;
                arrow1.innerText = "arrow_drop_up";
                arrow1.style.color = upColor;
            }
            else if (percent1 == 0)
            {
                todayChange.style.color = "#737373";
                arrow1.innerText = "arrow_right";
                arrow1.style.color = "#737373";
            }
            else
            {
                todayChange.style.color = downColor;
                arrow1.innerText = "arrow_drop_down";
                arrow1.style.color = downColor;
                percent1 *= -1;
            }
            text1.innerText = percent1.toFixed(2) + "%";
            todayChange.setAttribute("class", "marketsTableRowName");
            todayChange.style.display = "flex";
            arrow1.style.paddingTop = "4px";
            text1.style.paddingTop = "7px";
            todayChange.appendChild(arrow1);
            todayChange.appendChild(text1);
            row.appendChild(todayChange);

            let buffer = document.createElement("td");
            buffer.innerText = "";
            buffer.setAttribute("class", "marketsTableRowName");
            row.appendChild(buffer);

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

            let buyButton = document.createElement("button");
            buyButton.innerText = "Trade";
            buyButton.setAttribute("class", "buyButton");
            let ID = strategies[i].strategyID;
            buyButton.addEventListener('click', function(){ window.location.href = '/manage_pool/' + ID; });

            let viewButton = document.createElement("button");
            viewButton.innerText = "View";
            viewButton.setAttribute("class", "viewButton");
            viewButton.addEventListener('click', function(){ window.location.href = '/strategy_info/' + ID; });

            actions.appendChild(viewButton);
            actions.appendChild(buyButton);
            row.appendChild(actions);

            table_body.appendChild(row);
        }

        table.appendChild(table_body);

        //Positions table
        const positions = response.positions;

        if (positions.length == 0)
        {
            document.getElementById("positionsForSaleDiv").style.display = "none";
        }

        let table2 = document.getElementById("positionsForSaleTable");
        table2.setAttribute("class", "transactionsTable");
        while (table2.hasChildNodes())
        {
            table2.removeChild(table2.firstChild);
        }
        let table_body2 = document.createElement("tbody");
        let table_head2 = document.createElement("thead");
        let header_row2 = document.createElement("tr");
        let header_title12 = document.createElement("th");
        header_title12.innerText = "Strategy Name";
        header_title12.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title12);
        let header_title22 = document.createElement("th");
        header_title22.innerText = "LP Tokens";
        header_title22.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title22);
        let header_title2222 = document.createElement("th");
        header_title2222.innerText = "Amount Invested";
        header_title2222.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title2222);
        let header_title32 = document.createElement("th");
        header_title32.innerText = "% of Pool";
        header_title32.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title32);
        let header_title42 = document.createElement("th");
        header_title42.innerText = "Current Pool Size";
        header_title42.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title42);
        let header_title52 = document.createElement("th");
        header_title52.innerText = "Max Pool Size";
        header_title52.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title52);
        let header_title522 = document.createElement("th");
        header_title522.innerText = "Today's Return";
        header_title522.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title522);
        let header_title62 = document.createElement("th");
        header_title62.innerText = "Actions";
        header_title62.setAttribute("class", "marketsTableRowData");
        header_title62.style.textAlign = "center";
        header_row2.appendChild(header_title62);
        table_head2.appendChild(header_row2);
        table2.appendChild(table_head2);

        for(let i = 0; i < positions.length; i++)
        {
            let row = document.createElement("tr");

            let strategyName = document.createElement("td");
            let strategyNameLeft = document.createElement("a");
            strategyNameLeft.innerText = positions[i].strategyName;
            let strategyID = positions[i].strategyID;
            strategyNameLeft.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
            strategyNameLeft.addEventListener('mouseover', function(){ strategyNameLeft.style.cursor = "pointer"; });
            strategyName.setAttribute("class", "marketsTableRowName");
            let strategyNameRight = document.createElement("a");
            strategyNameRight.innerText = positions[i].strategySymbol;
            strategyNameRight.style.color = "rgb(128,138,157)";
            strategyNameRight.style.paddingLeft = "10px";
            strategyNameRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
            strategyNameRight.addEventListener('mouseover', function(){ strategyNameRight.style.cursor = "pointer"; });
            strategyName.appendChild(strategyNameLeft);
            strategyName.appendChild(strategyNameRight);
            row.appendChild(strategyName);
            let numberOfLPTokens = document.createElement("td");
            let numberOfLPTokensLeft = document.createElement("a");
            numberOfLPTokensLeft.innerText = positions[i].numberOfLPTokens.toFixed(2);
            numberOfLPTokens.setAttribute("class", "marketsTableRowName");
            let numberOfLPTokensRight = document.createElement("a");
            numberOfLPTokensRight.innerText = positions[i].strategySymbol;
            numberOfLPTokensRight.style.color = "rgb(128,138,157)";
            numberOfLPTokensRight.style.paddingLeft = "10px";
            numberOfLPTokensRight.addEventListener('click', function(){ window.location.href = '/token_info/' + strategyID; });
            numberOfLPTokensRight.addEventListener('mouseover', function(){ numberOfLPTokensRight.style.cursor = "pointer"; });
            numberOfLPTokens.appendChild(numberOfLPTokensLeft);
            numberOfLPTokens.appendChild(numberOfLPTokensRight);
            row.appendChild(numberOfLPTokens);
            let amountInvested = document.createElement("td");
            amountInvested.innerText = "$" + positions[i].amountInvested.toFixed(2);
            amountInvested.setAttribute("class", "marketsTableRowName");
            row.appendChild(amountInvested);
            let percentOfPool = document.createElement("td");
            percentOfPool.innerText = positions[i].percentOfPool.toFixed(2) + "%";
            percentOfPool.setAttribute("class", "marketsTableRowName");
            row.appendChild(percentOfPool);
            let currentPoolSize = document.createElement("td");
            currentPoolSize.innerText = "$" + positions[i].currentPoolSize.toFixed(2);
            currentPoolSize.setAttribute("class", "marketsTableRowName");
            row.appendChild(currentPoolSize);
            let maxPoolSize = document.createElement("td");
            maxPoolSize.innerText = "$" + positions[i].maxPoolSize.toFixed(2);
            maxPoolSize.setAttribute("class", "marketsTableRowName");
            row.appendChild(maxPoolSize);

            let todayChange = document.createElement("td");
            let arrow1 = document.createElement("i");
            let text1 = document.createElement("a");
            arrow1.setAttribute("class", "material-icons");
            let percent3 = 100 * positions[i].todayReturn;
            if (percent3 > 0)
            {
                todayChange.style.color = upColor;
                arrow1.innerText = "arrow_drop_up";
                arrow1.style.color = upColor;
            }
            else if (percent3 == 0)
            {
                todayChange.style.color = "#737373";
                arrow1.innerText = "arrow_right";
                arrow1.style.color = "#737373";
            }
            else
            {
                todayChange.style.color = downColor;
                arrow1.innerText = "arrow_drop_down";
                arrow1.style.color = downColor;
                percent3 *= -1;
            }
            text1.innerText = percent3.toFixed(2) + "%";
            todayChange.setAttribute("class", "marketsTableRowName");
            todayChange.style.display = "flex";
            arrow1.style.paddingTop = "4px";
            text1.style.paddingTop = "7px";
            todayChange.appendChild(arrow1);
            todayChange.appendChild(text1);
            row.appendChild(todayChange);

            let actions = document.createElement("td");
            actions.setAttribute("class", "marketsTableRowData");
            actions.style.textAlign = "center";
            let viewButton = document.createElement("button");
            viewButton.innerText = "View";
            viewButton.setAttribute("class", "viewButton");
            viewButton.addEventListener('click', function(){ 
                window.location.href = 'http://localhost:3000/token_info/' + encodeURIComponent(strategyID);
            });
            viewButton.addEventListener('mouseover', function(){ viewButton.style.cursor = "pointer"; });
            actions.appendChild(viewButton);
            row.appendChild(actions);

            table_body2.appendChild(row);
        }

        table2.appendChild(table_body2);

        document.getElementById("loadingPage").remove();
        document.getElementById("mainContent").style.display = "block";
    }
    xhttpRep.open("POST", '/get_profile', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);
}

function displayCancelListingModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 420) : 420;
    document.getElementById('pageMask').style.display = "block";
    $( "#cancelListingModal" ).dialog({
        height: 210,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#cancelListingModal" ).show()

    document.getElementById('confirmCancellationButton').addEventListener('click', function(){ cancelListing(id); });
    document.getElementById('cancelCancellationButton').addEventListener('click', hideCancelListingModal);
}

function hideCancelListingModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#cancelListingModal" ).dialog('close');
}

function cancelListing(id)
{
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        csrf: csrf,
        positionID: id
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalCancel();
            
            return;
        }
        else
        {
            displayErrorModalCancel(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/cancel_listing', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideCancelListingModal();
}

function hideEditListingModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#editListingModal" ).dialog('close');
}

function displayEditListingModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 420) : 420;
    document.getElementById('pageMask').style.display = "block";
    $( "#editListingModal" ).dialog({
        height: 240,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#editListingModal" ).show();

    document.getElementById('confirmEditButton').addEventListener('click', function(){ editListing(id); });
    document.getElementById('cancelEditButton').addEventListener('click', hideEditListingModal);
}

function editListing(id)
{
    let price = parseFloat(document.getElementById('price').value);
    
    if (!(price > 0))
    {
        return;
    }
    
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        positionID: id,
        price: price,
        csrf: csrf
      });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalEdit();
            return;
        }
        else
        {
            displayErrorModalEdit(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/edit_listing', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideEditListingModal();
}

document.getElementById("price").addEventListener("input", function() {
    let value = document.getElementById("price").value;

    if (parseFloat(value) > 9999)
    {
        value = value.slice(0, value.length - 1);
    }

    if (value.length == 0)
    {
        value = "";
    }
    else if (value.indexOf(".") != -1)
    {
        value = value.slice(0, (value.indexOf("."))+4);
    }

    document.getElementById("price").value = parseFloat(value);    
});

function hideSuccessModalCancel() 
{
    $( "#successModalCancel" ).dialog('close');
}

function displaySuccessModalCancel() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 210;
    var Y = window.pageYOffset;
    $( "#successModalCancel" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalCancel").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalCancel" ).show()
}

function hideErrorModalCancel() 
{
    $( "#errorModalCancel" ).dialog('close');
}

function displayErrorModalCancel(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalCancel" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalCancel").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalCancel" ).show()
}

function hideSuccessModalEdit() 
{
    $( "#successModalEdit" ).dialog('close');
}

function displaySuccessModalEdit() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 210;
    var Y = window.pageYOffset;
    $( "#successModalEdit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalEdit").dialog("close");
                window.location.href = 'http://localhost:3000/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalEdit" ).show()
}

function hideErrorModalEdit() 
{
    $( "#errorModalEdit" ).dialog('close');
}

function displayErrorModalEdit(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 280;
    var Y = window.pageYOffset;
    $( "#errorModalEdit" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalEdit").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalEdit" ).show()
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