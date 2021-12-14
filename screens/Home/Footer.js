import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { Ionicons } from '@expo/vector-icons';

export default function Footer({listView, setListView}) {

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.button}
            >
                <Ionicons
                    name="ios-settings-outline"
                    size={24}
                    color="white"                    
                />
            </TouchableOpacity>
            {
                listView && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setListView(!listView)}
                    >
                        <Ionicons
                            name="md-map-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>                 
                )
            }
            {
                !listView && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setListView(!listView)}
                    >
                        <Ionicons
                        name="md-list"
                        size={24}
                        color="white"
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',         
        flex: 0.5,
    },
    button: {
        marginLeft: 30, 
        marginRight: 30
    }
})