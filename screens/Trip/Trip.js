import React from 'react';
import { Animated, Easing, StyleSheet, View, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import Map from './Map';
import TripButtons from './TripButtons';
import TripCarousel from './TripCarousel';
import TripHeader from './TripHeader';

export default function Trip({route, navigation}) {
    const {trip} = route.params;    
    const [showButtons, setShowButtons] = React.useState(false);
    const [showHeader, setShowHeader] = React.useState(true);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const translateHeader = React.useRef(new Animated.Value(0)).current;
    const markerRef = React.useRef([]);
    const mapRef = React.useRef(null);
    const modalRef = React.useRef([]);

    React.useEffect(() => {
        if (showHeader) {
            Animated.timing(
                translateHeader,
                {
                    toValue: 0,
                    duration: 250,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                translateHeader,
                {
                    toValue: -250,
                    duration: 250,
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    }, [showHeader]);

    React.useEffect(() => {
        markerRef.current[currentIndex]?.showCallout()
    }, [currentIndex]);

    const fitMarkers = () => {
        const markersArray = [];
        trip.trip.destinations.map((item, index) => {
            for (var key in item) {
                markersArray.push(item[key].id);
            }
        });
        mapRef.current.fitToSuppliedMarkers(markersArray);
    }
    
    return (
        <View
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.headerContainer,
                    {
                        transform: [{
                            translateY: translateHeader
                        }],
                        zIndex: showHeader ? 15 : 1
                    }
                ]}
            >
                <TripHeader 
                    trip={trip}
                    navigation={navigation}
                    setShowButtons={setShowButtons}
                    showButtons={showButtons}
                />
                <TripButtons
                    showButtons={showButtons}
                />
            </Animated.View>
          
            <Map
                trip={trip}
                markerRef={markerRef}
                mapRef={mapRef}
                fitMarkers={fitMarkers}
            />           
            <TripCarousel
                    trip={trip}
                    setShowHeader={setShowHeader}
                    modalRef={modalRef}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    mapRef={mapRef}
                    fitMarkers={fitMarkers}
                />
        </View>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,       
        justifyContent: 'flex-start',
        alignItems: 'center' 
    },  
    headerContainer: {        
        maxHeight: '25%',
        width: '100%',              
        // zIndex: 15,      
        flex: 1 ,                
    },
})