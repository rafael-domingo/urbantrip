import React from 'react';
import { StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import MapView from 'react-native-maps';

import GlobalStyles from '../../util/GlobalStyles';
import Markers from './Markers';

export default function Map({trip, markerRef, mapRef, fitMarkers}) {
    const translation = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(
            translation,
            {
                toValue: -200,
                duration: 250,
                delay: 2000,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start();
    })

    React.useEffect(() => {
        fitMarkers();
    }, [trip.trip.destinations]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{
                        translateY: translation
                    }]
                }
            ]}
        >
            <MapView
                ref={mapRef}
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
                mapType={'mutedStandard'}
                mapPadding={{
                    bottom: Dimensions.get('window').height*0.5*0.33,
                    top: 50                    
                }}
            >
                <Markers
                    trip={trip}
                    markerRef={markerRef}
                />
            </MapView>
        </Animated.View>
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