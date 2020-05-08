/**
 * Created by lei_sun on 2018/6/1.
 */
import _ from 'lodash';
import projectConfig from '../../config/project';
import version from '../../config/version';
import { staticVersion } from '../../config/version';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fetch from '../../service/fetch';
import configUtil from './config';
import bundleUtil from './bundleConfig';
import controllerConfig from '../../config/controller';
const minify = require('html-minifier').minify;

const RELEASE_STR = '.release';
const isDevelopment = process.env.DEVELOPMENT;
const WRAPPER = process.env.WRAPPER;
const isRelease = process.env.RELEASE;
const appConfig = require('../../../app.config');
const appEnv = appConfig.Env;
const uatAPIURL = '';
const proAPIURL = '';
const title = 'Erishen Sun';
const keywords = 'erishen';
const description = 'leisun8309@gmail.com';

let restfullApi = uatAPIURL;
let restfullApiHttps = uatAPIURL;
const serverUrls = projectConfig.serverUrls;
let aresPrefix = projectConfig.aresPrefix.uat;
let serverPrefix = projectConfig.serverPrefix;

if(appEnv == 'pro' || appEnv == 'prd')
{
    restfullApi = proAPIURL;
    restfullApiHttps = proAPIURL;
    //aresPrefix = projectConfig.aresPrefix.pro;
}

