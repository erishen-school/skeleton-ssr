/**
 * Created by lei_sun on 2019/6/10.
 */
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

    wrapperDic = 'wrapper' + wrapperDic;
    //console.log('wrapperDic', wrapperDic);

    let config = {};

    if(1){
        config.apiopenVideoRecommend = {
            action: 'apiopen/videoRecommend',
            component: require('../../components/'+wrapperDic+'/redux/apiopen/videoRecommend/index').default
        };
    }

    return {
        ...config
    };
};

export default obj;
