import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './TimerUnits.styles';

const TimerUnit = ({ value, unit, short, style, unitStyle, color }) => {
    if(short) return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.timerText, style, color && { color }]} adjustsFontSizeToFit numberOfLines={1}>
                { value }
            </Text>
            <Text style={[styles.timerText, style, color && { color }, unitStyle]} adjustsFontSizeToFit numberOfLines={1}>
                { unit }
            </Text>
        </View>
    );
    return (
        <View style={styles.timerTextBox}>
            <Text style={[styles.timerText, style, color ? { color } : {}]} adjustsFontSizeToFit numberOfLines={1}>
                { value }
            </Text>
            <Text style={[styles.timerUnitText, style, color ? { color } : {}]} adjustsFontSizeToFit numberOfLines={1}>
                { unit }
            </Text>
        </View>
    );
};

export default memo(TimerUnit);
