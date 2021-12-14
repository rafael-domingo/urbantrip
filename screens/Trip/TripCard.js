import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { Modalize } from 'react-native-modalize';

export default function TripCard({location}) {
    
    return (
        <Modalize
            modalHeight={Dimensions.get('window').height}
            alwaysOpen={300}
        >
            <Text>
                {location.name}
            </Text>
        </Modalize>
    )
}

const styles = StyleSheet.create({

})