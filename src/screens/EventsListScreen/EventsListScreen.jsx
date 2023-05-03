import React from 'react';
import Animated from 'react-native-reanimated';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import EventsListDetail from '../../components/EventsListDetail';
import EventsListRegular from '../../components/EventsListRegular';
import { listAppearences } from '../../stores/events/events.reducer';

const EventsListScreen = ({ events, appearence }) => {
    const eventsListContainerAnimatedStyles = useKeyboardAwareStyles();

    const ListComponent = appearence === listAppearences.DETAIL ? EventsListDetail : EventsListRegular;

    return (
        <Animated.ScrollView style={{ height: '100%' }} contentInsetAdjustmentBehavior='automatic'>
            {/* <TimersHeader scrollY={scrollY} /> */}
            <ListComponent events={events} style={eventsListContainerAnimatedStyles} />
        </Animated.ScrollView>
    );
};

export default EventsListScreen;
