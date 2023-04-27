import React from 'react';
import { Animated } from 'react-native';
import EventsListBar from './components/EventsListBar';

const EventsListScreen = () => {
    return (
        <Animated.ScrollView style={{ height: '100%' }} contentInsetAdjustmentBehavior='always'>
            {/* <TimersHeader scrollY={scrollY} /> */}
            <EventsListBar />
        </Animated.ScrollView>
    );
};

export default EventsListScreen;
