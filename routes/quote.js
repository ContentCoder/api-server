/* 
 * quote.js 
 * 
 * Quote routes. 
 */

exports.getRandom = getRandomQuote;

var util = require('util'),
    path = require('path'),

    config   = require(path.join(__dirname, '../config.json')),
    response = require(path.join(__dirname, '../response.js'));

var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getRandomQuote(req, res) {
  var month = Math.floor(Math.random() * 12);
  var date  = Math.floor(Math.random() * days[month]);
  month += 1;
  date  += 1;
  var monthStr  = month < 10 ? '0' + month.toString() : month.toString();
  var dateStr   = date < 10 ? '0' + date.toString() : date.toString();
  var queryStr  = monthStr + dateStr;
  util.log('Date: ' + queryStr);
  
  var key = {};
  key.Date = {S: queryStr};
  response.dynamoDBItem(res, config.QUOTESTABLE, key);
}


