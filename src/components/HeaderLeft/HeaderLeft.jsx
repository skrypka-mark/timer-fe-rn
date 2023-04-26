import React from 'react';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './HeaderLeft.styles';

const HeaderLeft = ({ text, onPress }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPressOut={onPress}>
            <Text style={[styles.text, { color: theme.colors.primary }]}>
                { text }
            </Text>
        </TouchableOpacity>
    );
};

export default HeaderLeft;
