/* 
 * encode.js 
 * 
 * Encode routes. 
 */

exports.postStart = postStart;
exports.postStop	= postStop;
exports.getStatus = getStatus;

var util = require('util'), 
    path = require('path'),
    aws  = require('aws-sdk'),

    config   = require(path.join(__dirname, '../config.json')),
    response = require(path.join(__dirname, '../response.js')),
    auth     = require(path.join(__dirname, '../auth.js'));

aws.config.loadFromPath(path.join(__dirname, '../awsconfig.json'));
var et = new aws.ElasticTranscoder();

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


