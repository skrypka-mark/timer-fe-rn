import React from 'react';
import Animated from 'react-native-reanimated';
import { styles } from './SettingsList.styles';

const SettingsList = ({ style, children }) => {
    return (
        <Animated.View style={[styles.container, style]}>
            { children }
        </Animated.View>
    );
};

export default SettingsList;
