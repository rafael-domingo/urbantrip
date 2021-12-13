import React from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { useDispatch } from 'react-redux';

import GlobalStyles from '../../util/GlobalStyles';

import Hero from '../../components/Hero';
import Login from './Login';
import LoginLoading from './LoginLoading';
import { checkAuth } from '../../util/Authentication';
import { getAuth } from 'firebase/auth';
import { getDocument } from '../../util/Firestore';
import { setUserState } from '../../redux/user';

export default function Welcome({navigation}) {
    const [loading, setLoading] = React.useState(true);
    const [newUser, setNewUser] = React.useState(false);    
    const loginOpacity = React.useRef(new Animated.Value(1)).current;
    const loadingOpacity = React.useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    const duration = 1000;

    // Check if user is already authenticated
    React.useEffect(async () => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userObject = {
                    phoneNumber: user.phoneNumber,
                    uid: user.uid
                };                                
                getDocument(user.uid).then(response => {
                    if (response !== 'Error') {
                        const userState = {
                            user: userObject,
                            tripList: response.tripList
                        };
                        dispatch(setUserState(userState));
                        setTimeout(() => {
                            navigation.navigate('Home');
                        }, 2000);
                    } else {                        
                        // send back to login screen if firestore error
                        setLoading(false);
                    };
                });
            } else {
                // no user authenticated                
                setLoading(false);
            };
        });
        return () => unsubscribe();
    }, [0]);
    
    React.useEffect(() => {
        if (loading) {
            Animated.timing(
                loginOpacity,
                {
                    toValue: 0,
                    duration: duration, 
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start(() => {
                Animated.timing(
                    loadingOpacity,
                    {
                        toValue: 1,
                        duration: duration, 
                        delay: 0,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true
                    }
                ).start()
            })
        } else {
            Animated.timing(
                loginOpacity,
                {
                    toValue: 1,
                    duration: duration, 
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }       
    }, [loading]);

    return (
        <View
            style={styles.container}
        >
            <Hero/>
            {
                !loading && (
                    <Animated.View
                        style={[
                            styles.subContainer,
                            {
                                opacity: loginOpacity
                            }
                        ]}
                    >
                        <Login 
                            setNewUser={setNewUser} 
                            setLoading={setLoading}
                            navigation={navigation}
                        />
                    </Animated.View>
                )
            }
            {
                loading && (
                    <Animated.View
                        style={[
                            styles.subContainer,
                            {
                                opacity: loadingOpacity
                            }
                        ]}
                    >
                        <LoginLoading newUser={newUser}/>
                    </Animated.View>
                )
            }            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(24, 28, 47)',
    },
    subContainer: {
        flex: 0.25
    }
})