import React from 'react';
import Animated from 'react-native-reanimated';
import { nanoid } from 'nanoid/non-secure';
import EventsListItemRegular from '../EventsListItemRegular';
import { styles } from './EventsListRegular.styles';

const EventsListRegular = ({ events, style, share }) => {
    return (
        <Animated.View style={[styles.eventsListRegularContainer, style]}>
            { events.map(event => <EventsListItemRegular key={nanoid()} event={event} share={share} />) }
        </Animated.View>
    );
};

export default EventsListRegular;
