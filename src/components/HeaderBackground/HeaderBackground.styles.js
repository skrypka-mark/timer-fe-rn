import { StyleSheet } from 'react-native';
import { SCREEN_PADDING } from '../../theme';

export const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    headerWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: SCREEN_PADDING
    }
});
