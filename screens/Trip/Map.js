import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import GlobalStyles from '../../util/GlobalStyles';

export default function Map({trip}) {

    return (
        <View
            style={styles.container}
        >
            <MapView
                style={styles.map}
                scrollEnabled={false}                              
                camera={{
                    center: {
                        latitude: trip.coordinates.lat,
                        longitude: trip.coordinates.lng,
                    },
                    pitch: 20,
                    heading: 0,
                    altitude: 10000,
                    zoom: 12
                }}
                zoomTapEnabled={false}
                zoomEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0, 
        left: 0,
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,        
        zIndex: -1
    }
})  