import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useCountdownTimer } from '../../../../hooks/useCountdownTimer';
import TimerTime, { RenderTimerShort } from '../../../../components/TimerTime';
import { styles } from './Timer.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Timer = ({
    title,
    timer,
    fontColor,
    backgroundColor,
    blurAmount = 30,
    short,
    containerStyle,
    style
}) => {
    const theme = useTheme();

    const [timerData, setTimerData] = useState(useCountdownTimer(timer));

    // const blurType = theme.dark ? 'dark' : 'light';
    // const AnimatedComponent = props => blurAmount ? <AnimatedBlurView { ...props } /> : <Animated.View { ...props } />;

    useEffect(() => {
        const interval = setInterval(() => setTimerData(useCountdownTimer(timer)), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if(short) return (
        <RenderTimerShort
            timer={timerData}
            containerStyle={containerStyle}
            style={style}
            color={theme.colors.textSecondary}
        />
    );
    return (
        <Animated.View style={[style, { overflow: 'hidden' }]}>
            <BlurView
                style={[
                    styles.timer,
                    { backgroundColor: backgroundColor ? backgroundColor : timer?.backgroundColor || 'transparent' }
                ]}
                intensity={blurAmount}
            >
                <Text style={[styles.timerTitle, { color: fontColor ? fontColor : timer?.fontColor || theme.colors.text }]}>
                    { title }
                </Text>
                <View style={styles.timeContainer}>
                    <TimerTime
                        timer={timerData}
                        style={styles.time}
                        color={ fontColor ? fontColor : timer?.fontColor || theme.colors.text }
                    />
                </View>
            </BlurView>
        </Animated.View>
    );
};

export default Timer;
