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
  key.Minute = {N: min};
  response.dynamoDBItem(res, config.CLOCKBEAUTYTABLE, key);
}

function next(req, res) {
  var min = 0;
  if (req.parsedUrl.query.current >= 0 && 
      req.parsedUrl.query.current < 59) 
    min = req.parsedUrl.query.current + 1;
  util.log('minute: ' + min);

  var key = {};
  key.Minute = {N: min};
  response.dynamoDBItem(res, config.CLOCKBEAUTYTABLE, key);
}


