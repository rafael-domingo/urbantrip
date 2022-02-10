import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export const Yelp = {
    detail(id) {
        return fetch('https://us-central1-wkndr-326514.cloudfunctions.net/yelpDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))
    }
}