/**
 * Created by lei_sun on 2018/5/22.
 */
import fetch from 'node-fetch'; // https://github.com/bitinn/node-fetch

const https = require('https'); // https://www.ddhigh.com/2016/12/14/node-fetch-ignore-certificate.html
const http = require('http');

const appConfig = require('../../app.config');
const env = appConfig.Env;
const nodeFetchHttps = false;

var obj = {};

obj.showJSON = function(res, content){
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(content));
};

obj.show404 = function(res){
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end('<html><body><div>404</div></body></html>');
};

// flag: true => 不调用 showJSON 方法, false, undefined => 反之
obj.getDirect = function(url, body, req, res, flag){
    console.log('getDirect', url);

    if(body == undefined){
        body = {};
    }

    var data = {
        ...body,
        ...req.body,
        ...req.query
    };

    return new Promise((resolve, reject)=> {
        var fetchObj = {
            ...data
        };

        fetch(url, fetchObj).then(res => res.json())
            .then(json => {
                //console.log('getDirect_json', url, json);
                if(!flag){
                    this.showJSON(res, json);
                }
                return resolve && resolve(json);
            })
            .catch(err => {
                //console.log('getDirect_err', url, err);
                if(!flag){
                    this.showJSON(res, err);
                }
                return reject && reject(err);
            });
    });
};

obj.postDirect = function(url, body, req, res, flag){
    console.log('postDirect', url);

    if(body == undefined){
        body = {};
    }

    var data = {
        ...body,
        ...req.body,
        ...req.query
    };

    return new Promise((resolve, reject)=> {
        var fetchObj = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                contentType: 'application/json'
            }
        };

        fetch(url, fetchObj).then(res => res.json())
            .then(json => {
                //console.log('postDirect_json', url, json);
                if(!flag){
                    this.showJSON(res, json);
                }
                return resolve && resolve(json);
            })
            .catch(err => {
                //console.log('postDirect_err', url, err);
                if(!flag){
                    this.showJSON(res, err);
                }
                return reject && reject(err);
            });
    });
};

export default obj;
