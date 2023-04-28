import React from 'react';
import Animated from 'react-native-reanimated';
import { nanoid } from 'nanoid/non-secure';
import EventsListItemBar from '../EventsListItemBar';
import { styles } from './EventsListBar.styles';

const EventsListBar = ({ timers, style }) => {
    return (
        <Animated.View style={[styles.timersListContainer, style]}>
            { timers.map(timer => <EventsListItemBar key={nanoid()} { ...timer } />) }
        </Animated.View>
    );
};

export default EventsListBar;
