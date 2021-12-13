export const sortTrips = (tripList) => {
    const cityList = [];
    tripList.map((trip, index) => {
        // check if city of the trip is already in cityList
        if (!cityList.some(item => item.title == trip.cityName)) {
            // append the trip to city in cityList if already existing
            const object = {
                'title': trip.cityName,
                'data': [{
                    'tripName': trip.tripName,
                    'tripId': trip.tripId,
                    'coordinates': trip.coordinates,
                    'trip': trip
                }]
            };
            cityList.push(object);
        } else {
            // create new city in city list
            const index = cityList.findIndex(item => item.title == trip.cityName);
            cityList[index].data.push({
                'tripName': trip.tripName,
                'tripId': trip.tripId,
                'coordinates': trip.coordinates,
                'trip': trip
            });
        };
        
    });
    // alphabetize by city 
    cityList.sort((a, b) => (a.title > b.title ? 1 : -1));
    return cityList;
};