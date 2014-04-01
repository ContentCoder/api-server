/* 
 * encode.js 
 * 
 * Encode routes. 
 */

exports.postStart = postStart;
exports.postStop	= postStop;
exports.getStatus = getStatus;

var util	= require('util'), 
		path	= require('path'),

    response  = require(path.join(__dirname, '../response.js')),
    auth      = require(path.join(__dirname, '../auth.js'));

function postStart(req, res) {
	response.json(res, 403, {message: '403 Forbidden'});
	return;
}

function postStop(req, res) {
	response.json(res, 403, {message: '403 Forbidden'});
	return;
}

function getStatus(req, res) {
	response.json(res, 403, {message: '403 Forbidden'});
	return;
}


