import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { styles } from './HeaderTitle.styles';

const HeaderTitle = ({ children }) => {
    const theme = useTheme();
    return (
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            { children }
        </Text>
    );
};

export default HeaderTitle;
