import React from 'react';
import { ImageBackground, Animated, View, StyleSheet, Text, Dimensions, Easing } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { Modalize } from 'react-native-modalize';
import { Yelp } from '../../util/Yelp';
import Reviews from './Reviews';
import { ScrollView } from 'react-native-gesture-handler';
import Categories from './Categories';
import Hours from './Hours';

const modalHeight = Dimensions.get('window').height*0.75;
const closedModalHeight = modalHeight*0.2;

export default function TripCard({index, location, currentIndex, handleModal, openIndex, setOpenIndex, modalRef, mapRef, fitMarkers}) {
    const [open, setOpen] = React.useState(false);
    const opacity = React.useRef(new Animated.Value(1)).current;
    const [detail, setDetail] = React.useState();

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

    const getDetail = () => {
        // console.log(location)
        Yelp.detail(location.id).then(response => {
            console.log(response);
            setDetail(response);
        })
    }
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
                scrollViewProps={{
                    scrollEnabled: false
                }}
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
                        getDetail();      
                    } else {
                        handleModal('close');                                            
                        setOpen(false);
                        setOpenIndex(false);
                        fitMarkers();
                        setDetail(undefined);
                    }
                }}
            >
                <View
                    style={[
                        styles.modalContent,
                        GlobalStyles.backgroundColor
                    ]}
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
                        {
                        detail !== undefined && (
                        <Text>{detail.detail.display_phone}</Text>
                        )
                    }    
                      
                    </ImageBackground>                   
                    <ScrollView style={styles.subContainer}>
                    
                        {
                            detail !== undefined && (
                                <>
                                <Categories
                                    detail={detail}
                                />
                                <Hours
                                    detail={detail}
                                />
                                <Reviews
                                    detail={detail}
                                />
                                </>
                            )
                        }    
                             
                    </ScrollView>
                            
                                      
                </View>
                            
                
            </Modalize>
        </Animated.View>
        
    )
}

const styles = StyleSheet.create({
    modal: {        
        flex: 1,    
        height: modalHeight,             
    },  
    modalContent: {
        borderRadius: 10, 
        overflow: 'hidden',                
        justifyContent: 'flex-start',            
        alignItems: 'center',
        height: '100%'          
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    },  
    image: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',     
        height: modalHeight * 0.25          
    },  
    subContainer: {                      
        height: modalHeight * 0.75,     
        // padding: 10               
    }
})