import React from 'react';
import Animated from 'react-native-reanimated';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import EventsListBar from './components/EventsListBar';

const EventsListScreen = ({ timers }) => {
    const timersListContainerAnimatedStyles = useKeyboardAwareStyles();

    return (
        <Animated.ScrollView style={{ height: '100%' }} contentInsetAdjustmentBehavior='automatic'>
            {/* <TimersHeader scrollY={scrollY} /> */}
            <EventsListBar timers={timers} style={timersListContainerAnimatedStyles} />
        </Animated.ScrollView>
    );
};

export default EventsListScreen;
