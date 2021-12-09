import React from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity, Easing, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import PhoneInput from 'react-native-phone-number-input';
import { Ionicons } from '@expo/vector-icons'; 

export default function PhoneLogin({handlePhoneInput}) {
    const phoneInputRef = React.useRef(null);
    const [value, setValue] = React.useState("");
    const [formattedValue, setFormattedValue] = React.useState("");    
    const opacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const isValid = phoneInputRef.current?.isValidNumber(value);        
        if (isValid) {
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
    }, [value]);

    return (
        <View style={styles.container}>
            <Text
                    style={[
                        GlobalStyles.text,
                        styles.titleText
                    ]}
                >
                    Enter your phone number
                </Text>
            <View style={styles.subContainer}>
                <PhoneInput
                    ref={phoneInputRef}
                    defaultValue={value}
                    disableArrowIcon={true}
                    defaultCode="US"
                    layout="second"
                    onChangeText={(text) => setValue(text)}
                    onChangeFormattedText={(text) => setFormattedValue(text)} 
                    containerStyle={styles.phoneContainer}                                                       
                    textContainerStyle={styles.phoneTextContainer}
                    codeTextStyle={[GlobalStyles.text, styles.text, {fontWeight: '200'}]}
                    textInputStyle={[GlobalStyles.text, styles.text, {fontWeight: 'bold'}]}
                    countryPickerButtonStyle={{color:'white'}}
                    autoFocus
                />
                <Animated.View style={{opacity: opacity}}>
                    <TouchableOpacity onPress={() => handlePhoneInput(formattedValue)}>
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
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    phoneContainer: {
        backgroundColor:'rgba(255,255,255,0)', 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    phoneTextContainer: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    text: {
        color: 'white', 
        fontSize: 24, 
    },
    titleText: {
        textAlign: 'left', 
        width: Dimensions.get('window').width*0.8, 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 20
    }
})