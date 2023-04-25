import React from 'react';
import { View } from 'react-native';
import TimerItemBar from '../TimerItemBar';
import { nanoid } from 'nanoid/non-secure';
import { styles } from './TimersListBar.styles';

const TimersList = () => {
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

    return (
        <View style={styles.timersListContainer}>
            { timers.map(timer => <TimerItemBar key={nanoid()} { ...timer } />) }
        </View>
    );
};

export default TimersList;
