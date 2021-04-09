var express = require('express');
const path = require('path');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var qs = require('qs');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const axios = require('axios');

//landing page if checkout was successful
router.get('/success/:orderID', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let orderID = req.params.orderID;
  
  res.render('success', { 
    loginStatus: loggedIn,
    username: username,
    orderID: orderID
  });
});

// Getting Started page
router.get('/get_started', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  res.render('get_started', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Open Beta page
router.get('/open_beta', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  res.render('open_beta', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Token page
router.get('/token', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  res.render('token', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Temp landing page after clicking on verification link
router.get('/verified', function (req, res, next) {
  
  console.log("landing page");
  return res.redirect("/");
});

// White Paper page
router.get('/white_paper', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  res.render('white_paper', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Updates Page
router.get('/updates', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  res.render('updates', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Build Strategy Page
router.get('/build_strategy', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let token = req.session.csrf;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (loggedIn)
  {
    res.render('build_strategy', { 
      loginStatus: loggedIn,
      username: username,
      token: token,
      credits: credits
    });
  }
  else
  {
    res.redirect("/login");
  }
  
});

// Store Page
router.get('/store', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  res.render('store', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Home Page
router.get('/', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  res.render('index', { 
    loginStatus: loggedIn,
    username: username,
  });
});

// About Page
router.get('/about', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  res.render('about', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Contact Page
router.get('/contact', function (req, res, next) {

  if (req.session.csrf === undefined)
  {
    req.session.csrf = crypto.randomBytes(100).toString('base64');
  }
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  
  res.render('contact', { 
    loginStatus: loggedIn,
    username: username,
    token: req.session.csrf
  });
});

// Checkout Page
router.get('/checkout/:id', function (req, res, next) {

  let strategyID = req.params.id;

  if (typeof strategyID !== "string")
  {
    return res.status(500).send("No strategy ID");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(500).send("Invalid strategy ID");
    }
  }
  
  let temp2 = JSON.stringify({strategyID: strategyID});

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.status(500).send("Error");
    }

    var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
    var username = loggedIn ? req.session.user : "";

    let strategyName = response.strategyName;
    let salePrice = response.salePrice;
    let description = response.description;
    let developedOn = response.developedOn;
    let alpha = response.alpha;

    if (req.session.csrf === undefined && loggedIn == false)
    {
      req.session.csrf = crypto.randomBytes(100).toString('base64');
    }

    res.render('checkout', { 
      strategyName: strategyName,
      description: description,
      developedOn: developedOn,
      alpha: alpha.toFixed(3),
      salePrice: salePrice,
      strategyID: strategyID,
      token: req.session.csrf
    });
  }
  xhttpRep.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getStrategyInfo', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

// Positions Page
router.get('/positions', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let token = req.session.csrf;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (loggedIn)
  {
    res.render('positions', { 
      loginStatus: loggedIn,
      username: username,
      token: token,
      credits: credits
    });
  }
  else
  {
    res.redirect("/login");
  }
  
});

// Marketplace Page
router.get('/marketplace', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (loggedIn)
  {
    res.render('marketplace', { 
      loginStatus: loggedIn,
      username: username,
      credits: credits
    });
  }
  else
  {
    res.redirect("/login");
  }
});

// Notifications Page
router.get('/notifications', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (loggedIn)
  {
    res.render('notifications', { 
      loginStatus: loggedIn,
      username: username,
      credits: credits
    });
  }
  else
  {
    res.redirect("/login");
  }
});

// Privacy Policy Page
router.get('/privacy_policy', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  res.render('privacy_policy', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Settings Page
router.get('/settings', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let temp2 = JSON.stringify({userID: username, token: req.session.token});

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.status(500).send("Error");
    }

    let verifiedEmail = "";
    if (response.verifiedEmail == true)
    {
      verifiedEmail = "True";
    }
    else
    {
      verifiedEmail = "False";
    }

    res.render('settings', { 
      loginStatus: loggedIn,
      username: response.username,
      email: response.email,
      phoneNumber: response.phoneNumber,
      netWorth: response.netWorth.toFixed(4),
      referralCode: response.referralCode,
      savedReferralCode: response.savedReferralCode,
      verifiedEmail: verifiedEmail,
      credits: credits,
      token: req.session.csrf
    });
  }
  xhttpRep.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getSettingsData', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

// Strategies Page
router.get('/strategies', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  res.render('strategies', { 
    loginStatus: loggedIn,
    username: username,
    credits: credits
  });
});

// Terms and Conditions Page
router.get('/terms_and_conditions', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  res.render('terms_and_conditions', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Transactions Page
router.get('/transactions', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (loggedIn)
  {
    res.render('transactions', { 
      loginStatus: loggedIn,
      username: username,
      credits: credits
    });
  }
  else
  {
    res.redirect("/login");
  }
});

// FAQs Page
router.get('/faqs', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  res.render('faqs', { 
    loginStatus: loggedIn,
    username: username
  });
});

// Public profile Page
router.get('/profile/:address', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let token = req.session.csrf;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";
  let address = req.params.address;

  if (loggedIn && typeof address !== "undefined" && address != "")
  {
    res.render('user_profile', { 
      loginStatus: loggedIn,
      username: username,
      token: token,
      credits: credits,
      address: address
    });
  }
  else
  {
    res.redirect("/login");
  }
});

// Default profile Page
router.get('/profile', function (req, res, next) {
  
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  let address = (typeof req.session.address !== "undefined") ? req.session.address : "";

  if (loggedIn && address != "")
  {
    res.redirect("/profile/" + encodeURIComponent(address));
  }
  else
  {
    res.redirect("/login");
  }
});

// Position Info Page
router.get('/position_info/:address', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var address = req.params.address;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let temp2 = JSON.stringify({address: address});

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.render('404', {});
    }

    let dataObject = {
      transactionHistory: response.transactionHistory
    }
    let dataString = JSON.stringify(dataObject);

    res.render('position_info', { 
      loginStatus: loggedIn,
      credits: credits,
      transactionHistory: dataString,
      strategyName: response.strategyName,
      owner: response.owner,
      roi: response.roi,
      entryDate: response.entryDate,
      entryPrice: response.entryPrice.toFixed(4),
      forSale: response.forSale,
      listingPrice: response.listingPrice,
      positionName: response.positionName,
      numberOfShares: response.numberOfShares,
      positionClass: response.positionClass,
      strategyID: response.strategyID,
      userID: response.userID,
      positionID: response.positionID,
      currentMarketValue: response.currentMarketValue.toFixed(4),
      ownerAddress: response.ownerAddress,
      symbol: response.symbol
    });
  }
  xhttpRep.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getPositionInfo', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

// Token Info Page
router.get('/token_info/:id', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? "True" : "";
  var strategyID = req.params.id;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (typeof strategyID !== "string")
  {
    return res.status(500).send("No strategy ID");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(500).send("Invalid strategy ID");
    }
  }

  let temp2 = JSON.stringify({strategyID: strategyID});

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.status(500).send("Error");
    }

    let strategyName = response.strategyName;
    let sharePrice = response.currentMarketValue;
    let sharesPurchased = response.sharesPurchased;
    let deployedOn = response.deployedOn;
    let marketCap = response.marketCap;
    let volume = response.volume;
    let priceChange = response.priceChange;
    let strategySymbol = response.symbol;
    let up = response.up;
    
    let backgroundColor = "#16c784";

    if (up == true)
    {
      backgroundColor = "#16c784";
    }
    else
    {
      backgroundColor = "#ea3943";
    }

    let dataObject2 = {
      shareHistory: response.shareHistory
    }
    let dataString2 = JSON.stringify(dataObject2);

    res.render('token_info', { 
      loginStatus: loggedIn,
      strategyName: strategyName,
      sharePrice: sharePrice.toFixed(4) + " QOIN",
      sharesPurchased: sharesPurchased,
      dataString2: dataString2,
      credits: credits,
      deployedOn: deployedOn,
      marketCap: marketCap.toFixed(4),
      volume: volume,
      priceChange: priceChange,
      symbol: strategySymbol,
      backgroundColor: backgroundColor,
      strategyID: strategyID
    });
  }
  xhttpRep.open("POST", 'https://us-west2-stocks2-301304.cloudfunctions.net/getTokenInfo', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

// Strategy Info Page
router.get('/strategy_info/:id', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? "True" : "";
  var strategyID = req.params.id;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (typeof strategyID !== "string")
  {
    return res.status(500).send("No strategy ID");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(500).send("Invalid strategy ID");
    }
  }

  let temp2 = JSON.stringify({strategyID: strategyID});

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.status(500).send("Error");
    }

    let strategyName = response.strategyName;
    let sharePrice = response.currentMarketValue;
    let tradeFrequency = response.tradeFrequency;
    let sharpeRatio = response.sharpeRatio;
    let assetsTraded = response.assetsTraded;
    let description = response.description;
    let developedOn = response.developedOn;
    let developedBy = response.developedBy;
    let sharesPurchased = response.sharesPurchased;
    let status = response.status;

    let accuracy = response.accuracy;
    let maxDrawdown = response.maxDrawdown;
    let averageWin = response.averageWin;
    let averageLoss = response.averageLoss;
    let totalReturn = response.totalReturn;
    let numberOfTrades = response.numberOfTrades;
    let alpha = response.alpha;

    let address = response.address;

    let dataObject2 = {
      shareHistory: response.shareHistory
    }
    let dataString2 = JSON.stringify(dataObject2);

    let dataObject = {
      availableDates: response.availableDates,
      strategyHistory: response.strategyHistory
    }
    let dataString = JSON.stringify(dataObject);

    res.render('strategy_info', { 
      loginStatus: loggedIn,
      strategyName: strategyName,
      sharePrice: sharePrice.toFixed(4) + " QOIN",
      tradeFrequency: tradeFrequency.toFixed(2) + "/day",
      sharpeRatio: sharpeRatio.toFixed(3),
      assetsTraded: assetsTraded,
      description: description,
      accuracy: accuracy.toFixed(2) + "%",
      maxDrawdown: maxDrawdown.toFixed(2) + "%",
      averageWin: averageWin.toFixed(2) + "%",
      averageLoss: averageLoss.toFixed(2) + "%",
      totalReturn: totalReturn.toFixed(2) + "%",
      numberOfTrades: numberOfTrades,
      developedOn: developedOn,
      developedBy: developedBy,
      sharesPurchased: sharesPurchased,
      alpha: alpha.toFixed(3),
      status: status,
      dataString: dataString,
      dataString2: dataString2,
      credits: credits,
      address: address,
      strategyID: strategyID
    });
  }
  xhttpRep.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getStrategyInfo', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

// Product Info Page
router.get('/product_info/:id', function (req, res, next) {
  var strategyID = req.params.id;

  if (typeof strategyID !== "string")
  {
    return res.status(500).send("No strategy ID");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(500).send("Invalid product ID");
    }
  }

  let temp2 = JSON.stringify({strategyID: strategyID});

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.status(500).send("Error")
    }

    let strategyName = response.strategyName;
    let tradeFrequency = response.tradeFrequency;
    let sharpeRatio = response.sharpeRatio;
    let assetsTraded = response.assetsTraded;
    let description = response.description;
    let developedOn = response.developedOn;
    let developedBy = response.developedBy;
    let salePrice = response.salePrice;

    let accuracy = response.accuracy;
    let maxDrawdown = response.maxDrawdown;
    let averageWin = response.averageWin;
    let averageLoss = response.averageLoss;
    let totalReturn = response.totalReturn;
    let numberOfTrades = response.numberOfTrades;
    let alpha = response.alpha;
    
    let dataObject = {
      availableDates: response.availableDates,
      strategyHistory: response.strategyHistory
    }
    let dataString = JSON.stringify(dataObject);

    res.render('strategy_product_info', { 
      strategyName: strategyName,
      salePrice: "$" + salePrice.toFixed(2),
      tradeFrequency: tradeFrequency.toFixed(2) + "/day",
      sharpeRatio: sharpeRatio.toFixed(3),
      assetsTraded: assetsTraded,
      description: description,
      accuracy: accuracy.toFixed(2) + "%",
      maxDrawdown: maxDrawdown.toFixed(2) + "%",
      averageWin: averageWin.toFixed(2) + "%",
      averageLoss: averageLoss.toFixed(2) + "%",
      totalReturn: totalReturn.toFixed(2) + "%",
      numberOfTrades: numberOfTrades,
      developedOn: developedOn,
      developedBy: developedBy,
      alpha: alpha.toFixed(3),
      strategyID: strategyID,
      dataString: dataString
    });
  }
  xhttpRep.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getProductInfo', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

//Buy Position Page
router.get('/buy_position/:id', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let token = req.session.csrf;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  const positionID = req.params.id;

  if (typeof positionID !== "string")
  {
    return res.status(500).send("No position ID");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < positionID.length; i+=1)
  {
    let character = positionID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(500).send("Invalid position ID");
    }
  }

  let temp2 = JSON.stringify({positionID: positionID});

  const transactionFee = 0.03;

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.status(500).send("Error");
    }

    if (response.ownerID == username)
    {
      return res.redirect("/profile");
    }

    let strategyName = response.strategyName;
    let currentMarketValue = response.currentMarketValue;
    let advertisedPrice = response.advertisedPrice;
    let numberOfShares = response.numberOfShares;
    let description = response.description;
    let owner = response.ownerName;
    let ownerAddress = response.ownerAddress;
    let strategyID = response.strategyID;
    let symbol = response.symbol;

    let price = parseFloat((advertisedPrice * numberOfShares).toFixed(4));
    let fee = parseFloat((transactionFee * price).toFixed(4));
    let totalPrice = (fee + price).toFixed(4);

    res.render('buy_position', { 
      strategyName: strategyName,
      symbol: symbol,
      currentMarketValue: currentMarketValue.toFixed(4),
      advertisedPrice: advertisedPrice.toFixed(4),
      numberOfShares: numberOfShares,
      totalPrice: totalPrice,
      fee: fee.toFixed(4),
      price: price.toFixed(4),
      positionID: positionID,
      description: description,
      token: token,
      credits: credits,
      owner: owner,
      ownerAddress: ownerAddress,
      strategyID: strategyID
    });
  }
  xhttpRep.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getBuyPositionData', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

