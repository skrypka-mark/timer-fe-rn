import { StyleSheet } from 'react-native';
import { SCREEN_PADDING, BORDER_RADIUS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: SCREEN_PADDING,
        right: SCREEN_PADDING,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden'
    },
    contentBox: {},
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: SCREEN_PADDING,
        borderTopWidth: 1
    }
});
