var express = require('express');
var router = express.Router();
var PubNub = require('pubnub');

var pubnub = new PubNub({
  publishKey: "",
  subscribeKey: "",
  uuid: "myUniquUUID",
  ssl: true
});

/* GET home page. */
router.post('/simpleNotification', function(req, res, next) {
  pubnub.publish(
      {
        message: {
          "pn_gcm": {
            "notification": {
              "title": "Hello ",
              "message": "on 7 January.",
              "badge": 1,
              "image":"https://i.imgur.com/VqYRsbD.jpg"
            },
            "data": {
              "title": "U ETS Market Vibe by EU Carbon Team / 03 Jan 2020 / 07:00 CET",
              "message": "Next week, the first auctions in 2020 will be held. As 6 January is a public holiday in Germany and other member states, the first auction, worth 3.1m EUAs on behalf of the EU, will be held on 7 January.",
            }
          }
        },
        channel: 'notifications',
        sendByPost: false, // true to send via post
        storeInHistory: true, //override default storage options
        meta: {
          "cool": "meta"
        }   // publish extra meta with the request
      },
      function (status, response) {
        if (status.error) {
          // handle error
          console.log(status)
        } else {
          console.log("message Published w/ timetoken", response.timetoken)
        }
      }
  );
  res.status(200).json({success:'true'});
});

router.post('/getUnread_ReadMessages', function(req, res, next) {
    pubnub.history(
        {
            channel: 'notifications',
            includeMeta: true,
        },
        function (status, response) {
            if (status.error) {
                // handle error
                console.log(status)
            } else {
                console.log("status : " + JSON.stringify(status, null, 2));
                console.log("response : " + JSON.stringify(response, null, 2));
            }
        }
    );
    res.status(200).json({success:'true'});
});

module.exports = router;
