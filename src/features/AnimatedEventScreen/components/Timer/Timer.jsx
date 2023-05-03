import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import TimerTime from '../../../../components/TimerTime';
import { styles } from './Timer.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Timer = ({
    title,
    time,
    blurAmount = 30,
    fontColor,
    backgroundColor,
    backgroundOpacity,
    style
}) => {
    const theme = useTheme();

    // const blurType = theme.dark ? 'dark' : 'light';
    // const AnimatedComponent = props => blurAmount ? <AnimatedBlurView { ...props } /> : <Animated.View { ...props } />;

    return (
        <Animated.View style={[style, { overflow: 'hidden' }]}>
            <BlurView
                style={[
                    styles.timer,
                    backgroundColor && { backgroundColor },
                    backgroundOpacity && { opacity: backgroundOpacity }
                ]}
                intensity={blurAmount}
            >
                <Text style={[styles.timerTitle, { color: fontColor || theme.colors.text }]}>
                    { title }
                </Text>
                <View style={styles.timeContainer}>
                    <TimerTime time={time} style={[styles.time, { color: theme.colors.text }]} />
                </View>
            </BlurView>
        </Animated.View>
    );
};

export default Timer;
