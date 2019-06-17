/**
 * Created by lei_sun on 2019/6/6.
 */
import React, { Component } from 'react';
import reducers from './reducers'
import * as actions from './actions';
import H1SkeletonComponent from '../../common/H1SkeletonComponent';
import BasePageComponent from '../../common/BasePageComponent';
import util from '../../../helper/util'
import _ from 'lodash'

export default class MathQuiz extends BasePageComponent {
    constructor(props) {
        super(props);
        this.setRedux(reducers, actions);
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });

        this.state.popupFlag = false;
        this.state.answerFlag = false;

        if(!this.preloadedState || window.isStatic == 'true'){
            this.action.getMathQuiz();
            this.action.getMathQuizItems();
        }
    }

    clickRow(e, item){
        console.log('clickRow', $(e.target));
        const currentBackgroundColor = $(e.target).css('background-color');

        if(currentBackgroundColor == 'rgb(255, 193, 193)'){
            $(e.target).css('background-color', 'rgb(238, 180, 180)');
        } else if(currentBackgroundColor == 'rgb(255, 106, 106)'){
            $(e.target).css('background-color', 'rgb(238, 99, 99)');
        }

        setTimeout(()=> {
            const { quiz } = this.state;
            const { quizObj } = quiz;
            //console.log('clickRow', item);

            let answerFlag = false;
            if(item == quizObj.answer){
                answerFlag = true;
                quizObj.isRight = true;
            }

            quizObj.userAnswer = item;
            this.action.setMathQuizItems(quizObj);
            this.action.getMathQuiz();

            this.setState({
                popupFlag: true,
                answerFlag: answerFlag
            });
            $('.question-select-row').css('background-color', '');
        }, 500);

        setTimeout(()=>{
            this.setState({
                popupFlag: false
            });
        }, 2500);
    }

    clickPopup(){
        const { popupFlag } = this.state;
        console.log('popupFlag', popupFlag);

        this.setState({
            popupFlag: !popupFlag
        });
    }

    getQuestionSelectRow(selection){
        let content = [];
        _.each(selection, (item, index)=>{
            if(item != undefined){
                let evenClass = '';
                if(index % 2 == 0)
                    evenClass = 'even';

                content.push(
                    <div key={"selection"+index} class={"question-select-row " + evenClass} onClick={(e)=>this.clickRow(e, item)}>
                        <p>{item}</p>
                    </div>
                );
            }
        });
        return content;
    }

    render(){
        const { quiz, popupFlag, answerFlag } = this.state;
        const { quizObj, answerObj } = quiz;
        const { rightLen, currentLen } = answerObj;

        let rightRatio = 0;
        if(currentLen > 0){
            rightRatio = parseInt(rightLen / currentLen * 100, 10);
        }

        return (
            <div class="math-quiz">
                <div class="wrapper">
                    <div class="quiz-area">
                        <div class="question-row">
                            <p>{quizObj.num1} {quizObj.operator} {quizObj.num2} = ?</p>
                        </div>
                        <div class="question-select-area">
                            {this.getQuestionSelectRow(quizObj.selection)}
                        </div>
                    </div>
                    {currentLen > 0 && <div class="answer-area">
                        答题正确数: {rightLen} / {currentLen}   准确率: {rightRatio}%
                    </div>}
                </div>
                {popupFlag && <div class="popup" onClick={()=>this.clickPopup()}>
                    <div class="content">
                        <div class="wrapper">
                            {answerFlag ? "恭喜你答对了" : "再接再励，继续努力"}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}