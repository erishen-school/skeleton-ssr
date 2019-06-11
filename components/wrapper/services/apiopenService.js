/**
 * Created by lei_sun on 2019/6/10.
 */
import fetch from '../helper/fetch';

var serviceObj = {};

serviceObj.getApiopenVideoRecommend = function(id) {
    return new Promise((resolve, reject)=>{
        fetch.ajaxDirectGetPromise('https://api.apiopen.top/videoRecommend?id=' + id, {}).then(resolve).catch(reject);
    });
};

export default serviceObj;