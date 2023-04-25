import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const HeaderBackground = () => {
    return (
        <BlurView style={StyleSheet.absoluteFillObject} blurType='regular' />
    );
};

export default HeaderBackground;
