import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import GlobalStyles from '../../util/GlobalStyles';

export default function Hours({detail}) {
    const days = {
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
        'Sunday': []
    }

    detail.detail.hours[0].open.map((item, index) => {
        switch (item.day) {
            case 0:
                days.Monday.push(item)
                break;
            case 1: 
                days.Tuesday.push(item)
                break;
            case 2: 
                days.Wednesday.push(item)
                break;
            case 3: 
                days.Thursday.push(item)
                break;
            case 4: 
                days.Friday.push(item)
                break;
            case 5: 
                days.Saturday.push(item)
                break;
            case 6: 
                days.Sunday.push(item)
                break;
            default:
                break;
        }
    })    
    
    var businessHours = [];

    for (var key in days) {
        if (days[key].length === 0) {
            businessHours.push(
                <View style={styles.subContainer}>
                    <Text style={[GlobalStyles.text, styles.dayText]}>{key}</Text>
                    <Text style={[GlobalStyles.text, styles.hoursText]}>Closed</Text>
                </View>
            )
           
        } else {
            var hours = days[key].map((item, index) => {
                var startHour = parseInt(item.start.substring(0,2))
                var startMin = item.start.substring(2,4)
                var endHour = parseInt(item.end.substring(0,2))
                var endMin = item.end.substring(2,4)
                var startDescription = '';
                var endDescription = '';
                if (startHour < 12 && startHour > 0) {
                    startDescription = 'AM'
                }  else if (startHour === 12) {
                    startDescription = 'PM'
                } else if (startHour === 0) {
                    startHour = 12
                    startDescription = 'AM'
                } else {
                    startDescription = 'PM'
                    startHour = startHour - 12
                }
                if (endHour < 12 && endHour > 0) {
                    endDescription = 'AM'
                } else if (endHour === 12) {
                    endDescription = 'PM'
                } else if (endHour === 0) {
                    endHour = 12
                    endDescription = 'AM'
                } else {
                    endDescription = 'PM'
                    endHour = endHour - 12
                }
                return (
                    <Text style={[GlobalStyles.text, styles.hoursText]}>{startHour}:{startMin}{startDescription} - {endHour}:{endMin}{endDescription}</Text>
                )
            })
            businessHours.push(
                <View style={styles.subContainer}>                    
                    <Text style={[styles.dayText]}>{key}</Text>                    
                    {hours}
                </View>
            )
           
        }
    }

    return (
        <View style={styles.container}>
        <Text style={[GlobalStyles.text, styles.title]}>Business Hours</Text>
        <ScrollView             
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {businessHours}
        </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',        
        padding: 5
    },
    title: {
        color: 'white',
        fontWeight: '200',
        fontSize: 20
    },
    dayText: {
        color: 'white',
        width: '100%',
        fontWeight: 'bold'
    },
    hoursText: {
        color: 'white',
        width: '100%',
        fontSize: 12
    }
})