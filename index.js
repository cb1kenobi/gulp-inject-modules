'use strict';

var Module = require('module');
var path = require('path');
var sourceMap = require('source-map-support');
var through = require('through2').obj;
var vm = require('vm');

var cache = {};
var originalLoader = Module._extensions['.js'];

sourceMap.install({
	retrieveFile: function (path) {
		if (cache[path]) {
			return cache[path].contents.toString();
		}
	}
});

Module._extensions['.js'] = function (module, filename) {
	var file = cache[filename];
	if (file) {
		module._compile(file.contents.toString(), filename);
	} else {
		originalLoader(module, filename);
	}
};

module.exports = function () {
	return through(function (file, enc, cb) {
		cache[file.path] = file;
		return cb(null, file);
	});
};
