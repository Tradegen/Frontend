var express = require('express');
var router = express.Router();
var dotenv = require('dotenv');
var index = require('../db/index');
const { v4: uuidv4 } = require('uuid');

var db = index.db
var admin = index.admin

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login/:userID', async function (req, res, next) {
  let userID = req.params.userID;
  console.log(userID);
  const ref = db.collection('users').doc(userID);
  const doc = await ref.get().then(async (document) => {
    if (!document.exists)
    {
      let date = new Date();

      let currentDay = date.getDate();
      let currentMonth = date.getMonth() + 1;
      let currentYear = date.getFullYear();

      let modifiedMonth = currentMonth.toString();
      let modifiedDay = currentDay.toString();

      if (currentMonth < 10)
      {
          modifiedMonth = "0" + currentMonth.toString();
      }

      if (currentDay < 10)
      {
          modifiedDay = "0" + currentDay.toString();
      }
      const dateString = currentYear.toString() + "-" + modifiedMonth + "-" + modifiedDay;

      //make random initial username
      let randomNumber = (Math.floor(Math.random() * Math.floor(9000000))) + 1000000;
      let username = "user" + randomNumber.toString();

      //make random referral code
      let referralCode = "";
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;
      const length = 12;
      for (var i = 0; i < length; i+=1)
      {
          referralCode += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      let address = uuidv4();

      let data = {
        address: address,
        accountHistory: [],
        credits: 0,
        developedStrategies: [],
        memberSince: dateString,
        notifications: [],
        positions: [],
        refererID: "",
        referralCode: referralCode,
        savedReferralCode: "",
        strategiesForSale: [],
        transactions: [],
        username: username,
        votes: [],
        voteAccuracy: 0,
        totalYieldClaimed: 0,
        marketplaceListings: []
      };

      let tempDoc = await db.collection("users").doc(userID).set(data);
      let tempDoc2 = await db.collection('profileAddresses').doc(address).set({userID: userID});
      const temp32= await db.collection('marketData').doc("stats").update({
        users: admin.firestore.FieldValue.increment(1),
    });
    }

    res.redirect('/ai-pee-ai-chee-ai-tua-liap-nee/' + encodeURIComponent(userID));
  });
});

// Perform session logout and redirect to homepage
router.get('/logout', async (req, res) => {
  req.logout();

  let cookie = req.cookies;
  for (var prop in cookie) {
    console.log(prop);
    if (!cookie.hasOwnProperty(prop)) {
        continue;
    }    
    res.clearCookie(prop);
  }

  const user = req.session.user;
  //clear all sessions associated with the user
  await req.sessionStore.all((error, sessions) => {
    if (sessions)
    {
      let sessionsToDelete = [];
      for (const [key, value] of Object.entries(sessions))
      {
        console.log(key);
        console.log(value)
        if (value.user == user)
        {
          sessionsToDelete.push(key);
        }
      }

      console.log("sessions to delete:");
      console.log(sessionsToDelete);

      for (let j = 0; j < sessionsToDelete.length; j+=1)
      {
        req.sessionStore.destroy(sessionsToDelete[j], function (err, dat) { 
          console.log("deleted session: " + sessionsToDelete[j]);                
        }); 
      }
    }
  });

  res.redirect("/");
});

module.exports = router;