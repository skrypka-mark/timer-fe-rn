import React from 'react';
import { Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import TimersHeader from './components/TimersHeader';
import TimersListBar from './components/TimersListBar';
import FloatingGradients from '../../components/FloatingGradients';

const TimersScreen = () => {
    const theme = useTheme();

    return (
        <Animated.ScrollView style={{ height: '100%', backgroundColor: theme.dark ? theme.colors.card : 'white' }} contentInsetAdjustmentBehavior='automatic'>
            <FloatingGradients />
            {/* <TimersHeader scrollY={scrollY} /> */}
            <TimersListBar />
        </Animated.ScrollView>
    );
};

export default TimersScreen;
