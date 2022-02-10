import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

export default function Reviews({detail}) {

    return (
        <View style={styles.container}>
            <Text style={[GlobalStyles.text, styles.title]}>Reviews</Text>
            <View style={styles.subContainer}>
                <Image style={styles.image} source={{uri: detail.reviews[0].user.image_url}}/>
                <Text style={[GlobalStyles.text, styles.text]}>{detail.reviews[0].text}</Text>
            </View>
            <View style={styles.subContainer}>
                <Image style={styles.image} source={{uri: detail.reviews[1].user.image_url}}/>
                <Text style={[GlobalStyles.text, styles.text]}>{detail.reviews[1].text}</Text>
            </View>
            <View style={styles.subContainer}>
                <Image style={styles.image} source={{uri: detail.reviews[2].user.image_url}}/>
                <Text style={[GlobalStyles.text, styles.text]}>{detail.reviews[2].text}</Text>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {               
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',        
        margin: 10,        
        flex: 1
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',    
        marginBottom: 10            
    },
    title: {
        fontWeight: '200',
        fontSize: 20,
        color: 'white'
    },  
    text: {
        color: 'white',
        fontSize: 10,
        flex: 1
    },
    image: {
        width: 50,        
        height: 50,
        borderRadius: 25
    }
})