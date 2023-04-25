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
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import Options from './src/components/Options';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } />
        <AppNavigation />
        <Options
          isOpen={isOptionsOpen}
          open={() => setIsOptionsOpen(true)}
          close={() => setIsOptionsOpen(false)}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
