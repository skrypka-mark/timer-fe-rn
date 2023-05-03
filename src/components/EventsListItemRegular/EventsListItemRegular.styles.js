import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights } from '../../theme/fonts';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',

        width: '100%',
        height: 45,

        overflow: 'hidden'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 5
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 15
    },
    title: {
        paddingTop: 10,

        fontWeight: fontWeights.low,
        fontSize: fontSizes.font16
    },
    time: {
        fontSize: fontSizes.font12,
        fontWeight: fontWeights.normal
    }
});
