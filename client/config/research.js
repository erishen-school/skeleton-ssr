/**
 * Created by lei_sun on 2018/7/13.
 */
let obj = {};

obj.getConfig = function(wrapperDic, params) {
    if (wrapperDic == undefined)
        wrapperDic = '';

    wrapperDic = 'wrapper' + wrapperDic;

    let config = {};

    if(1){
        config.researchBootstrap = {
            action: 'research/bootstrap',
            component: require('../../components/research/redux/test/bootstrap').default
        };

        config.researchLazyload = {
            action: 'research/lazyload',
            component: require('../../components/research/redux/test/lazyload').default
        };
    }
    return config;
};

export default obj;