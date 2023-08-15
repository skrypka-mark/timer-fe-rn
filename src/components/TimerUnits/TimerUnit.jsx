import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { ReText } from 'react-native-redash';
import { styles } from './TimerUnits.styles';

const TimerUnit = ({ value, unit, short, style, unitStyle, color }) => {
    if(short) return (
        <View style={{ flexDirection: 'row' }}>
            <ReText
                style={[styles.timerText, style, color && { color }]}
                text={value}
                adjustsFontSizeToFit
                numberOfLines={1}
            />
            <Text style={[styles.timerText, style, color && { color }, unitStyle]} adjustsFontSizeToFit numberOfLines={1}>
                { unit }
            </Text>
        </View>
    );
    return (
        <View style={styles.timerTextBox}>
            <ReText
                style={[styles.timerText, style, color ? { color } : {}]}
                text={value}
                adjustsFontSizeToFit
                numberOfLines={1}
            />
            <Text style={[styles.timerUnitText, style, color ? { color } : {}]} adjustsFontSizeToFit numberOfLines={1}>
                { unit }
            </Text>
        </View>
    );
};

export default memo(TimerUnit);
