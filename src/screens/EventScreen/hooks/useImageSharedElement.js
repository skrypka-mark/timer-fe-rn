import { useLayoutEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withTiming,
    withSpring,
    interpolate,
    runOnJS
} from 'react-native-reanimated';
import { useHeaderHeight } from '../../../hooks/useHeaderHeight';
import { SCREEN_PADDING } from '../../../theme';

export const useImageSharedElement = imageSpecs => {
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();
    const { width, height } = Dimensions.get('window');

    const animatedValue = useSharedValue(0);
    const tapped = useSharedValue(1);
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
        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, height]),
        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, 0])
    }));
    const animatedTimerStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, 1], [0, 200]),
        left: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        right: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, 130]),
        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, 20])
    }));
    const animatedHeaderStyles = useAnimatedStyle(() => ({
        position: 'relative',
        transform: [{ translateY: interpolate(animatedValue.value, [0, 1], [-headerHeight * 4, 0]) }]
    }));
    const pressHeaderAnimationStyles = useAnimatedStyle(() => ({
        position: 'relative',
        transform: [{ translateY: interpolate(tapped.value, [0, 1], [-headerHeight, 0]) }]
    }));

    const closeHandler = () => {
        animatedValue.value = withTiming(0, { duration: 500 }, finished => finished && runOnJS(navigation.goBack)());
        // damping?: number;
        // mass?: number;
        // stiffness?: number;
        // overshootClamping?: boolean;
        // restSpeedThreshold?: number;
        // restDisplacementThreshold?: number;
        // velocity?: number;
    };

    const panGestureEventHandler = useAnimatedGestureHandler({
        onStart: event => {
            y.value = event.translationY;
        },
        onActive: event => {
            if(animatedValue.value < 0.1) {
                animatedValue.value = withTiming(0, { duration: 500 }, finished => finished && runOnJS(navigation.goBack)());
            } else {
                animatedValue.value = interpolate(Math.abs(event.translationY - y.value), [0, 800], [1, 0]);
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
    const tapGestureActiveHandler = () => {
        // toggles the value from 1 to 0 and backwards
        tapped.value = withTiming(Number(!Boolean(tapped.value)), { duration: 300 });
    };

    return {
        animatedHeaderStyles, animatedImageStyles,
        animatedTimerStyles, pressHeaderAnimationStyles,
        panGestureEventHandler, tapGestureActiveHandler, closeHandler
    };
};
