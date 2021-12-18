import React from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const color = 'black';
const iconSize = 15;
export default function TripButtons({showButtons}) {
    const opacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (showButtons) {
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 250,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 250,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    }, [showButtons])

    return (
        <Animated.ScrollView
            style={[
                styles.container,
                {
                    opacity: opacity
                }
            ]}
            horizontal
            contentOffset={{
                x: -Dimensions.get('window').width*0.05
            }}
            contentInset={{
                left: Dimensions.get('window').width*0.05,
                right: Dimensions.get('window').width*0.05
            }}
            showsHorizontalScrollIndicator={false}
        >
            <TouchableOpacity
                style={styles.button}
                disabled={!showButtons}
            >
                <Entypo name="edit" size={iconSize} color={color} />
                <Text
                    style={styles.buttonText}
                >
                    Rename Trip
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                disabled={!showButtons}
            >
                <Ionicons name="ios-list-sharp" size={iconSize} color={color} />
                <Text
                    style={styles.buttonText}
                >
                    Trip List
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                disabled={!showButtons}
            >
                <Ionicons name="ios-build-outline" size={iconSize} color={color} />
                <Text
                    style={styles.buttonText}
                >
                    Trip Builder
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                disabled={!showButtons}
            >
                <FontAwesome5 name="trash" size={iconSize} color={color} />
                <Text
                    style={styles.buttonText}
                >
                    Delete Trip
                </Text>
            </TouchableOpacity>                       
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:'15%',
        zIndex: 15,                
        width: '100%',            
    },
    button: {        
        backgroundColor: 'white',        
        borderRadius: 15,        
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
    buttonText: {
        fontSize: 15,
        marginLeft: 5
        
    }
})