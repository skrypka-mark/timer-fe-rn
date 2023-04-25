import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './HeaderLeft.styles';

const HeaderLeft = ({ text, onPress }) => (
    <TouchableOpacity onPressOut={onPress}>
        <Text style={styles.text}>
            { text }
        </Text>
    </TouchableOpacity>
);

export default HeaderLeft;
