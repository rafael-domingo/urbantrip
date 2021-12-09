import React from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import Hero from '../../components/Hero';
import Login from './Login';
import LoginLoading from './LoginLoading';



export default function Welcome({}) {
    const [loading, setLoading] = React.useState(false);
    const [newUser, setNewUser] = React.useState(false);
    const loginOpacity = React.useRef(new Animated.Value(1)).current;
    const loadingOpacity = React.useRef(new Animated.Value(0)).current;
    const duration = 1000;

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
        }       
    }, [loading])
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
                        <Login setNewUser={setNewUser} setLoading={setLoading}/>
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
        height: '100%',
        width: '100%'
    },
    subContainer: {
        flex: 1
    }
})