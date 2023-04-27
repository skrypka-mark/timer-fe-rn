/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import Options from './src/components/Options';
import GradientBackground from './src/components/GradientBackground';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } />
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
