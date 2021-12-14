import React from 'react';
import { StyleSheet, View, Dimensions, Text, Touchable, TouchableOpacity } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import MapView from 'react-native-maps';
import MapCardList from './MapCardList';


export default function MapCard({location}) {
    const [detailView, setDetailView] = React.useState(false);
    
    return (
        <View
            style={styles.container}
        >
            <Text
                style={[
                    GlobalStyles.text,
                    styles.text
                ]}
            >
                {location?.title}
            </Text>
            {
                !detailView && (
                    <TouchableOpacity
                        style={styles.map}
                        onPress={() => setDetailView(true)}
                    >
                        <MapView
                            style={styles.map}
                            scrollEnabled={false}
                            camera={{
                                center: {
                                    latitude: location.data[0].coordinates.lat,
                                    longitude: location.data[0].coordinates.lng,
                                },
                                pitch: 0,
                                heading: 0,
                                altitude: 100000,
                                zoom: 12
                            }}
                            zoomTapEnabled={false}
                            zoomEnabled={false}         
                        />
                    </TouchableOpacity>
                   
                )
            }                
            {
                detailView && (
                    <MapCardList
                        tripList={location.data}
                        setDetailView={setDetailView}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 20,        
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    map: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        flex: 1,
        width: Dimensions.get('window').width*0.8,
        height: '100%',
    },
})