import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import MapView from 'react-native-maps';


export default function MapCard({}) {
    const mapRef = React.useRef();
    
    return (
        <View
            style={styles.container}
        >
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 40.7127753,
                    longitude: -74.0059728,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        // flex: 1,
        width: Dimensions.get('window').width*0.8,
        height: '100%',
    },
})