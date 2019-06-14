/**
 * Created by lei_sun on 2019/6/14.
 */
import fetch from '../helper/fetch';
import util from '../helper/util';
import _ from 'lodash';

var serviceObj = {};

serviceObj.getMathQuiz = function() {
    return new Promise((resolve, reject)=>{
        if(typeof window != 'undefined') {
            let currentItem = window.localStorage.getItem('MATH_QUIZ_CURRENT_ITEM');
            if(currentItem == undefined){
                const operators = ['+', '-'];
                let operatorRandom = util.getRandomNum(0, 1);
                let num1 = util.getRandomNum(1, 20);
                let num2 = util.getRandomNum(1, 20);
                let numTemp = 0;
                let numOperator = '+';
                let answer = 0;
                let selection = [];

                if (operators[operatorRandom] != undefined) {
                    numOperator = operators[operatorRandom];
                }

                if (numOperator == '-' && num2 > num1) {
                    numTemp = num1;
                    num1 = num2;
                    num2 = numTemp;
                }

                switch (numOperator) {
                    case '+':
                        answer = num1 + num2;
                        selection.push(util.getRandomNum(1, 40));
                        selection.push(answer + 1);
                        selection.push(answer - 1);
                        selection.push(answer);
                        selection = _.shuffle(selection);
                        break;
                    case '-':
                        answer = num1 - num2;
                        selection.push(util.getRandomNum(1, 30));
                        selection.push(answer + 1);
                        if (answer > 1)
                            selection.push(answer - 1);
                        else
                            selection.push(answer + 2);
                        selection.push(answer);
                        selection = _.shuffle(selection);
                        break;
                }

                console.log('getMathQuiz', num1, numOperator, num2, answer, selection);

                const quizObj = {
                    num1: num1,
                    num2: num2,
                    operator: numOperator,
                    selection: selection,
                    answer: answer
                };

                window.localStorage.setItem('MATH_QUIZ_CURRENT_ITEM', JSON.stringify(quizObj));
                resolve(quizObj);
            }
            else {
                currentItem = JSON.parse(currentItem);
                resolve(currentItem);
            }
        }
    });
};

serviceObj.getMathQuizItems = function(){
    return new Promise((resolve, reject)=>{
        if(typeof window != 'undefined'){
            let currentItems = window.localStorage.getItem('MATH_QUIZ_ITEMS');

            if(currentItems == undefined){
                currentItems = [];
            } else {
                currentItems = JSON.parse(currentItems);
            }

            const rightItems = _.filter(currentItems, function(o) {
                return o.isRight;
            });

            resolve({
                rightLen: rightItems.length,
                currentLen: currentItems.length
            });
        }
    });
};

serviceObj.setMathQuizItems = function(obj){
    return new Promise((resolve, reject)=>{
        console.log('setMathQuizItems', obj);

        if(typeof window != 'undefined'){

            let currentItems = window.localStorage.getItem('MATH_QUIZ_ITEMS');

            if(currentItems == undefined){
                currentItems = [];
            } else {
                currentItems = JSON.parse(currentItems);
            }

            console.log('currentItems', currentItems);

            if(currentItems.length >= 100)
                currentItems.shift();

            currentItems.push(obj);

            const rightItems = _.filter(currentItems, function(o) {
                return o.isRight;
            });
            console.log('rightItems', rightItems);
            window.localStorage.setItem('MATH_QUIZ_ITEMS', JSON.stringify(currentItems));
            window.localStorage.removeItem('MATH_QUIZ_CURRENT_ITEM');

            resolve({
                rightLen: rightItems.length,
                currentLen: currentItems.length
            });
        }
    });
};

export default serviceObj;