var GOOGLE;

document.addEventListener("DOMContentLoaded", async function() {
    generateContent();
});

function generateContent()
{
    // Making a GET request for the reports associated with the specific user:
    const xhttpRep = new XMLHttpRequest();
    xhttpRep.onload = function(e) {
        // Handling response from the API for GET reports:
        const response = JSON.parse(xhttpRep.responseText);

        const listings = response.listings;

        let mainDiv = document.getElementById("main");

        for(let i = 0; i < listings.length; i++){
            let div = document.createElement("div");
            div.setAttribute("class", "tradingBotStoreProductInfo");

            let topRow = document.createElement("div");
            topRow.setAttribute("class", "tradingBotStoreProductTopRow");
            let title = document.createElement("div");
            title.setAttribute("class", "tradingBotStoreProductTitle");
            title.innerText = listings[i].strategyName;
            let price = document.createElement("div");
            price.setAttribute("class", "tradingBotStoreProductPrice");
            price.innerText = "Price: " + listings[i].price.toString() + " TGEN";
            topRow.appendChild(title);
            topRow.appendChild(price);

            let bottomRow = document.createElement("div");
            bottomRow.setAttribute("class", "tradingBotStoreProductBottomRow");
            let accuracy = document.createElement("div");
            accuracy.setAttribute("class", "tradingBotStoreProductAccuracy block");
            let accuracyText = document.createElement("a");
            accuracyText.setAttribute("class", "tradingBotStoreProductTopText");
            accuracyText.innerText = "Accuracy";
            let accuracyBR = document.createElement("br");
            let accuracyData = document.createElement("a");
            accuracyData.setAttribute("class", "tradingBotStoreProductBottomText");
            accuracyData.innerText = listings[i].accuracy.toString() + "%";
            accuracy.appendChild(accuracyText);
            accuracy.appendChild(accuracyBR);
            accuracy.appendChild(accuracyData);
            let frequency = document.createElement("div");
            frequency.setAttribute("class", "tradingBotStoreProductFrequency block");
            let frequencyText = document.createElement("a");
            frequencyText.setAttribute("class", "tradingBotStoreProductTopText");
            frequencyText.innerText = "Trade Frequency";
            let frequencyBR = document.createElement("br");
            let frequencyData = document.createElement("a");
            frequencyData.setAttribute("class", "tradingBotStoreProductBottomText");
            frequencyData.innerText = listings[i].tradeFrequency.toFixed(3) + "/day";
            frequency.appendChild(frequencyText);
            frequency.appendChild(frequencyBR);
            frequency.appendChild(frequencyData);
            let sharpeRatio = document.createElement("div");
            sharpeRatio.setAttribute("class", "tradingBotStoreProductAccuracy block");
            let sharpeRatioText = document.createElement("a");
            sharpeRatioText.setAttribute("class", "tradingBotStoreProductTopText");
            sharpeRatioText.innerText = "Sharpe Ratio";
            let sharpeRatioBR = document.createElement("br");
            let sharpeRatioData = document.createElement("a");
            sharpeRatioData.setAttribute("class", "tradingBotStoreProductBottomText");
            sharpeRatioData.innerText = listings[i].sharpeRatio.toFixed(3);
            sharpeRatio.appendChild(sharpeRatioText);
            sharpeRatio.appendChild(sharpeRatioBR);
            sharpeRatio.appendChild(sharpeRatioData);
            let assetsTraded = document.createElement("div");
            assetsTraded.setAttribute("class", "tradingBotStoreProductAccuracy block");
            let assetsTradedText = document.createElement("a");
            assetsTradedText.setAttribute("class", "tradingBotStoreProductTopText");
            assetsTradedText.innerText = "Assets Traded";
            let assetsTradedBR = document.createElement("br");
            let assetsTradedData = document.createElement("a");
            assetsTradedData.setAttribute("class", "tradingBotStoreProductBottomText");
            assetsTradedData.innerText = listings[i].assetsTraded.toString();
            assetsTraded.appendChild(assetsTradedText);
            assetsTraded.appendChild(assetsTradedBR);
            assetsTraded.appendChild(assetsTradedData);
            let open = document.createElement("div");
            open.setAttribute("class", "tradingBotStoreProductButton");
            let button = document.createElement("button");
            button.setAttribute("type", "button");
            button.innerText = "Open";
            let ID = listings[i].strategyID;
            button.addEventListener('click', function(){ window.location.href = '/product_info/' + ID; });
            open.appendChild(button);

            bottomRow.appendChild(accuracy);
            bottomRow.appendChild(frequency);
            bottomRow.appendChild(sharpeRatio);
            bottomRow.appendChild(assetsTraded);
            bottomRow.appendChild(open);

            div.appendChild(topRow);
            div.appendChild(bottomRow);

            mainDiv.appendChild(div);
        }

        document.getElementById("loadingPage").remove();
        document.getElementById("sotong").style.display = "block";
    };
    xhttpRep.open("GET", '/get_store_listings', true);
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