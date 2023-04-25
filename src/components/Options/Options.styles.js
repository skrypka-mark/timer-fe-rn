import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    optionsListContainer: {
        position: 'absolute',
        gap: 10
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 'auto'
    },
    optionName: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, .8)'
    },
    optionBtnWrapper: {
        borderRadius: 90,
        overflow: 'hidden'
    },
    optionBtn: {
        width: 50,
        height: 50,

        alignItems: 'center',
        justifyContent: 'center'
    },
    optionIcon: {}
});
