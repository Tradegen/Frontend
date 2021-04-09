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

    document.getElementById("sellStrategyModal").style.display = "none";
    document.getElementById("sellStrategyModal").style.textAlign = "center";

    document.getElementById("deleteStrategyModal").style.display = "none";
    document.getElementById("deleteStrategyModal").style.textAlign = "center";

    document.getElementById("runBacktestModal").style.display = "none";
    document.getElementById("runBacktestModal").style.textAlign = "center";

    document.getElementById("successModalCancel").style.display = "none";
    document.getElementById("errorModalCancel").style.display = "none";

    document.getElementById("successModalEdit").style.display = "none";
    document.getElementById("errorModalEdit").style.display = "none";

    document.getElementById("successModalSell").style.display = "none";
    document.getElementById("errorModalSell").style.display = "none";

    document.getElementById("successModalDelete").style.display = "none";
    document.getElementById("errorModalDelete").style.display = "none";

    document.getElementById("successModalRunBacktest").style.display = "none";
    document.getElementById("errorModalRunBacktest").style.display = "none";

    document.getElementById("strategyDetailsTitle").style.marginTop = "0px";

    if (document.getElementById('successButtonCancel'))
    {
        document.getElementById('successButtonCancel')
            .addEventListener('click', function(){
                window.location.href = '/profile';
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
                window.location.href = '/profile';
            });
    }

    if (document.getElementById('errorButtonEdit'))
    {
        document.getElementById('errorButtonEdit')
            .addEventListener('click', hideErrorModalEdit);
    }

    if (document.getElementById('successButtonSell'))
    {
        document.getElementById('successButtonSell')
            .addEventListener('click', function(){
                window.location.href = '/profile';
            });
    }

    if (document.getElementById('errorButtonSell'))
    {
        document.getElementById('errorButtonSell')
            .addEventListener('click', hideErrorModalSell);
    }

    if (document.getElementById('successButtonDelete'))
    {
        document.getElementById('successButtonDelete')
            .addEventListener('click', function(){
                window.location.href = '/profile';
            });
    }

    if (document.getElementById('errorButtonDelete'))
    {
        document.getElementById('errorButtonDelete')
            .addEventListener('click', hideErrorModalDelete);
    }

    if (document.getElementById('successButtonRunBacktest'))
    {
        document.getElementById('successButtonRunBacktest')
            .addEventListener('click', function(){
                window.location.href = '/profile';
            });
    }

    if (document.getElementById('errorButtonRunBacktest'))
    {
        document.getElementById('errorButtonRunBacktest')
            .addEventListener('click', hideErrorModalRunBacktest);
    }

    if (document.getElementById('successButtonEditStrategy'))
    {
        document.getElementById('successButtonEditStrategy')
            .addEventListener('click', function(){
                window.location.href = '/profile';
            });
    }

    if (document.getElementById('errorButtonEditStrategy'))
    {
        document.getElementById('errorButtonEditStrategy')
            .addEventListener('click', hideErrorModalEditStrategy);
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

    document.getElementById("successModalSell").style.fontSize = "16px";
    document.getElementById("successTitleSell").style.marginTop = "20px !important";
    document.getElementById("successModalSell").style.fontWeight = "500";
    document.getElementById("successTitleSell").style.marginBottom = "0px !important";
    document.getElementById("errorModalSell").style.fontSize = "16px";
    document.getElementById("errorTitleSell").style.marginTop = "20px !important";
    document.getElementById("errorModalSell").style.fontWeight = "500";
    document.getElementById("errorTitleSell").style.marginBottom = "0px !important";

    document.getElementById("successModalDelete").style.fontSize = "16px";
    document.getElementById("successTitleDelete").style.marginTop = "20px !important";
    document.getElementById("successModalDelete").style.fontWeight = "500";
    document.getElementById("successTitleDelete").style.marginBottom = "0px !important";
    document.getElementById("errorModalDelete").style.fontSize = "16px";
    document.getElementById("errorTitleDelete").style.marginTop = "20px !important";
    document.getElementById("errorModalDelete").style.fontWeight = "500";
    document.getElementById("errorTitleDelete").style.marginBottom = "0px !important";

    document.getElementById("successModalRunBacktest").style.fontSize = "16px";
    document.getElementById("successTitleRunBacktest").style.marginTop = "20px !important";
    document.getElementById("successModalRunBacktest").style.fontWeight = "500";
    document.getElementById("successTitleRunBacktest").style.marginBottom = "0px !important";
    document.getElementById("errorModalRunBacktest").style.fontSize = "16px";
    document.getElementById("errorTitleRunBacktest").style.marginTop = "20px !important";
    document.getElementById("errorModalRunBacktest").style.fontWeight = "500";
    document.getElementById("errorTitleRunBacktest").style.marginBottom = "0px !important";

    document.getElementById("successModalEditStrategy").style.fontSize = "16px";
    document.getElementById("successTitleEditStrategy").style.marginTop = "20px !important";
    document.getElementById("successModalEditStrategy").style.fontWeight = "500";
    document.getElementById("successTitleEditStrategy").style.marginBottom = "0px !important";
    document.getElementById("errorModalEditStrategy").style.fontSize = "16px";
    document.getElementById("errorTitleEditStrategy").style.marginTop = "20px !important";
    document.getElementById("errorModalEditStrategy").style.fontWeight = "500";
    document.getElementById("errorTitleEditStrategy").style.marginBottom = "0px !important";

    document.getElementById("symbolsEdit").style.display = "none";

    document.getElementById("confirmDeleteButton").style.backgroundColor = "#fe3957";

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
        let numberOfPositionsOwned = document.getElementById("numberOfPositionsOwned");
        numberOfPositionsOwned.innerText = response.numberOfPositions.toString();
        let totalNumberOfSharesOwned = document.getElementById("totalNumberOfSharesOwned");
        totalNumberOfSharesOwned.innerText = response.totalNumberOfShares.toString();
        let netWorth = document.getElementById("netWorth");
        netWorth.innerText = response.netWorth.toFixed(4) + " QOIN";
        let netReturn = document.getElementById("netReturn");
        netReturn.innerText = plus + response.netReturn.toFixed(2) + "%";

        //My Strategies table
        const myStrategies = response.developedStrategies;

        if (myStrategies.length == 0)
        {
            document.getElementById("myStrategiesDiv").style.display = "none";
        }

        let table3 = document.getElementById("myStrategiesTable");
        table3.setAttribute("class", "transactionsTable");
        while (table3.hasChildNodes())
        {
            table3.removeChild(table3.firstChild);
        }
        let table_body3 = document.createElement("tbody");
        let table_head3 = document.createElement("thead");
        let header_row3 = document.createElement("tr");
        let header_title13 = document.createElement("th");
        header_title13.innerText = "Strategy Name";
        header_title13.setAttribute("class", "marketsTableRowName");
        header_row3.appendChild(header_title13);
        let header_title23 = document.createElement("th");
        header_title23.innerText = "Developed On";
        header_title23.setAttribute("class", "marketsTableRowName");
        header_row3.appendChild(header_title23);
        let header_title33 = document.createElement("th");
        header_title33.innerText = "Status";
        header_title33.setAttribute("class", "marketsTableRowName");
        header_row3.appendChild(header_title33);
        let header_title73 = document.createElement("th");
        header_title73.innerText = "Actions";
        header_title73.setAttribute("class", "marketsTableRowData");
        header_title73.style.textAlign = "center";
        header_row3.appendChild(header_title73);

        table_head3.appendChild(header_row3);
        table3.appendChild(table_head3);

        for(let i = 0; i < myStrategies.length; i++){
            let row = document.createElement("tr");

            let strategyName = document.createElement("td");
            let strategyNameLink = document.createElement("a");
            strategyNameLink.innerText = myStrategies[i].strategyName;
            let strategyID = myStrategies[i].strategyID;
            strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
            strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
            strategyName.setAttribute("class", "marketsTableRowName");
            strategyName.appendChild(strategyNameLink);
            row.appendChild(strategyName);
            let developedOn = document.createElement("td");
            developedOn.innerText = myStrategies[i].developedOn;
            developedOn.setAttribute("class", "marketsTableRowName");
            row.appendChild(developedOn);
            let status = document.createElement("td");
            status.innerText = myStrategies[i].status;
            status.setAttribute("class", "marketsTableRowName");
            if (myStrategies[i].status == "Live" || myStrategies[i].status == "Backtest complete" || myStrategies[i].status == "Approved")
            {
                status.style.color = "#18c96e";
            }
            else if (myStrategies[i].status == "Pending approval" || myStrategies[i].status == "Running backtest" || myStrategies[i].status == "Submitted for review")
            {
                status.style.color = "#f2bd5c";
            }
            else if (myStrategies[i].status == "Backtest contains errors" || myStrategies[i].status == "Not active")
            {
                status.style.color = downColor;
            }
            row.appendChild(status);

            let actions = document.createElement("td");
            actions.setAttribute("class", "marketsTableRowData");
            actions.style.textAlign = "center";
            let viewButton = document.createElement("i");
            viewButton.innerText = "timeline";
            viewButton.setAttribute("class", "material-icons actionIcon");
            let ID = myStrategies[i].strategyID;
            viewButton.addEventListener('click', function(){ window.location.href = '/strategy_info/' + ID; });
            let detailsButton = document.createElement("i");
            detailsButton.innerText = "info";
            detailsButton.setAttribute("class", "material-icons actionIcon");
            detailsButton.style.color = "#9ea1a4";
            detailsButton.addEventListener('click', function(){ populateStrategyDiv(myStrategies[i].strategyID.toString()); });
            let deleteButton = document.createElement("i");
            deleteButton.innerText = "delete";
            deleteButton.setAttribute("class", "material-icons actionIcon");
            deleteButton.style.color = downColor;
            deleteButton.addEventListener('click', function(){ displayDeleteStrategyModal(myStrategies[i].strategyID.toString()); });
            let sellButton = document.createElement("i");
            sellButton.innerText = "sell";
            sellButton.setAttribute("class", "material-icons actionIcon");
            sellButton.style.color = upColor;
            sellButton.addEventListener('click', function(){ displaySellStrategyModal(myStrategies[i].strategyID.toString()); });
            let runBacktestButton = document.createElement("i");
            runBacktestButton.innerText = "build";
            runBacktestButton.setAttribute("class", "material-icons actionIcon");
            runBacktestButton.addEventListener('click', function(){ displayRunBacktestModal(myStrategies[i].strategyID.toString()); });
            let editStrategyButton = document.createElement("i");
            editStrategyButton.innerText = "create";
            editStrategyButton.setAttribute("class", "material-icons actionIcon");
            editStrategyButton.addEventListener('click', function(){ populateEditStrategyModal(myStrategies[i].strategyID.toString()); });

            if (myStrategies[i].status == "Not active")
            {
                actions.appendChild(deleteButton);
                actions.appendChild(detailsButton);
                actions.appendChild(editStrategyButton);
                actions.appendChild(runBacktestButton);
            }
            else if (myStrategies[i].status == "Running backtest")
            {
                actions.appendChild(detailsButton);
            }
            else if (myStrategies[i].status == "Backtest contains errors")
            {
                actions.appendChild(deleteButton);
                actions.appendChild(detailsButton);
                actions.appendChild(editStrategyButton);
                actions.appendChild(runBacktestButton);
            }
            else if (myStrategies[i].status == "Backtest complete")
            {
                actions.appendChild(deleteButton);
                actions.appendChild(viewButton);
                actions.appendChild(detailsButton);
                actions.appendChild(editStrategyButton);
                actions.appendChild(sellButton);
            }
            else if (myStrategies[i].status == "Pending approval")
            {
                actions.appendChild(viewButton);
                actions.appendChild(detailsButton);
            }
            else if (myStrategies[i].status == "Live")
            {
                actions.appendChild(viewButton);
                actions.appendChild(detailsButton);
            }
            else if (myStrategies[i].status == "Submitted for review")
            {
                actions.appendChild(viewButton);
                actions.appendChild(detailsButton);
            }
            else if (myStrategies[i].status == "Approved")
            {
                actions.appendChild(viewButton);
                actions.appendChild(detailsButton);
            }

            row.appendChild(actions);
            table_body3.appendChild(row);
        }

        table3.appendChild(table_body3);

        //Top Positions table
        const positions = response.topPositions;

        if (positions.length == 0)
        {
            document.getElementById("topPositionsDiv").style.display = "none";
        }

        let table1 = document.getElementById("topPositionsTable");
        table1.setAttribute("class", "transactionsTable");
        while (table1.hasChildNodes())
        {
            table1.removeChild(table1.firstChild);
        }
        let table_body1 = document.createElement("tbody");
        let table_head1 = document.createElement("thead");
        let header_row1 = document.createElement("tr");
        let header_title11 = document.createElement("th");
        header_title11.innerText = "Strategy Name";
        header_title11.setAttribute("class", "marketsTableRowName");
        header_row1.appendChild(header_title11);
        let header_title21 = document.createElement("th");
        header_title21.innerText = "Entry Date";
        header_title21.setAttribute("class", "marketsTableRowName");
        header_row1.appendChild(header_title21);
        let header_title111 = document.createElement("th");
        header_title111.innerText = "Tokens";
        header_title111.setAttribute("class", "marketsTableRowName");
        header_row1.appendChild(header_title111);
        let header_title1111 = document.createElement("th");
        header_title1111.innerText = "Class";
        header_title1111.setAttribute("class", "marketsTableRowName");
        header_row1.appendChild(header_title1111);
        let header_title31 = document.createElement("th");
        header_title31.innerText = "Entry Price";
        header_title31.setAttribute("class", "marketsTableRowName");
        header_row1.appendChild(header_title31);
        let header_title41 = document.createElement("th");
        header_title41.innerText = "Current Price";
        header_title41.setAttribute("class", "marketsTableRowName");
        header_row1.appendChild(header_title41);
        let header_title51 = document.createElement("th");
        header_title51.innerText = "Current Value";
        header_title51.setAttribute("class", "marketsTableRowName");
        header_row1.appendChild(header_title51);
        let header_title61 = document.createElement("th");
        header_title61.innerText = "Change";
        header_title61.setAttribute("class", "marketsTableRowName");
        header_title61.style.textAlign = "center";
        header_row1.appendChild(header_title61);
        table_head1.appendChild(header_row1);
        table1.appendChild(table_head1);

        for(let i = 0; i < positions.length; i++)
        {
            let row = document.createElement("tr");

            let plus = (positions[i].currentPrice > positions[i].entryPrice) ? '+' : '';
            let percent = (100 * (positions[i].currentPrice - positions[i].entryPrice)) / positions[i].entryPrice;
            let value = positions[i].currentPrice * positions[i].shares;

            let strategyName = document.createElement("td");
            let strategyNameLink = document.createElement("a");
            strategyNameLink.innerText = positions[i].strategyName;
            let strategyID = positions[i].strategyID;
            strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
            strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
            strategyName.setAttribute("class", "marketsTableRowName");
            strategyName.appendChild(strategyNameLink);
            row.appendChild(strategyName);
            let entryDate = document.createElement("td");
            entryDate.innerText = positions[i].entryDate;
            entryDate.setAttribute("class", "marketsTableRowName");
            row.appendChild(entryDate);
            let shares = document.createElement("td");
            shares.innerText = positions[i].shares;
            shares.setAttribute("class", "marketsTableRowName");
            row.appendChild(shares);
            let shareClass = document.createElement("td");
            shareClass.innerText = positions[i].shareClass;
            shareClass.setAttribute("class", "marketsTableRowName");
            row.appendChild(shareClass);
            let entryPrice = document.createElement("td");
            entryPrice.innerText = positions[i].entryPrice.toFixed(4) + " QOIN";
            entryPrice.setAttribute("class", "marketsTableRowName");
            row.appendChild(entryPrice);
            let currentPrice = document.createElement("td");
            currentPrice.innerText = positions[i].currentPrice.toFixed(4) + " QOIN";
            currentPrice.setAttribute("class", "marketsTableRowName");
            row.appendChild(currentPrice);
            let currentValue = document.createElement("td");
            currentValue.innerText = value.toFixed(4) + " QOIN";
            currentValue.setAttribute("class", "marketsTableRowName");
            row.appendChild(currentValue);
            let change = document.createElement("td");
            let arrow = document.createElement("i");
            let text= document.createElement("a");
            arrow.setAttribute("class", "material-icons");
            if (percent > 0)
            {
                change.style.color = upColor;
                arrow.innerText = "arrow_drop_up";
                arrow.style.color = upColor;
            }
            else if (percent == 0)
            {
                change.style.color = "#737373";
                arrow.innerText = "arrow_right";
                arrow.style.color = "#737373";
            }
            else
            {
                change.style.color = downColor;
                arrow.innerText = "arrow_drop_down";
                arrow.style.color = downColor;
                percent *= -1;
            }
            text.innerText = percent.toFixed(2) + "%";
            change.setAttribute("class", "marketsTableRowName");
            change.style.display = "flex";
            change.style.textAlign = "center";
            text.style.paddingTop = "3px";
            change.appendChild(arrow);
            change.appendChild(text);
            row.appendChild(change);

            table_body1.appendChild(row);
        }

        table1.appendChild(table_body1);

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
        let header_title4 = document.createElement("th");
        header_title4.innerText = "Current Price";
        header_title4.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title4);
        let header_title5 = document.createElement("th");
        header_title5.innerText = "Change";
        header_title5.setAttribute("class", "marketsTableRowName");
        header_row.appendChild(header_title5);
        let header_title6 = document.createElement("th");
        header_title6.innerText = "Sale Price";
        header_title6.setAttribute("class", "marketsTableRowName");
        if (match == true)
        {
            header_row.appendChild(header_title6);
        }
        let header_title66 = document.createElement("th");
        header_title66.innerText = "Sales";
        header_title66.setAttribute("class", "marketsTableRowName");
        if (match == true)
        {
            header_row.appendChild(header_title66);
        }
        let header_title7 = document.createElement("th");
        header_title7.innerText = "Actions";
        header_title7.setAttribute("class", "marketsTableRowData");
        header_title7.style.textAlign = "center";
        header_row.appendChild(header_title7);
        table_head.appendChild(header_row);
        table.appendChild(table_head);

        for(let i = 0; i < strategies.length; i++){
            let row = document.createElement("tr");

            let percent = (100 * (strategies[i].currentPrice - 1)) / 1;

            let strategyName = document.createElement("td");
            let strategyNameLink = document.createElement("a");
            strategyNameLink.innerText = strategies[i].strategyName;
            let strategyID = strategies[i].strategyID;
            strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
            strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
            strategyName.setAttribute("class", "marketsTableRowName");
            strategyName.appendChild(strategyNameLink);
            row.appendChild(strategyName);
            let deployedOn = document.createElement("td");
            deployedOn.innerText = strategies[i].deployedOn;
            deployedOn.setAttribute("class", "marketsTableRowName");
            row.appendChild(deployedOn);
            let sharesBought = document.createElement("td");
            sharesBought.innerText = strategies[i].sharesBought;
            sharesBought.setAttribute("class", "marketsTableCirculatingSupply");
            row.appendChild(sharesBought);
            let currentPrice = document.createElement("td");
            currentPrice.innerText = strategies[i].currentPrice.toFixed(4) + " QOIN";
            currentPrice.setAttribute("class", "marketsTableRowName");
            row.appendChild(currentPrice);
            let change = document.createElement("td");
            let arrow = document.createElement("i");
            let text= document.createElement("a");
            arrow.setAttribute("class", "material-icons");
            if (percent > 0)
            {
                change.style.color = upColor;
                arrow.innerText = "arrow_drop_up";
                arrow.style.color = upColor;
            }
            else if (percent == 0)
            {
                change.style.color = "#737373";
                arrow.innerText = "arrow_right";
                arrow.style.color = "#737373";
            }
            else
            {
                change.style.color = downColor;
                arrow.innerText = "arrow_drop_down";
                arrow.style.color = downColor;
                percent *= -1;
            }
            text.innerText = percent.toFixed(2) + "%";
            change.setAttribute("class", "marketsTableRowName");
            change.style.display = "flex";
            arrow.style.paddingTop = "4px";
            text.style.paddingTop = "7px";
            change.appendChild(arrow);
            change.appendChild(text);
            row.appendChild(change);
            let salePrice = document.createElement("td");
            salePrice.innerText = "$" + strategies[i].salePrice;
            salePrice.setAttribute("class", "marketsTableRowName");
            if (match == true)
            {
                row.appendChild(salePrice);
            }
            let sales = document.createElement("td");
            sales.innerText = strategies[i].sales;
            sales.setAttribute("class", "marketsTableRowName");
            if (match == true)
            {
                row.appendChild(sales);
            }

            let actions = document.createElement("td");
            actions.setAttribute("class", "marketsTableRowData");
            actions.style.textAlign = "center";
            let buyButton = document.createElement("button");
            buyButton.innerText = "Buy";
            buyButton.setAttribute("class", "buyButton");
            let ID = strategies[i].strategyID;
            buyButton.addEventListener('click', function(){ window.location.href = '/buy_new_tokens/' + ID; });
            actions.appendChild(buyButton);
            row.appendChild(actions);

            table_body.appendChild(row);
        }

        table.appendChild(table_body);

        //Positions For Sale table
        const positionsForSale = response.positionsForSale;

        if (positionsForSale.length == 0)
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
        header_title22.innerText = "Tokens";
        header_title22.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title22);
        let header_title2222 = document.createElement("th");
        header_title2222.innerText = "Class";
        header_title2222.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title2222);
        let header_title32 = document.createElement("th");
        header_title32.innerText = "Market Price";
        header_title32.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title32);
        let header_title42 = document.createElement("th");
        header_title42.innerText = "Advertised Price";
        header_title42.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title42);
        let header_title52 = document.createElement("th");
        header_title52.innerText = "% vs Market Price";
        header_title52.setAttribute("class", "marketsTableRowName");
        header_row2.appendChild(header_title52);
        let header_title62 = document.createElement("th");
        header_title62.innerText = "Actions";
        header_title62.setAttribute("class", "marketsTableRowData");
        header_title62.style.textAlign = "center";
        header_row2.appendChild(header_title62);
        table_head2.appendChild(header_row2);
        table2.appendChild(table_head2);

        for(let i = 0; i < positionsForSale.length; i++){
            let row = document.createElement("tr");

            let plus = (positionsForSale[i].advertisedPrice > positionsForSale[i].marketPrice) ? '+' : '';
            let percent = (100 * (positionsForSale[i].advertisedPrice - positionsForSale[i].marketPrice)) / positionsForSale[i].marketPrice;

            let strategyName = document.createElement("td");
            let strategyNameLink = document.createElement("a");
            strategyNameLink.innerText = positionsForSale[i].strategyName;
            let strategyID = positionsForSale[i].strategyID;
            strategyNameLink.addEventListener('click', function(){ window.location.href = '/strategy_info/' + strategyID; });
            strategyNameLink.addEventListener('mouseover', function(){ strategyNameLink.style.cursor = "pointer"; });
            strategyName.setAttribute("class", "marketsTableRowName");
            strategyName.appendChild(strategyNameLink);
            row.appendChild(strategyName);
            let numberOfShares = document.createElement("td");
            numberOfShares.innerText = positionsForSale[i].shares;
            numberOfShares.setAttribute("class", "marketsTableRowName");
            row.appendChild(numberOfShares);
            let shareClass = document.createElement("td");
            shareClass.innerText = positionsForSale[i].shareClass;
            shareClass.setAttribute("class", "marketsTableRowName");
            row.appendChild(shareClass);
            let marketPrice = document.createElement("td");
            marketPrice.innerText = positionsForSale[i].marketPrice.toFixed(4) + " QOIN";
            marketPrice.setAttribute("class", "marketsTableRowName");
            row.appendChild(marketPrice);
            let advertisedPrice = document.createElement("td");
            advertisedPrice.innerText = positionsForSale[i].advertisedPrice.toFixed(4) + " QOIN";
            advertisedPrice.setAttribute("class", "marketsTableRowName");
            row.appendChild(advertisedPrice);
            let change = document.createElement("td");
            let arrow = document.createElement("i");
            let text= document.createElement("a");
            arrow.setAttribute("class", "material-icons");
            if (percent < 0)
            {
                change.style.color = upColor;
                arrow.innerText = "arrow_drop_down";
                arrow.style.color = upColor;
                percent *= -1;
            }
            else if (percent == 0)
            {
                change.style.color = "#737373";
                arrow.innerText = "arrow_right";
                arrow.style.color = "#737373";
            }
            else
            {
                change.style.color = downColor;
                arrow.innerText = "arrow_drop_up";
                arrow.style.color = downColor;
            }
            text.innerText = percent.toFixed(2) + "%";
            change.setAttribute("class", "marketsTableRowName");
            change.style.display = "flex";
            arrow.style.paddingTop = "4px";
            text.style.paddingTop = "7px";
            change.appendChild(arrow);
            change.appendChild(text);
            row.appendChild(change);

            let actions = document.createElement("td");
            actions.setAttribute("class", "marketsTableRowData");
            actions.style.textAlign = "center";
            let editButton = document.createElement("button");
            if (match == true)
            {
                editButton.innerText = "Edit";
            }
            else
            {
                editButton.innerText = "Buy";
            }
            editButton.setAttribute("class", "buyButton");
            if (match == true)
            {
                let advertisedPrice2 = positionsForSale[i].advertisedPrice;
            
                editButton.addEventListener('click', function(){ 
                    document.getElementById('price').setAttribute("value", advertisedPrice2);
                    displayEditListingModal(positionsForSale[i].positionID.toString());
                });
            }
            else
            {
                editButton.addEventListener('click', function(){ 
                    let positionID = positionsForSale[i].positionID;
                    window.location.href = '/buy_position/' + encodeURIComponent(positionID);
                });
            }
            editButton.addEventListener('mouseover', function(){ editButton.style.cursor = "pointer"; });
            let cancelButton = document.createElement("button");
            if (match == true)
            {
                cancelButton.innerText = "Cancel";
            }
            else
            {
                cancelButton.innerText = "View";
            }
            cancelButton.setAttribute("class", "cancelButton");
            if (match == true)
            {
                cancelButton.addEventListener('click', function(){ displayCancelListingModal(positionsForSale[i].positionID.toString()); });
            }
            else
            {
                cancelButton.addEventListener('click', function(){ 
                    let positionAddress = positionsForSale[i].address;
                    window.location.href = '/position_info/' + encodeURIComponent(positionAddress);
                });
            }
            
            cancelButton.addEventListener('mouseover', function(){ cancelButton.style.cursor = "pointer"; });
            actions.appendChild(cancelButton);
            actions.appendChild(editButton);
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

function populateStrategyDiv(id)
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);
        const strategyData = response;

        let symbolOutput = "";

        for (var i = 0; i < Math.min(strategyData.symbols.length, 6); i+=1)
            {
                symbolOutput += strategyData.symbols[i];

                if (i < Math.min(strategyData.symbols.length, 6) - 1)
                {
                    symbolOutput += ", ";
                }
            }

            if (strategyData.symbols.length > 6)
            {
                symbolOutput += "...";
            }

        let watchlistName = "";

        if (strategyData.watchlist == "indexETFs")
        {
            watchlistName = "Index ETFs";
        }
        else if (strategyData.watchlist == "FAANG")
        {
            watchlistName = "FAANG stocks";
        }
        else if (strategyData.watchlist == "software")
        {
            watchlistName = "Software stocks";
        }
        else if (strategyData.watchlist == "travel")
        {
            watchlistName = "Travel stocks";
        }
        else if (strategyData.watchlist == "morningBreakouts")
        {
            watchlistName = "Morning breakouts";
        }
        else if (strategyData.watchlist == "custom")
        {
            watchlistName = "Custom stock list";
        }

        //initialise strategy data div with first strategy
        let name = document.getElementById("strategyDataName");
        name.innerText = strategyData.strategyName;
        let description = document.getElementById("strategyDataDescription");
        description.innerText = strategyData.description;
        let watchlist = document.getElementById("strategyDataWatchlist");
        watchlist.innerText = watchlistName;
        let symbol = document.getElementById("strategyDataSymbols");
        symbol.innerText = symbolOutput;
        let maxAllocation = document.getElementById("strategyDataMaxAllocation");
        maxAllocation.innerText = strategyData.maxAllocation.toString() + "%";
        let maxConcurrentTrades = document.getElementById("strategyDataMaxConcurrentTrades");
        maxConcurrentTrades.innerText = strategyData.maxConcurrentTrades;
        let positionWeight = document.getElementById("strategyDataPositionWeight");
        positionWeight.innerText = strategyData.distribution;
        let timeframe = document.getElementById("strategyDataTimeframe");
        timeframe.innerText =  strategyData.timeframe + " mins";
        let start = document.getElementById("strategyDataStart");
        start.innerText = strategyData.startTime + " minutes after market open.";
        let end = document.getElementById("strategyDataEnd");
        end.innerText = strategyData.endTime + " minutes before market close.";
        let direction = document.getElementById("strategyDataDirection");
        direction.innerText = strategyData.direction;

        let entryConditionList = document.getElementById("entryConditionList");
        let exitConditionList = document.getElementById("exitConditionList");
        
        while (entryConditionList.hasChildNodes())
        {
            entryConditionList.removeChild(entryConditionList.firstChild);
        }
        while (exitConditionList.hasChildNodes())
        {
            exitConditionList.removeChild(exitConditionList.firstChild);
        }

        for (var k = 0; k < strategyData.entryConditions.length; k+=1)
        {
            let firstIndicator = strategyData.entryConditions[k].firstIndicator;
            let firstIndicatorParameter = strategyData.entryConditions[k].firstIndicatorParams;
            let secondIndicator = strategyData.entryConditions[k].secondIndicator;
            let secondIndicatorParameter = strategyData.entryConditions[k].secondIndicatorParams;
            let comparator = strategyData.entryConditions[k].comparator;

            let modifiedName = "";

            //check comparator
            if (comparator == "BouncesHigherOff")
            {
                modifiedName = "Bounces higher off ";
            }
            else if (comparator == "BouncesLowerOff")
            {
                modifiedName = "Bounces lower off ";
            }
            else if (comparator == "BreaksAbove")
            {
                modifiedName = "Break above ";
            }
            else if (comparator == "BreaksBelow")
            {
                modifiedName = "Break below ";
            }
            else if (comparator == "Closes")
            {
                modifiedName = "Current candle closes ";
            }
            else if (comparator == "ClosesAbove")
            {
                modifiedName = "Close above ";
            }
            else if (comparator == "ClosesBelow")
            {
                modifiedName = "Close below ";
            }
            else if (comparator == "FallsTo")
            {
                modifiedName = "Falls to ";
            }
            else if (comparator == "Has")
            {
                modifiedName = "Current candle has ";
            }
            else if (comparator == "RisesTo")
            {
                modifiedName = "Rises to ";
            }
            else if (comparator == "UpByAtLeast")
            {
                modifiedName = "Gap up by at least ";
            }
            else if (comparator == "UpByAtMost")
            {
                modifiedName = "Gap up by at most ";
            }
            else if (comparator == "DownByAtLeast")
            {
                modifiedName = "Gap down by at least ";
            }
            else if (comparator == "DownByAtMost")
            {
                modifiedName = "Gap down by at most ";
            }
            else if (comparator == "GivenInFirst")
            {
                modifiedName = "Signal given in first ";
            }
            else if (comparator == "FallByAtLeast")
            {
                modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles fall by at least ";
            }
            else if (comparator == "FallByAtMost")
            {
                modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles fall by at most ";
            }
            else if (comparator == "RiseByAtLeast")
            {
                modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles rise by at least ";
            }
            else if (comparator == "RiseByAtMost")
            {
                modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles rise by at most ";
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
            

            let listElement = document.createElement("li");
            listElement.innerText = modifiedName;
            entryConditionList.appendChild(listElement);
        }

        for (var k = 0; k < strategyData.exitConditions.length; k+=1)
        {
            let firstIndicator = strategyData.exitConditions[k].firstIndicator;
            let firstIndicatorParameter = strategyData.exitConditions[k].firstIndicatorParams;
            let secondIndicator = strategyData.exitConditions[k].secondIndicator;
            let secondIndicatorParameter = strategyData.exitConditions[k].secondIndicatorParams;
            let comparator = strategyData.exitConditions[k].comparator;

            let modifiedName = "";

            //check comparator
        if (comparator == "BouncesHigherOff")
        {
            modifiedName = "Bounces higher off ";
        }
        else if (comparator == "BouncesLowerOff")
        {
            modifiedName = "Bounces lower off ";
        }
        else if (comparator == "BreaksAbove")
        {
            modifiedName = "Break above ";
        }
        else if (comparator == "BreaksBelow")
        {
            modifiedName = "Break below ";
        }
        else if (comparator == "Closes")
        {
            modifiedName = "Current candle closes ";
        }
        else if (comparator == "ClosesAbove")
        {
            modifiedName = "Close above ";
        }
        else if (comparator == "ClosesBelow")
        {
            modifiedName = "Close below ";
        }
        else if (comparator == "FallsTo")
        {
            modifiedName = "Falls to ";
        }
        else if (comparator == "Has")
        {
            modifiedName = "Current candle has ";
        }
        else if (comparator == "RisesTo")
        {
            modifiedName = "Rises to ";
        }
        else if (comparator == "FallByAtLeast")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles fall by at least ";
        }
        else if (comparator == "FallByAtMost")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles fall by at most ";
        }
        else if (comparator == "RiseByAtLeast")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles rise by at least ";
        }
        else if (comparator == "RiseByAtMost")
        {
            modifiedName = "Previous " + firstIndicatorParameter.toString() + " candles rise by at most ";
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
            modifiedName = secondIndicatorParameter.toString() + "% profit target"
        }
        else if (secondIndicator == "SMA")
        {
            modifiedName += "SMA" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "StopLoss")
        {
            modifiedName = secondIndicatorParameter.toString() + "% stop loss"
        }
        else if (secondIndicator == "Up")
        {
            modifiedName += "Up";
        }
        else if (secondIndicator == "VWAP")
        {
            modifiedName += "VWAP" + secondIndicatorParameter.toString();
        }
        else if (secondIndicator == "NPercent")
        {
            modifiedName += secondIndicatorParameter.toString() + "%";
        }

            let listElement = document.createElement("li");
            listElement.innerText = modifiedName;
            exitConditionList.appendChild(listElement);
        }

        displayStrategyDetailsModal();
    };

    xhttpRep.open("GET", '/get_strategy_details/' + encodeURIComponent(id), false);
    xhttpRep.send();
}

