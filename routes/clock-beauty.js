/* 
 * clock-beauty.js 
 * 
 * Clock beauty routes.
 */

exports.getFlip   = flip;
exports.getNow    = now;
exports.getRandom = random;
exports.putLike   = like;

var util = require('util'),
    path = require('path'),

    config   = require(path.join(__dirname, '../config.json')),
    response = require(path.join(__dirname, '../response.js'));

function flip(req, res) {
  var timeline = parseInt(req.parsedUrl.query.timeline);
  util.log('timeline: ' + timeline);
  var current = new Date().getMinutes();
  util.log('current: ' + current);
  if (current != timeline) {
    now(req, res);
  } else {
    random(req, res);
  }
}

function now(req, res) {
  var min = new Date().getMinutes();
  util.log('now minute: ' + min);
  
  var key = {};
  key.Minute = {N: min.toString()};
  response.dynamoDBItem(res, config.CLOCKBEAUTYTABLE, key);
}

function random(req, res) {
  var min = Math.floor(Math.random() * 60);
  util.log('random minute: ' + min);

  var key = {};
  key.Minute = {N: min.toString()};
  response.dynamoDBItem(res, config.CLOCKBEAUTYTABLE, key);
}

function like(req, res) {
  response.json(res, 403, {message: '403 Forbidden'});
  return;
}

