/**
 * Created by lei_sun on 2017/11/6.
 */
import React, { Component } from 'react';
import rootReducer from './reducers'
import * as actions from './actions';
import commonStore from '../store';
import TextComponent from '../common/TextComponent';
import { createSkeletonProvider } from '@trainline/react-skeletor';

const DetailPage = ({ pageNum }) => {
    return (
        <div className="column">
            <div><TextComponent value={pageNum} /></div>
            <div><TextComponent color={'red'} value={pageNum} /></div>
        </div>
    );
};

const DetailPageWrapper = createSkeletonProvider(
    // Dummy data with a similar shape to the component's data
    {
        pageNum: '_______'
    },
    // Predicate that returns true if component is in a loading state
    ({ loadingStatus }) => loadingStatus === 'loading',
    // Define the placeholder styling for the children elements,
    () => ({
        width: 300,
        color: '#C0C0C0',
        backgroundColor: '#C0C0C0'
    })
)(DetailPage);

export default class Test extends Component<{}> {
    constructor(props){
        super(props);
        this.preloadedState = undefined;
        if (typeof window !== 'undefined') {
            this.preloadedState = window.__PRELOADED_STATE__;
        }

        this.store = commonStore.createStoreWithMiddleware(rootReducer, this.preloadedState);
        this.state = this.store.getState();
        this.action = commonStore.createAction(actions, this.store.dispatch);
    }

    componentWillMount() {
        //console.log('state', this.state);
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });

        if(!this.preloadedState || window.isStatic == 'true'){
            this.action.initPageInfo();
        }
        this.action.finishLoading();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let { pageNum, loadingStatus } = this.state;

        return (
            <div className="test">
                <div key="content">
                    <DetailPageWrapper pageNum={pageNum} loadingStatus={loadingStatus} />
                    <div className="row">
                        <button onClick={()=>this.action.addPageNum()}> + </button>
                        <button onClick={()=>this.action.subtractPageNum()}> - </button>
                    </div>
                </div>
            </div>
        );
    }
}