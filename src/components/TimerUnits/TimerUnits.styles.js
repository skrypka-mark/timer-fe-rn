import { StyleSheet } from 'react-native';
import { fontSizes } from '../../theme/fonts';

export const styles = StyleSheet.create({
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        gap: 15
    },
    timerTextBox: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3
    },
    timerText: {
        fontSize: fontSizes.font18,
        fontWeight: '500'
    },
    timerUnitText: {
        fontSize: fontSizes.font18,
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
