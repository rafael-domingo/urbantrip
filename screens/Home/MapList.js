import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import MapCard from './MapCard';

import GlobalStyles from '../../util/GlobalStyles';

import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';


export default function MapList({sortedCityList}) {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const renderItem = ({item, index}) => {
        return (
            <View
                style={styles.item}
            >
                <MapCard
                    location={item}
                />
            </View>
        )
    }
    return (
        <View
            style={styles.container}
        >          
            <Carousel
                data={sortedCityList}
                renderItem={renderItem}
                containerCustomStyle={styles.carouselContainer}
                layout={'default'}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width*0.8}
                sliderHeight={Dimensions.get('window').height}
                itemHeight={Dimensions.get('window').height}
                onSnapToItem={(index) => {
                    setActiveIndex(index);
                }}
            />         
            <Pagination
                dotsLength={sortedCityList.length}
                activeDotIndex={activeIndex} 
                dotStyle={[
                    styles.dotStyle,
                    {
                        backgroundColor: 'rgba(255,255,255,0.92)'
                    }
                ]}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />      
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5,        
    },
    item: {
        flex: 1
    }, 
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
    }
})