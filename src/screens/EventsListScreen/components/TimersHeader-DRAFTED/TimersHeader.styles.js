import { StyleSheet } from 'react-native';
import { SCREEN_PADDING } from '../../../../theme';

export const styles = StyleSheet.create({
    container: {
        // zIndex: 999,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingBottom: 25,
        border: 10,
        paddingHorizontal: SCREEN_PADDING
        // backgroundColor: 'rgba(0, 0, 0, .3)'

    },
    title: {
        fontWeight: 700,
        fontSize: 25,
        lineHeight: 30,
        color: 'rgba(0, 0, 0, .8)'
    },
    iconsContainer: {
        flexDirection: 'row',
        columnGap: 20
    }
});
