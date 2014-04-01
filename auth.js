/* 
 * auth.js 
 * 
 * Authenticate.
 */

exports.authenticate = authenticate;

var util    = require('util'),
		path    = require('path'),
    crypto  = require('crypto'),
    aws     = require('aws-sdk');

// load configuration
var config  = require(path.join(__dirname, 'config.json'));

// aws init
aws.config.loadFromPath(path.join(__dirname, 'awsconfig.json'));
var dynamodb = new aws.DynamoDB();

function authenticate(req, callback) {
  var item = {};
  item.TableName = config.AUTHTABLE;
  item.Key       = {};
  item.Key.ID    = {S: req.parsedUrl.query.apikey};
  dynamodb.getItem(item, function(err, accessKey) {
    if (err || !accessKey) {
      callback(false);
      return;
    }
    if (!accessKey.Item) {
      callback(false);
      return;
    }

    req.accessKey = accessKey.Item;
    if (!config.AUTHENTICATION) {
      callback(true);
      return;
    }

    var s = [ req.parsedUrl.pathname,
              req.parsedUrl.query.url,
              req.parsedUrl.query.width,
              req.parsedUrl.query.height,
              req.parsedUrl.query.crop,
              req.parsedUrl.query.apikey,
              req.parsedUrl.query.expires
            ].sort().join('');
    util.log(s);
    var signature = crypt.createHmac('sha1', req.accessKey.Secret.S).update(s).digest('base64');
    util.log(signature);
    if (signature == req.parsedUrl.query.signature) {
      var now = new Date().getTime();
      if (now > req.parsedUrl.query.expires) {
        callback(false);
      } else {
        callback(true);
      }
    } else {
      callback(false);
    }
    return;
  });   // dynamodb.getItem
}

