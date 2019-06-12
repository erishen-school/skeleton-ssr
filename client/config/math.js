/**
 * Created by lei_sun on 2019/6/12.
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
        config.mathQuiz = {
            action: 'math/quiz',
            component: require('../../components/'+wrapperDic+'/redux/math/quiz/index').default
        };
    }

    return {
        ...config
    };
};

export default obj;
