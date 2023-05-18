import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EventsListScreen from '../screens/EventsListScreen';
import EventScreen from '../screens/EventScreen';
import NewEventScreen from '../screens/NewEventScreen';
import EditEventTimerScreen from '../screens/EditEventTimerScreen';
import EditSettingsRowScreen from '../screens/EditSettingsRowScreen';
import EditEventScreen from '../screens/EditEventScreen';

import { fontSizes, fontWeights } from '../theme/fonts';

const NativeStack = createNativeStackNavigator();

const AppNavigation = () => {
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
                    headerTitleStyle: { fontSize: fontSizes.font18, fontWeight: fontWeights.bold }
                })}
                component={NewEventScreen}
            />
            <NativeStack.Screen
                name='edit-event-timer'
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    gestureDirection: 'vertical',
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' }
                }}
                component={EditEventTimerScreen}
            />
            <NativeStack.Screen
                name='edit-settings-row'
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'none',
                    contentStyle: { backgroundColor: 'transparent' }
                }}
                component={EditSettingsRowScreen}
            />
            <NativeStack.Screen
                name='edit-event'
                options={{
                    title: 'Edit event',
                    gestureDirection: 'vertical',
                    contentStyle: { backgroundColor: 'transparent' },
                    presentation: 'modal',
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
                    headerTitleStyle: { fontSize: fontSizes.font18, fontWeight: fontWeights.bold }
                }}
                component={EditEventScreen}
            />
        </NativeStack.Navigator>
    );
};

export default AppNavigation;
