import React from 'react';
import Animated from 'react-native-reanimated';
import { nanoid } from 'nanoid/non-secure';
import EventsListItemDetail from '../EventsListItemDetail';
import { styles } from './EventsListDetail.styles';

const EventsListDetail = ({ events, style }) => {
    return (
        <Animated.View style={[styles.eventsListDetailContainer, style]}>
            { events.map(event => <EventsListItemDetail key={nanoid()} { ...event } />) }
        </Animated.View>
    );
};

export default EventsListDetail;
