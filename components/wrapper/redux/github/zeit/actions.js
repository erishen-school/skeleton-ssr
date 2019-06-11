/**
 * Created by lei_sun on 2019/6/6.
 */
import githubService from '../../../services/githubService';
import {
    GET_GITHUB_ZEIT_NEXT, GET_GITHUB_ZEIT_NEXT_SUCCEEDED, GET_GITHUB_ZEIT_NEXT_FAILED
} from './constants';

export const getGithubZeitNext = (obj) => {
    return function(dispatch){
        dispatch({
            type: GET_GITHUB_ZEIT_NEXT
        });

        githubService.getGithubZeitNext(obj).then((response) => {
            let params = {
                nextObj: null
            };

            if(response){
                params.nextObj = response;
            }

            dispatch({
                type: GET_GITHUB_ZEIT_NEXT_SUCCEEDED,
                ...params
            });
        }).catch((e)=>{
            dispatch({
                type: GET_GITHUB_ZEIT_NEXT_FAILED,
                message: e.message
            });
        });
    };
};