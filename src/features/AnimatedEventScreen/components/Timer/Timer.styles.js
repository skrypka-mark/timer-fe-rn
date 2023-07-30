import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
    timer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

        position: 'relative',
        
        padding: 15,
        borderRadius: 15,
        // minHeight: 130
    },
    timerTitle: {
        fontSize: fontSizes.font20,
        // fontWeight: fontWeights.low
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