//Buy New Tokens Page
router.get('/buy_new_tokens/:id', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let token = req.session.csrf;
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  const strategyID = req.params.id;

  if (typeof strategyID !== "string")
  {
    return res.status(500).send("No strategy ID");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(500).send("Error");
    }
  }

  var userID = username;
  let temp2 = JSON.stringify({
    strategyID: strategyID,
    userID: userID
  });

  const xhttpRep = new XMLHttpRequest();
  xhttpRep.onload = function(e) {
    const response = JSON.parse(xhttpRep.responseText);

    if (response.hasErrors == true)
    {
      return res.status(500).send("Error");
    }

    let strategyName = response.strategyName;
    let currentMarketValue = parseFloat(response.currentMarketValue.toFixed(4));
    let savedReferralCode = response.savedReferralCode;
    let description = response.description;
    let symbol = response.symbol;

    res.render('buy_new_shares', { 
      strategyName: strategyName,
      currentMarketValue: currentMarketValue,
      savedReferralCode: savedReferralCode,
      strategyID: strategyID,
      userID: userID,
      description: description,
      token: token,
      credits: credits,
      symbol: symbol
    });
  }
  xhttpRep.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getBuyNewSharesData', true);
  xhttpRep.withCredentials = true;
  xhttpRep.setRequestHeader("Content-Type", "application/json");
  xhttpRep.send(temp2);
});

