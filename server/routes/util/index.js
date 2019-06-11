/**
 * Created by lei_sun on 2018/2/11.
 */
import express from 'express';
import _ from 'lodash';
import util from '../../helper/util';
import projectConfig from '../../config/project';
import version from '../../config/version';
import configUtil from './config';
import bundleUtil from './bundleConfig';
import React from 'react';
import render from './render';
import controllerConfig from '../../config/controller';

const isRelease = process.env.RELEASE;
const isDevelopment = process.env.DEVELOPMENT;
const wrapperDic = process.env.WRAPPER;
const ssrParameter = projectConfig.ssrParameter;
const serverUrls = projectConfig.serverUrls;
let aresPrefix = projectConfig.aresPrefix.uat;
let serverPrefix = projectConfig.serverPrefix;

const Config = require(`../../../client/config/static`).default.getConfig(wrapperDic);

var appConfig = require('../../../app.config');
var appEnv = appConfig.Env;
var uatAPIURL = '';
var proAPIURL = '';
var uatWebURL = '';
var proWebURL = '';

console.log('appConfig.Env', appEnv);
/*
if(appEnv == 'pro' || appEnv == 'prd'){
    aresPrefix = projectConfig.aresPrefix.pro;
}
*/

var goRoute = function(controller, params){
    var router = express.Router();
    var dataArr = [{
        action: 'home'
    }];
    handleRoute(router, util.firstUpperCase(controller), dataArr, params);
    return router;
};

/**
 *
 * @param router
 * @param controller: Account, Event, Market, Partner, Personal, POI, Seed, React
 * @param dataArr: { action: '', links: [], scripts: [], demo: [] }
 * link: public/livestream/webresource/build/livestream/css,
 * script: public/livestream/webresource/build/livestream/js
 * demo: 显示在 /Index 页面的测试 URL
 */
var handleRoute = function(router, controller, dataArr, params){
    router.get('/', function(req, res) {
        var renderObj = getRenderObj(req, controller, 'Home', params);
        if(handleDefaultPage(req, res, controller, renderObj, dataArr))
            return;

        // 显示 Demo URLs
        var urlPrefix = controller.toLowerCase();
        var urls = [];
        _.each(dataArr, function(item, index){
            if(item){
                var action = item.action;
                var demo = item.demo;

                if(action){
                    if(demo){
                        _.each(demo, function(demoItem, demoIndex){
                            urls.push(urlPrefix + '/' + action + '?' + demoItem);
                        });
                    }
                    else
                        urls.push(urlPrefix + '/' + action);
                }
            }
        });
        renderObj.urls = urls;
        handleRes(req, res, controller, 'Index', renderObj);
    });

    _.each(dataArr, function(item, index){
        if(item){
            var action = item.action;

            if(action){
                router.get('/' + action, function(req, res) {
                    var suffix = action.substring(0,1).toUpperCase() + action.substring(1);
                    var renderObj = getRenderObj(req, controller, suffix, params);

                    var controllerResult = handleController(req, controller, suffix);
                    handleRenderObj(renderObj, item, controllerResult);
                    handleRes(req, res, controller, suffix, renderObj);
                });
            }
        }
    });
};

// 获取 renderObj
var getRenderObj = function(req, controller, action, params){
    var h5BaseUrl = '';
    var restfullApi = '';
    var ABtest = '';
    var ABversion = '';
    var react = false;
    var vue = false;

    var originalUrl = req.originalUrl;
    _.each(serverUrls, function(item, key){
        var url = item.url;
        if(originalUrl.indexOf('/' + url + '/') != -1){
            serverPrefix = serverPrefix.replace('*', url);
            return true;
        }
    });

    //if(!isRelease || (isDevelopment == 1)){
        aresPrefix = serverPrefix;
    //}

    var urlPrefix = aresPrefix;
    var webresourceBaseUrl = urlPrefix + '/webresource/';

    if(appEnv == 'uat')
    {
        h5BaseUrl = uatWebURL;
        restfullApi = uatAPIURL;
    }
    else if(appEnv == 'pro' || appEnv == 'prd')
    {
        h5BaseUrl = proWebURL;
        restfullApi = proAPIURL;
    }

    var reactObj = getReactControllerAction(req, controller, action);
    //console.log('reactObj', reactObj);

    var controllerFlag = false;
    _.each(controllerConfig.entrys, (item, index)=>{
        if(reactObj.controller.toLowerCase() == item && item != 'react'){
            controllerFlag = true;
            return false;
        }
    });
    //console.log('controllerFlag', controllerFlag);

    if(params){
        if(params.ABtest != undefined)
            ABtest = params.ABtest;

        if(params.ABversion != undefined)
            ABversion = params.ABversion;

        if(params.react != undefined)
            react = params.react;

        if(params.vue != undefined)
            vue = params.vue;
    }

    var renderObj = {
        version: version,
        head: '../Common/Head.html',
        footer: '../Common/Footer.html',
        url: '../Common/URL.html',
        body: '',
        title: 'Erishen Sun',
        keywords: 'erishen',
        description: 'leisun8309@gmail.com',
        restfullApi: restfullApi,
        restfullApiHttps: restfullApi,
        webresourceBaseUrl: webresourceBaseUrl,
        H5BaseUrl: h5BaseUrl,
        urlPrefix: urlPrefix,
        serverPrefix: serverPrefix,
        aresPrefix: aresPrefix,
        controller: reactObj.controller,
        controllerFlag: controllerFlag,
        action: reactObj.action,
        bundleUtil: bundleUtil,
        wrapperDic: wrapperDic,
        ABtest: ABtest,
        ABversion: ABversion,
        react: react,
        vue: vue,
        isRelease: isRelease,
        links: [], // 单独页面可增加的 css 链接, 放在 webresource/build/livestream/css 目录下
        scripts: [], // 单独页面可增加的 script 链接, 放在 webresource/build/livestream/js 目录下
        urls: [] // 显示在 Index 页面下 Demo URL
    };
    //console.log('renderObj', renderObj);
    return renderObj;
};

