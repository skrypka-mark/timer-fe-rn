import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EventsListScreen from '../screens/EventsListScreen';
import EventScreen from '../screens/EventScreen';
import NewEventScreen from '../screens/NewEventScreen';
import EditEventTimerScreen from '../screens/EditEventTimerScreen';
import EditSettingsRowScreen from '../screens/EditSettingsRowScreen';
import EditEventScreen from '../screens/EditEventScreen';
import BuiltInEventsListScreen from '../screens/BuiltInEventsListScreen';

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

                // freezeOnBlur: true,
    
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
                options={{
                    title: null,
                    headerTransparent: true,
                    // headerBlurEffect: 'regular',

                    // freezeOnBlur: true,
    
                    // headerLargeTitle: true,
                    // headerLargeStyle: { backgroundColor: 'transparent' },
                    // headerLargeTitleStyle: { fontSize: 25, fontWeight: '700' },
                    // headerTitleStyle: { fontSize: 25, fontWeight: '700' },
    
                    // headerBackVisible: false,
                    // headerShadowVisible: false,
                    // contentStyle: { backgroundColor: theme.dark ? '#09061A' : 'white' },
                    contentStyle: { backgroundColor: 'transparent' }
                }}
                component={EventsListScreen}
            />
            <NativeStack.Screen
                name='builtin-events-list'
                options={{
                    title: null,
                    gestureDirection: 'vertical',
                    contentStyle: { backgroundColor: 'transparent' },
                    presentation: 'modal',
                    headerTransparent: true,
                    // headerBlurEffect: 'regular',
                    // headerTitleStyle: { fontSize: fontSizes.font18, fontWeight: fontWeights.bold }
                }}
                component={BuiltInEventsListScreen}
            />
            <NativeStack.Screen
                name='event'
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'none',
                    // animationDuration: 1000,
                    // customAnimationOnGesture: true,
                    contentStyle: { backgroundColor: 'transparent' }
                    // gestureDirection: 'vertical'
                }}
                component={EventScreen}
            />
            <NativeStack.Screen
                name='new-event'
                options={{
                    title: null,
                    // gestureDirection: 'vertical',
                    // fullScreenGestureEnabled: true,
                    // customAnimationOnGesture: true,
                    contentStyle: { backgroundColor: 'transparent' },
                    presentation: 'modal',
                    headerTransparent: true,
                    headerBackButtonMenuEnabled: false,
                    gestureEnabled: false,
                    // headerBlurEffect: 'regular',
                    // headerTitleStyle: { fontSize: fontSizes.font18, fontWeight: fontWeights.bold }
                }}
                component={NewEventScreen}
            />
            <NativeStack.Screen
                name='edit-event-timer'
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    // gestureDirection: 'vertical',
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
                    title: null,
                    gestureDirection: 'vertical',
                    contentStyle: { backgroundColor: 'transparent' },
                    presentation: 'modal',
                    // headerStyle: { backgroundColor: 'transparent' },
                    headerTransparent: true,
                    gestureEnabled: false,
                    // headerBlurEffect: 'regular',
                    // headerTitleStyle: { fontSize: fontSizes.font18, fontWeight: fontWeights.bold },
                }}
                component={EditEventScreen}
            />
        </NativeStack.Navigator>
    );
};

export default AppNavigation;
