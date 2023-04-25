import { View, Text, StyleSheet } from 'react-native';

// const timeUnits = {
//     days: 'D',
//     hours: 'H',
//     minutes: 'M',
//     seconds: 'S'
// };
const timeUnits = {
    days: 'Days',
    hours: 'Hour',
    minutes: 'Min',
    seconds: 'Sec'
};

const RenderTimer = ({ time, style }) => Object.keys(time).map((timeFiled, index) => (
    <View key={timeFiled} style={styles.timer}>
        <View style={styles.timerText}>
            <Text style={style}>
                { time[timeFiled] }
            </Text>
            <Text style={[style, styles.timerUnitText]}>
                { timeUnits[timeFiled] }
            </Text>
        </View>
        { Object.keys(time).length !== index + 1 && <View style={styles.separator} /> }
    </View>
));

const styles = StyleSheet.create({
    timer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 30
    },
    timerText: {
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3
    },
    timerUnitText: {
        fontSize: 16,
        fontWeight: '300'
    },
    separator: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, .1)'
    }
});

export default RenderTimer;
