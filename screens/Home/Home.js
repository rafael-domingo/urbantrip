import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

export default function Home({}) {
    return (
        <View
            style={styles.container}
        >
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(24, 28, 47)',
    }  
})