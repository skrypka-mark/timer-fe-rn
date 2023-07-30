import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Switch, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { launchImageLibrary } from 'react-native-image-picker';
import { BlurView } from 'expo-blur';
import moment from 'moment';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import { editEvent } from '../../stores/events/events.reducer';
import SettingsList from '../../components/ui/SettingsList';

import {
    CHANGE_NAME, CHANGE_DATE, CHANGE_TIME,
    CHANGE_REPEAT, TOGGLE_NOTIFICATION,
    CHANGE_BACKGROUND_IMAGE, CHANGE_FONT_FAMILY,
    CHANGE_FONT_COLOR, CHANGE_BACKGROUND_COLOR,
    CHANGE_BACKGROUND_OPACITY, CHANGE_DISPLAY_UNIT
} from '../../constants';

const EditEventScreen = ({ event, scrollHandler }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const theme = useTheme();
    const keyboardAwareAnimatedStyles = useKeyboardAwareStyles();

    const dateRowRef = useRef(null);
    const timeRowRef = useRef(null);
    const repeatRowRef = useRef(null);

    const [title, setTitle] = useState(event?.title);

    useEffect(() => {
        if(event?.title) setTitle(event.title);
    }, [event]);

    const settingsList = [];

    const nameInputBlurHandler = () => dispatch(editEvent({ type: CHANGE_NAME, value: title }));
    const toggleNotification = () => dispatch(editEvent({ type: TOGGLE_NOTIFICATION }));
    const backgroundImagePressHandler = async () => {
        const { assets } = await launchImageLibrary({ quality: 0.7 });
        dispatch(editEvent({ type: CHANGE_BACKGROUND_IMAGE, value: { uri: assets[0].uri } }));
    };

    const editEventTimerAppearencePressHandler = actionType => {
        navigation.navigate('edit-event-timer', { actionType, event });
    };

    const changeDatePressHandler = ({ title, actionType, ref }) => {
        ref?.current?.measure((x, y, width, height, pageX, pageY) => {
            const rowSpecs = { width, height, pageX, pageY };
            navigation.navigate('edit-settings-row', { title, actionType, rowSpecs, event });
        });
    };

    const changeDisplayUnit = value => {
        dispatch(editEvent({ type: CHANGE_DISPLAY_UNIT, value }))
    };

    return (
        <BlurView style={{ height: '100%' }} intensity={35}>
            <StatusBar barStyle='light-content' animated />
            
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
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                <SettingsList style={keyboardAwareAnimatedStyles}>
                    <SettingsList.List>
                        <SettingsList.Row
                            value={title}
                            placeholder='Name'
                            onChange={({ nativeEvent }) => setTitle(nativeEvent.text)}
                            onBlur={nameInputBlurHandler}
                            editable
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Date'
                            titleInfo={event?.timer?.date ? moment(JSON.parse(event.timer.date)).format('L') : ''}
                            onPress={() => changeDatePressHandler({ title: 'Date', actionType: CHANGE_DATE, ref: dateRowRef })}
                            hasArrow
                            ref={dateRowRef}
                        />
                        <SettingsList.Row
                            title='Time'
                            titleInfo={event?.timer?.time ? moment(JSON.parse(event.timer.time)).format('LT') : ''}
                            onPress={() => changeDatePressHandler({ title: 'Time', actionType: CHANGE_TIME, ref: timeRowRef })}
                            hasArrow
                            ref={timeRowRef}
                        />
                        <SettingsList.Row
                            title='Repeat'
                            titleInfo={
                                !!+event?.timer?.repeat.amount
                                    ? `${event.timer.repeat.amount} ${event.timer.repeat.label}`
                                    : 'Not'
                            }
                            onPress={() => changeDatePressHandler({ title: 'Repeat', actionType: CHANGE_REPEAT, ref: repeatRowRef })}
                            hasArrow
                            ref={repeatRowRef}
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Notification'
                            trailing={<Switch value={event?.notification} onChange={toggleNotification} />}
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Background image'
                            trailing={<SettingsList.BackgroundBox image={event?.image} />}
                            onPress={backgroundImagePressHandler}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Font family'
                            titleInfo={event?.timer?.fontFamily}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_FONT_FAMILY)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Font color'
                            titleInfo=''
                            trailing={<SettingsList.BackgroundBox color={event?.timer?.fontColor} />}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_FONT_COLOR)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Background color'
                            titleInfo=''
                            trailing={<SettingsList.BackgroundBox color={event?.timer?.backgroundColor} />}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_BACKGROUND_COLOR)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Background opacity'
                            titleInfo={`${(+(event?.timer?.backgroundOpacity || 0) * 100).toFixed(0)}%`}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_BACKGROUND_OPACITY)}
                            hasArrow
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Year'
                            checked={event?.timer?.displayUnits?.years}
                            onPress={() => changeDisplayUnit({ years: !event?.timer?.displayUnits?.years })}
                        />
                        <SettingsList.Row
                            title='Month'
                            checked={event?.timer?.displayUnits?.months}
                            onPress={() => changeDisplayUnit({ months: !event?.timer?.displayUnits?.months })}
                        />
                        <SettingsList.Row
                            title='Week'
                            checked={event?.timer?.displayUnits?.weeks}
                            onPress={() => changeDisplayUnit({ weeks: !event?.timer?.displayUnits?.weeks })}
                        />
                        <SettingsList.Row
                            title='Day'
                            checked={event?.timer?.displayUnits?.days}
                            onPress={() => changeDisplayUnit({ days: !event?.timer?.displayUnits?.days })}
                        />
                        <SettingsList.Row
                            title='Hour'
                            checked={event?.timer?.displayUnits?.hours}
                            onPress={() => changeDisplayUnit({ hours: !event?.timer?.displayUnits?.hours })}
                        />
                        <SettingsList.Row
                            title='Minute'
                            checked={event?.timer?.displayUnits?.minutes}
                            onPress={() => changeDisplayUnit({ minutes: !event?.timer?.displayUnits?.minutes })}
                        />
                        <SettingsList.Row
                            title='Second'
                            checked={event?.timer?.displayUnits?.seconds}
                            onPress={() => changeDisplayUnit({ seconds: !event?.timer?.displayUnits?.seconds })}
                        />
                    </SettingsList.List>
                </SettingsList>
            </Animated.ScrollView>
        </BlurView>
    );
};

export default EditEventScreen;
