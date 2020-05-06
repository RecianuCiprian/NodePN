var express = require('express');
var router = express.Router();
const OneSignal = require('onesignal-node');

const client = new OneSignal.Client('', '');

/* GET users listing. */
router.post('/simpleNotification', async function(req, res, next) {
  const notification = {
    contents: {
      'tr': 'Yeni bildirim',
      'en': 'New notification',
    },
    headings:{
      'en': 'Test Header',
    },
    include_player_ids: ["b3169fa0-5b17-4fb6-b8a7-7a723ff9979c", "0af4b162-ec84-4e42-a098-f2db1d7eda30"],
    big_picture:"https://i.imgur.com/VqYRsbD.jpg"
  };

// using async/await
  try {
    const response = await client.createNotification(notification);
    console.log(response.body.id);
  } catch (e) {
    if (e instanceof OneSignal.HTTPError) {
      // When status code of HTTP response is not 2xx, HTTPError is thrown.
      console.log(e.statusCode);
      console.log(e.body);
    }
  }

  res.status(200).json({success:'true'});
});

module.exports = router;
