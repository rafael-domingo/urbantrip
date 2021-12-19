import React from 'react';
import { ImageBackground, Animated, View, StyleSheet, Text, Dimensions, Easing } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { Modalize } from 'react-native-modalize';

const modalHeight = Dimensions.get('window').height*0.8;
const closedModalHeight = Dimensions.get('window').height*0.5;

export default function TripCard({index, location, currentIndex, handleModal, openIndex, setOpenIndex, modalRef, mapRef, fitMarkers}) {
    const [open, setOpen] = React.useState(false);
    const opacity = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        if (openIndex) { 
            if (index !== currentIndex) {
                Animated.timing(
                    opacity,
                    {
                        toValue: 0,
                        duration: 250,
                        delay: 0,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true
                    }
                ).start();
            } else {
                Animated.timing(
                    opacity,
                    {
                        toValue: 1,
                        duration: 250,
                        delay: 0,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true
                    }
                ).start();
            }            
        } else {
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 250,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start();
        }
    }, [index, currentIndex, openIndex])

    return (
        <Animated.View
            style={{       
                opacity: opacity,         
                flex: 1
            }}
        >
            <Modalize
                ref={el => modalRef.current[index] = el}
                style={styles.modal}
                modalHeight={modalHeight}
                alwaysOpen={closedModalHeight}
                withOverlay={false}
                onPositionChange={(position) => {
                    if (position === 'top') {
                        handleModal('open');  
                        setOpen(true);      
                        setOpenIndex(true);                             
                        mapRef.current.animateCamera(
                            {
                                center: {
                                    latitude: location.coordinates.latitude,
                                    longitude: location.coordinates.longitude
                                },
                                pitch: 0,
                                heading: 0,
                                altitude: 800,
                            },
                            { duration: 500}
                        );             
                    } else {
                        handleModal('close');                                            
                        setOpen(false);
                        setOpenIndex(false);
                        fitMarkers();
                    }
                }}
            >
                <View
                    style={styles.modalContent}
                >
                    <ImageBackground
                        style={styles.image}
                        source={{uri: location.image_url}}
                        resizeMode='cover'            
                    >
                        <Text
                            style={[
                                GlobalStyles.text,
                                styles.name
                            ]}
                        >
                            {location.name}
                        </Text>
                    </ImageBackground>
                </View>
              
                
            </Modalize>
        </Animated.View>
        
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,        
    },  
    modalContent: {
        borderRadius: 10, 
        overflow: 'hidden',
        height: modalHeight,        
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30
    },  
    image: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',     
        height: modalHeight * 0.33          
    },  
})