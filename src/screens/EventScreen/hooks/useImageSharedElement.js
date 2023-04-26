import { useLayoutEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withTiming,
    interpolate,
    runOnJS
} from 'react-native-reanimated';
import { SCREEN_PADDING } from '../../../theme';

export const useImageSharedElement = imageSpecs => {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');

    const animatedValue = useSharedValue(0);
    const y = useSharedValue(0);

    useLayoutEffect(() => {
        animatedValue.value = 0;
        animatedValue.value = withTiming(1, { duration: 500 });
    }, []);

    const animatedImageStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, 1], [imageSpecs.pageY, 0]),
        left: interpolate(animatedValue.value, [0, 1], [imageSpecs.pageX, 0]),
        width: interpolate(animatedValue.value, [0, 1], [imageSpecs.width, width]),
        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, height], 'clamp'),
        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, 0])
    }));
    const animatedTimerStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, 1], [0, 200]),
        left: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        right: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, 130], 'clamp'),
        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, 20])
    }));

    const gestureEventHandler = useAnimatedGestureHandler({
        onStart: event => {
            y.value = event.translationY;
        },
        onActive: event => {
            if(animatedValue.value < 0.1) {
                animatedValue.value = withTiming(0, { duration: 500 }, finished => finished && runOnJS(navigation.goBack)());
            } else {
                animatedValue.value = interpolate(Math.abs(event.translationY - y.value), [0, 1000], [1, 0]);
            }
        },
        onEnd: () => {
            if(animatedValue.value < 0.9) {
                animatedValue.value = withTiming(0, { duration: 500 }, finished => finished && runOnJS(navigation.goBack)());
            } else {
                animatedValue.value = withTiming(1, { duration: 500 });
            }
        }
    });

    return { animatedImageStyles, animatedTimerStyles, gestureEventHandler };
};
