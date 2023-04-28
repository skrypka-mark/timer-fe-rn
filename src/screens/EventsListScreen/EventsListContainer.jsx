import React, { useLayoutEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import EventsListScreen from './EventsListScreen';

const EventsListContainer = ({ navigation }) => {
    const [ready, setReady] = useState(false);
    const timers = [
        {
            id: '1',
            title: 'Wedding',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/wedding.jpg')
        },
        {
            id: '2',
            title: 'New Year',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/new-year.jpg')
        },
        {
            id: '3',
            title: 'Halloween',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/halloween.jpg')
        },
        {
            id: '4',
            title: 'Rendezvous',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/rendezvous.jpg')
        },
        {
            id: '5',
            title: 'Wedding',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/wedding.jpg')
        },
        {
            id: '6',
            title: 'New Year',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/new-year.jpg')
        },
        {
            id: '7',
            title: 'Halloween',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/halloween.jpg')
        },
        {
            id: '8',
            title: 'Rendezvous',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../assets/images/rendezvous.jpg')
        }
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search'
            }
        });

        (async () => {
            await Promise.all(timers.map(timer => Asset.loadAsync(timer.image)));
            setReady(true);
        })();
    }, [navigation]);

    // TODO: Here Loader must be shown instead of null when assets are loading
    if(!ready) return null;
    return <EventsListScreen timers={timers} />;
};

export default EventsListContainer;
