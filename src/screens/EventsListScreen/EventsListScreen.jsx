import React, { memo, useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import EventsListDetail from '../../components/EventsListDetail';
import EventsListRegular from '../../components/EventsListRegular';
import { listAppearences } from '../../stores/events/events.reducer';

const AnimatedScrollViewGestureHandler = Animated.createAnimatedComponent(ScrollView);

const EventsListScreen = ({
    events,
    appearence,
    scrollViewRef,
    scrollViewStyle,
    offsetBottom,
    scrollHandler,
    children
}) => {
    const ListComponent = useMemo(() => appearence === listAppearences.REGULAR ? EventsListRegular : EventsListDetail, [appearence]);

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
            contentContainerStyle={{ paddingBottom: offsetBottom }}
            ref={scrollViewRef}
            // contentInsetAdjustmentBehavior='scrollableAxes'
            scrollEventThrottle={16}
            onScroll={scrollHandler}
        >
            { children }
            <ListComponent
                events={events}
                share={shareHandler}
                isTitleEditable
            />
        </AnimatedScrollViewGestureHandler>
    );
};

export default memo(EventsListScreen);
