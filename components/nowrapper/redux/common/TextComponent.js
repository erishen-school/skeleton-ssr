/**
 * Created by lei_sun on 2018/6/22.
 */
import React, { Component } from 'react';
import { createSkeletonElement } from '@trainline/react-skeletor';

const H1 = createSkeletonElement('h1');

export default class TextComponent extends Component<{}> {
    render(){
        let { value, color } = this.props;

        if(color == undefined)
            color = 'black';

        if(value == undefined)
            value = '';

        return (
            <H1 style={{ color: color }}>{value}</H1>
        );
    }
}