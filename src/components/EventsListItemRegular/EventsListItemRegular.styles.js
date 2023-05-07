import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights } from '../../theme/fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        position: 'relative',

        width: '100%',
        height: 53
    },
    image: {
        width: 53,
        height: 53,
        borderRadius: 5
    },
    textContainer: {
        flexDirection: 'column',
        gap: 2,
        marginLeft: 15
    },
    title: {
        fontWeight: fontWeights.low,
        fontSize: fontSizes.font14
    },
    timer: {
        // width: '100%',
        gap: 8
    },
    timerText: {
        fontSize: fontSizes.font14,
        fontWeight: fontWeights.normal
    },

    separator: {}
});
