/**
 * Created by lei_sun on 2019/6/6.
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
        config.githubZeit = {
            action: 'github/zeit',
            component: require('../../components/'+wrapperDic+'/redux/github/zeit/index').default,
            apiFunc: function(fetch, req, res){
                return new Promise((resolve, reject)=> {
                    fetch.getDirect('https://api.github.com/repos/zeit/next.js', {}, req, res, true).then((response) => {
                        resolve({
                            zeit: {
                                nextObj: response,
                                loadingStatus: 'done'
                            }
                        });
                    }).catch((err) => {
                        reject(err);
                    });
                });
            }
        };
    }

    return {
        ...config
    };
};

export default obj;