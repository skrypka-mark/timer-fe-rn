import React, { memo } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import EventsListDetail from '../../components/EventsListDetail';
import EventsListRegular from '../../components/EventsListRegular';
import { listAppearences } from '../../stores/events/events.reducer';

const BuiltInEventsListScreen = ({ events, appearence, style, scrollHandler, children }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const ListComponent = appearence === listAppearences.REGULAR ? EventsListRegular : EventsListDetail;

    return (
        <BlurView style={{ height: '100%' }} intensity={35}>
            <StatusBar barStyle='light-content' animated />

            <Animated.ScrollView
                style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: theme.colors.backgroundOpacity
                }}
                contentContainerStyle={{
                    paddingBottom: insets.bottom
                }}
                contentInsetAdjustmentBehavior='automatic'
                keyboardDismissMode='on-drag'
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                { children }
                <Animated.View style={style}>
                    <ListComponent events={events} isContextMenuEnabled={false} />
                </Animated.View>
            </Animated.ScrollView>
        </BlurView>
    );
};

export default memo(BuiltInEventsListScreen);
