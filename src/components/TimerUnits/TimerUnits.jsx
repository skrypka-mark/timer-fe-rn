import React, { Fragment, useEffect, useState, memo } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useDerivedValue } from 'react-native-reanimated';
import { getCountdownTime } from '../../helpers/utils';
import TimerUnit from './TimerUnit';
import { styles } from './TimerUnits.styles';

const timeUnits = {
    years: 'Years',
    months: 'Months',
    weeks: 'Weeks',
    days: 'Days',
    hours: 'Hour',
    minutes: 'Min',
    seconds: 'Sec'
};
const timeUnitsShort = {
    years: 'Y',
    months: 'Mo',
    weeks: 'W',
    days: 'D',
    hours: 'H',
    minutes: 'M',
    seconds: 'S'
};

const AnimatedTimerUnit = Animated.createAnimatedComponent(TimerUnit);

const TimerUnits = ({
    timer,
    containerStyle,
    unitStyle,
    style,
    color,
    short,
    dividers = true
}) => {
    // const [timerData, setTimerData] = useState(getCountdownTime(timer).timeLeft);
    const timerData = useSharedValue(getCountdownTime(timer).timeLeft);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const { timeLeft, duration } = getCountdownTime(timer);

            if(duration <= 0) return clearInterval(interval);
            timerData.value = timeLeft;
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if(short) return (
        <View style={[styles.timer, { width: 'auto' }, containerStyle]}>
            { Object.keys(timerData.value).map((timeFiled, index) => {
                const value = useDerivedValue(() => `${timerData.value[timeFiled]}`);
                return (
                    <Fragment key={timeFiled}>
                        <TimerUnit
                            value={value}
                            unit={timeUnitsShort[timeFiled]}
                            short={short}
                            style={style}
                            unitStyle={unitStyle}
                            color={color}
                        />
                        { (dividers && Object.keys(timerData.value).length !== index + 1)
                            ? <Text style={[styles.timerText, style, color && { color }]}>|</Text>
                            : null
                        }
                    </Fragment>
                );
            }) }
        </View>
    );
    return (
        <View style={styles.timer}>
            { Object.keys(timerData.value).map((timeFiled, index) => {
                const value = useDerivedValue(() => `${timerData.value[timeFiled]}`);
                return (
                    <Fragment key={timeFiled}>
                        <TimerUnit value={value} unit={timeUnits[timeFiled]} style={style} color={color} />
                        { (dividers && Object.keys(timerData.value).length !== index + 1)
                            ? <View style={styles.separator} />
                            : null 
                        }
                    </Fragment>
                );
            }) }
        </View>
    );




    // return (
    //     <View style={styles.timer}>
    //         { Object.keys(timer?.displayUnits || timer).map((timeFiled, index) => (
    //             <Text key={timeFiled} style={[styles.timerText, style, color && { color }]}>
    //                 { timer[timeFiled] }
    //                 { timeUnits[timeFiled] }
    //             </Text>
    //         )) }
    //     </View>
    // );
};

export default memo(TimerUnits);
