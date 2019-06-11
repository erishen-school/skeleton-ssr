/**
 * Created by lei_sun on 2019/6/10.
 */
import React, { Component } from 'react';
import commonStore from '../store';

export default class BasePageComponent extends Component<{}> {
    constructor(props) {
        super(props);
        this.preloadedState = undefined;
        if (typeof window !== 'undefined') {
            this.preloadedState = window.__PRELOADED_STATE__;
        }
    }

    setRedux(reducers, actions, sagas){
        this.store = commonStore.createStoreWithMiddleware(reducers, this.preloadedState);
        this.state = this.store.getState();

        if(sagas != undefined){
            actions = sagas;
            const sagaMiddleware = commonStore.sagaMiddleware;
            sagaMiddleware.run(sagas.mySaga);
        }

        this.action = commonStore.createAction(actions, this.store.dispatch);
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }
}