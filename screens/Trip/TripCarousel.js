import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View, Animated, Easing } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import TripCard from './TripCard';

const cardWidth = Dimensions.get('window').width*0.8;
const cardMargin = 5;

export default function TripCarousel({trip, setShowHeader, modalRef, currentIndex, setCurrentIndex, mapRef, fitMarkers}) {
    const scale = React.useRef(new Animated.Value(1)).current;    
    const [openIndex, setOpenIndex] = React.useState(false);

    const handleModal = (position) => {
        if (position === 'open') {
            setShowHeader(false);
            Animated.timing(
                scale,
                {
                    toValue: 1.1,
                    duration: 250,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: false
                }
            ).start()            
        } else {
            setShowHeader(true);
            Animated.timing(
                scale,
                {
                    toValue: 1,
                    duration: 250,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: false
                }
            ).start()
        }        
    }    

    const getIndex = (event) => {
        const position = event.nativeEvent.contentOffset.x;  
        const index = Math.ceil(position/(cardWidth + (cardMargin*2)));      
        setCurrentIndex(index);
        handleModal('close');
        setOpenIndex(false);
    }

    return (
        <ScrollView
            style={styles.container}
            horizontal
            contentOffset={{
                x: -Dimensions.get('window').width*0.1 + cardMargin*2
            }}
            snapToInterval={cardWidth+(cardMargin*2)}
            snapToAlignment='center'
            decelerationRate={'fast'}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            contentInset={{
                top: 0,
                left: (Dimensions.get('window').width - cardWidth) / 2 + cardMargin,
                bottom: 0,
                right: (Dimensions.get('window').width - cardWidth) / 2 + cardMargin
            }} 
            onScroll={(e) => getIndex(e)}
            onScrollEndDrag={() => {
                setTimeout(() => {
                    modalRef.current?.forEach(element => {
                        element?.close('alwaysOpen')
                    });  
                }, 500);
      

            }}
        >
            {
                trip.trip.destinations.map((item, index) => {
                    for (var key in item) {
                        return (
                            <Animated.View
                                style={[
                                    styles.cardContainer,
                                    {
                                        transform: [{
                                            scale: scale
                                        }],                                                                                                           
                                    }
                                ]}
                                key={index}
                            >
                                <TripCard
                                    key={index}
                                    index={index}
                                    currentIndex={currentIndex}
                                    location={item[key]}
                                    handleModal={handleModal}
                                    openIndex={openIndex}
                                    setOpenIndex={setOpenIndex}
                                    modalRef={modalRef}
                                    mapRef={mapRef}
                                    fitMarkers={fitMarkers}
                                /> 
                            </Animated.View>                           
                        )                        
                    }
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                                             
    }, 
    cardContainer: {                
        width: cardWidth,
        height: Dimensions.get('window').height*0.8,        
        margin: cardMargin,                         
    }
})