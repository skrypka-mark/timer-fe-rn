import React, { memo } from 'react';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import EventsListDetail from '../../components/EventsListDetail';
import EventsListRegular from '../../components/EventsListRegular';
import { listAppearences } from '../../stores/events/events.reducer';

const AnimatedScrollViewGestureHandler = Animated.createAnimatedComponent(ScrollView);

const EventsListScreen = ({ events, appearence, scrollViewRef, scrollViewStyle, style, scrollHandler, children }) => {
    const eventsListContainerAnimatedStyles = useKeyboardAwareStyles();

    const ListComponent = appearence === listAppearences.REGULAR ? EventsListRegular : EventsListDetail;

    const shareHandler = async (title, ref) => {
        const url = await captureRef(ref, {
            fileName: title,
            format: 'png',
            quality: 1
        });
        const shareOptions = {
            message: 'Install our application on https://internet.com/',
            url,
            failOnCancel: false
          };
        try {
            await Share.open(shareOptions);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <AnimatedScrollViewGestureHandler
            style={scrollViewStyle}
            ref={scrollViewRef}
            // contentInsetAdjustmentBehavior='scrollableAxes'
            scrollEventThrottle={16}
            onScroll={scrollHandler}
        >
            { children }
            <ListComponent
                events={events}
                style={[eventsListContainerAnimatedStyles, style]}
                share={shareHandler}
                isTitleEditable
                scrollHandler={scrollHandler}
            />
        </AnimatedScrollViewGestureHandler>
    );
};

export default memo(EventsListScreen);
