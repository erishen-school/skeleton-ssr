import index from './index'
import github from './github'
import apiopen from './apiopen'

var obj = {};

obj.getConfig = function(wrapperDic, params){
    return {
        ...index.getConfig(wrapperDic, params),
        ...github.getConfig(wrapperDic, params),
        ...apiopen.getConfig(wrapperDic, params)
    };
};

export default obj;