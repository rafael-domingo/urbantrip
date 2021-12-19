import React from 'react';
import { Marker } from 'react-native-maps';

import GlobalStyles from '../../util/GlobalStyles';

export default function Markers({trip, markerRef}) {
        
    return (
        <>
            {
                trip.trip.destinations.map((item, index) => {
                    for (var key in item) {
                        return (
                            <Marker
                                ref={el => markerRef.current[index] = el}
                                identifier={item[key].id}
                                key={index}
                                coordinate={item[key].coordinates}
                                title={item[key].name}
                                pinColor={'tomato'}                                
                            />
                        )
                    }
                })
            }
        </>
    )
}
