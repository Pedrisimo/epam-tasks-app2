var fs = require('fs'),
    config = require('../config');

exports.getAction = function(request, response) {
    response.writeHead(200, {"Content-Type": 'text/css'});
    console.log('CSS Styles:' + config.directories.templates + '/css/styles.css');
    console.log('directories:' + config.directories);
    console.log('templates:' + config.directories.templates);
    fs.createReadStream(config.directories.templates + '/css/styles.css').pipe(response);
};