function displayStrategyDetailsModal() 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 450) : 450;
    let height = (isMobile.any()) ? 750 : 650;
    document.getElementById('pageMask').style.display = "block";
    $( "#strategyDetailsModal" ).dialog({
        height: height,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#strategyDetailsModal" ).show();

    document.getElementById('closeStrategyDetailsModal').addEventListener('click', hideStrategyDetailsModal);
}

function hideStrategyDetailsModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#strategyDetailsModal" ).dialog('close');
}

function hideSellStrategyModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#sellStrategyModal" ).dialog('close');
}

function displaySellStrategyModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 520) : 520;
    document.getElementById('pageMask').style.display = "block";
    $( "#sellStrategyModal" ).dialog({
        height: 400,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#sellStrategyModal" ).show();

    document.getElementById('confirmSellButton').addEventListener('click', function(){ sellStrategy(id); });
    document.getElementById('cancelSellButton').addEventListener('click', hideSellStrategyModal);
}

function sellStrategy(id)
{
    let price = parseFloat(document.getElementById('strategyPrice').value);
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        strategyID: id,
        price: price,
        csrf: csrf
      });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalSell();
            return;
        }
        else
        {
            displayErrorModalSell(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/sell_strategy', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideSellStrategyModal();
}

function displayDeleteStrategyModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 420) : 420;
    document.getElementById('pageMask').style.display = "block";
    $( "#deleteStrategyModal" ).dialog({
        height: 210,
        width: width,
        dialogClass: "whiteBackground",
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#deleteStrategyModal" ).show()

    document.getElementById('confirmDeleteButton').addEventListener('click', function(){ deleteStrategy(id); });
    document.getElementById('cancelDeleteButton').addEventListener('click', hideDeleteStrategyModal);
}

function hideDeleteStrategyModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#deleteStrategyModal" ).dialog('close');
}

