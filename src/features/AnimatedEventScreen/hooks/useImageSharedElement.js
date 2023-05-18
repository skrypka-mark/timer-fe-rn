import { useEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';
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

    // const containerAnimatedValue = useSharedValue(0);
    const animatedValue = useSharedValue(0);
    const tapped = useSharedValue(1);
    const y = useSharedValue(0);

    useEffect(() => {
        animatedValue.value = 0;
        // animatedValue.value = withSpring(1, { stiffness: 1.5 });
        animatedValue.value = withTiming(1, { duration: 500 });
    }, []);

    // const animatedContainerStyles = useAnimatedStyle(() => ({
    //     position: 'absolute',
    //     top: interpolate(containerAnimatedValue.value, [0, 1], [0, ((height / 100) * 20) / 2], 'clamp'),
    //     left: interpolate(containerAnimatedValue.value, [0, 1], [0, ((width / 100) * 10) / 2], 'clamp'),
    //     width: interpolate(containerAnimatedValue.value, [0, 1], [width, width - ((width / 100) * 10)], 'clamp'),
    //     height: interpolate(containerAnimatedValue.value, [0, 1], [height, height - ((height / 100) * 20)], 'clamp'),
    //     overflow: 'hidden'
    // }));
    const animatedImageStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, .3, 1], [imageSpecs.pageY, imageSpecs.pageY, 0]),
        left: interpolate(animatedValue.value, [0, 1], [imageSpecs.pageX, 0]),
        width: interpolate(animatedValue.value, [0, 1], [imageSpecs.width, width]),
        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, height]),
        borderRadius: interpolate(animatedValue.value, [0, .9, 1], [imageSpecs.borderRadius, Math.floor(imageSpecs.borderRadius / 2), 0]),
        opacity: imageSpecs?.opacity !== undefined ? interpolate(animatedValue.value, [0, 1], [imageSpecs.opacity, 1]) : 1
    }));
    const animatedTimerStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, 1], [0, 200]),
        left: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        right: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, 130]),
        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, 20]),
        opacity: imageSpecs?.opacity !== undefined
            ? interpolate(animatedValue.value, [0, .8, 1], [imageSpecs.opacity, .1, 1])
            : interpolate(animatedValue.value, [0, .1, 1], [0, .8, 1])
    }));
    const animatedHeaderStyles = useAnimatedStyle(() => ({
        position: 'relative',
        transform: [{ translateY: interpolate(animatedValue.value, [0, 1], [-(headerHeight * 4), 0]) }]
    }));
    const pressHeaderAnimationStyles = useAnimatedStyle(() => ({
        position: 'relative',
        transform: [{ translateY: interpolate(tapped.value, [0, 1], [-headerHeight, 0]) }]
    }));

    const closeHandler = () => {
        const closeCallback = () => {
            navigation.goBack();
            StatusBar.setHidden(false, 'fade');
        };
        animatedValue.value = withTiming(0, { duration: 500 }, finished => finished && runOnJS(closeCallback)());
    };

    const panGestureEventHandler = useAnimatedGestureHandler({
        onStart: event => {
            y.value = event.translationY;
        },
        onActive: event => {
            if(animatedValue.value < 0.1) {
                runOnJS(closeHandler)();
            } else {
                animatedValue.value = interpolate(Math.abs(Math.floor(event.translationY - y.value)), [0, 800], [1, 0]);
                // containerAnimatedValue.value = interpolate(event.translationY - y.value, [0, 100], [0, 1]);
            }
        },
        onEnd: () => {
            if(animatedValue.value < 0.9) {
                runOnJS(closeHandler)();
            } else {
                animatedValue.value = withTiming(1, { duration: 500 });
            }
        }
    });
    const tapGestureActiveHandler = () => {
        // toggles the value from 1 to 0 and backwards
        tapped.value = withTiming(Number(!Boolean(tapped.value)), { duration: 300 });
        StatusBar.setHidden(tapped.value, 'fade');
    };

    return {
        animatedHeaderStyles, animatedImageStyles,
        animatedTimerStyles, pressHeaderAnimationStyles,
        panGestureEventHandler, tapGestureActiveHandler, closeHandler,

        // animatedContainerStyles
    };
};
