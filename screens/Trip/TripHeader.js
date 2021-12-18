import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

export default function TripHeader({trip, navigation, setShowButtons, showButtons}) {
    
    return (
        <View
            style={styles.container}
        >
            <BlurView
                intensity={100}
                tint='default'
                style={styles.blurview}
            >                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Entypo name="arrow-left" size={30} color="black"/>   
                </TouchableOpacity>
                <View>
                    <Text
                        style={[
                            GlobalStyles.text,
                            styles.tripName
                        ]}
                    >
                        {trip.tripName}
                    </Text>          
                    <Text
                        style={[
                            GlobalStyles.text,
                            styles.tripLocation
                        ]}
                    >
                        {trip.trip.cityName}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowButtons(!showButtons)}
                >
                    <Ionicons name="information-circle" size={30} color="black"/>                
                </TouchableOpacity>
            </BlurView>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        zIndex: 15,
        height: '15%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',        
    },
    tripName: {
        textAlign: 'center',        
        fontSize: 25,
        fontWeight: 'bold'
    },
    tripLocation: {
        fontSize: 15,
        fontWeight: '300',        
    },  
    button: {
        zIndex: 15
    },  
    blurview: {
        width: '90%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 20,
        overflow: 'hidden',        
    },
})