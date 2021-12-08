import React from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';
import PhoneLogin from './PhoneLogin';

export default function Login({}) {
    const handlePhoneInput = (value) => {

    };

    return (
        <View>
            <PhoneLogin handlePhoneInput={handlePhoneInput}/>
        </View>
    )
}

const styles = StyleSheet.create({

})