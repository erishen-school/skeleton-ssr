/**
 * Created by lei_sun on 2017/11/28.
 */
var _ = require('lodash');
var config = require('./config');
var projectConfig = require('../../../server/config/project').default;
var fetch = require('whatwg-fetch');
var fetchHelper = require('./fetch');

var numWordArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '?', '/'
];

var util = {};
util.ajaxPost = function(url, data, sucCallback, errCallback, beforeCallback){
    var self = this;
    //console.log('ajaxPost', url, data);

    data.head = {};
    data.contentType = "json";
    data = JSON.stringify(data);

    if (typeof window !== 'undefined') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(fetchHelper.checkStatus)
            .then(fetchHelper.parseJSON)
            .then(function(result) {
                console.log('response result', result);
                return sucCallback && sucCallback(result);
            }).catch(function(error) {
            console.log('request failed', error);
            return errCallback && errCallback(error);
        });
    }
};
util.getGeoLocation = function(callback) {
    var self = this;
    console.log('getGeoLocation', window.navigator.geolocation);
    var longitude = 121.48;
    var latitude = 31.22;

    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function (position) {
            console.log('getGeoLocation_result: ', position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            return callback && callback({ longitude: longitude, latitude: latitude });
        }, function (err) {
            console.log('getGeoLocation_err: ', err);
            return callback && callback({ longitude: longitude, latitude: latitude });
        }, { timeout: 10000 });
    }
    else {
        //window.alert('您的浏览器不能获取地理位置');
        return callback && callback({ longitude: longitude, latitude: latitude });
    }
};
util.getUrlObj = function(url){
    console.log('getUrlObj', url);
    var result = {};
    var beginIndex = url.indexOf('?');
    if(beginIndex != -1)
        url = url.substring(beginIndex+1);

    if(url)
    {
        var urlArr = url.split('&');
        _.each(urlArr, function(item, index){
            var itemArr = item.split('=');
            if(itemArr)
            {
                if(itemArr.length >= 2)
                    result[itemArr[0]] = itemArr[1];
                else if(itemArr.length == 1 && itemArr[0] == 'R')
                    result[itemArr[0]] = 0;
            }
        });
    }
    return result;
};
util.getRandomNum = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

util.decodeMyStr = function(str){
    console.log('decodeMyStr', str);
    var strArr = str.split('');
    var strArrLen = strArr.length;
    var numWordArrayLen = numWordArray.length;

    var result = [];
    for(var i = 0; i < strArrLen; i++){
        var flag = false;
        for(var j = 0; j < numWordArrayLen; j++){
            if(strArr[i].toString() == numWordArray[j].toString())
            {
                result.push(numWordArray[numWordArrayLen-1-j].toString());
                flag = true;
                break;
            }
        }

        if(!flag)
            result.push(' ');
    }

    return result.join('');
};
util.encodeMyStr = function(str){
    console.log('encodeMyStr', str);
    var strArr = str.split('');
    var strArrLen = strArr.length;
    var numWordArrayLen = numWordArray.length;

    var result = [];
    for(var i = 0; i < strArrLen; i++){

        var flag = false;
        for(var j = 0; j < numWordArrayLen; j++){
            if(strArr[i].toString() == numWordArray[j].toString())
            {
                result.push(numWordArray[numWordArrayLen-1-j]);
                flag = true;
                break;
            }
        }

        if(!flag)
            result.push(' ');
    }

    console.log('result', result.join(''));
    return result.join('');
};

// 向 HTML 中动态插入 script 标签，通过 JSONP 的方式进行调用
util.appendScript = function(url){
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url;
    if (typeof window !== 'undefined') {
        document.body.append(newScript);
    }
};

util.trim = function (str) {
    console.log('trim', str);
    return str.replace(/^\s*|\s*$/g, '');
};

util.changeCurrency = function (currency) {
    if (currency == 'CNY')
        currency = '￥';
    return currency;
};
//重定向
util.jumpRedirect = function(url){
    window.location.reload();
};

util.jumpUrlDirect = function(url){
    window.location.href = url;
};

