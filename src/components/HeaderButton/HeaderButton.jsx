import React from 'react';
import { TouchableOpacity } from 'react-native';

const HeaderButton = ({ onPress, children }) => (
    <TouchableOpacity onPressOut={onPress}>
        { children }
    </TouchableOpacity>
);

export default HeaderButton;