function deleteStrategy(id)
{
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        csrf: csrf,
        strategyID: id
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalDelete();
            
            return;
        }
        else
        {
            displayErrorModalDelete(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/delete_strategy', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideDeleteStrategyModal();
}

document.getElementById("strategyPrice").addEventListener("input", function() {
    let value = document.getElementById("strategyPrice").value;

    if (parseFloat(value) > 99.99)
    {
        value = value.slice(0, value.length - 1);
    }

    if (value.length == 0 || parseFloat(value) == 0)
    {
        value = "";
    }
    else if (value.indexOf(".") != -1)
    {
        value = value.slice(0, (value.indexOf("."))+3);
    }

    document.getElementById("strategyPrice").value = value;    
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
                window.location.href = '/profile';
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
                window.location.href = '/profile';
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

function hideSuccessModalSell() 
{
    $( "#successModalSell" ).dialog('close');
}

function displaySuccessModalSell() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 230;
    var Y = window.pageYOffset;
    $( "#successModalSell" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalSell").dialog("close");
                window.location.href = '/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalSell" ).show()
}

function hideErrorModalSell() 
{
    $( "#errorModalSell" ).dialog('close');
}

function displayErrorModalSell(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#errorModalSell" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalSell").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalSell" ).show()
}

function hideSuccessModalDelete() 
{
    $( "#successModalDelete" ).dialog('close');
}

function displaySuccessModalDelete() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 220;
    var Y = window.pageYOffset;
    $( "#successModalDelete" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalDelete").dialog("close");
                window.location.href = '/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalDelete" ).show()
}

function hideErrorModalDelete() 
{
    $( "#errorModalDelete" ).dialog('close');
}

function displayErrorModalDelete(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#errorModalDelete" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalDelete").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalDelete" ).show()
}

function displayRunBacktestModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 420) : 420;
    document.getElementById('pageMask').style.display = "block";
    $( "#runBacktestModal" ).dialog({
        height: 210,
        width: width,
        dialogClass: 'whiteBackground',
        closeOnEscape: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#runBacktestModal" ).show()

    document.getElementById('confirmRunBacktestButton').addEventListener('click', function(){ runBacktest(id); });
    document.getElementById('cancelRunBacktestButton').addEventListener('click', hideRunBacktestModal);
}

function hideRunBacktestModal() 
{
    document.getElementById('pageMask').style.display = "none";
    $( "#runBacktestModal" ).dialog('close');
}

function runBacktest(id)
{
    let csrf = document.getElementById("sotong").value;
    let temp = JSON.stringify({
        csrf: csrf,
        strategyID: id
    });
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalRunBacktest();
            
            return;
        }
        else
        {
            displayErrorModalRunBacktest(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/start_backtest', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideRunBacktestModal();
}

function hideSuccessModalRunBacktest() 
{
    $( "#successModalRunBacktest" ).dialog('close');
}

function displaySuccessModalRunBacktest() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 240;
    var Y = window.pageYOffset;
    $( "#successModalRunBacktest" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalRunBacktest").dialog("close");
                window.location.href = '/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalRunBacktest" ).show()
}

function hideErrorModalRunBacktest() 
{
    $( "#errorModalRunBacktest" ).dialog('close');
}

function displayErrorModalRunBacktest(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#errorModalRunBacktest" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalRunBacktest").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalRunBacktest" ).show()
}

function displayEditStrategyModal(id) 
{
    let width = (isMobile.any()) ? Math.min(screen.width, 560) : 560;
    let height = (isMobile.any()) ? 720 : 620;
    document.getElementById('pageMask').style.display = "block";
    $( "#editStrategyModal" ).dialog({
        height: height,
        width: width,
        closeOnEscape: true,
        dialogClass: 'whiteBackground',
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });
    $( "#editStrategyModal" ).show()

    document.getElementById('confirmEditStrategyButton').addEventListener('click', function(){ editStrategy(id); });
    document.getElementById('cancelEditStrategyButton').addEventListener('click', hideEditStrategyModal);
}

function hideEditStrategyModal() 
{
    document.getElementById("symbolsEdit").style.display = "none";
    document.getElementById("watchlistEdit").selectedIndex = "0";
    document.getElementById('pageMask').style.display = "none";
    $( "#editStrategyModal" ).dialog('close');
}

function editStrategy(id)
{
    let csrf = document.getElementById("sotong").value;
    let name = document.getElementById("strategyNameEdit").value;
    let description = document.getElementById("descriptionEdit").value;
    let watchlist = document.getElementById("watchlistEdit").value;
    let symbols = document.getElementById("symbolsEdit").value;
    let timeframe = document.getElementById("timeframeEdit").value;
    let maxAllocation = document.getElementById("maxAllocationEdit").value;
    let maxConcurrentTrades = document.getElementById("maxConcurrentTradesEdit").value;
    let positionWeight = document.getElementById("positionWeightEdit").value;
    let startTime = document.getElementById("startTimeEdit").value;
    let endTime = document.getElementById("endTimeEdit").value;
    let direction = document.getElementById("directionEdit").value;

    let temp = JSON.stringify({
        csrf: csrf,
        strategyID: id,
        strategyName: name,
        description: description,
        watchlist: watchlist,
        symbols: symbols,
        timeframe: timeframe,
        maxAllocation: maxAllocation,
        maxConcurrentTrades,
        positionWeight: positionWeight,
        startTime: startTime,
        endTime: endTime,
        direction: direction
    });

    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        if (response.response == "Success")
        {
            displaySuccessModalEditStrategy();
            return;
        }
        else
        {
            displayErrorModalEditStrategy(response.response);
            return;
        }
    };

    xhttpRep.open("POST", '/edit_strategy', true);
    xhttpRep.withCredentials = true;
    xhttpRep.setRequestHeader("Content-Type", "application/json");
    xhttpRep.send(temp);

    hideEditStrategyModal();
}

function hideSuccessModalEditStrategy() 
{
    $( "#successModalEditStrategy" ).dialog('close');
}

function displaySuccessModalEditStrategy() 
{
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 260;
    var Y = window.pageYOffset;
    $( "#successModalEditStrategy" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'successModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#successModalEditStrategy").dialog("close");
                window.location.href = '/profile';
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#successModalEditStrategy" ).show()
}

function hideErrorModalEditStrategy() 
{
    $( "#errorModalEditStrategy" ).dialog('close');
}

function displayErrorModalEditStrategy(message) 
{
    document.getElementById("errorText").innerText = message;
    let position = { my: "right top", at: "right-100 top", of: window };
    if (isMobile.any())
    {
        position = { my: "bottom", at: "bottom", of: window }
    }
    let width = (isMobile.any()) ? screen.width : 300;
    var Y = window.pageYOffset;
    $( "#errorModalEditStrategy" ).dialog({
        height: 55,
        width: width,
        closeOnEscape: true,
        dialogClass: 'errorModalContent',
        position: position,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            setTimeout(function () {
                $("#errorModalEditStrategy").dialog("close");
            }, 2000);
            if (!isMobile.any())
            {
                $(this).parent().css({'top': Y+100});
            }
        }
    });
    $( "#errorModalEditStrategy" ).show()
}

document.getElementById("watchlistEdit").addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    
    if (selectedValue == "custom")
    {
        document.getElementById("symbolsEdit").style.display = "block";
    }
    else
    {
        document.getElementById("symbolsEdit").style.display = "none";
    }
});

function populateEditStrategyModal(id)
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = async function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);
        const strategyData = response;

        let symbolOutput = "";

        for (var i = 0; i < strategyData.symbols.length; i+=1)
        {
            symbolOutput += strategyData.symbols[i];

            if (i < strategyData.symbols.length - 1)
            {
                symbolOutput += ",";
            }
        }

        let index = "0";

        if (strategyData.watchlist == "morningBreakouts")
        {
            index = "0";
        }
        else if (strategyData.watchlist == "indexETFs")
        {
            index = "1";
        }
        else if (strategyData.watchlist == "FAANG")
        {
            index = "2";
        }
        else if (strategyData.watchlist == "software")
        {
            index = "3";
        }
        else if (strategyData.watchlist == "travel")
        {
            index = "4";
        }
        else if (strategyData.watchlist == "custom")
        {
            index = "5";
            document.getElementById("symbolsEdit").style.display = "block";
        }

        let directionIndex = "0";
        if (strategyData.direction == "long")
        {
            directionIndex = "0";
        }
        else
        {
            directionIndex = "1";
        }

        let positionWeightIndex = "0";
        if (strategyData.distribution == "Equal weights")
        {
            positionWeightIndex = "0";
        }
        else
        {
            positionWeightIndex = "1";
        }

        let timeframeIndex = "0";
        if (strategyData.timeframe == 1)
        {
            timeframeIndex = "0";
        }
        else if (strategyData.timeframe == 5)
        {
            timeframeIndex = "1";
        }
        else if (strategyData.timeframe == 10)
        {
            timeframeIndex = "2";
        }
        else
        {
            timeframeIndex = "3";
        }

        //initialise strategy data div with first strategy
        let name = document.getElementById("strategyNameEdit");
        name.value = strategyData.strategyName;
        let description = document.getElementById("descriptionEdit");
        description.value = strategyData.description;
        let symbol = document.getElementById("symbolsEdit");
        symbol.value = symbolOutput;
        let maxAllocation = document.getElementById("maxAllocationEdit");
        maxAllocation.value = strategyData.maxAllocation
        let maxConcurrentTrades = document.getElementById("maxConcurrentTradesEdit");
        maxConcurrentTrades.value = strategyData.maxConcurrentTrades;
        let start = document.getElementById("startTimeEdit");
        start.value = strategyData.startTime;
        let end = document.getElementById("endTimeEdit");
        end.value = strategyData.endTime;
        let watchlist = document.getElementById("watchlistEdit");
        watchlist.selectedIndex = index;
        let direction = document.getElementById("directionEdit");
        direction.selectedIndex = directionIndex;
        let positionWeight = document.getElementById("positionWeightEdit");
        positionWeight.selectedIndex = positionWeightIndex;
        let timeframe = document.getElementById("timeframeEdit");
        timeframe.selectedIndex = timeframeIndex;

        displayEditStrategyModal(id);
    };

    xhttpRep.open("GET", '/get_strategy_details/' + encodeURIComponent(id), false);
    xhttpRep.send();
}

