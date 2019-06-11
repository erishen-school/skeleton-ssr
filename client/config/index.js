/**
 * Created by lei_sun on 2018/6/7.
 */
import researchObj from './research';

let obj = {};

/*
    params: {
        isHybrid: false/true  // 是否是 hybrid 方式
    }
 */
obj.getConfig = function(wrapperDic, params){
    if(params == undefined)
        params = {};

    let wrapperDicArr = [];

    if(wrapperDic.indexOf('.') != -1){
        wrapperDicArr = wrapperDic.split('.');
        wrapperDic = '.' + wrapperDicArr[1];
    } else {
        wrapperDic = '';
    }

    //console.log('wrapperDic', wrapperDic);

    let config = {};

    if(1){
        // ssr => default true, can set false.
        config.test = {
            action: 'test',
            component: require('../../components/nowrapper/redux/test/index').default,
            preloadedState: { pageNum: 20 }
        };
    }

    return {
        ...config,
        ...(researchObj.getConfig(wrapperDic, params))
    };
};

export default obj;