/**
 * Created by lei_sun on 2018/6/22.
 */
import React, { Component } from 'react';

export default class NoMatchComponent extends Component<{}> {
    componentWillMount(){
        window.location.href = 'https://erishen.github.io';
    }

    render(){
        return (
            <label>{''}</label>
        );
    }
}