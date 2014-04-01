/* 
 * response.js 
 * 
 * Response functions.
 */

exports.json = responseJSON;

var util		= require('util'),
		path    = require('path');

function responseJSON(res, statusCode, msg) {
  res.writeHead(statusCode, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(msg));
  util.log(JSON.stringify(msg));
  return;
}


