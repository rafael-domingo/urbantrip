import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';
import Map from './Map';
import TripCarousel from './TripCarousel';

export default function Trip({route, navigation}) {
    const {trip} = route.params;    
    return (
        <View
            style={styles.container}
        >
            <Map
                trip={trip}
            />
            <SafeAreaView
                style={styles.safeAreaContainer}
            >        
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text>Trip View</Text>
                <TripCarousel
                    trip={trip}
                />
            </SafeAreaView>
        </View>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,        
    },  
    safeAreaContainer: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
    }
})