import { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

const RenderTimer = ({ timer, style, color }) => (
    <View style={styles.timer}>
        { Object.keys(timer?.displayUnits || timer).filter(unit => unit).map((timeFiled, index) => (
            <Fragment key={timeFiled}>
                <View style={styles.timerTextBox}>
                    <Text style={[styles.timerText, style, color && { color }]}>
                        { timer[timeFiled] }
                    </Text>
                    <Text style={[style, styles.timerUnitText, color && { color }]}>
                        { timeUnits[timeFiled] }
                    </Text>
                </View>
                { Object.keys(timer?.displayUnits || timer).length !== index + 1 && <View style={styles.separator} /> }
            </Fragment>
        )) }
    </View>
);

export const RenderTimerShort = ({ timer, containerStyle, style, color }) => (
    <View style={[styles.timer, { width: 'auto' }, containerStyle]}>
        { Object.keys(timer).map((timeFiled, index) => (
            <Fragment key={timeFiled}>
                <Text style={[styles.timerText, style, color && { color }]}>
                    { `${timer[timeFiled]}${timeUnitsShort[timeFiled]}` }
                </Text>
                { Object.keys(timer).length !== index + 1 && <Text style={[styles.timerText, style, color && { color }]}>·</Text> }
            </Fragment>
        )) }
    </View>
);

const styles = StyleSheet.create({
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
        // gap: 30
    },
    timerTextBox: {
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3
    },
    timerText: {
        fontSize: 18
    },
    timerUnitText: {
        fontSize: 18,
        fontWeight: '300'
    },
    separator: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, .3)'
    },
    separatorShort: {
        width: 0.5,
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, .3)'
    }
});

export default RenderTimer;
