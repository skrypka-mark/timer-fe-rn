import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useCountdownTimer } from '../../../../hooks/useCountdownTimer';
import TimerUnits from '../../../../components/TimerUnits';
import { styles } from './Timer.styles';
import { fontSizes } from '../../../../theme/fonts';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Timer = ({
    title,
    timer,
    fontFamily,
    fontColor,
    backgroundColor,
    blurAmount = 30,
    isTitleEditable,
    short,
    containerStyle,
    style,
    onTitleBlur
}) => {
    const theme = useTheme();

    const [timerData, setTimerData] = useState(useCountdownTimer(timer).timeLeft);

    // const blurType = theme.dark ? 'dark' : 'light';
    // const AnimatedComponent = props => blurAmount ? <AnimatedBlurView { ...props } /> : <Animated.View { ...props } />;

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

    const renderTitle = () => {
        const [editableTitle, setEditableTitle] = useState(title);

        if(isTitleEditable) {
            return (
                <TextInput
                    style={[
                        styles.timerTitle,
                        {
                            fontFamily: fontFamily ? fontFamily : timer?.fontFamily,
                            color: fontColor ? fontColor : timer?.fontColor || theme.colors.text
                        }
                    ]}
                    numberOfLines={1}
                    value={editableTitle}
                    onBlur={onTitleBlur}
                    onChange={({ nativeEvent }) => setEditableTitle(nativeEvent.text)}
                />
            );
        }

        return (
            <Text
                style={[
                    styles.timerTitle,
                    {
                        fontFamily: fontFamily ? fontFamily : timer?.fontFamily,
                        color: fontColor ? fontColor : timer?.fontColor || theme.colors.text
                    }
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                { title }
            </Text>
        );
    };

    if(short && !title) return (
        <TimerUnits
            timer={timerData}
            containerStyle={containerStyle}
            style={style}
            color={theme.colors.textSecondary}
            short
        />
    );
    if(short && title) return (
        <Animated.View style={[style, { overflow: 'hidden' }]}>
            <View style={[styles.timer, { backgroundColor: backgroundColor ? backgroundColor : timer?.backgroundColor || 'transparent' }]}>
                { renderTitle() }
                <View style={styles.timeContainer}>
                    <TimerUnits
                        timer={timerData}
                        containerStyle={{ width: '100%' }}
                        unitStyle={{ alignSelf: 'flex-end', marginLeft: 5, fontSize: fontSizes.font16, fontWeight: '400' }}
                        style={styles.time}
                        color={ fontColor ? fontColor : timer?.fontColor || theme.colors.text }
                        short
                        dividers={false}
                    />
                </View>
            </View>
        </Animated.View>
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
                { renderTitle() }
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

export default Timer;
