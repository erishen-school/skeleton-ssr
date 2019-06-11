/**
 * Created by lei_sun on 2019/6/6.
 */
import React, { Component } from 'react';
import reducers from './reducers'
import * as actions from './actions';
import H1SkeletonComponent from '../../common/H1SkeletonComponent';
import BasePageComponent from '../../common/BasePageComponent';

export default class GithubZeit extends BasePageComponent {
    constructor(props) {
        super(props);
        this.setRedux(reducers, actions);
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });

        if(!this.preloadedState || window.isStatic == 'true'){
            this.action.getGithubZeitNext();
        }
    }

    render(){
        const { zeit } = this.state;
        const { nextObj, loadingStatus } = zeit;
        console.log('nextObj', nextObj, loadingStatus);

        return (
            <div class="github-zeit">
                <H1SkeletonComponent item={nextObj.full_name} loadingStatus={loadingStatus} />
                <H1SkeletonComponent item={nextObj.archive_url} loadingStatus={loadingStatus} />
                <H1SkeletonComponent item={nextObj.assignees_url} loadingStatus={loadingStatus} />
                <H1SkeletonComponent item={nextObj.blobs_url} loadingStatus={loadingStatus} />
                <H1SkeletonComponent item={nextObj.branches_url} loadingStatus={loadingStatus} />
                <H1SkeletonComponent item={nextObj.clone_url} loadingStatus={loadingStatus} />
            </div>
        );
    }
}