/**
 * Created by lei_sun on 2019/6/6.
 */
import fetch from '../helper/fetch';

var serviceObj = {};

serviceObj.getGithubZeitNext = function() {
    return new Promise((resolve, reject)=>{
        if(window.isStatic !== 'true'){
            fetch.ajaxDirectGetPromise('https://api.github.com/repos/zeit/next.js', {}).then(resolve).catch(reject);
        }
    });
};

export default serviceObj;