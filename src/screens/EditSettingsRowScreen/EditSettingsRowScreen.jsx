import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withSpring,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { editNewEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import SettingsList from '../../components/ui/SettingsList';
import {
    CHANGE_DATE, CHANGE_TIME, CHANGE_REPEAT,
    CHANGE_REPEAT_AMOUNT, CHANGE_REPEAT_LABEL,
    repeatPickerValues
} from '../../constants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const EditSettingsRowScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const animatedValue = useSharedValue(0);

    const { title, actionType, rowSpecs } = route.params;
    const { emptyEvent: newEvent } = useSelector(eventsSelector);

    useEffect(() => {
        animatedValue.value = 0;
        animatedValue.value = withSpring(1, { mass: 1.2 });
        HapticFeedback.trigger('impactMedium');
        StatusBar.setHidden(true, 'fade');
    }, []);

    const rowAnimatedStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, 1], [rowSpecs.pageY, rowSpecs.pageY - 5]),
        left: interpolate(animatedValue.value, [0, 1], [rowSpecs.pageX, rowSpecs.pageX - 5]),
        width: interpolate(animatedValue.value, [0, 1], [rowSpecs.width, rowSpecs.width + 10]),
        height: interpolate(animatedValue.value, [0, 1], [rowSpecs.height, rowSpecs.height + 10]),
        opacity: interpolate(animatedValue.value, [0, 0.3, 1], [0, 1, 1])
    }));
    const backdropAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(animatedValue.value, [0, 1], [0, 1]),
        // borderTopLeftRadius: interpolate(animatedValue.value, [0, 1], [radiusTop])
    }));
    const pickerAnimatedStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: rowSpecs.pageY + rowSpecs.height + 15,
        right: interpolate(animatedValue.value, [0, 1], [-50, rowSpecs.pageX - 5]),
        opacity: interpolate(animatedValue.value, [0, 1], [0, 1]),
        borderRadius: 15,
        overflow: 'hidden'
    }));

    const backdropPressHandler = () => {
        StatusBar.setHidden(false, 'fade');
        animatedValue.value = withTiming(0, { duration: 300 }, finished => finished && runOnJS(navigation.goBack)());
    };

    const dateChangeHandler = (_, date) => {
        dispatch(editNewEvent({ type: CHANGE_DATE, value: JSON.stringify(date) }));
    };
    const timeChangeHandler = (_, time) => {
        dispatch(editNewEvent({ type: CHANGE_TIME, value: JSON.stringify(time) }));
    };
    const repeatChangeHandler = value => ({
        actionType: '',
        _setActionType: function(actionType) {
            this.actionType = actionType;
            return this;
        },
        amount: function() {
            return this._setActionType(CHANGE_REPEAT_AMOUNT);
        },
        label: function() {
            return this._setActionType(CHANGE_REPEAT_LABEL);
        },
        dispatch: function() {
            dispatch(editNewEvent({ type: this.actionType, value: value?.split('_').at(-1) }));
        }
    });

    const PickerComponent = {
        [CHANGE_DATE]: (
            <DateTimePicker
                display='inline'
                value={newEvent.timer?.date ? new Date(JSON.parse(newEvent.timer.date)) : new Date()}
                minimumDate={new Date()}
                onChange={dateChangeHandler}
                positiveButton={{ label: 'Okay' }}
                negativeButton={{ label: 'Cancel' }}
            />
        ),
        [CHANGE_TIME]: (
            <DateTimePicker
                mode='time'
                display='spinner'
                style={{ width: 210 }}
                value={newEvent.timer?.time ? new Date(JSON.parse(newEvent.timer.time)) : new Date()}
                minimumDate={new Date()}
                onChange={timeChangeHandler}
                positiveButton={{ label: 'Okay' }}
                negativeButton={{ label: 'Cancel' }}
            />
        ),
        [CHANGE_REPEAT]: (
            <View style={{ width: 250, flexDirection: 'row' }}>
                <Picker
                    style={{ width: '40%', marginRight: -5 }}
                    selectedValue={`repeat-amount_${newEvent.timer?.repeat.amount}`}
                    itemStyle={{ color: theme.colors.text }}
                    onValueChange={key => repeatChangeHandler(key).amount().dispatch()}
                >
                    { repeatPickerValues.amounts.map((label, index) => (
                        <Picker.Item key={index} label={label} value={`repeat-amount_${label}`} />
                    )) }
                </Picker>
                <Picker
                    style={{ width: '65%', marginLeft: -5 }}
                    selectedValue={`repeat-label_${newEvent.timer?.repeat.label}`}
                    itemStyle={{ color: theme.colors.text }}
                    onValueChange={key => repeatChangeHandler(key).label().dispatch()}
                >
                    { repeatPickerValues.labels.map((label, index) => (
                        <Picker.Item key={index} label={label} value={`repeat-label_${label}`} />
                    )) }
                </Picker>
            </View>
        )
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <AnimatedPressable style={[StyleSheet.absoluteFillObject, backdropAnimatedStyles]} onPress={backdropPressHandler}>
                <BlurView intensity={35} style={StyleSheet.absoluteFillObject}>
                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.backgroundOpacity }]} />
                </BlurView>
            </AnimatedPressable>
            <Pressable onPress={backdropPressHandler}>
                <Animated.View style={rowAnimatedStyles}>
                    <SettingsList.Row title={title} radiusTop radiusBottom hasArrow hideDivider />
                </Animated.View>
            </Pressable>
            <Animated.View style={[pickerAnimatedStyles, { backgroundColor: theme.colors.card }]}>
                { PickerComponent[actionType] || null }
            </Animated.View>
        </View>
    );
};

export default EditSettingsRowScreen;
