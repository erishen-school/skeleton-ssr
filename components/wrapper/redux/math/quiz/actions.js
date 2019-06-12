/**
 * Created by lei_sun on 2019/6/6.
 */
import apiopenService from '../../../services/apiopenService';
import {
    GET_APIOPEN_VIDEO_RECOMMEND, GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED, GET_APIOPEN_VIDEO_RECOMMEND_FAILED
} from './constants';

export const getApiopenVideoRecommend = (obj) => {
    return function(dispatch){
        dispatch({
            type: GET_APIOPEN_VIDEO_RECOMMEND
        });

        apiopenService.getApiopenVideoRecommend(obj).then((response) => {
            let params = {
                recommendObj: null
            };

            if(response){
                params.recommendObj = response.result;
            }

            dispatch({
                type: GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED,
                ...params
            });
        }).catch((e)=>{
            dispatch({
                type: GET_APIOPEN_VIDEO_RECOMMEND_FAILED,
                message: e.message
            });
        });
    };
};