util.getLocationPrefix = function(){
    if(typeof window != "undefined") {
        var serverPrefix = projectConfig.serverPrefix;
        var serverUrls = projectConfig.serverUrls;
        var location = window.location.href;

        _.each(serverUrls, function (item, key) {
            var url = item.url;
            var replaceUrl = serverPrefix.replace('*', url);
            if (location != '' && location.indexOf(replaceUrl) != -1) {
                var locationArr = location.split(replaceUrl);
                location = locationArr[0] + replaceUrl;
                return true;
            }
        });
        return location;
    }

    return '';
};

util.getUrlPrefix = function(){
    if(typeof window != "undefined") {
        var serverPrefix = projectConfig.serverPrefix;
        var serverUrls = projectConfig.serverUrls;
        var location = window.location.href;

        _.each(serverUrls, function (item, key) {
            var url = item.url;
            var replaceUrl = serverPrefix.replace('*', url);
            if (location != '' && location.indexOf(replaceUrl) != -1) {
                location = replaceUrl.substring(1);
                return true;
            }
        });

        return location;
    }

    return '';
};

// 设置keyframes属性
util.addKeyFrames = function(y){
    if(y == undefined)
        y = 100;

    if(typeof document != "undefined"){
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrames = '\
            @-webkit-keyframes wordsLoop {\
                0% {\
                    -webkit-transform: translateX(200px);\
                    transform: translateX(200px);\
                }\
                100% {\
                    -webkit-transform: translateX(-A_DYNAMIC_VALUE%);\
                    transform: translateX(-A_DYNAMIC_VALUE%);\
                }\
            }\
            @keyframes wordsLoop {\
                0% {\
                    -webkit-transform: translateX(200px);\
                    transform: translateX(200px);\
                }\
                100% {\
                    -webkit-transform: translateX(-A_DYNAMIC_VALUE%);\
                    transform: translateX(-A_DYNAMIC_VALUE%);\
                }\
            }';
        style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, y);
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

util.setBodyOverflow = function(flag){
    if(typeof document != "undefined") {
        if (flag) {
            document.getElementsByTagName('body')[0].style['overflow-y'] = "auto";
        } else {
            document.getElementsByTagName('body')[0].style['overflow-y'] = "hidden";
        }
    }
};

util.goBack = function(){
    if(typeof window != "undefined"){
        window.history.back();
    }
};

util._documentTitle = function(title){
    if(typeof window != "undefined"){
        document.title = title;
    }
};

util.dynamicLoadJweixin = function(callback){
    var self = this;
    if(typeof wx === 'undefined'){
        self.dynamicLoadScript(self.getLocationPrefix() + '/webresource/js/jweixin-1.3.2.js', callback);
    } else {
        return callback && callback();
    }
};

util.dynamicLoadJquery = function(callback){
    var self = this;
    if(typeof jquery === 'undefined'){
        self.dynamicLoadScript(self.getLocationPrefix() + '/webresource/js/jquery-3.3.1.js', callback);
    } else {
        return callback && callback();
    }
};

util.dynamicLoadScript = function(url, callback){
    if (typeof window !== 'undefined') {
        console.log('dynamicLoadScript', url);
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.charset = 'utf-8';
        s.src = url;
        s.onload = function () {
            console.log('dynamicLoadScript-success');
            return callback && callback();
        };
        s.onerror = function () {
            console.log('dynamicLoadScript-error');
        };
        head.appendChild(s);
    }
};

util.dynamicLoadCss = function(url, callback) {
    if (typeof window !== 'undefined') {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        /* link.rel = "preload";*/
        link.onload = function () {
            return callback && callback();
        }
        head.appendChild(link);
    }
};

// condition 是判断条件
util.scrollAction = function(scrollClass, remainHeight, callback){
    var self = this;
    if(remainHeight == undefined)
        remainHeight = 10;

    if(typeof window != "undefined"){
        var rAF = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        self.dynamicLoadJquery(function () {
            $(window).off("scroll." + scrollClass).on("scroll." + scrollClass, function () {
                rAF(function () {
                    var winH = $(window).height(),
                        scrollT = $(window).scrollTop(),
                        pageH = $("." + scrollClass).height();

                    var remain = winH + scrollT - pageH;

                    if (remain >= remainHeight) {
                        return callback && callback();
                    }
                })
            });
        });
    }
};

module.exports = util;