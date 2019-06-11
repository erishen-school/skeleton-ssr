/**
 * Created by lei_sun on 2018/7/12.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import projectConfig from '../../server/config/project';

const serverPrefix = projectConfig.serverPrefix;
const serverUrls = projectConfig.serverUrls;
const locationHref = window.location.href;
const wrapperDic = window.wrapperDic;
const NoMatch = require('../../components/' + wrapperDic + '/redux/common/NoMatchComponent.js').default;

let obj = {};

obj.setFrontRoute = function(Config){
    if(document.getElementById('app') != null){
        let basename = '';
        _.each(serverUrls, (item, key)=>{
            const url = item.url;
            if(locationHref.indexOf('/' + url + '/') != -1){
                basename = serverPrefix.replace('*', url);
                return true;
            }
        });

        if(basename == '')
            basename = serverPrefix.replace('*', 'webapp');

        if(window.isStatic == 'true'){
            basename += projectConfig.hybridDictionary;
        }
        //console.log('basename', basename);

        let content = [];
        let index = 0;
        _.each(Config, (item, key)=>{
            //console.log(item, key, index);
            let action = item.action;
            let component = item.component;
            let path = '/' + action;

            if(window.isStatic == 'true'){
                path += '.html';
            }

            if(index == 0){
                content.push(
                    <Route key={key+index} exact path="/" component={component} />
                );
            }

            content.push(
                <Route key={key+index} path={path} component={component} />
            );
            index++;
        });

        let router = (
            <BrowserRouter basename={basename}>
                <Switch>
                    {content}
                    <Route component={NoMatch} />
                </Switch>
            </BrowserRouter>
        );

        ReactDOM.render(router, document.getElementById('app'));
    }
};

export default obj;