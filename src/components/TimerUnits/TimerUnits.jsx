import React, { Fragment, useMemo } from 'react';
import { View, Text } from 'react-native';
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
    // const units = useMemo(() => Object.keys(timer?.displayUnits || timer).filter(unit => unit), [timer]);

    // if(short) return (
    return (
        <View style={[styles.timer, { width: 'auto' }, containerStyle]}>
            { Object.keys(timer?.displayUnits || timer).map((timeFiled, index) => (
                <Fragment key={timeFiled}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.timerText, style, color && { color }]}>
                            { timer[timeFiled] }
                        </Text>
                        <Text style={[styles.timerText, style, color && { color }, unitStyle]}>
                            { timeUnitsShort[timeFiled] }
                        </Text>
                    </View>
                    { dividers && Object.keys(timer?.displayUnits || timer).length !== index + 1 && <Text style={[styles.timerText, style, color && { color }]}>·</Text> }
                </Fragment>
            )) }
        </View>
    );
    // return (
        // <View style={styles.timer}>
        //     { units.map((timeFiled, index) => (
        //         <Fragment key={timeFiled}>
        //             <View style={styles.timerTextBox}>
        //                 <Text style={[styles.timerText, style, color && { color }]} numberOfLines={1} adjustsFontSizeToFit>
        //                     { timer[timeFiled] }
        //                 </Text>
        //                 <Text style={[style, styles.timerUnitText, color && { color }]} numberOfLines={1} adjustsFontSizeToFit>
        //                     { timeUnits[timeFiled] }
        //                 </Text>
        //             </View>
        //             { dividers && units.length !== index + 1 && <View style={styles.separator} /> }
        //         </Fragment>
        //     )) }
        // </View>
    // );




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
