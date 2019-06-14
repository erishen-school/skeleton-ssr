/**
 * Created by lei_sun on 2019/6/6.
 */
import mathService from '../../../services/mathService';
import {
    GET_MATH_QUIZ, GET_MATH_QUIZ_SUCCEEDED, GET_MATH_QUIZ_FAILED,
    GET_MATH_QUIZ_ITEMS, GET_MATH_QUIZ_ITEMS_SUCCEEDED, GET_MATH_QUIZ_ITEMS_FAILED,
    SET_MATH_QUIZ_ITEMS, SET_MATH_QUIZ_ITEMS_SUCCEEDED, SET_MATH_QUIZ_ITEMS_FAILED
} from './constants';

export const getMathQuiz = () => {
    return function(dispatch){
        dispatch({
            type: GET_MATH_QUIZ
        });

        mathService.getMathQuiz().then((response) => {
            let params = {
                quizObj: null
            };

            if(response){
                params.quizObj = response;
            }

            dispatch({
                type: GET_MATH_QUIZ_SUCCEEDED,
                ...params
            });
        }).catch((e)=>{
            dispatch({
                type: GET_MATH_QUIZ_FAILED,
                message: e.message
            });
        });
    };
};

export const getMathQuizItems = () => {
    return function(dispatch){
        dispatch({
            type: GET_MATH_QUIZ_ITEMS
        });

        mathService.getMathQuizItems().then((response) => {
            let params = {
                answerObj: null
            };

            if(response){
                params.answerObj = response;
            }

            dispatch({
                type: GET_MATH_QUIZ_ITEMS_SUCCEEDED,
                ...params
            });
        }).catch((e)=>{
            dispatch({
                type: GET_MATH_QUIZ_ITEMS_FAILED,
                message: e.message
            });
        });
    };
};

export const setMathQuizItems = (obj) => {
    return function(dispatch){
        dispatch({
            type: SET_MATH_QUIZ_ITEMS
        });

        mathService.setMathQuizItems(obj).then((response) => {
            let params = {
                answerObj: null
            };

            if(response){
                params.answerObj = response;
            }

            dispatch({
                type: SET_MATH_QUIZ_ITEMS_SUCCEEDED,
                ...params
            });
        }).catch((e)=>{
            dispatch({
                type: SET_MATH_QUIZ_ITEMS_FAILED,
                message: e.message
            });
        });
    };
}