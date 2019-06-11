import React, { Component } from 'react';
import { createSkeletonProvider } from '@trainline/react-skeletor';
import { createSkeletonElement } from '@trainline/react-skeletor';

const H1 = createSkeletonElement('h1');

const H1Component = ({ item })=>{
    return (
        <div>
            <H1>{item}</H1>
        </div>
    )
}

const H1SkeletonComponent = createSkeletonProvider(
    {
        item: '_______'
    },
    ({ loadingStatus }) => (loadingStatus === 'loading' || loadingStatus === undefined),
    () => ({
        color: '#f2f2f2',
        backgroundColor: '#f2f2f2'
    })
)(H1Component)

export default H1SkeletonComponent