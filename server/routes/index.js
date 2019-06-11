import projectConfig from '../config/project';
import slbRouter from './slbhealthcheck';
import apiRouter from './api';
import ssrRouter from './ssr';
import staticRouter from './static';
import utilRouter from './util';
import _ from 'lodash';

const serverPrefix = projectConfig.serverPrefix;
const serverUrls = projectConfig.serverUrls;

const utilGoRouter = function(controller, params){
    if(params == undefined){
        params = {};
    }

    if(controller == 'react'){
        params.react = true;
    }

    return utilRouter.goRoute(controller, params);
};

const indexRouter = function(){
    return utilGoRouter('react');
};

export default function(app){
    app.use('/', indexRouter());

    _.each(serverUrls, (item, key)=>{
        const url = item.url;
        const ssr = item.ssr;

        if(serverPrefix != '') {
            const replaceUrl = serverPrefix.replace('*', url);

            if (ssr) {
                app.use(replaceUrl + '/', ssrRouter);
            }
            else {
                app.use(replaceUrl + '/', indexRouter());
            }

            app.use(replaceUrl + '/slbhealthcheck*', slbRouter);
            app.use(replaceUrl + '/api', apiRouter);
            app.use(replaceUrl + '/static', staticRouter);

            if (ssr) {
                app.use(replaceUrl + '/*', ssrRouter);
            }
            else {
                app.use(replaceUrl + '/*', indexRouter());
            }
        }
    });
};
