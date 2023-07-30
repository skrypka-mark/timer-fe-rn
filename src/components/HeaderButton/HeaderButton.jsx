import React from 'react';
import { TouchableOpacity } from 'react-native';

const HeaderButton = ({ style, onPress, children }) => (
    <TouchableOpacity style={style} onPress={onPress}>
        { children }
    </TouchableOpacity>
);

export default HeaderButton;
