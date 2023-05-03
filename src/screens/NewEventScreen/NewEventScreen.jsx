import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import { createEvent, editEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import { Asset } from 'expo-asset';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import SettingsList from '../../components/ui/SettingsList';
import {
    CHANGE_NAME,
    CHANGE_FONT_FAMILY, CHANGE_FONT_COLOR,
    CHANGE_BACKGROUND_COLOR, CHANGE_BACKGROUND_OPACITY
} from '../../constants';

const NewEventScreen = () => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const theme = useTheme();
    const keyboardAwareAnimatedStyles = useKeyboardAwareStyles();

    const dateRowRef = useRef(null);
    const timeRowRef = useRef(null);
    const repeatRowRef = useRef(null);
    // const [calendarPosition, setCalendarPosition] = useState({ x: 0, y: 0 });
    // const calendarAnimatedValue = useSharedValue(0);

    // const calendarAnimatedStyles = useAnimatedStyle(() => ({
    //     position: 'absolute',
    //     opacity: calendarAnimatedValue.value,
    //     // transform: [{ scale: interpolate(calendarAnimatedValue.value, [0, 1], [0, 1]) }]
    // }));

    const [isNotificationOn, setIsNotificationOn] = useState(true);
    const toggleNotification = () => setIsNotificationOn(state => !state);

    const { newEvent } = useSelector(eventsSelector);

    useEffect(() => {
        dispatch(createEvent());
    }, []);

    // onLayoutHandler = () => {
    //     if(dateRowRef.current)
    //         dateRowRef.current.measure((x, y, width, height, pageX, pageY) => setCalendarPosition({ x: pageX, y: y + (height * 2) + 10 }));
    // };

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

    const editEventTimerAppearencePressHandler = async actionType => {
        await Promise.all([Asset.loadAsync(newEvent.image)]);
        navigation.navigate('edit-event-timer', { actionType, event: newEvent });
    };

    const nameInputBlurHandler = ({ nativeEvent }) => dispatch(editEvent({ type: CHANGE_NAME, value: nativeEvent.text }));

    const changeDatePressHandler = ({ title, ref }) => {
        ref?.current?.measure((x, y, width, height, pageX, pageY) => {
            const rowSpecs = { width, height, pageX, pageY };
            navigation.navigate('edit-settings-row', { title, rowSpecs });
        });
    };

    return (
        <BlurView
            style={{ height: '100%' }}
            intensity={35}
            // onLayout={onLayoutHandler}
        >
            <Animated.ScrollView
                style={{
                    flex: 1,
                    height: '100%',
                    paddingTop: 20,
                    backgroundColor: theme.colors.backgroundOpacity
                }}
                contentContainerStyle={{
                    paddingBottom: insets.bottom
                }}
                contentInsetAdjustmentBehavior='automatic'
                keyboardDismissMode='on-drag'
            >
                <SettingsList style={keyboardAwareAnimatedStyles}>
                    <SettingsList.List>
                        <SettingsList.Row placeholder='Name' onBlur={nameInputBlurHandler} editable />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Date'
                            // trailing={}
                            onPress={() => changeDatePressHandler({ title: 'Date', ref: dateRowRef })}
                            hasArrow
                            ref={dateRowRef}
                        />
                        <SettingsList.Row
                            title='Time'
                            // trailing={}
                            onPress={() => changeDatePressHandler({ title: 'Time', ref: timeRowRef })}
                            hasArrow
                            ref={timeRowRef}
                        />
                        <SettingsList.Row
                            title='Repeat'
                            titleInfo='Not'
                            // trailing={}
                            onPress={() => changeDatePressHandler({ title: 'Repeat', ref: repeatRowRef })}
                            hasArrow
                            ref={repeatRowRef}
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Notification'
                            trailing={<Switch value={isNotificationOn} onChange={toggleNotification} />}
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Background image'
                            trailing={<BackgroundBox color='#EDEDED' />}
                            onPress={() => null}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Font family'
                            titleInfo='Inter'
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_FONT_FAMILY)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Font color'
                            titleInfo=''
                            trailing={<BackgroundBox color='#000000' />}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_FONT_COLOR)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Background color'
                            titleInfo=''
                            trailing={<BackgroundBox color='#EDEDED' />}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_BACKGROUND_COLOR)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Background opacity'
                            titleInfo='40%'
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_BACKGROUND_OPACITY)}
                            hasArrow
                        />
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
