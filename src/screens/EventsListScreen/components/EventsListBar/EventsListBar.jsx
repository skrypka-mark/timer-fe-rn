import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Asset } from 'expo-asset';
import EventsListItemBar from '../EventsListItemBar';
import { nanoid } from 'nanoid/non-secure';
import { styles } from './EventsListBar.styles';

const EventsListBar = () => {
    const [ready, setReady] = useState(false);
    const keyboardHeight = useSharedValue(0);

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
        },
        {
            id: '5',
            title: 'Wedding',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../../../assets/images/wedding.jpg')
        },
        {
            id: '6',
            title: 'New Year',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../../../assets/images/new-year.jpg')
        },
        {
            id: '7',
            title: 'Halloween',
            time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            image: require('../../../../assets/images/halloween.jpg')
        },
        // {
        //     id: '8',
        //     title: 'Rendezvous',
        //     time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
        //     image: require('../../../../assets/images/rendezvous.jpg')
        // },
    ];

    useEffect(() => {
        (async () => {
            await Promise.all(timers.map(timer => Asset.loadAsync(timer.image)));
            setReady(true);
        })();

        const showKeyboardSubscription = Keyboard.addListener('keyboardDidShow', e => {
            keyboardHeight.value = withTiming(e.endCoordinates.height, { duration: 200 });
        });
        const hideKeyboardSubscription = Keyboard.addListener('keyboardWillHide', () => {
            keyboardHeight.value = withTiming(0, { duration: 200 });
        });

        return () => {
            showKeyboardSubscription.remove();
            hideKeyboardSubscription.remove();
        };
    }, []);

    const timersListContainerAnimatedStyles = useAnimatedStyle(() => ({
        paddingBottom: keyboardHeight.value
    }));

    return (
        <Animated.View style={[styles.timersListContainer, timersListContainerAnimatedStyles]}>
            { ready && timers.map(timer => <EventsListItemBar key={nanoid()} { ...timer } />) }
        </Animated.View>
    );
};

export default EventsListBar;
