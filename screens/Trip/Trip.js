import React from 'react';
import { Animated, Easing, StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';
import Map from './Map';
import TripButtons from './TripButtons';
import TripCarousel from './TripCarousel';
import TripHeader from './TripHeader';

export default function Trip({route, navigation}) {
    const {trip} = route.params;    
    const [showButtons, setShowButtons] = React.useState(false);
    const [showHeader, setShowHeader] = React.useState(true);
    const translateHeader = React.useRef(new Animated.Value(0)).current;
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
    }, [showHeader])

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
            />
            <SafeAreaView
                style={[
                    styles.safeAreaContainer,
                    {
                        height: showHeader ? '75%' : '100%' // workaround for zIndex issue with header
                    }
                ]}
            >                                                       
                <TripCarousel
                    trip={trip}
                    setShowHeader={setShowHeader}
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
        justifyContent: 'flex-start',
        alignItems: 'center' 
    },  
    headerContainer: {
        height: '25%', 
        width: '100%',              
        // zIndex: 15,      
        flex: 1 ,        
    },
    safeAreaContainer: {
        zIndex: 15,        
        position: 'absolute',
        bottom: 0,            
    }
})