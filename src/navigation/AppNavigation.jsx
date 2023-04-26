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

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const { colors } = useTheme();

    return (
        <Stack.Navigator
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
            <Stack.Screen
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
                        <Text style={{ fontSize: 25, fontWeight: '700', color: colors.text }}>
                            Timers
                        </Text>
                    ),
                    headerRight: () => (
                        <HeaderButton onPress={() => null}>
                            <BarLayoutIcon color={colors.text} />
                        </HeaderButton>
                    ),
                    headerBackButtonMenuEnabled: true
                })}
                component={EventsListScreen}
            />
            <Stack.Screen
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
                        <HeaderButton onPress={navigation.goBack}>
                            <HeaderCloseIcon color={colors.text} />
                        </HeaderButton>
                    )
                })}
                component={NewEventScreen}
            />
        </Stack.Navigator>
    );
};

export default AppNavigation;
