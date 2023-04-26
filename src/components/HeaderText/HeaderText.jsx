import React from 'react';
import { Text } from 'react-native';
import { styles } from './HeaderText.styles';

const HeaderText = ({ color = 'black', children }) => (
    <Text style={[styles.headerText, { color }]}>
        { children }
    </Text>
);

export default HeaderText;
