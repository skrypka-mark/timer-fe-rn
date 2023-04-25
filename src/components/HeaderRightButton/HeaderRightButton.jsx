import React from 'react';
import { TouchableOpacity } from 'react-native';

const HeaderRightButton = ({ onPress, children }) => (
    <TouchableOpacity onPressOut={onPress}>
        { children }
    </TouchableOpacity>
);

export default HeaderRightButton;
