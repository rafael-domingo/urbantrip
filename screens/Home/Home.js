import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import GlobalStyles from '../../util/GlobalStyles';
import { sortTrips } from '../../util/Sort';
import Footer from './Footer';
import Header from './Header';
import List from './List';
import MapList from './MapList';

export default function Home({}) {
    const userState = useSelector(state => state.user);
    const [sortedCityList, setSortedCityList]  = React.useState();
    const [listView, setListView] = React.useState(true);

    React.useEffect(() => {
        const cityList = sortTrips(userState.tripList);
        setSortedCityList(cityList);
    }, [userState])

    return (
        <View
            style={styles.container}
        >
            <Header/>
            {
                listView && (
                    <List
                        sortedCityList={sortedCityList}
                    />
                )
            }
            {
                !listView && (
                    <MapList
                        sortedCityList={sortedCityList}
                    />
                )
            }
            <Footer
                listView={listView}
                setListView={setListView}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(24, 28, 47)',
    }  
})