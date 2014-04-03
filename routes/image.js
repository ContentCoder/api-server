/* 
 * image.js 
 * 
 * Image routes.
 */

exports.getThumbnail = getThumbnail;

var util = require('util'), 
    path = require('path'), 
		
    config   = require(path.join(__dirname, '../config.json')),
    response = require(path.join(__dirname, '../response.js')),
    auth     = require(path.join(__dirname, '../auth.js')), 
 
		uc = require(path.join(__dirname, '../modules/s3-url-cache/url-cache.js')), 
    tc = require(path.join(__dirname, '../modules/image-thumbnail-cache/thumbnail-cache.js'));

aws.config.loadFromPath(path.join(__dirname, 'awsconfig.json'));
var dynamodb = new aws.DynamoDB();

/* 
 * Image thumbnail route.
 * 
 * Request: 
 *  Method: GET
 *  Path: /image/thumbnail
 *  Query String: 
 *    url: image url
 *    width: thumbnail width
 *    height: thumbnail height
 *    crop: crop method, 'Center' or 'North'
 *    apikey: API key
 *    expires: expire time
 * 
 * Response: 
 *  Error: 
 *    Status Code: 
 *      400 Bad Request
 *      500 Internal Server Error
 *    Content Type: application/json
 *    Body: error message
 *  Thumbnail File: 
 *    Status Code: 200 OK
 *    Content Type: image/*
 *    Body: thumbnail file
 */
function getThumbnail(req, res) {
  if (!req.parsedUrl.query.apikey   ||
      !req.parsedUrl.query.url      ||
      (!req.parsedUrl.query.width && !req.parsedUrl.query.height)) {
    response.json(res, 400, {message: '400 Bad Request'});
    return;
  }

  auth.authenticate(req, function(succeed) {
    if (!succeed) {
      util.log('authenticate failed.');
      response.json(res, 401, {message: '401 Unauthorized'});
      return;
    }

    var options = {};
    options.width  = req.parsedUrl.query.width;
    options.height = req.parsedUrl.query.height;
    options.crop   = req.parsedUrl.query.crop;
    thumbnail(req.parsedUrl.query.url, options, function(err, data) {
      if (err) {
        response.json(res, 500, err);
        return;
      }

      response.s3Object(res, data.ThumbBucket.S, data.ThumbKey.S);

      var item = {};
      item.TableName = config.THUMBTABLE;
      item.Item = {};
      item.Item.User = {S: req.accessKey.User.S};
      item.Item.Time = {N: new Date().getTime().toString()};
      item.Item.Url  = {S: req.parsedUrl.query.url};
      if (req.parsedUrl.query.width)
        item.Item.Width  = {N: req.parsedUrl.query.width.toString()};
      if (req.parsedUrl.query.height)
        item.Item.Height = {N: req.parsedUrl.query.height.toString()};
      if (req.parsedUrl.query.crop)
        item.Item.Crop   = {S: req.parsedUrl.query.crop};
      dynamodb.putItem(item, function(err, data) {
        if (err) {
          util.log(JSON.stringify(err, null, 2));
        } 
      });   // dynamodb.putItem 
    });   // thumbnail    
  });   // authenticate 
}

function thumbnail(imageUrl, options, callback) {
  uc.cache(imageUrl, function(err, cachedImageItem) {
    if (err) {
      callback(err, null);
      return;
    }

    var image = {};
    image.Bucket  = cachedImageItem.Bucket.S;
    image.Key     = cachedImageItem.Key.S;
    tc.cache(image, options, function(err, cachedThumbItem) {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, cachedThumbItem);
    });   
  });   
}

