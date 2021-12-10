import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

import GlobalStyles from '../util/GlobalStyles';

import { BlurView } from 'expo-blur';

export default function ErrorModal({modalText, handleConfirm, showModal}) {
    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType={'slide'}
        >
            <View
                style={styles.container}
            >
                <BlurView
                    intensity={100}
                    tint={'default'}
                    style={styles.blurContainer}
                >
                    <Text
                        style={[
                            GlobalStyles.text,
                            styles.text
                        ]}
                    >
                        {modalText}
                    </Text>
                    <View
                        style={styles.buttonContainer}
                    >
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleConfirm()}
                        >
                            <Text
                                style={styles.buttonText}
                            >
                                Okay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
         
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },  
    blurContainer: {
        overflow: 'hidden',
        borderRadius: 20,
        height: 200,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        width: '80%'
    },
    buttonContainer: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(24,28,47)',
        textAlign: 'center'
    }
})
