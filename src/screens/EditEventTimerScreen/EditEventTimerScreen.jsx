import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    runOnJS,
    interpolate,
    withTiming
} from 'react-native-reanimated';
import { editEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import EditTimerBottomBar from '../../components/EditTimerBottomBar';
import FontPicker from './components/FontPicker';
import SliderPicker from './components/SliderPicker';
import ColorPicker from './components/ColorPicker';
import { convertColorWithAlpha } from '../../utils/convertColorWithAlpha';
import {
    CHANGE_FONT_FAMILY, CHANGE_FONT_COLOR,
    CHANGE_BACKGROUND_COLOR, CHANGE_BACKGROUND_OPACITY
} from '../../constants';
import { SCREEN_PADDING } from '../../theme';

const EditEventTimerScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const animatedValue = useSharedValue(0);

    const { actionType, event } = route.params;
    // const { emptyEvent: newEvent } = useSelector(eventsSelector);

    const [fontFamily, setFontFamily] = useState(event?.timer.fontFamily);
    const [fontColor, setFontColor] = useState(event?.timer.fontColor);
    const [backgroundOpacity, setBackgroundOpacity] = useState(event?.timer.backgroundOpacity);
    const [backgroundColor, setBackgroundColor] = useState(event?.timer.backgroundColor);

    const [backgroundColorWithAlpha, setBackgroundColorWithAlpha] = useState(convertColorWithAlpha(backgroundColor, Number(backgroundOpacity)));

    // const backgroundColorObject = useMemo(() => colorKit.RGB(event.timer?.backgroundColor).object(), [event.timer.backgroundColor]);

    useEffect(() => {
        setBackgroundColorWithAlpha(convertColorWithAlpha(backgroundColor, Number(backgroundOpacity)));
    }, [backgroundColor, backgroundOpacity]);

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
                backgroundColor: backgroundColorWithAlpha
            }
        }));
        closeHandler();
    };

    const changeBackgroundOpacityHandler = value => setBackgroundOpacity(+Number(value).toFixed(2));

    const getEditElement = () => {
        switch(actionType) {
            case CHANGE_FONT_FAMILY:
                return <FontPicker value={fontFamily} onChange={setFontFamily} />;
            case CHANGE_FONT_COLOR:
                return <ColorPicker value={fontColor} onChange={setFontColor} />;
            case CHANGE_BACKGROUND_COLOR:
                return <ColorPicker value={backgroundColor} onChange={setBackgroundColor} opacity={backgroundOpacity} />;
            case CHANGE_BACKGROUND_OPACITY:
                return <SliderPicker initialValue={event?.timer.backgroundOpacity} value={backgroundOpacity} onChange={changeBackgroundOpacityHandler} />;
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
                timer={event.timer}
                fontFamily={fontFamily}
                fontColor={fontColor}
                backgroundColor={backgroundColorWithAlpha}
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