document.getElementById("strategyNameEdit").addEventListener("input", function() {
    let value = document.getElementById("strategyNameEdit").value;
    let character = value.charAt(value.length - 1);

    if (value.length > 30)
    {
        value = value.slice(0, 30);
    }
    else if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("strategyNameEdit").value = value;    
});

document.getElementById("descriptionEdit").addEventListener("input", function() {
    let value = document.getElementById("descriptionEdit").value;
    let character = value.charAt(value.length - 1);

    if (character == '<' || character == '>' || character == '{' || character == '}' || character == ';' || character == '|' || character == '&' || character == '*' || character == '^' || character == '~' || character == '[' || character == ']')
    {
        value = value.slice(0, value.length - 1);
    }

    document.getElementById("descriptionEdit").value = value;    
});

document.getElementById("symbolsEdit").addEventListener("input", function() {
    let value = document.getElementById("symbolsEdit").value;
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

    document.getElementById("symbolsEdit").value = value;  
});

document.getElementById("maxAllocationEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("maxConcurrentTradesEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("startTimeEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("endTimeEdit").addEventListener("keydown", function() {
    if(event.key==='.')
    {
        event.preventDefault();
    }
});

document.getElementById("maxAllocationEdit").addEventListener("input", function() {
    let value = document.getElementById("maxAllocationEdit").value;

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

    document.getElementById("maxAllocationEdit").value = allocationValue;    
});

document.getElementById("maxConcurrentTradesEdit").addEventListener("input", function() {
    let value = document.getElementById("maxConcurrentTradesEdit").value;

    if (value.length > 1)
    {
        value = value.slice(0, 1);
    }

    if (value.length == 0)
    {
        value = "";
    }

    let newValue = (value == "") ? 0 : parseInt(value);

    document.getElementById("maxConcurrentTradesEdit").value = (value == "") ? value : newValue;    
});

document.getElementById("startTimeEdit").addEventListener("input", function() {
    let value = document.getElementById("startTimeEdit").value;

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

    document.getElementById("startTimeEdit").value = newValue;    
});

document.getElementById("endTimeEdit").addEventListener("input", function() {
    let value = document.getElementById("endTimeEdit").value;

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

    document.getElementById("endTimeEdit").value = newValue;    
});

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