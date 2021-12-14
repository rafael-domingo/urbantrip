import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import GlobalStyles from '../../util/GlobalStyles';
import { sortTrips } from '../../util/Sort';
import Footer from './Footer';
import Header from './Header';
import List from './List';
import MapList from './MapList';

export default function Home({navigation}) {
    const userState = useSelector(state => state.user);
    const [sortedCityList, setSortedCityList]  = React.useState([]);
    const [listView, setListView] = React.useState(false);

    React.useEffect(() => {
        const cityList = sortTrips(userState.tripList);
        setSortedCityList(cityList);
    }, [userState])

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Header/>
            {
                listView && sortedCityList.length > 0 && (
                    <List
                        sortedCityList={sortedCityList}
                        navigation={navigation}
                    />
                )
            }
            {
                !listView && sortedCityList.length > 0 && (
                    <MapList
                        sortedCityList={sortedCityList}
                        navigation={navigation}
                    />
                )
            }
            <Footer
                listView={listView}
                setListView={setListView}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',        
        backgroundColor: 'rgb(24, 28, 47)',
    }  
})