// Send email from contact form
router.post('/contact', 
[
check("firstName").notEmpty().withMessage("Please enter your first name."),
check("firstName").isAlpha().withMessage("Please enter a valid first name."),
check("lastName").notEmpty().withMessage("Please enter your last name."),
check("lastName").isAlpha().withMessage("Please enter a valid last name."),
check("email").notEmpty().withMessage("Please enter your email."),
check("email").isEmail().withMessage("Please enter a valid email."),
check("subject").notEmpty().withMessage("Please enter a subject."),
check("message").notEmpty().withMessage("Please enter a message."),
check("csrf").custom((value, { req }) => {
  if(!value) {
      throw new Error ("Bad token.");
  }

  if (value != req.session.csrf)
  {
    throw new Error ("Bad token.");
  }

  return true;
})
],
async (req, res) => {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    var err = errors.array()[0].msg;
    var tokenResult = (err != "Bad token.") ? req.session.csrf : "";
    return res.render('contact', {
      loginStatus: loggedIn,
      username: username,
      message: err,
      token: tokenResult,
      previousFirstName: req.body.firstName,
      previousLastName: req.body.lastName,
      previousMessage: req.body.message,
      previousSubject: req.body.subject,
      previousEmail: req.body.email
    });
  }

  const allowedMessageCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz ()!?-+$%.,/;:';
  let message = req.body.message;
  let foundMessage = false;
  for (var i = 0; i < message.length; i+=1)
  {
    let character = message.charAt(i);
    for (var j = 0; j < allowedMessageCharacters.length; j+=1)
    {
        if (allowedMessageCharacters.charAt(j) == character)
        {
            foundMessage = true;
            break;
        }
    }
    if (foundMessage == false || message.length > 300)
    {
      return res.render('contact', {
        loginStatus: loggedIn,
        username: username,
        message: "The message contains invalid characters.",
        token: tokenResult,
        previousFirstName: req.body.firstName,
        previousLastName: req.body.lastName,
        previousMessage: req.body.message,
        previousSubject: req.body.subject,
        previousEmail: req.body.email
      });
    }
  }

  const allowedFirstNameCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz -';
  let firstName = req.body.firstName;
  let foundFirstName = false;
  for (var i = 0; i < firstName.length; i+=1)
  {
    let character = firstName.charAt(i);
    for (var j = 0; j < allowedFirstNameCharacters.length; j+=1)
    {
        if (allowedFirstNameCharacters.charAt(j) == character)
        {
            foundFirstName = true;
            break;
        }
    }
    if (foundFirstName == false || firstName.length > 25)
    {
      return res.render('contact', {
        loginStatus: loggedIn,
        username: username,
        message: "Please enter a valid first name.",
        token: tokenResult,
        previousFirstName: req.body.firstName,
        previousLastName: req.body.lastName,
        previousMessage: req.body.message,
        previousSubject: req.body.subject,
        previousEmail: req.body.email
      });
    }
  }

  const allowedLastNameCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz -';
  let lastName = req.body.lastName;
  let foundLastName = false;
  for (var i = 0; i < lastName.length; i+=1)
  {
    let character = lastName.charAt(i);
    for (var j = 0; j < allowedLastNameCharacters.length; j+=1)
    {
        if (allowedLastNameCharacters.charAt(j) == character)
        {
            foundLastName = true;
            break;
        }
    }
    if (foundLastName == false || lastName.length > 25)
    {
      return res.render('contact', {
        loginStatus: loggedIn,
        username: username,
        message: "Please enter a valid last name.",
        token: tokenResult,
        previousFirstName: req.body.firstName,
        previousLastName: req.body.lastName,
        previousMessage: req.body.message,
        previousSubject: req.body.subject,
        previousEmail: req.body.email
      });
    }
  }

  const allowedEmailCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz-.@';
  let email = req.body.email;
  let foundEmail = false;
  for (var i = 0; i < email.length; i+=1)
  {
    let character = email.charAt(i);
    for (var j = 0; j < allowedEmailCharacters.length; j+=1)
    {
        if (allowedEmailCharacters.charAt(j) == character)
        {
            foundEmail = true;
            break;
        }
    }
    if (foundEmail == false || email.length > 35)
    {
      return res.render('contact', {
        loginStatus: loggedIn,
        username: username,
        message: "Please enter a valid email address.",
        token: tokenResult,
        previousFirstName: req.body.firstName,
        previousLastName: req.body.lastName,
        previousMessage: req.body.message,
        previousSubject: req.body.subject,
        previousEmail: req.body.email
      });
    }
  }

  const allowedSubjectCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz -:,;?!()$';
  let subject = req.body.subject;
  let foundSubject = false;
  for (var i = 0; i < subject.length; i+=1)
  {
    let character = subject.charAt(i);
    for (var j = 0; j < allowedSubjectCharacters.length; j+=1)
    {
        if (allowedSubjectCharacters.charAt(j) == character)
        {
            foundSubject = true;
            break;
        }
    }
    if (foundSubject == false || subject.length > 40)
    {
      return res.render('contact', {
        loginStatus: loggedIn,
        username: username,
        message: "Subject contains invalid characters.",
        token: tokenResult,
        previousFirstName: req.body.firstName,
        previousLastName: req.body.lastName,
        previousMessage: req.body.message,
        previousSubject: req.body.subject,
        previousEmail: req.body.email
      });
    }
  }
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = JSON.parse(xhttp.responseText);

    if (response.hasErrors == true)
    {
      return res.render('contact', {
        loginStatus: loggedIn,
        username: username,
        message: response.errorMessage,
        token: tokenResult,
        previousFirstName: req.body.firstName,
        previousLastName: req.body.lastName,
        previousMessage: req.body.message,
        previousSubject: req.body.subject,
        previousEmail: req.body.email,
        hasErrors: "true"
      });
    }
    else
    {
      return res.render('contact', {
        loginStatus: loggedIn,
        username: username,
        token: tokenResult,
        hasErrors: "false"
      });
    }
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/sendEmail', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(qs.stringify(req.body));
});

