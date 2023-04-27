import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderLeft from '../components/HeaderLeft';
import HeaderButton from '../components/HeaderButton';

import BarLayoutIcon from '../screens/EventsListScreen/components/icons/BarLayoutIcon';
import HeaderCloseIcon from '../components/icons/HeaderCloseIcon';

import EventsListScreen from '../screens/EventsListScreen';
import EventScreen from '../screens/EventScreen';
import NewEventScreen from '../screens/NewEventScreen';
import GradientBackground from '../components/GradientBackground';
import { fontSizes, fontWeights } from '../theme/fonts';

const NativeStack = createNativeStackNavigator();

const AppNavigation = () => {
    const theme = useTheme();

    return (
        <NativeStack.Navigator
            initialRouteName='events-list'
            screenOptions={{
                // headerShadowVisible: false,
                // headerShown: false,
                // headerTransparent: true,
                // headerBackground: () => <TimersHeader />,
                // headerTransparent: true,
                // headerBlurEffect: true,
                // headerLargeTitle: true,
                // headerLargeTitleStyle: { fontSize: 25, fontWeight: '700' },
    
                // headerTranslucent: true,
                // headerStyle: {
                //     backgroundColor: 'transparent',
                //     blurEffect: 'systemUltraThinMaterialDark'
                // },
                // headerLargeStyle: {
                //     backgroundColor: 'black',
                // },
                // headerLargeTitle: true,
            }}
        >
            <NativeStack.Screen
                name='events-list'
                options={() => ({
                    title: null,
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
    
                    // headerLargeTitle: true,
                    // headerLargeTitleStyle: { fontSize: 25, fontWeight: '700' },
                    // headerTitleStyle: { fontSize: 25, fontWeight: '700' },
    
                    // headerBackVisible: false,
                    headerShadowVisible: false,
                    // headerStyle: { backgroundColor: '#fff' },
                    headerLeft: () => (
                        <Text style={{ marginLeft: -5, fontSize: 25, fontWeight: '700', color: theme.colors.text }}>
                            Timers
                        </Text>
                    ),
                    headerRight: () => (
                        <HeaderButton style={{ marginRight: -5 }} onPress={() => null}>
                            <BarLayoutIcon color={theme.colors.text} />
                        </HeaderButton>
                    ),
                    headerBackButtonMenuEnabled: true,
                    // contentStyle: { backgroundColor: theme.dark ? '#09061A' : 'white' },
                    contentStyle: { backgroundColor: 'transparent' }
                })}
                component={EventsListScreen}
            />
            <NativeStack.Screen
                name='event'
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    // presentation: 'card',
                    animation: 'fade',
                    animationDuration: 1000,
                    // customAnimationOnGesture: true,
                    contentStyle: { backgroundColor: 'transparent' }
                    // gestureDirection: 'vertical'
                }}
                component={EventScreen}
            />
            <NativeStack.Screen
                name='new-event'
                options={({ navigation }) => ({
                    title: 'New event',
                    gestureDirection: 'vertical',
                    contentStyle: { backgroundColor: 'transparent' },
                    presentation: 'modal',
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
                    headerLeft: () => (
                        <HeaderButton onPress={navigation.goBack}>
                            <HeaderCloseIcon color={theme.colors.text} />
                        </HeaderButton>
                    ),
                    headerRight: () => <HeaderLeft text='Save' onPress={() => navigation.goBack()} />,
                    headerTitleStyle: { fontSize: fontSizes.font18, fontWeight: fontWeights.bold }
                })}
                component={NewEventScreen}
            />
        </NativeStack.Navigator>
    );
};

export default AppNavigation;
