import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MapCard from './MapCard';

export default function MapList({}) {
    return (
        <View
            style={styles.container}
        >
            <MapCard/>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})