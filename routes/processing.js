var express = require('express');
const path = require('path');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var qs = require('qs');
const axios = require('axios');
var router = express.Router();

// Get transaction data
router.get('/get_transactions', async function (req, res, next) {
    const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
    const userID = loggedIn ? req.session.user : "";
    let transactions = [];
    var cloud = axios.default.create({});
    let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getTransactions';

    if (!loggedIn)
    {
      return res.status(500).json({
        response: "Error",
      });
    }

    try 
    {
        let res2 = await cloud.post(url, { userID: userID, token: req.session.token });
        transactions = res2.data.transactions;

        if (res2.data.hasErrors == true)
        {
          return res.status(500).json({
            response: "Error",
          });
        }
    } 
    catch (err) 
    {
      return res.status(500).json({
        response: "Error",
      });
    }

    res.status(200).json({
      transactions: transactions
    });
});

// Get invested pools data
router.get('/get_invested_pools', async function (req, res, next) {
  const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  const userID = loggedIn ? req.session.user : "";
  let pools = [];
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getInvestedPools';

  if (!loggedIn)
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  try 
  {
      let res2 = await cloud.post(url, { userID: userID });
      pools = res2.data.pools;

      if (typeof positions === "undefined")
        {
          return res.status(500).json({
            response: "Error",
          });
        }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    pools: pools
  });
});

// Get positions data
router.get('/get_positions', async function (req, res, next) {
  const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  const userID = loggedIn ? req.session.user : "";
  let positions = [];
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getPositions';

  if (!loggedIn)
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  try 
  {
      let res2 = await cloud.post(url, { userID: userID });
      positions = res2.data.positions;

      if (typeof positions === "undefined")
        {
          return res.status(500).json({
            response: "Error",
          });
        }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    positions: positions
  });
});

// Get all pool data
router.get('/get_all_pools', async function (req, res, next) {
  let pools = [];
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getAllPools';

  try 
  {
      let res2 = await cloud.post(url, {});
      pools = res2.data.pools;

      if (typeof pools === "undefined")
        {
          return res.status(500).json({
            response: "Error",
          });
        }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    pools: pools
  });
});

// Get all strategy data
router.get('/get_all_strategies', async function (req, res, next) {
  let strategies = [];
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getAllStrategies';

  try 
  {
      let res2 = await cloud.post(url, {});
      strategies = res2.data.strategies;

      if (typeof strategies === "undefined")
        {
          return res.status(500).json({
            response: "Error",
          });
        }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    strategies: strategies
  });
});

// Get store listings 
router.get('/get_store_listings', async function (req, res, next) {
  let listings = [];
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getStoreListings';

  try 
  {
      let res2 = await cloud.post(url, {});
      listings = res2.data.listings;

      if (typeof listings === "undefined")
        {
          return res.status(500).json({
            response: "Error",
          });
        }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    listings: listings
  });
});

// Get marketplace listings 
router.get('/get_marketplace_listings', async function (req, res, next) {
  const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  let listings = [];
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getMarketplaceListings';

  if (!loggedIn)
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  try 
  {
      let res2 = await cloud.post(url, {});
      listings = res2.data.listings;

      console.log(listings);

      if (typeof listings === "undefined")
        {
          return res.status(500).json({
            response: "Error",
          });
        }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    listings: listings
  });
});