// Buy new shares using account balance
router.post('/buy_new_shares_with_account_balance', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let userID = username;
  let strategyID = req.body.strategyID;
  let numberOfShares = req.body.numberOfShares;
  let csrf = req.body.csrf;

  if (typeof strategyID !== "string")
  {
    return res.status(500).send("No strategy ID");
  }

  if (typeof numberOfShares !== "number")
  {
    return res.status(500).send("Error");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  //check if numberOfShares is a number
  if ((+numberOfShares === +numberOfShares) && (typeof numberOfShares !== "undefined"))
  {
    numberOfShares = parseInt(numberOfShares);

    if (numberOfShares < 1 || numberOfShares > 1000)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }
  else
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    strategyID: strategyID,
    userID: userID,
    numberOfShares: numberOfShares,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    let response = xhttp.responseText;

    if (response.charAt(0) == "0")
    {
      let temp = parseFloat(response);
      req.session.credits = parseFloat(temp);
      response = "Success";
    }

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/buyNewSharesWithAccountBalance', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Buy position using account balance
router.post('/buy_position_with_account_balance', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let userID = username; 
  let positionID = req.body.positionID;
  let csrf = req.body.csrf;

  if (typeof positionID !== "string")
  {
    return res.status(500).send("No position ID");
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < positionID.length; i+=1)
  {
    let character = positionID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  let temp2 = JSON.stringify({
    positionID: positionID,
    userID: userID,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    if (response.charAt(0) == "0")
    {
      let temp = parseFloat(response);
      req.session.credits = parseFloat(temp);
      response = "Success";
    }

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/buyPositionWithAccountBalance', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Cancel listing
router.post('/cancel_listing', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let positionID = req.body.positionID;
  let csrf = req.body.csrf;

  if (typeof positionID !== "string")
  {
    return res.status(500).send("No position ID");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < positionID.length; i+=1)
  {
    let character = positionID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    positionID: positionID,
    userID: username,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/cancelListing', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Edit listing
router.post('/edit_listing', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let positionID = req.body.positionID;
  let price = req.body.price;
  let csrf = req.body.csrf;

  if (typeof positionID !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  if (typeof price !== "number")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  if (price < 0.01 || price > 9999.99)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < positionID.length; i+=1)
  {
    let character = positionID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    positionID: positionID,
    price: price,
    userID: username,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/editListing', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Edit username
router.post('/edit_username', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let userID = username;
  let newUsername = req.body.newUsername;
  let csrf = req.body.csrf;

  if (typeof newUsername !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz !@#$%()';
  let found = false;
  for (var i = 0; i < newUsername.length; i+=1)
  {
    let character = newUsername.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    userID: userID,
    newUsername: newUsername,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/editUsername', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Edit phone number
router.post('/edit_phone_number', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let userID = username;
  let newPhoneNumber = req.body.newPhoneNumber;
  let csrf = req.body.csrf;

  if (typeof newPhoneNumber !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = '1234567890';
  let found = false;
  for (var i = 0; i < newPhoneNumber.length; i+=1)
  {
    let character = newPhoneNumber.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if ((found == false) || (newPhoneNumber.length != 10))
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    userID: userID,
    newPhoneNumber: newPhoneNumber,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/editPhoneNumber', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Edit saved referral code
router.post('/edit_saved_referral_code', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let userID = username;
  let newSavedReferralCode = req.body.newSavedReferralCode;
  let csrf = req.body.csrf;

  if (typeof newSavedReferralCode !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let found = false;
  for (var i = 0; i < newSavedReferralCode.length; i+=1)
  {
    let character = newSavedReferralCode.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    userID: userID,
    newSavedReferralCode: newSavedReferralCode,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/editSavedReferralCode', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Sell position
router.post('/sell_position', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let positionID = req.body.positionID;
  let price = req.body.price;
  let csrf = req.body.csrf;

  if (typeof positionID !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  if (typeof price !== "number")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  if (price < 0.01 || price > 9999.99)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < positionID.length; i+=1)
  {
    let character = positionID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    positionID: positionID,
    price: price,
    userID: username,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/sellPosition', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Sell strategy
router.post('/sell_strategy', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let strategyID = req.body.strategyID;
  let csrf = req.body.csrf;
  let price = req.body.price;

  if (typeof strategyID !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  if (typeof price !== "number")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  if (price < 0.01 || price > 9999.99)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    strategyID: strategyID,
    price: price,
    userID: username,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    if (response == "Success")
    {
      req.session.credits = req.session.credits - 1;
    }

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/sellStrategy', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Delete strategy
router.post('/delete_strategy', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let strategyID = req.body.strategyID;
  let csrf = req.body.csrf;

  if (typeof strategyID !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    strategyID: strategyID,
    userID: username,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/deleteStrategy', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Start backtest
router.post('/start_backtest', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let strategyID = req.body.strategyID;
  let csrf = req.body.csrf;

  if (typeof strategyID !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  let found = false;
  for (var i = 0; i < strategyID.length; i+=1)
  {
    let character = strategyID.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Error",
      });
    }
  }

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    strategyID: strategyID,
    userID: username
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", 'https://backtest-dot-stocks2-301304.uc.r.appspot.com/backtest/run_backtest', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);

  return res.status(200).json({
    response: "Success",
  });
});

// Route to user profile after logging in 
router.get('/ai-pee-ai-chee-ai-tua-liap-nee/:authID', async function (req, res, next) {
  const auth0ID = req.params.authID;
  const sessionID = req.session.id;

  if (typeof auth0ID !== "string")
  {
    return res.status(200).json({
      response: "Error",
    });
  }
 
  //clear all sessions associated with the user
  await req.sessionStore.all((error, sessions) => {
    if (sessions)
    {
      let sessionsToDelete = [];
      for (const [key, value] of Object.entries(sessions))
      {
        if (value.auth0ID == auth0ID && key != sessionID)
        {
          sessionsToDelete.push(key);
        }
      }

      for (let j = 0; j < sessionsToDelete.length; j+=1)
      {
        req.sessionStore.destroy(sessionsToDelete[j], function (err, dat) {               
        }); 
      }
    }
  });

  if (req.session.csrf === undefined)
  {
    req.session.csrf = crypto.randomBytes(100).toString('base64');
  }

  if (req.session.token === undefined)
  {
    req.session.token = crypto.randomBytes(100).toString('base64');
  }

  let temp2 = JSON.stringify({
    token: req.session.token,
    auth0ID: auth0ID,
    length: req.session.token.length
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = JSON.parse(xhttp.responseText);

    if (response.response == "Success")
    {
      if (response.token == req.session.token)
      {
        req.session.user = response.userID;
        req.session.credits = response.credits;
        req.session.address = response.address
        return res.redirect("/profile");
      }
      else
      {
        console.log("tokens don't match");
        return res.redirect("/permission_denied");
      }
    }
    else
    {
      return res.redirect("/permission_denied");
    }
    
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/setToken', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);

});

// Create strategy
router.post('/build_strategy',
[
  check("strategyName").notEmpty().withMessage("Please enter a name."),
  check("description").notEmpty().withMessage("Please enter a description."),
  check("maxAllocation").isNumeric().withMessage("Please enter a number between 1 and 100 for max allocation."),
  check("maxAllocation").custom((value, { req }) => {
    if(value < 1 || value > 100) {
        throw new Error ("Please enter a number between 1 and 100 for max allocation.");
    }
    return true;
  }),
  check("maxConcurrentTrades").isNumeric().withMessage("Please enter a number greater than 0 for max concurrent trades."),
  check("maxConcurrentTrades").custom((value, { req }) => {
    if(value < 1) {
        throw new Error ("Please enter a number greater than 0 for max concurrent trades.");
    }
    return true;
  }),
  check("startTime").isNumeric().withMessage("Please enter a number between 0 and 389 for start time."),
  check("startTime").custom((value, { req }) => {
    if(value < 0 || value > 389) {
        throw new Error ("Please enter a number between 0 and 389 for start time");
    }
    return true;
  }),
  check("endTime").isNumeric().withMessage("Please enter a number between 0 and 389 for end time."),
  check("endTime").custom((value, { req }) => {
    if(value < 0 || value > 389) {
        throw new Error ("Please enter a number between 0 and 389 for end time");
    }
    return true;
  }),
  check("endTime").custom((value, { req }) => {
    if(389 - value <= req.body.startTime) {
        throw new Error ("Please make sure the end time comes after start time.");
    }
    return true;
  }),
  check("csrf").custom((value, { req }) => {
    if(!value) {
        throw new Error ("Bad token.");
    }
  
    if (value != req.session.csrf)
    {
      throw new Error ("Bad token.");
    }
  
    return true;
  })
]
, async (req, res) => {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";
  let credits = (typeof req.session.credits !== "undefined") ? req.session.credits.toFixed(4) + " QOIN" : "0.0000 QOIN";

  let output = req.body;
  output.userID = username;
  output.token = req.session.token;

  let temp2 = JSON.stringify(output);

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  if (typeof req.body.list_of_entry_conditions !== "string")
  {
    return res.status(500).send("Invalid entry condition list");
  }

  if (typeof req.body.list_of_exit_conditions !== "string")
  {
    return res.status(500).send("Invalid condition list");
  }

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    var err = errors.array()[0].msg;
    var tokenResult = (err != "Bad token.") ? req.session.csrf : "";
    return res.render('build_strategy', {
      message: err,
      loginStatus: loggedIn,
      username: username,
      strategyName: req.body.strategyName,
      description: req.body.description,
      watchlist: req.body.watchlist,
      timeframe: req.body.timeframe,
      maxAllocation: req.body.maxAllocation,
      maxConcurrentTrades: req.body.maxConcurrentTrades,
      customStockList: req.body.symbols,
      start: req.body.startTime,
      end: req.body.endTime,
      listOfEntryConditions: req.body.list_of_entry_conditions,
      listOfExitConditions: req.body.list_of_exit_conditions,
      token: tokenResult,
      credits: credits
    });
  }

  if (req.body.strategyName.length > 30)
  {
    return res.render('build_strategy', {
      message: "Strategy name must be shorter than 30 characters",
      loginStatus: loggedIn,
      username: username,
      strategyName: req.body.strategyName,
      description: req.body.description,
      watchlist: req.body.watchlist,
      timeframe: req.body.timeframe,
      maxAllocation: req.body.maxAllocation,
      maxConcurrentTrades: req.body.maxConcurrentTrades,
      customStockList: req.body.symbols,
      start: req.body.startTime,
      end: req.body.endTime,
      listOfEntryConditions: req.body.list_of_entry_conditions,
      listOfExitConditions: req.body.list_of_exit_conditions,
      token: req.session.csrf,
      credits: credits
    });
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz !@#$%()';
  let found = false;
  for (var i = 0; i < req.body.strategyName.length; i+=1)
  {
    let character = req.body.strategyName.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.render('build_strategy', {
        message: "Strategy name contains invalid characters.",
        loginStatus: loggedIn,
        username: username,
        strategyName: req.body.strategyName,
        description: req.body.description,
        watchlist: req.body.watchlist,
        timeframe: req.body.timeframe,
        maxAllocation: req.body.maxAllocation,
        maxConcurrentTrades: req.body.maxConcurrentTrades,
        customStockList: req.body.symbols,
        start: req.body.startTime,
        end: req.body.endTime,
        listOfEntryConditions: req.body.list_of_entry_conditions,
        listOfExitConditions: req.body.list_of_exit_conditions,
        token: req.session.csrf,
        credits: credits
      });
    }
  }

  if (typeof req.body.description !== "string")
  {
    return res.render('build_strategy', {
      message: "Please enter a valid description.",
      loginStatus: loggedIn,
      username: username,
      strategyName: req.body.strategyName,
      description: req.body.description,
      watchlist: req.body.watchlist,
      timeframe: req.body.timeframe,
      maxAllocation: req.body.maxAllocation,
      maxConcurrentTrades: req.body.maxConcurrentTrades,
      customStockList: req.body.symbols,
      start: req.body.startTime,
      end: req.body.endTime,
      listOfEntryConditions: req.body.list_of_entry_conditions,
      listOfExitConditions: req.body.list_of_exit_conditions,
      token: req.session.csrf,
      credits: credits
    });
  }

  let foundDescription = false;
  for (var i = 0; i < req.body.description.length; i+=1)
  {
    let character = req.body.description.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            foundDescription = true;
            break;
        }
    }
    if (foundDescription == false)
    {
      return res.render('build_strategy', {
        message: "Description contains invalid characters.",
        loginStatus: loggedIn,
        username: username,
        strategyName: req.body.strategyName,
        description: req.body.description,
        watchlist: req.body.watchlist,
        timeframe: req.body.timeframe,
        maxAllocation: req.body.maxAllocation,
        maxConcurrentTrades: req.body.maxConcurrentTrades,
        customStockList: req.body.symbols,
        start: req.body.startTime,
        end: req.body.endTime,
        listOfEntryConditions: req.body.list_of_entry_conditions,
        listOfExitConditions: req.body.list_of_exit_conditions,
        token: req.session.csrf,
        credits: credits
      });
    }
  }

  try 
  {
      var cloud = axios.default.create({});
      let url = "https://us-central1-stocks2-301304.cloudfunctions.net/checkStrategyName";
      let res2 = await cloud.post(url, { strategyName: req.body.strategyName });
      let message = res2.data.message;

      if (message == "Found")
      {
        return res.render('build_strategy', {
          message: "Strategy name already exists.",
          loginStatus: loggedIn,
          username: username,
          strategyName: req.body.strategyName,
          description: req.body.description,
          watchlist: req.body.watchlist,
          timeframe: req.body.timeframe,
          maxAllocation: req.body.maxAllocation,
          maxConcurrentTrades: req.body.maxConcurrentTrades,
          customStockList: req.body.symbols,
          start: req.body.startTime,
          end: req.body.endTime,
          listOfEntryConditions: req.body.list_of_entry_conditions,
          listOfExitConditions: req.body.list_of_exit_conditions,
          token: req.session.csrf,
          credits: credits
        });
      }
      else if (message == "Error")
      {
        return res.render('build_strategy', {
          status: "Error",
          loginStatus: loggedIn,
          username: username,
          strategyName: req.body.strategyName,
          description: req.body.description,
          watchlist: req.body.watchlist,
          timeframe: req.body.timeframe,
          maxAllocation: req.body.maxAllocation,
          maxConcurrentTrades: req.body.maxConcurrentTrades,
          customStockList: req.body.symbols,
          start: req.body.startTime,
          end: req.body.endTime,
          listOfEntryConditions: req.body.list_of_entry_conditions,
          listOfExitConditions: req.body.list_of_exit_conditions,
          positionWeight: req.body.positionWeight,
          token: req.session.csrf
        });
      }
  } 
  catch (err) 
  {
    return res.render('build_strategy', {
      status: "Error",
      loginStatus: loggedIn,
      username: username,
      strategyName: req.body.strategyName,
      description: req.body.description,
      watchlist: req.body.watchlist,
      timeframe: req.body.timeframe,
      maxAllocation: req.body.maxAllocation,
      maxConcurrentTrades: req.body.maxConcurrentTrades,
      customStockList: req.body.symbols,
      start: req.body.startTime,
      end: req.body.endTime,
      listOfEntryConditions: req.body.list_of_entry_conditions,
      listOfExitConditions: req.body.list_of_exit_conditions,
      positionWeight: req.body.positionWeight,
      token: req.session.csrf,
      credits: credits
    });
  }

  //Check if no entry conditions were provided
  if (req.body.list_of_entry_conditions == "")
  {
    return res.render('build_strategy', {
      message: "Please add at least one entry condition.",
      loginStatus: loggedIn,
      username: username,
      strategyName: req.body.strategyName,
      description: req.body.description,
      watchlist: req.body.watchlist,
      timeframe: req.body.timeframe,
      maxAllocation: req.body.maxAllocation,
      maxConcurrentTrades: req.body.maxConcurrentTrades,
      customStockList: req.body.symbols,
      start: req.body.startTime,
      end: req.body.endTime,
      listOfEntryConditions: req.body.list_of_entry_conditions,
      listOfExitConditions: req.body.list_of_exit_conditions,
      token: req.session.csrf,
      credits: credits
    });
  }

  //Check if no exit conditions were provided
  if (req.body.list_of_exit_conditions == "")
  {
    return res.render('build_strategy', {
      message: "Please add at least one exit condition.",
      loginStatus: loggedIn,
      username: username,
      strategyName: req.body.strategyName,
      desription: req.body.description,
      watchlist: req.body.watchlist,
      timeframe: req.body.timeframe,
      maxAllocation: req.body.maxAllocation,
      maxConcurrentTrades: req.body.maxConcurrentTrades,
      customStockList: req.body.symbols,
      start: req.body.startTime,
      end: req.body.endTime,
      listOfEntryConditions: req.body.list_of_entry_conditions,
      listOfExitConditions: req.body.list_of_exit_conditions,
      token: req.session.csrf,
      credits: credits
    });
  }

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;
    if (response == "Success")
    {
      return res.render('build_strategy', {
        status: "Success",
        loginStatus: loggedIn,
        username: username,
        strategyName: req.body.strategyName,
        description: req.body.description,
        watchlist: req.body.watchlist,
        timeframe: req.body.timeframe,
        maxAllocation: req.body.maxAllocation,
        maxConcurrentTrades: req.body.maxConcurrentTrades,
        customStockList: req.body.symbols,
        start: req.body.startTime,
        end: req.body.endTime,
        listOfEntryConditions: req.body.list_of_entry_conditions,
        listOfExitConditions: req.body.list_of_exit_conditions,
        positionWeight: req.body.positionWeight,
        token: req.session.csrf,
        credits: credits
      });
    }
    else if (response == "Reached limit of 10 strategies")
    {
      return res.render('build_strategy', {
        status: "Error",
        initialErrorMessage: "Reached limit of 10 strategies",
        loginStatus: loggedIn,
        username: username,
        strategyName: req.body.strategyName,
        description: req.body.description,
        watchlist: req.body.watchlist,
        timeframe: req.body.timeframe,
        maxAllocation: req.body.maxAllocation,
        maxConcurrentTrades: req.body.maxConcurrentTrades,
        customStockList: req.body.symbols,
        start: req.body.startTime,
        end: req.body.endTime,
        listOfEntryConditions: req.body.list_of_entry_conditions,
        listOfExitConditions: req.body.list_of_exit_conditions,
        positionWeight: req.body.positionWeight,
        token: req.session.csrf,
        credits: credits
      });
    }
    else
    {
      return res.render('build_strategy', {
        status: "Error",
        initialErrorMessage: "Error when building strategy",
        loginStatus: loggedIn,
        username: username,
        strategyName: req.body.strategyName,
        description: req.body.description,
        watchlist: req.body.watchlist,
        timeframe: req.body.timeframe,
        maxAllocation: req.body.maxAllocation,
        maxConcurrentTrades: req.body.maxConcurrentTrades,
        customStockList: req.body.symbols,
        start: req.body.startTime,
        end: req.body.endTime,
        listOfEntryConditions: req.body.list_of_entry_conditions,
        listOfExitConditions: req.body.list_of_exit_conditions,
        positionWeight: req.body.positionWeight,
        token: req.session.csrf,
        credits: credits
      });
    }
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/buildStrategy', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Add credits
router.post('/add_credits', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let numberOfCredits = req.body.numberOfCredits;
  let csrf = req.body.csrf;

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    numberOfCredits: numberOfCredits,
    userID: username,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    if (response == "Success")
    {
      console.log("added credits to session");
      req.session.credits = req.session.credits + parseFloat(numberOfCredits);
    }

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/addCredits', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Withdraw credits
router.post('/withdraw_credits', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  let amountToWithdraw = req.body.amountToWithdraw;
  let csrf = req.body.csrf;

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    amountToWithdraw: amountToWithdraw,
    userID: username,
    token: req.session.token
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    if (response == "Success")
    {
      console.log("withdrew credits from session");
      req.session.credits = req.session.credits - parseFloat(amountToWithdraw);
    }

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/withdrawCredits', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Process Checkout
router.post('/process_checkout', function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  let price = req.body.price;
  let strategyID = req.body.strategyID;
  let email = req.body.email;
  let csrf = req.body.csrf;

  if (csrf != req.session.csrf)
  {
    return res.status(200).json({
      response: "Error",
    });
  }

  let temp2 = JSON.stringify({
    price: price,
    email: email,
    strategyID: strategyID,
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;

    return res.status(200).json({
      response: response,
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/processCheckout', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

// Edit strategy
router.post('/edit_strategy', async function (req, res, next) {
  var loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  var username = loggedIn ? req.session.user : "";

  let output = req.body;
  output.userID = username;
  output.token = req.session.token;

  let temp2 = JSON.stringify(output);

  if (!loggedIn)
  {
    return res.redirect("/login");
  }

  const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz !@#$%()';
  let found = false;
  for (var i = 0; i < req.body.strategyName.length; i+=1)
  {
    let character = req.body.strategyName.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            found = true;
            break;
        }
    }
    if (found == false)
    {
      return res.status(200).json({
        response: "Strategy name has invalid characters.",
      });
    }
  }

  if (typeof req.body.description !== "string")
  {
    return res.status(200).json({
      response: "An unknown error occurred.",
    });
  }

  let foundDescription = false;
  for (var i = 0; i < req.body.description.length; i+=1)
  {
    let character = req.body.description.charAt(i);
    for (var j = 0; j < allowedCharacters.length; j+=1)
    {
        if (allowedCharacters.charAt(j) == character)
        {
            foundDescription = true;
            break;
        }
    }
    if (foundDescription == false)
    {
      return res.status(200).json({
        response: "Description has invalid characters.",
      });
    }
  }

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = xhttp.responseText;
    if (response == "Success")
    {
      return res.status(200).json({
        response: response,
      });
    }
    else
    {
      return res.status(200).json({
        response: "An unknown error occurred.",
      });
    }
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/editStrategy', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

module.exports = router;