var express = require('express');
var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');
var index = require('../db/index');
const { v4: uuidv4 } = require('uuid');

const axios = require('axios');

var db = index.db
var admin = index.admin

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    var data = "";
    req.logIn(user, async function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      let userID = "";
      let auth0ID = user.user_id;

      if (!returnTo)
      {
        let verifiedEmail = user._json.email_verified;
        var email = user.emails[0].value
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        snapshot.forEach((doc) => {
            if (doc.data().email == email)
            {
                userID = doc.id;
            }
        })
        //create default document
        if (userID == "") 
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
            auth0ID: auth0ID,
            accountHistory: [],
            credits: 0,
            developedStrategies: [],
            email: email,
            firstName: "",
            lastName: "",
            memberSince: dateString,
            notifications: [],
            phoneNumber: "",
            positions: [],
            refererID: "",
            referralCode: referralCode,
            savedReferralCode: "",
            strategiesForSale: [],
            transactions: [],
            withdrawals: [],
            verifiedEmail: false,
            username: username
          };

          let tempDoc = await usersRef.add(data);
          userID = tempDoc.id;

          let tempDoc2 = await db.collection('profileAddresses').doc(address).set({userID: userID});

          var cloud = axios.default.create({});
          let url = 'https://stocks2.us.auth0.com/api/v2/jobs/verification-email';

          try 
          {
              let res2 = cloud.post(url, {user_id: auth0ID});
              console.log("sent verification email");
          } 
          catch (err) 
          {
            console.log("error sending verification email");
          }
        }
        else
        {
          let tempDoc = await usersRef.doc(userID).update({verifiedEmail: verifiedEmail});
        }
      }
      res.redirect(returnTo || '/ai-pee-ai-chee-ai-tua-liap-nee/' + encodeURIComponent(auth0ID));
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', async (req, res) => {
  req.logout();

  var returnTo = req.protocol + '://' + req.hostname;
  var port = req.connection.localPort;
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port;
  }

  var logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  );
  var searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: 'https://www.tradegen.io'
  });
  logoutURL.search = searchString;

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

  res.redirect(logoutURL);
});

module.exports = router;
