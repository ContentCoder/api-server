/* 
 * clock-beauty.js 
 * 
 * Clock beauty routes.
 */

exports.getRandom = getRandom;

var util = require('util'),
    path = require('path'),

    config   = require(path.join(__dirname, '../config.json')),
    response = require(path.join(__dirname, '../response.js'));

function getRandom(req, res) {
  var r = Math.floor(Math.random() * 12);
  var clock = r < 10 ? '0' + r.toString() : r.toString();
  clock = clock + '00';
  util.log('clock: ' + clock);

  var key = {};
  key.Clock = {S: clock};
  response.dynamoDBItem(res, config.CLOCKBEAUTYTABLE, key);
}

