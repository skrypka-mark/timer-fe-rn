import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Asset } from 'expo-asset';
import EventsListItemBar from '../EventsListItemBar';
import { nanoid } from 'nanoid/non-secure';
import { styles } from './EventsListBar.styles';

const EventsListBar = () => {
    const [ready, setReady] = useState(false);

    const timers = [
        {
            id: '1',
            title: 'Wedding',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../../../assets/images/wedding.jpg')
        },
        {
            id: '2',
            title: 'New Year',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../../../assets/images/new-year.jpg')
        },
        {
            id: '3',
            title: 'Halloween',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../../../assets/images/halloween.jpg')
        },
        {
            id: '4',
            title: 'Rendezvous',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../../../assets/images/rendezvous.jpg')
        }
    ];

    useEffect(() => {
        (async () => {
            await Promise.all(timers.map(timer => Asset.loadAsync(timer.image)));
            setReady(true);
        })();
    }, []);

    return (
        <View style={styles.timersListContainer}>
            { ready && timers.map(timer => <EventsListItemBar key={nanoid()} { ...timer } />) }
        </View>
    );
};

export default EventsListBar;
