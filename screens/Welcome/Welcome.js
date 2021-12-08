import React from 'react';
import { View, Animated } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import Hero from '../../components/Hero';
import Login from './Login';



export default function Welcome({}) {

    return (
        <>
            <Hero/>
            <Login/>
        </>
    )
}