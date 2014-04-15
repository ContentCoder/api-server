/* 
 * server.js 
 * 
 * API server.
 */

var util = require('util'),
    path = require('path'),
    http = require('http'),
    url	 = require('url'), 

    config   = require(path.join(__dirname, 'config.json')), 
    response = require(path.join(__dirname, 'response.js')),
 
    image  = require(path.join(__dirname, 'routes/image.js')), 
    encode = require(path.join(__dirname, 'routes/encode.js')), 
    quote  = require(path.join(__dirname, 'routes/quote.js')), 
    clockbeauty = require(path.join(__dirname, 'routes/clock-beauty.js')); 

util.log(JSON.stringify(config, null, 2));

var port = process.env.PORT || config.PORT;

http.createServer(function(req, res) {
  util.log(req.method + ' ' + req.url);
  req.parsedUrl = url.parse(req.url, true);
  switch (req.method + req.parsedUrl.pathname) {
  case 'GET/image/thumbnail':
    image.getThumbnail(req, res);
    return;
  case 'GET/image/thumbnail/formsubmit':
    image.getThumbnailFormSubmit(req, res);
    return;
  case 'POST/encode/start':
    encode.postStart(req, res);
    return;
  case 'POST/encode/stop':
    encode.postStop(req, res);
    return;
  case 'GET/encode/status':
    encode.getStatus(req, res);
    return;
  case 'GET/quote/random':
    quote.getRandom(req, res);
    return;
  case 'GET/clockbeauty/flip': 
    clockbeauty.getFlip(req, res);
    return;
  default:
    response.json(res, 404, {message: '404 Not Found'});
    return;
  }
}).listen(port);

util.log(util.format('API server running at %d port...', port));

