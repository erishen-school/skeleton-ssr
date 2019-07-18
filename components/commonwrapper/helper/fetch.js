/**
 * Created by lei_sun on 2018/2/28.
 */
var util = require('./util');
var fetch = require('isomorphic-unfetch');

var fetchObj = {};

fetchObj.checkStatus = function(response){
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

fetchObj.parseJSON = function(response){
    return response.json()
};

fetchObj.nodePromise = function(url, data){
    var self = this;
    return new Promise((resolve, reject) => {
        self.nodeModel(url, data, resolve, reject);
    });
};

fetchObj.nodeModel = function(url, data, sucCallback, errCallback){
    var self = this;
    var newUrl = util.getLocationPrefix() + '/api/' + url;
    console.log('newUrl', newUrl);

    return self.ajaxNodePost(newUrl, data, sucCallback, errCallback);
};

fetchObj.ajaxNodePost = function(url, data, sucCallback, errCallback, beforeCallback){
    var self = this;
    data.contentType = "json";

    if (typeof window !== 'undefined') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(self.checkStatus)
            .then(self.parseJSON)
            .then(function(result) {
                console.log('response result', url, result);
                return sucCallback && sucCallback(result);
            }).catch(function(error) {
            console.log('request failed', error);
            return errCallback && errCallback(error);
        });
    }
};

fetchObj.ajaxDirectPost = function(url, data, sucCallback, errCallback){
    var self = this;
    data.contentType = "json";

    if (typeof window !== 'undefined') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(self.checkStatus)
            .then(self.parseJSON)
            .then(function(result) {
                console.log('response result', url, result);
                return sucCallback && sucCallback(result);
            }).catch(function(error) {
            console.log('request failed', error);
            return errCallback && errCallback(error);
        });
    }
};

fetchObj.ajaxDirectPostPromise = function(url, data){
    var self = this;
    return new Promise((resolve, reject) => {
        self.ajaxDirectPost(url, data, resolve, reject);
    });
};

fetchObj.ajaxDirectGet = function(url, data, sucCallback, errCallback){
    var self = this;
    data.contentType = "json";

    if (typeof window !== 'undefined') {
        fetch(url, {
            ...data
        }).then(self.checkStatus)
            .then(self.parseJSON)
            .then(function(result) {
                console.log('response result', url, result);
                return sucCallback && sucCallback(result);
            }).catch(function(error) {
            console.log('request failed', error);
            return errCallback && errCallback(error);
        });
    }
};

fetchObj.ajaxDirectGetPromise = function(url, data){
    var self = this;
    return new Promise((resolve, reject) => {
        self.ajaxDirectGet(url, data, resolve, reject);
    });
};

module.exports = fetchObj;