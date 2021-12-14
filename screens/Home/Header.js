import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { Ionicons } from '@expo/vector-icons';

export default function Header({}) {
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.button}
            >
                <Ionicons 
                    name="ios-add-circle-outline" 
                    size={24} 
                    color="white"
                />
                <Text 
                    style={[
                        GlobalStyles.text,
                        styles.text
                    ]}
                >
                    New Trip
                </Text>
            </TouchableOpacity>
            <Text
                style={[
                    GlobalStyles.text,
                    styles.logo
                ]}
            >
                urbantrip
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',                
        flex: 0.5
    },
    button: {
        flexDirection: 'row',
        marginLeft: 20
    },  
    text: {
        fontSize: 20,
        color: 'white',
        marginLeft: 5
    },
    logo: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 20
    }
})