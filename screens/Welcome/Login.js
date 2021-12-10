import React from 'react';
import { View, StyleSheet, Text, Animated, Easing, Dimensions } from 'react-native';
import ErrorModal from '../../components/ErrorModal';
import { phoneAuth, verificationAuth } from '../../util/Authentication';

import GlobalStyles from '../../util/GlobalStyles';

import PhoneLogin from './PhoneLogin';
import VerificationInput from './VerificationInput';

export default function Login({setNewUser, setLoading}) {
    const [showVerification, setShowVerification] = React.useState(false);
    const [verificationError, setVerificationError] = React.useState(false);
    const [verificationId, setVerificationId] = React.useState('');
    const [errorText, setErrorText] = React.useState('');
    const [showError, setShowError] = React.useState(false);
    const phoneOpacity = React.useRef(new Animated.Value(0)).current;
    const verificationOpacity = React.useRef(new Animated.Value(0)).current;
    const duration = 500;

    React.useEffect(() => {
        Animated.timing(
            phoneOpacity,
            {
                toValue: 1,
                duration: duration, 
                delay: 500,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true
            }
        ).start();        
    }, [0])

    React.useEffect(() => {
        if (showVerification) {
            Animated.timing(
                phoneOpacity,
                {
                    toValue: 0,
                    duration: duration, 
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start(() => {
                Animated.timing(
                    verificationOpacity,
                    {
                        toValue: 1,
                        duration: duration, 
                        delay: 0,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true
                    }
                ).start();   
            });   
        } else {
            Animated.timing(
                verificationOpacity,
                {
                    toValue: 0,
                    duration: duration, 
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start(() => {
                Animated.timing(
                    phoneOpacity,
                    {
                        toValue: 1,
                        duration: duration, 
                        delay: 0,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true
                    }
                ).start();   
            });   
        }
    }, [showVerification])

    const handlePhoneInput = (phoneNumber, recaptcha) => {                        
        phoneAuth(phoneNumber, recaptcha)
        .then(response => {          
            if (response !== 'error') {                
                setVerificationId(response);
                setShowVerification(true);
            }  else {
                setErrorText('Something went wrong. Try again later.');
                setShowError(true);
            }                        
        });
    };

    const handleVerificationInput = (code) => {
        verificationAuth(code, verificationId)
        .then(response => {
            if (typeof(response) === 'string') {
                setErrorText('That code is incorrect, try again.');
                setShowError(true);
                setVerificationError(true);
            } else {
                setLoading(true);
            }            
        });
    };

    const handleErrorModal = () => {
        setShowError(false);
    };  

    return (
        <Animated.View
            style={styles.container}
        >
            {
                !showVerification && (
                    <Animated.View
                        style={[
                            styles.subContainer,
                            {
                                opacity: phoneOpacity,
                                transform: [{
                                    translateX: phoneOpacity.interpolate({
                                        inputRange: [0,1],
                                        outputRange: [-200, 0]
                                    })
                                }]
                            }
                        ]}
                    >
                        <PhoneLogin 
                            handlePhoneInput={handlePhoneInput}
                        />
                    </Animated.View>
                )
            }          
            {
                showVerification && (
                    <Animated.View
                        style={[
                            styles.subContainer,
                            {
                                opacity: verificationOpacity,
                                transform: [{
                                    translateX: verificationOpacity.interpolate({
                                        inputRange: [0,1],
                                        outputRange: [200,0]
                                    })
                                }]
                            }
                        ]}
                    >
                        <VerificationInput 
                            handleVerificationInput={handleVerificationInput}
                            setVerificationError={setVerificationError}
                            verificationError={verificationError}
                            setShowVerification={setShowVerification}
                        />
                    </Animated.View>
                )
            }    
            <ErrorModal
                modalText={errorText}
                showModal={showError}
                handleConfirm={handleErrorModal}
            />        
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    subContainer: {
        width: '100%'
    }
})