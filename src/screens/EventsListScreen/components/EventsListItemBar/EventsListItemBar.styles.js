import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100%',
        height: 110,

        marginBottom: 10,
        overflow: 'hidden'
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    title: {
        paddingTop: 10,

        fontWeight: 500,
        fontSize: 22,
        lineHeight: 27,
        color: '#252525'
    },
    timeContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

        paddingBottom: 10,
    },
    time: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 22,
        color: 'black'
    }
});
