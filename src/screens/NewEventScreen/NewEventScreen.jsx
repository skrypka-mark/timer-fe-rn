import React, { useRef } from 'react';
import { View, Text, Switch, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { launchImageLibrary } from 'react-native-image-picker';
import { BlurView } from 'expo-blur';
import moment from 'moment';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import { editNewEvent } from '../../stores/events/events.reducer';
import SettingsList from '../../components/ui/SettingsList';

import {
    CHANGE_NAME, CHANGE_DATE, CHANGE_TIME,
    CHANGE_REPEAT, TOGGLE_NOTIFICATION,
    CHANGE_BACKGROUND_IMAGE, CHANGE_FONT_FAMILY,
    CHANGE_FONT_COLOR, CHANGE_BACKGROUND_COLOR,
    CHANGE_BACKGROUND_OPACITY, CHANGE_DISPLAY_UNIT
} from '../../constants';

const NewEventScreen = ({ newEvent }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const theme = useTheme();
    const keyboardAwareAnimatedStyles = useKeyboardAwareStyles();

    const dateRowRef = useRef(null);
    const timeRowRef = useRef(null);
    const repeatRowRef = useRef(null);

    const settingsList = [];

    const nameInputBlurHandler = ({ nativeEvent }) => dispatch(editNewEvent({ type: CHANGE_NAME, value: nativeEvent.text }));
    const toggleNotification = () => dispatch(editNewEvent({ type: TOGGLE_NOTIFICATION }));
    const backgroundImagePressHandler = async () => {
        const { assets } = await launchImageLibrary({ quality: 0.7 });
        dispatch(editNewEvent({ type: CHANGE_BACKGROUND_IMAGE, value: { uri: assets[0].uri } }));
    };

    const editEventTimerAppearencePressHandler = actionType => {
        navigation.navigate('edit-event-timer', { actionType, event: newEvent });
    };

    const changeDatePressHandler = ({ title, actionType, ref }) => {
        ref?.current?.measure((x, y, width, height, pageX, pageY) => {
            const rowSpecs = { width, height, pageX, pageY };
            navigation.navigate('edit-settings-row', { title, actionType, rowSpecs });
        });
    };

    const changeDisplayUnit = value => {
        dispatch(editNewEvent({ type: CHANGE_DISPLAY_UNIT, value }))
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
            >
                <SettingsList style={keyboardAwareAnimatedStyles}>
                    <SettingsList.List>
                        <SettingsList.Row placeholder='Name' onBlur={nameInputBlurHandler} editable />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Date'
                            titleInfo={newEvent?.timer?.date ? moment(JSON.parse(newEvent.timer.date)).format('L') : ''}
                            // trailing={}
                            onPress={() => changeDatePressHandler({ title: 'Date', actionType: CHANGE_DATE, ref: dateRowRef })}
                            hasArrow
                            ref={dateRowRef}
                        />
                        <SettingsList.Row
                            title='Time'
                            titleInfo={newEvent?.timer?.time ? moment(JSON.parse(newEvent.timer.time)).format('LT') : ''}
                            // trailing={}
                            onPress={() => changeDatePressHandler({ title: 'Time', actionType: CHANGE_TIME, ref: timeRowRef })}
                            hasArrow
                            ref={timeRowRef}
                        />
                        <SettingsList.Row
                            title='Repeat'
                            titleInfo={
                                !!+newEvent?.timer?.repeat.amount
                                    ? `${newEvent.timer.repeat.amount} ${newEvent.timer.repeat.label}`
                                    : 'Not'
                            }
                            // trailing={}
                            onPress={() => changeDatePressHandler({ title: 'Repeat', actionType: CHANGE_REPEAT, ref: repeatRowRef })}
                            hasArrow
                            ref={repeatRowRef}
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Notification'
                            trailing={<Switch value={newEvent?.notification} onChange={toggleNotification} />}
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Background image'
                            trailing={<SettingsList.BackgroundBox image={newEvent?.image} />}
                            onPress={backgroundImagePressHandler}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Font family'
                            titleInfo={newEvent?.timer?.fontFamily}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_FONT_FAMILY)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Font color'
                            titleInfo=''
                            trailing={<SettingsList.BackgroundBox color={newEvent?.timer?.fontColor} />}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_FONT_COLOR)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Background color'
                            titleInfo=''
                            trailing={<SettingsList.BackgroundBox color={newEvent?.timer?.backgroundColor} />}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_BACKGROUND_COLOR)}
                            hasArrow
                        />
                        <SettingsList.Row
                            title='Background opacity'
                            titleInfo={`${(+(newEvent?.timer?.backgroundOpacity || 0) * 100).toFixed(0)}%`}
                            onPress={() => editEventTimerAppearencePressHandler(CHANGE_BACKGROUND_OPACITY)}
                            hasArrow
                        />
                    </SettingsList.List>
                    <SettingsList.List>
                        <SettingsList.Row
                            title='Year'
                            checked={newEvent?.timer?.displayUnits?.years}
                            onPress={() => changeDisplayUnit({ years: !newEvent?.timer?.displayUnits?.years })}
                        />
                        <SettingsList.Row
                            title='Month'
                            checked={newEvent?.timer?.displayUnits?.months}
                            onPress={() => changeDisplayUnit({ months: !newEvent?.timer?.displayUnits?.months })}
                        />
                        <SettingsList.Row
                            title='Week'
                            checked={newEvent?.timer?.displayUnits?.weeks}
                            onPress={() => changeDisplayUnit({ weeks: !newEvent?.timer?.displayUnits?.weeks })}
                        />
                        <SettingsList.Row
                            title='Day'
                            checked={newEvent?.timer?.displayUnits?.days}
                            onPress={() => changeDisplayUnit({ days: !newEvent?.timer?.displayUnits?.days })}
                        />
                        <SettingsList.Row
                            title='Hour'
                            checked={newEvent?.timer?.displayUnits?.hours}
                            onPress={() => changeDisplayUnit({ hours: !newEvent?.timer?.displayUnits?.hours })}
                        />
                        <SettingsList.Row
                            title='Minute'
                            checked={newEvent?.timer?.displayUnits?.minutes}
                            onPress={() => changeDisplayUnit({ minutes: !newEvent?.timer?.displayUnits?.minutes })}
                        />
                        <SettingsList.Row
                            title='Second'
                            checked={newEvent?.timer?.displayUnits?.seconds}
                            onPress={() => changeDisplayUnit({ seconds: !newEvent?.timer?.displayUnits?.seconds })}
                        />
                    </SettingsList.List>
                </SettingsList>
            </Animated.ScrollView>
        </BlurView>
    );
};

export default NewEventScreen;
