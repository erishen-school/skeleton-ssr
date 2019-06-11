/**
 * Created by lei_sun on 2018/5/31.
 */
import express from 'express';
import moment from 'moment';
import render from './util/render';
import React from 'react';
import _ from 'lodash';

const wrapperDic = process.env.WRAPPER;
const Config = require(`../../client/config/static`).default.getConfig(wrapperDic);

let router = express.Router();

router.use(function timeLog(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(moment().format('YYYY-MM-DD HH:mm:ss') + ' ' + fullUrl);
    next();
});

const handleConfig = function(item, action){
    if(action == undefined)
        action = '';

    if(item){
        let ssr = (item.ssr == undefined) ? true : item.ssr;

        if(ssr){
            router.get('/' + action, function(req, res) {
                render.handleSSR(item, action, req, res);
            });
        }
    }
};

let index = 0;
_.each(Config, (item, key)=>{
    //console.log(item, key, index);
    if(index == 0)
    {
        handleConfig(item);
    }

    handleConfig(item, item.action);
    index++;
});

export default router;