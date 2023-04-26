import React from 'react';
import { Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import EventsListBar from './components/EventsListBar';
import FloatingGradients from '../../components/FloatingGradients';

const EventsListScreen = () => {
    const theme = useTheme();

    return (
        <Animated.ScrollView style={{ height: '100%', backgroundColor: theme.dark ? theme.colors.card : 'white' }} contentInsetAdjustmentBehavior='automatic'>
            <FloatingGradients />
            {/* <TimersHeader scrollY={scrollY} /> */}
            <EventsListBar />
        </Animated.ScrollView>
    );
};

export default EventsListScreen;
