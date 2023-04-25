import React from 'react';
import { View } from 'react-native';
import { styles } from './Screen.styles';

const Screen = ({ children }) => (
    <View style={styles.screen}>
        { children }
    </View>
);

export default Screen;
