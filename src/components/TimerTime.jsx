import { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const timeUnits = {
    days: 'Days',
    hours: 'Hour',
    minutes: 'Min',
    seconds: 'Sec'
};
const timeUnitsShort = {
    days: 'D',
    hours: 'H',
    minutes: 'M',
    seconds: 'S'
};

const RenderTimer = ({ time, style }) => Object.keys(time).map((timeFiled, index) => (
    <View key={timeFiled} style={styles.timer}>
        <View style={styles.timerTextBox}>
            <Text style={[styles.timerText, style]}>
                { time[timeFiled] }
            </Text>
            <Text style={[style, styles.timerUnitText]}>
                { timeUnits[timeFiled] }
            </Text>
        </View>
        { Object.keys(time).length !== index + 1 && <View style={styles.separator} /> }
    </View>
));

export const RenderTimerShort = ({ time, style }) => (
    <View style={[styles.timer, { gap: 8 }]}>
        { Object.keys(time).map((timeFiled, index) => (
            <Fragment key={timeFiled}>
                <Text style={[styles.timerText, style]}>
                    { `${time[timeFiled]}${timeUnitsShort[timeFiled]}` }
                </Text>
                { Object.keys(time).length !== index + 1 && <View style={styles.separatorShort} /> }
            </Fragment>
        )) }
    </View>
);

const styles = StyleSheet.create({
    timer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 30
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
