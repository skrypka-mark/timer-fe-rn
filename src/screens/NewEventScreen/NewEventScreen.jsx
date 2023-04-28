import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import { BlurView } from '@react-native-community/blur';
import { ContextMenuView } from 'react-native-ios-context-menu';
import Animated from 'react-native-reanimated';
import SettingsList from '../../components/ui/SettingsList';

const NewEventScreen = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const keyboardAwareAnimatedStyles = useKeyboardAwareStyles();

    const settingsList = [];

    const BackgroundBox = ({ color }) => (
        <View
            style={{
                width: 25,
                height: 25,
                borderRadius: 5,
                backgroundColor: color || 'transparent'
            }}
        />
    );

    return (
        <BlurView style={{ height: '100%', backgroundColor: theme.dark ? 'rgba(0, 0, 0, .7)' : 'rgba(222, 222, 222, .7)' }} blurType='regular'>
            <Animated.ScrollView
                style={{
                    flex: 1,
                    height: '100%',
                    paddingTop: 20
                }}
                contentContainerStyle={{
                    paddingBottom: insets.bottom
                }}
                contentInsetAdjustmentBehavior='automatic'
            >
                <SettingsList style={keyboardAwareAnimatedStyles}>
                    <SettingsList.List>
                        <SettingsList.Row placeholder='Name' editable />
                    </SettingsList.List>
                    <SettingsList.List>
                        <ContextMenuView
                            menuConfig={{
                                menuTitle: '',
                                menuItems: [{ actionKey: 'jhsd21', actionTitle: 'sdcs' }]
                            }}
                        >
                            <SettingsList.Row title='Date' titleInfo='25.07.2023' onPress={() => null} />
                        </ContextMenuView>
                        <ContextMenuView
                            menuConfig={{
                                menuTitle: '',
                                menuItems: [{ actionKey: 'jhsd21', actionTitle: 'sdcs' }]
                            }}
                        >
                            <SettingsList.Row title='Time' titleInfo='00:00' onPress={() => null} />
                        </ContextMenuView>
                        <SettingsList.Row title='Repeat' titleInfo='Not' onPress={() => null} />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row title='Notification' />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row title='Background image' onPress={() => null} />
                        <SettingsList.Row title='Font family' titleInfo='Inter' onPress={() => null} />
                        <SettingsList.Row title='Font color' titleInfo='' trailing={<BackgroundBox color='#000000' />} onPress={() => null} />
                        <SettingsList.Row title='Font background color' titleInfo='' trailing={<BackgroundBox color='#EDEDED' />} onPress={() => null} />
                        <SettingsList.Row title='Font background opacity' titleInfo='40%' onPress={() => null} />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row title='Year' onPress={() => null} />
                        <SettingsList.Row title='Month' onPress={() => null} />
                        <SettingsList.Row title='Week' onPress={() => null} />
                        <SettingsList.Row title='Day' onPress={() => null} />
                        <SettingsList.Row title='Hour' onPress={() => null} />
                        <SettingsList.Row title='Minute' onPress={() => null} />
                        <SettingsList.Row title='Second' onPress={() => null} />
                    </SettingsList.List>
                </SettingsList>
            </Animated.ScrollView>
        </BlurView>
    );
};

export default NewEventScreen;
