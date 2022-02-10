import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import GlobalStyles from '../../util/GlobalStyles';

export default function Categories({detail}) {

    return (
        <ScrollView 
            showsHorizontalScrollIndicator={false} 
            horizontal 
            style={styles.container}
        >
            {
                detail.detail.categories !== undefined && (
                    detail.detail.categories.map((item, index) => {
                        return (
                            <View key={index} style={styles.subContainer}>
                                <Text style={[GlobalStyles.text, styles.text]}>{item.title}</Text>
                            </View>
                        )
                    })
                )
            }            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10
    },  
    subContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,      
        padding: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5 
    },
    text: {
        color: 'rgb(24,28,47)',
        fontSize: 10
    }
})