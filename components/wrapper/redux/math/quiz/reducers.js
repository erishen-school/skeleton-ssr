/**
 * Created by lei_sun on 2019/6/6.
 */
import { combineReducers } from 'redux';
import _ from 'lodash';
import {
    GET_MATH_QUIZ_SUCCEEDED,
    GET_MATH_QUIZ_ITEMS_SUCCEEDED,
    SET_MATH_QUIZ_ITEMS_SUCCEEDED
} from './constants';

const quizState = {
    quizObj: {
        num1: 0,
        num2: 0,
        operator: '+',
        selection: [0,0,0,0],
        answer: 0
    },
    answerObj: {
        rightLen: 0,
        currentLen: 0
    },
    loadingStatus: 'loading'
};

const quiz = (state = quizState, action) => {
    let newState = _.cloneDeep(state);

    switch (action.type) {
        case GET_MATH_QUIZ_SUCCEEDED:
            newState.quizObj = action.quizObj;
            newState.loadingStatus = 'done';
            return newState;
        case GET_MATH_QUIZ_ITEMS_SUCCEEDED:
            newState.answerObj = action.answerObj;
            return newState;
        case SET_MATH_QUIZ_ITEMS_SUCCEEDED:
            newState.answerObj = action.answerObj;
            return newState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    quiz
});

export default rootReducer;