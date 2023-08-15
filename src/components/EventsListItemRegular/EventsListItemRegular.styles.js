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
        height: 53
    },
    textContainer: {
        flexDirection: 'column',
        gap: 2,
        marginLeft: 16
    },
    title: {
        fontSize: fontSizes.font16,
        fontWeight: fontWeights.low
    },
    timer: {
        gap: 8
    },
    timerText: {
        fontSize: fontSizes.font12,
        fontWeight: fontWeights.normal
    },

    separator: {}
});
