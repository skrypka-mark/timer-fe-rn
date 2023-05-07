import React, { memo } from 'react';
import Animated from 'react-native-reanimated';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import EventsListDetail from '../../components/EventsListDetail';
import EventsListRegular from '../../components/EventsListRegular';
import { listAppearences } from '../../stores/events/events.reducer';

const EventsListScreen = ({ events, appearence }) => {
    const eventsListContainerAnimatedStyles = useKeyboardAwareStyles();

    const ListComponent = appearence === listAppearences.DETAIL ? EventsListDetail : EventsListRegular;

    const shareHandler = async ref => {
        try {
            const url = await captureRef(ref, {
                format: 'png',
                quality: 0.7
            });
            await Share.open({
                // title,
                // message: 'Share your event',
                url
            });
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <Animated.ScrollView style={{ height: '100%' }} contentInsetAdjustmentBehavior='automatic'>
            {/* <TimersHeader scrollY={scrollY} /> */}
            <ListComponent events={events} style={eventsListContainerAnimatedStyles} share={shareHandler} />
        </Animated.ScrollView>
    );
};

export default memo(EventsListScreen);
