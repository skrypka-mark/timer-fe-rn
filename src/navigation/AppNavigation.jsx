import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderBackground from '../components/HeaderBackground';
import HeaderLeft from '../components/HeaderLeft';
import HeaderRightButton from '../components/HeaderRightButton';

import BarLayoutIcon from '../screens/TimersScreen/components/icons/BarLayoutIcon';
import HeaderCloseIcon from '../components/icons/HeaderCloseIcon';

import TimersScreen from '../screens/TimersScreen';
import TimerScreen from '../screens/TimerScreen';
import NewEventScreen from '../screens/NewEventScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const { colors } = useTheme();

    return (
        <Stack.Navigator
            initialRouteName='timers-list'
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
            <Stack.Screen
                name='timers-list'
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
                        <Text style={{ fontSize: 25, fontWeight: '700', color: colors.text }}>
                            Timers
                        </Text>
                    ),
                    headerRight: () => (
                        <HeaderRightButton onPress={() => null}>
                            <BarLayoutIcon color={colors.text} />
                        </HeaderRightButton>
                    ),
                    headerBackButtonMenuEnabled: true
                })}
                component={TimersScreen}
            />
            <Stack.Screen
                name='timer'
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
                component={TimerScreen}
            />
            <Stack.Screen
                name='new-event'
                options={({ navigation }) => ({
                    title: 'New event' || title,
                    gestureDirection: 'vertical',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
                    presentation: 'modal',
                    headerLeft: () => <HeaderLeft text='Save' onPress={() => navigation.goBack()} />,
                    headerRight: () => (
                        <HeaderRightButton onPress={navigation.goBack}>
                            <HeaderCloseIcon color={colors.text} />
                        </HeaderRightButton>
                    )
                })}
                component={NewEventScreen}
            />
        </Stack.Navigator>
    );
};

export default AppNavigation;
