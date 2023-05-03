import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
    timer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    timerTitle: {
        fontSize: fontSizes.font24,
        fontWeight: fontWeights.low
    },
    timeContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    time: {
        fontSize: fontSizes.font20,
        fontWeight: fontWeights.normal
    }
});
