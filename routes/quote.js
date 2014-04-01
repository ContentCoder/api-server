/* 
 * quote.js 
 * 
 * Quote routes. 
 */

exports.getQuote = getQuote;

var util    = require('util'),
    path    = require('path'),

		quotes  = require(path.join(__dirname, 'modules/quotes/quotes.js'));

/* 
 * Quotes route.
 * 
 * Request: 
 *  Method: GET
 *  Path: /quote
 * 
 * Response: 
 *  
 */
function getQuote(req, res) {
  quotes.random(function(err, quote) {
    if (err) {
      responseJSON(res, 500, err);
    } else {
      responseJSON(res, 200, quote);
    }
  });   // quotes.random
}

