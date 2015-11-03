/**
 * Created by baidu on 15/10/19.
 */
var React = require('react');
var http = require('http');
var fs = require('fs');
var path = require('path');
var base = path.resolve(__dirname, '../');
http.createServer((req, res)=> {
        res.writeHead(200);
        if (/\.html$/.test(req.url)) {
            res.end(require('./view'));
            return;
        }
        var readStream = fs.createReadStream(base + req.url);

        readStream.pipe(res);
        readStream.on('error', e=> {
            console.log(e)
        });
    })
    .listen(10050);