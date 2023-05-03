import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    runOnJS,
    interpolate,
    withTiming
} from 'react-native-reanimated';
import { editEvent } from '../../stores/events/events.reducer';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import EditTimerBottomBar from '../../components/EditTimerBottomBar';
import FontPicker from './components/FontPicker';
import {
    CHANGE_FONT_FAMILY, CHANGE_FONT_COLOR,
    CHANGE_BACKGROUND_COLOR, CHANGE_BACKGROUND_OPACITY,
    fontFamilies
} from '../../constants';
import { SCREEN_PADDING } from '../../theme';
import SliderPicker from './components/SliderPicker';
import ColorPicker from './components/ColorPicker';

const EditEventTimerScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const animatedValue = useSharedValue(0);

    const { actionType, event } = route.params;

    const [fontFamily, setFontFamily] = useState(fontFamilies[0]);
    const [fontColor, setFontColor] = useState(theme.colors.text);
    const [backgroundOpacity, setBackgroundOpacity] = useState(0.2);
    const [backgroundColor, setBackgroundColor] = useState(`rgba(0, 0, 0, ${backgroundOpacity})`);

    useEffect(() => {
        setBackgroundColor(`rgba(0, 0, 0, ${backgroundOpacity})`);
    }, [backgroundOpacity]);

    useEffect(() => {
        // StatusBar.setHidden(true, 'fade');

        animatedValue.value = 0;
        animatedValue.value = withTiming(1, { duration: 300 });
    }, []);

    const closeHandler = () => {
        animatedValue.value = withTiming(0, { duration: 300 }, finished => finished && runOnJS(navigation.goBack)());
    };
    const saveHandler = () => {
        dispatch(editEvent({
            type: actionType,
            value: {
                fontFamily,
                fontColor,
                backgroundOpacity,
                backgroundColor
            }
        }));
        closeHandler();
    };

    const getEditElement = () => {
        switch(actionType) {
            case CHANGE_FONT_FAMILY:
                return <FontPicker value={fontFamily} onChange={setFontFamily} fontFamilies={fontFamilies} />;
            case CHANGE_FONT_COLOR:
                return <ColorPicker value={fontColor} onChange={setFontColor} />;
            case CHANGE_BACKGROUND_COLOR:
                return <ColorPicker value={backgroundColor} onChange={setBackgroundColor} opacity={backgroundOpacity} />;
            case CHANGE_BACKGROUND_OPACITY:
                return <SliderPicker value={backgroundOpacity} onChange={setBackgroundOpacity} />;
            default:
                return null;
        }
    };

    const screenAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(animatedValue.value, [0, 1], [1.1, 1]) }],
        opacity: animatedValue.value
    }));

    return (
        <Animated.View style={[StyleSheet.absoluteFillObject, screenAnimatedStyles]}>
            <Image source={event.image} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            <Timer
                title={event.title}
                time={event.timer.time}
                fontColor={fontColor}
                backgroundColor={backgroundColor}
                style={{
                    position: 'absolute',
                    top: 200,
                    left: SCREEN_PADDING,
                    right: SCREEN_PADDING,
                    height: 130,
                    borderRadius: 15
                }}
            />
            <EditTimerBottomBar closeHandler={closeHandler} saveHandler={saveHandler}>
                { getEditElement() }
            </EditTimerBottomBar>
        </Animated.View>
    );
};

export default EditEventTimerScreen;
