import React from 'react';
import { StyleSheet, View, Animated, Text, Dimensions, Easing } from 'react-native';

import GlobalStyles from '../util/GlobalStyles';

import LottieView from 'lottie-react-native';

export default function Hero({}) {
    const containerOpacity = React.useRef(new Animated.Value(1)).current;
    const titleOpacity = React.useRef(new Animated.Value(1)).current;
    const subtitleOpacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(
            titleOpacity,
            {
                toValue: 0,
                duration: 1000, 
                delay: 2000,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start(() => {
            Animated.timing(
                containerOpacity,
                {
                    toValue: 0,
                    duration: 1000,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: false
                }
            ).start()
            // Animated.timing(
            //     subtitleOpacity,
            //     {
            //         toValue: 1,
            //         duration: 1000, 
            //         delay: 0,
            //         easing: Easing.inOut(Easing.exp),
            //         useNativeDriver: true
            //     }
            // ).start()
        })
    }, [1])

    return (
        <Animated.View 
            style={[
                styles.container,
                {
                    transform: [{
                        scale: containerOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.5, 1]
                        })
                    }],
                    borderRadius: containerOpacity.interpolate({
                        inputRange: [0,1],
                        outputRange: [200,0]
                    }),
                    backgroundColor: containerOpacity.interpolate({
                        inputRange: [0,1],
                        outputRange: ['rgb(255,255,255)', 'rgb(24,28,47)']
                    }),
                    height: containerOpacity.interpolate({
                        inputRange: [0,1],
                        outputRange: [400, Dimensions.get('window').height]
                    }),
                    width: containerOpacity.interpolate({
                        inputRange: [0,1],
                        outputRange: [400, Dimensions.get('window').width]
                    })
                }
            ]}
        >
          
            <Animated.Text 
                style={[
                    GlobalStyles.text, 
                    styles.text,
                    {
                        opacity: titleOpacity,
                        transform: [{
                            translateX: titleOpacity.interpolate({
                                inputRange: [0,1],
                                outputRange: [-200, 0]
                            })
                        }]
                    }
                ]}
            >
                urbantrip
            </Animated.Text>
            <Animated.Text 
                style={[
                    GlobalStyles.text, 
                    styles.text,
                    {
                        opacity: subtitleOpacity,
                        transform: [{
                            translateX: subtitleOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [200, 0]
                            })
                        }]
                    }
                ]}
            >
                welcome back 
            </Animated.Text>
            <LottieView              
                style={styles.lottie} 
                source={require('../assets/lottie.json')} 
                resizeMode='cover'
                autoPlay 
                loop
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {         
        borderWidth: 1,                 
        // flex: 1,                
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        top: 0,
        zIndex: -1
    },
    text: {
        textAlign: 'center', 
        fontSize: 65, 
        letterSpacing: 10, 
        color: 'white',
        fontWeight: 'bold',
        zIndex: 10
    },
    lottie: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,     
    },
})