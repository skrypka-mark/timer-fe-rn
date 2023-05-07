import React, { useState } from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import Options from '../components/Options';
import GradientBackground from '../components/GradientBackground';

export default () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const darkTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            textSecondary: 'rgba(255, 255, 255, .5)',
            card: 'rgba(28, 28, 28, 1)',
            border: 'rgba(61, 61, 64, 1)',
            backgroundOpacity: 'rgba(0, 0, 0, .8)'
        }
    };
    const defaultTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            textSecondary: 'rgba(0, 0, 0, .5)',
            backgroundOpacity: 'rgba(222, 222, 222, .8)'
        }
    };
    return (
        <NavigationContainer theme={isDarkMode ? darkTheme : defaultTheme}>
            <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } animated />
            <View style={{ height: '100%', flex: 1, position: 'relative' }}>
                <GradientBackground />
                <AppNavigation />
                <Options
                    isOpen={isOptionsOpen}
                    open={() => setIsOptionsOpen(true)}
                    close={() => setIsOptionsOpen(false)}
                />
            </View>
        </NavigationContainer>
    );
};
