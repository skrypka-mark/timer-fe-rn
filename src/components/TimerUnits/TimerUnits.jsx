import React, { Fragment, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
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

const TimerUnits = ({
    timer,
    containerStyle,
    unitStyle,
    style,
    color,
    short,
    dividers = true
}) => {
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

    if(short) return (
        <View style={[styles.timer, { width: 'auto' }, containerStyle]}>
            { Object.keys(timerData).map((timeFiled, index) => (
                <Fragment key={timeFiled}>
                    <TimerUnit
                        value={timerData[timeFiled]}
                        unit={timeUnitsShort[timeFiled]}
                        short={short}
                        style={style}
                        unitStyle={unitStyle}
                        color={color}
                    />
                    { (dividers && Object.keys(timerData).length !== index + 1) && <Text style={[styles.timerText, style, color && { color }]}>·</Text> }
                </Fragment>
            )) }
        </View>
    );
    return (
        <View style={styles.timer}>
            { Object.keys(timerData).map((timeFiled, index) => (
                <Fragment key={timeFiled}>
                    <TimerUnit value={timerData[timeFiled]} unit={timeUnits[timeFiled]} style={style} color={color} />
                    { (dividers && Object.keys(timerData).length !== index + 1) ? <View style={styles.separator} /> : null }
                </Fragment>
            )) }
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

export default TimerUnits;