// 设置路由默认页面
var handleDefaultPage = function(req, res, controller, renderObj, dataArr){
    var suffix = '';
    //console.log('handleDefaultPage', controller, dataArr);

    switch (controller){
        case 'React':
            suffix = 'Home';
            break;
    }

    if(suffix != ''){
        var reactObj = getReactControllerAction(req, controller, suffix);
        //console.log('reactObj', reactObj);

        dataArr = configUtil[reactObj.controller.toLowerCase()];
        //console.log('dataArr', dataArr);

        _.each(dataArr, function(item, index){
            if(item){
                if(reactObj.action.toLowerCase() == item.action.toLowerCase()){
                    var controllerResult = handleController(req, controller, suffix);
                    handleRenderObj(renderObj, item, controllerResult);
                    return true;
                }
            }
        });

        handleRes(req, res, controller, suffix, renderObj);
        return true;
    }

    return false;
};

var getReactControllerAction = function(req, controller, action){
    var newController = controller;
    var newAction = action;
    var baseUrl = req.baseUrl;
    var baseUrls = '';

    if(controller == 'React' && action == 'Home'){
        baseUrls = baseUrl.split(serverPrefix+'/');
    }

    //console.log('getReactControllerAction', baseUrls);

    if(baseUrls != '' && baseUrls.length > 1){
        var newUrl = baseUrls[1];
        var newUrls = newUrl.split('/');

        if(newUrls.length > 0){
            newController = util.firstUpperCase(newUrls[0]);
        }

        if(newUrls.length > 1){
            newAction = util.firstUpperCase(newUrls[1]);
        }
    }

    //console.log('getReactControllerAction_newController', newController, newAction);
    return { controller: newController, action: newAction };
};

// 渲染模板页面
var handleRes = function(req, res, controller, action, renderObj){
    var originalUrl = req.originalUrl;
    var renderHtml = 'Common/Layout.html';
    //console.log('handleRes', controller, action, originalUrl);

    if(renderObj){
        var reactObj = getReactControllerAction(req, controller, action);
        var newController = reactObj.controller;
        var newAction = reactObj.action;
        renderObj.controller = newController;
        renderObj.action = newAction;
        renderObj.body = '../' + controller + '/' + action + '.html';

        if(originalUrl.indexOf(ssrParameter) != -1){
            var newKey = util.firstLowerCase(newController) + newAction;
            //console.log('handleRes', newController, newAction, newKey);

            var seoItem = null;
            var seoIndex = 0;
            _.each(Config, (item, key) =>{
                if(key == newKey){
                    seoItem = item;
                    return true;
                }
                else if(newKey == 'reactHome' && seoIndex == 0){
                    seoItem = item;
                    seoIndex++;
                    return true;
                }
            });

            if(seoItem){
                //console.log('seoItem', seoItem);
                let action = seoItem.action;
                render.handleSSR(seoItem, action, req, res, ()=>{
                    res.render(renderHtml, renderObj);
                });
            }
            else {
                res.render(renderHtml, renderObj);
            }
        }
        else {
            res.render(renderHtml, renderObj);
        }
    }
};

// 设置页面 Links, Scripts, 优先使用 dataArr 设置
var handleRenderObj = function(renderObj, itemObj, controllerObj){
    //console.log('handleRenderObj', itemObj, controllerObj);
    if(renderObj && itemObj){
        var links = itemObj.links;
        var scripts = itemObj.scripts;

        if(links)
            renderObj.links = links;
        else if(controllerObj && controllerObj.links)
            renderObj.links = controllerObj.links;

        if(scripts)
            renderObj.scripts = scripts;
        else if(controllerObj && controllerObj.scripts)
            renderObj.scripts = controllerObj.scripts;
    }
};

// 设置页面 Links, Scripts (通用设置)
var handleController = function(req, controller, action){
    //console.log('handleController', controller, action);
    var result = {};
    var reactObj = getReactControllerAction(req, controller, action);
    var controllerAction = reactObj.controller + reactObj.action;
    //console.log('controllerAction', controllerAction);

    // CSR 可用， SSR 不可用
    switch (controllerAction){
        default:
            break;
    }
    return result;
};

export default {
    handleRoute: handleRoute,
    goRoute: goRoute
}