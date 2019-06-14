/**
 * Created by lei_sun on 2019/6/6.
 */
import React, { Component } from 'react';
import reducers from './reducers'
import * as actions from './actions';
import H1SkeletonComponent from '../../common/H1SkeletonComponent';
import BasePageComponent from '../../common/BasePageComponent';
import util from '../../../helper/util'

export default class ApiopenVideoRecommend extends BasePageComponent {
    constructor(props) {
        super(props);
        this.setRedux(reducers, actions);
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });

        if(!this.preloadedState || window.isStatic == 'true'){

        }
    }

    render(){
        const { videoRecommend } = this.state;
        const { recommendObj, loadingStatus } = videoRecommend;
        console.log('recommendObj', recommendObj, loadingStatus);

        return (
            <div class="apiopen-videoRecommend">
                <H1SkeletonComponent item={recommendObj.length} loadingStatus={loadingStatus} />
            </div>
        );
    }
}