/* 
 * clock-beauty.js 
 * 
 * Clock beauty routes.
 */

exports.getNow  = now;
exports.getNext = next;

var util = require('util'),
    path = require('path'),

    config   = require(path.join(__dirname, '../config.json')),
    response = require(path.join(__dirname, '../response.js'));

function now(req, res) {
  var now = new Date();
  var min = now.getMinutes();
  util.log('minute: ' + min);
  
  var key = {};
  key.Minute = {N: min.toString()};
  response.dynamoDBItem(res, config.CLOCKBEAUTYTABLE, key);
}

function next(req, res) {
  var min = parseInt(req.parsedUrl.query.current);
  if (min >= 0 && min < 59) 
    min = min + 1;
  else 
    min = 0;
  util.log('minute: ' + min);

  var key = {};
  key.Minute = {N: min.toString()};
  response.dynamoDBItem(res, config.CLOCKBEAUTYTABLE, key);
}


