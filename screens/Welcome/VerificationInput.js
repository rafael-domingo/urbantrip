import React from 'react';
import { View, StyleSheet, Text, Animated, Easing, TouchableOpacity, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import { Ionicons } from '@expo/vector-icons'; 

export default function VerificationInput({handleVerificationInput, verificationError, setVerificationError, setShowVerification}) {
    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({value,setValue});
    const opacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (verificationError) {
            setValue('');
            setVerificationError(false);
        }
    }, [verificationError])

    React.useEffect(() => {
        if (value.length === 6) {
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 250, 
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start();
        } else {
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 250, 
                    delay: 0,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true
                }
            ).start();
        }
    }, [value])


    return (
        <View style={styles.container}>
            <Text
                style={[
                    GlobalStyles.text,
                    styles.titleText
                ]}
            >
                Enter your verification code
            </Text>
            <View style={styles.subContainer}>
                
                <View>
                    <TouchableOpacity onPress={() => setShowVerification(false)}>
                        <Ionicons name="arrow-back-circle-outline" size={36} color="white" />
                    </TouchableOpacity>
                </View>
                <CodeField
                    ref={ref}
                    {...props}
                    autoFocus={true}
                    value={value}
                    onChangeText={setValue}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                        <View
                            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={[styles.cell, isFocused && styles.cellFocused]}
                        >
                            <Text style={[GlobalStyles.text, styles.text]}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                    )}
                />
                <Animated.View
                    style={[
                        styles.buttonContainer,
                        {
                            opacity: opacity
                        }
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => handleVerificationInput(value)}
                    >
                        <Ionicons name="arrow-forward-circle-outline" size={36} color="white"/>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    subContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeFieldRoot: {
        padding: 10,        
    },
    cell: {
        color: 'white',
        height: 30,     
        width: 30, 
        margin: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: 'rgba(255,255,255,0.2)'
    },
    cellFocused: {
        height: 30, 
        width: 30, 
        margin: 5, 
        borderBottomWidth: 2, 
        borderBottomColor: 'white'
    },
    text: {
        color: 'white', 
        fontSize: 25, 
        fontWeight: 'bold'
    },
    buttonContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    titleText: {
        textAlign: 'left', 
        width: Dimensions.get('window').width*0.8, 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 20
    }
})