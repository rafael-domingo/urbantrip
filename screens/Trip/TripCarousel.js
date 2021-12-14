import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import TripCard from './TripCard';

const cardWidth = Dimensions.get('window').width*0.9;
const cardMargin = 5;

export default function TripCarousel({trip}) {
    
    return (
        <ScrollView
            style={styles.container}
            horizontal
            // contentOffset={{
            //     x: -Dimensions.get('window').width*0.1 + cardMargin*2
            // }}
            snapToInterval={cardWidth+(cardMargin*2)}
            snapToAlignment='center'
            contentInset={{
                top: 0,
                left: (Dimensions.get('window').width - cardWidth) / 2 + cardMargin,
                bottom: 0,
                right: (Dimensions.get('window').width - cardWidth) / 2 + cardMargin
            }} 
        >
            {
                trip.trip.destinations.map((item, index) => {
                    for (var key in item) {
                        return (
                            <View
                                style={styles.cardContainer}
                            >
                                <TripCard
                                    key={index}
                                    location={item[key]}
                                /> 
                            </View>
                           
                        )
                        
                    }
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    cardContainer: {        
        width: cardWidth,
        height: Dimensions.get('window').height,
        margin: cardMargin
    }
})