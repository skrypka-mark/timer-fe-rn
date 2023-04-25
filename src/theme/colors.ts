import { useColorScheme } from 'react-native';

const isDarkMode = useColorScheme() === 'dark';

const darkColors = {
    primary: '$000'
};

const lightColors = {
    primary: '$000'
};

export const colors = isDarkMode ? darkColors : lightColors;
