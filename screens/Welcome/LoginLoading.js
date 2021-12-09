import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

export default function LoginLoading({newUser}) {

    return (
        <View
            style={styles.container}
        >
            {
                newUser && (
                    <View
                        style={styles.subContainer}
                    >
                        <Text
                            style={[
                                GlobalStyles.text,
                                styles.text
                            ]}
                        >
                            Creating your account
                        </Text>
                        <ActivityIndicator/>
                    </View>
                )
            }
            {
                !newUser && (
                    <View
                        style={styles.subContainer}
                    >
                        <Text
                            style={[
                                GlobalStyles.text,
                                styles.text
                            ]}
                        >
                            Logging you in
                        </Text>
                        <ActivityIndicator/>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text: {
        textAlign: 'center', 
        width: Dimensions.get('window').width*0.8, 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 20
    }
})