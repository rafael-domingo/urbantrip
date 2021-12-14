import React from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GlobalStyles from '../../util/GlobalStyles';

import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

export default function MapCardList({tripList, setDetailView, navigation}) {    
    const [editMode, setEditMode] = React.useState(false);
    const opacityDelete = React.useRef(new Animated.Value(0)).current;
    const duration = 1000;
 
    React.useEffect(() => {
        if (editMode) {
            Animated.timing(
                opacityDelete,
                {
                    toValue: 1,
                    duration: duration,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                opacityDelete,
                {
                    toValue: 0,
                    duration: duration,
                    delay: 0,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true
                }
            ).start()
        }
    }, [editMode])
    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.headerContainer}
            >
                <Text
                    style={[
                        GlobalStyles.text,
                        styles.headerText
                    ]}
                >
                    Your Trips
                </Text>
                <TouchableOpacity
                    onPress={() => setEditMode(!editMode)}
                >
                    {
                        !editMode && (
                        <MaterialIcons 
                            name="mode-edit" 
                            size={24} 
                            color="white" 
                        />
                        )
                    }
                    {
                        editMode && (
                            <MaterialIcons 
                                name="done" 
                                size={24} 
                                color="green" 
                            />
                        )
                    }
                </TouchableOpacity>
               
                
            </View>
          
            <ScrollView
                style={styles.scrollContainer}
            >
            {
                tripList.map((item, index) => {
                    return (
                        <View
                            style={styles.buttonContainer}
                            key={item.tripId}
                        >
                            <TouchableOpacity
                                style={styles.button}     
                                onPress={() => {
                                    navigation.navigate(
                                        'Trip',
                                        {
                                            trip: item
                                        }

                                    )
                                }}                           
                            >
                                <Text
                                    style={[
                                        GlobalStyles.text,
                                        styles.text
                                    ]}
                                >
                                    {item.tripName}
                                </Text>
                            </TouchableOpacity>
                            <Animated.View
                                style={{
                                    opacity: opacityDelete
                                }}
                            >
                                <TouchableOpacity>
                                    <Feather 
                                        name="delete" 
                                        size={24} 
                                        color="red" 
                                    />
                                </TouchableOpacity> 
                            </Animated.View>    
                           
                        </View>
                             
                    )                   
                })
            }
            </ScrollView>
            
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    setDetailView(false);                    
                }}
            >
                <Text
                    style={[
                        styles.backText,
                        GlobalStyles.text
                    ]}
                >
                    Back
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',    
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 1, 
        borderRadius: 20    
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 20,
        paddingTop: 10,
        flexDirection: 'row'
    },
    scrollContainer: {
        width: '100%',  
        padding: 20,
    },  
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },  
    text: {
        color: 'rgb(24,28,47)',
        fontSize: 20
    },
    headerText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },  
    button: {
        backgroundColor: 'white',
        padding: 15,
        width: '75%',
        borderRadius: 10,
        margin: 10
    },
    backButton: {        
        padding: 10,        
        width: '100%',
        alignItems: 'center'
    },
    backText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});