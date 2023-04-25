import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import TimerTime from '../../../../components/TimerTime';
import { styles } from './Timer.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Timer = ({ title, time, blurAmount = 15, style }) => {
    const theme = useTheme();

    return (
        <AnimatedBlurView style={[style, styles.timer]} blurType={theme.dark ? 'dark' : 'light'} blurAmount={blurAmount}>
            <Text style={[styles.timerTitle, { color: theme.colors.text }]}>
                { title }
            </Text>
            <View style={styles.timeContainer}>
                <TimerTime time={time} style={[styles.time, { color: theme.colors.text }]} />
            </View>
        </AnimatedBlurView>
    );
};

export default Timer;
