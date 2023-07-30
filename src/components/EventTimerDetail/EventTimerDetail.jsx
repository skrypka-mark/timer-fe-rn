import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useCountdownTimer } from '../../../../hooks/useCountdownTimer';
import TimerUnits from '../../../../components/TimerUnits';
import { styles } from './Timer.styles';

const EventTimerDetail = ({
    title,
    timer,
    fontFamily,
    fontColor,
    backgroundColor,
    blurAmount = 30,
    short,
    containerStyle,
    style
}) => {
    const theme = useTheme();

    const [timerData, setTimerData] = useState(useCountdownTimer(timer).timeLeft);

    useEffect(() => {
        const interval = setInterval(() => {
            const { timeLeft, duration } = useCountdownTimer(timer);

            if(duration <= 0) return clearInterval(interval);

            setTimerData(timeLeft);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Animated.View style={[style, { overflow: 'hidden' }]}>
            <BlurView
                style={[
                    styles.timer,
                    { backgroundColor: backgroundColor ? backgroundColor : timer?.backgroundColor || 'transparent' }
                ]}
                intensity={blurAmount}
            >
                <Text
                    style={[
                        styles.timerTitle,
                        {
                            fontFamily: fontFamily ? fontFamily : timer?.fontFamily,
                            color: fontColor ? fontColor : timer?.fontColor || theme.colors.text
                        }
                    ]}
                    // numberOfLines={1}
                    // adjustsFontSizeToFit
                >
                    { title }
                </Text>
                <View style={styles.timeContainer}>
                    <TimerUnits
                        timer={timerData}
                        style={styles.time}
                        color={ fontColor ? fontColor : timer?.fontColor || theme.colors.text }
                    />
                </View>
            </BlurView>
        </Animated.View>
    );
};

export default EventTimerDetail;
