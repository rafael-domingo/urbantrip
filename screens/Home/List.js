import React from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

export default function List({sortedCityList}) {

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.item}
            >
                <Text
                    style={styles.itemText}
                >
                    {item.tripName}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderHeader = (header) => {
        return (
            <View
                style={styles.header}
            >
                <Text
                    style={styles.headerText}
                >
                    {header}
                </Text>
            </View>
        )
    }
    return (
        <View
            style={styles.container}
        >
            <SectionList
                style={styles.sectionList}
                sections={sortedCityList}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => renderItem(item)}
                renderSectionHeader={({section: {title}}) => renderHeader(title)}
            />            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flex: 10
    },
    sectionList: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    headerText: {
        fontSize: 25
    },
    item: {
        margin: 10
    },
    itemText: {
        color: 'white',
        fontSize: 20
    }
})