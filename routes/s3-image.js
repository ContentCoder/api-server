/* 
 * s3-image.js 
 * 
 * S3 image routes. 
 */

exports.getThumbnail = getThumbnail;

var util = require('util'),
    path = require('path'),

    s3Image = require(path.join(__dirname, '../modules/s3-image/image.js'));

function getThumbnail(req, res) {
  if (!req.parsedUrl.query.imagebucket ||
      !req.parsedUrl.query.imagekey ||
      !req.parsedUrl.query.thumbbucket ||
      !req.parsedUrl.query.thumbkey) {
    response.json(res, 400, {message: '400 Bad Request'});
    return;
  }

  var image   = {},
      thumb   = {},
      options = {};
  image.Bucket    = req.parsedUrl.query.imagebucket;
  image.Key       = req.parsedUrl.query.imagekey;
  thumb.Bucket    = req.parsedUrl.query.thumbbucket;
  thumb.Key       = req.parsedUrl.query.thumbkey;
  options.width   = req.parsedUrl.query.width;
  options.height  = req.parsedUrl.query.height;
  options.crop    = req.parsedUrl.query.crop;
  s3Image.thumbnail(image, thumb, options, function(err, data) {
    if (err) {
      response.json(res, 500, err);
    } else {
      response.json(res, 200, data);
    }
  });
}