let obj = {};
obj.renderFullPage = function(params){
    let pageVersion = version;
    let wrapperDic = WRAPPER;
    //console.log('isRelease', isRelease);

    if(isRelease){
        if(WRAPPER.indexOf(RELEASE_STR) == -1){
            wrapperDic += RELEASE_STR;
        }
    }
    else {
        if(WRAPPER.indexOf(RELEASE_STR) != -1){
            wrapperDic = WRAPPER.split(RELEASE_STR)[0];
        }
    }

    const { component, action, queryRelease, originalUrl } = params;
    let { preloadedState, ssr, isStatic } = params;

    if(ssr == undefined)
        ssr = 'true';

    if(isStatic == undefined)
        isStatic = 'false';

    if(preloadedState == undefined)
        preloadedState = {};

    //console.log('queryRelease', queryRelease);
    if(queryRelease){
        if(wrapperDic.indexOf(RELEASE_STR) == -1){
            wrapperDic += RELEASE_STR;
        }
        pageVersion = staticVersion();
        //aresPrefix = projectConfig.aresPrefix.pro;
    }

    if(isDevelopment == 1){
        if(wrapperDic.indexOf(RELEASE_STR) != -1){
            wrapperDic = wrapperDic.split(RELEASE_STR)[0];
        }
    }

    //console.log('wrapperDic', wrapperDic);

    //if((!isRelease && !queryRelease) || (isDevelopment == 1)){
        _.each(serverUrls, (item, key) => {
            const url = item.url;
            if(originalUrl.indexOf('/' + url + '/') != -1){
                serverPrefix = serverPrefix.replace('*', url);
                return true;
            }
        });

        //console.log('serverPrefix', serverPrefix);
        aresPrefix = serverPrefix;
    //}

    const webresourceBaseUrl = `${aresPrefix}/webresource/`;

    let cssHref = '';
    let scriptHref = '';
    let bundleHref = 'react';
    //console.log('action', action);

    let actionPrefix = '';
    let actionSuffix = '';
    let actionPrefixFlag = false;
    const actionArr = action.split('/');

    if(actionArr.length > 0)
        actionPrefix = actionArr[0].toLowerCase();

    if(actionArr.length > 1)
        actionSuffix = actionArr[1].toLowerCase();

    if(actionPrefix != '' && actionSuffix != ''){
        const configArr = configUtil[actionPrefix];
        _.each(configArr, (item, key)=>{
            if(item.action.toLowerCase() == actionSuffix){
                const links = item.links;
                const scripts = item.scripts;

                if(links){
                    let linkContent = [];
                    _.each(links, (linkItem, linkKey)=>{
                        linkContent.push(`<link rel="stylesheet" href="${webresourceBaseUrl}css/${linkItem}?v=${pageVersion}" />`);
                    });
                    cssHref = `${linkContent.join('')}`;
                }

                if(scripts){
                    let scriptContent = [];
                    _.each(scripts, (scriptItem, scriptKey)=>{
                        scriptContent.push(`<script type="text/javascript" src="${webresourceBaseUrl}js/${scriptItem}?v=${pageVersion}"></script>`);
                    });
                    scriptHref = `${scriptContent.join('')}`;
                }
            }
        });

        _.each(controllerConfig.entrys, (item, index)=>{
            if(actionPrefix.toLowerCase() == item && item != 'react'){
                actionPrefixFlag = true;
                return false;
            }
        });

        if(actionPrefix == 'entry'){
            cssHref = `
                ${cssHref}
                <style>
                     html{
                          font-size: 100px;
                          font-size: 26.67vw;
                     }
                </style>
            `
        }
        else if(actionPrefix == 'research'){
            cssHref = `
                ${cssHref}
                <link rel="stylesheet" href="${aresPrefix}/css/bootstrap.min.css?v=${pageVersion}" />
            `;
        }
        else if(actionPrefixFlag){
            bundleHref = actionPrefix;
        }
    }

    let the3rdScript = `
        <script type="text/javascript" src="${aresPrefix}/js/vendor.453dc92ef6a2d33a9de0.js?v=${pageVersion}"></script>
    `;
    let bundleScripts = [];

    if(isDevelopment != 1){
        if(isRelease || queryRelease){
            the3rdScript = `
                <script type="text/javascript" src="${aresPrefix}/js/react.production.min.js?v=${pageVersion}"></script>
                <script type="text/javascript" src="${aresPrefix}/js/react-dom.production.min.js?v=${pageVersion}"></script>
                <script type="text/javascript" src="${aresPrefix}/js/vendor.a12694cb16fe497c7e63.js?v=${pageVersion}"></script>
            `;

            if(bundleUtil){
                if(actionPrefixFlag){
                    _.each(bundleUtil[actionPrefix], (item, index)=>{
                        bundleScripts.push(`
                            <script src="${aresPrefix}/page/${item}/bundle.js?v=${pageVersion}" type="text/javascript"></script>
                        `);
                    });
                } else {
                    _.each(bundleUtil['react'], (item, index)=>{
                        bundleScripts.push(`
                            <script src="${aresPrefix}/page/${item}/bundle.js?v=${pageVersion}" type="text/javascript"></script>
                        `);
                    });
                }
            }
        }
    }

    let html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="dns-prefetch" href="//www.github.com">
    <meta name="keywords" content=${keywords} />
    <meta name="description" content=${description} />
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
    <link rel="stylesheet" href="${aresPrefix}/page/${bundleHref}/index.css?v=${pageVersion}" />
    <meta name="appBaseUrl" content="${aresPrefix}/" />
    <meta name="format-detection" content="telephone=no"/>
    <meta name="webresourceBaseUrl" content=${webresourceBaseUrl} />
    <meta name="restfullApi" content=${restfullApi} />
    <meta name="restfullApiHttps" content=${restfullApiHttps} />

    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait" />
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait" />
    <!-- SEO -->
    <meta name="applicable-device" content="mobile" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    
    ${cssHref}
    
    <script type="text/javascript">
        window.ssr = '${ssr}';
        window.isStatic = '${isStatic}';
        window.wrapperDic = '${wrapperDic}';
    </script>
</head>

<body onselectstart="return false" style="overflow-y: auto">
    <div id="headerview" style="display: none;">
        <header id="main_header" class="common_header"></header>
    </div>

    <div id="main">
        <div class="main-frame">
            <div class="main-viewport">
                    <div id="app"><div>${component}</div></div>
            </div>
            <div class="main-state"></div>
        </div>
    </div>
    <div id="footer"></div>
    
    <script>
          // 警告：关于在 HTML 中嵌入 JSON 的安全问题，请查看以下文档
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
    </script>
    
    ${scriptHref}

    ${the3rdScript}
    
    <script src="${aresPrefix}/js/commonUtil.js?v=${pageVersion}" pd_init="1"></script>
    
    ${bundleScripts.join('')}
    
    <script src="${aresPrefix}/page/${bundleHref}/bundle.js?v=${pageVersion}" type="text/javascript"></script>
</body>
</html>
    `

    return minify(html, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });
};

obj.handleSSR = function(item, action, req, res, callback){
    const self = this;
    const originalUrl = req.originalUrl;
    if(item){
        const component = ReactDOMServer.renderToString(<item.component />);
        const ssr = (item.ssr == undefined) ? true : item.ssr;
        const preloadedState = item.preloadedState;
        const apiFunc = item.apiFunc;

        const commonObj = {
            originalUrl: originalUrl,
            component: component,
            action: action
        };

        if(ssr){
            if(!apiFunc){
                res.end(self.renderFullPage({
                    preloadedState: preloadedState,
                    ...commonObj
                }));
            }
            else {
                apiFunc(fetch, req, res).then((preloadedState)=>{
                    res.end(self.renderFullPage({
                        preloadedState: preloadedState,
                        ...commonObj
                    }));
                }).catch((err)=>{
                    console.log('apiFunc_err', err);
                    res.end(self.renderFullPage({
                        ...commonObj
                    }));
                });
            }
        }
        else {
            return callback && callback();
        }
    }
    else {
        return callback && callback();
    }
};

export default obj;