// Get profile info
router.post('/get_profile', async function (req, res, next) {
  let address = req.body.address;
  const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  const userID = loggedIn ? req.session.user : "";
  let developedStrategies = [];
  let positionsForSale = [];
  let username = "";
  let referralCode = "";
  let netWorth = 0.0;
  let netReturn = 0.0;
  let numberOfPositions = 0;
  let totalNumberOfShares = 0;
  let memberSince = "";
  let liveStrategies = [];
  let credits = 0;
  let profileUserID = "";
  let match = true;
  let totalYieldClaimed = 0;
  let numberOfVotes = 0;

  if (!loggedIn)
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getProfile';

  try 
  {
      let res2 = await cloud.post(url, {address: address});

      if (typeof res2.data.username === "undefined")
      {
        return res.status(500).send("Error");
      }
      developedStrategies = res2.data.developedStrategies;
      liveStrategies = res2.data.liveStrategies;
      username = res2.data.username;
      referralCode = res2.data.referralCode;
      netWorth = res2.data.netWorth;
      netReturn = res2.data.netReturn;
      numberOfPositions = res2.data.numberOfPositions;
      totalNumberOfLPTokens = res2.data.totalNumberOfLPTokens;
      memberSince = res2.data.memberSince;
      credits = res2.data.credits;
      profileUserID = res2.data.userID;
      totalYieldClaimed = res2.data.totalYieldClaimed;
      numberOfVotes = res2.data.numberOfVotes;
      positions = res2.data.positions;

      if (profileUserID != userID)
      {
        match = false;
        developedStrategies = [];
      }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    developedStrategies: developedStrategies,
    liveStrategies: liveStrategies,
    positions: positions,
    username: username,
    referralCode: referralCode,
    netWorth: netWorth,
    numberOfPositions: numberOfPositions,
    totalNumberOfLPTokens: totalNumberOfLPTokens,
    memberSince: memberSince,
    netReturn: netReturn,
    credits: credits,
    match: match,
    totalYieldClaimed: totalYieldClaimed,
    numberOfVotes: numberOfVotes
  });
});

// Get navbar credits 
router.get('/get_navbar_credits', async function (req, res, next) {
  const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  const userID = loggedIn ? req.session.user : "";
  let credits = 0;
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getNavbarCredits';

  if (!loggedIn)
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  try 
  {
      let res2 = await cloud.post(url, {userID: userID});
      credits = res2.data.credits;

      if (typeof credits === "undefined")
      {
        return res.status(500).send("Error");
      }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    credits: credits
  });
});

// Get notifications
router.get('/get_notifications', async function (req, res, next) {
  const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  const userID = loggedIn ? req.session.user : "";
  let notifications = [];
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getNotifications';

  if (!loggedIn)
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  try 
  {
      let res2 = await cloud.post(url, {userID: userID});
      notifications = res2.data.notifications;

      if (typeof notifications === "undefined")
      {
        return res.status(500).send("Error");
      }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    notifications: notifications
  });
});

// Get settings data
router.get('/get_settings_data', async function (req, res, next) {
  const loggedIn = (typeof req.session.user !== "undefined") ? true : false;
  const userID = loggedIn ? req.session.user : "";
  let username = "";
  let email = "";
  let phoneNumber = "";
  let referralCode = "";
  let savedReferralCode = "";
  let netWorth = 0.0;
  let verifiedEmail = false;
  var cloud = axios.default.create({});
  let url = 'https://us-central1-stocks2-301304.cloudfunctions.net/getSettingsData';

  if (!loggedIn)
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  try 
  {
      let res2 = await cloud.post(url, {userID: userID, token: req.session.token});
      username = res2.data.username;
      email = res2.data.email;
      phoneNumber = res2.data.phoneNumber;
      netWorth = res2.data.netWorth;
      referralCode = res2.data.referralCode;
      savedReferralCode = res2.data.savedReferralCode;
      verifiedEmail = res2.data.verifiedEmail;

      if (res2.data.hasErrors)
      {
        return res.status(500).send("Error");
      }
  } 
  catch (err) 
  {
    return res.status(500).json({
      response: "Error",
    });
  }

  res.status(200).json({
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    netWorth: netWorth,
    referralCode: referralCode,
    savedReferralCode: savedReferralCode,
    verifiedEmail: verifiedEmail
  });
});

// Get strategy details
router.get('/get_strategy_details/:id', async function (req, res, next) {

  let strategyID = req.params.id;

  if (typeof strategyID !== "string")
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
      return res.status(500).json({
        response: "Error",
      });
    }
  }

  let temp2 = JSON.stringify({
    strategyID: strategyID,
  });
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(e) {
    const response = JSON.parse(xhttp.responseText);

    return res.status(200).json({
      strategyName: response.strategyName,
      watchlist: response.watchlist,
      symbols: response.symbols,
      maxAllocation: response.maxAllocation,
      maxConcurrentTrades: response.maxConcurrentTrades,
      distribution: response.distribution,
      timeframe: response.timeframe,
      startTime: response.startTime,
      endTime: response.endTime,
      direction: response.direction,
      entryConditions: response.entryConditions,
      exitConditions: response.exitConditions,
      description: response.description
    });
  }
  xhttp.open("POST", 'https://us-central1-stocks2-301304.cloudfunctions.net/getStrategyInfo', true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(temp2);
});

module.exports = router;
