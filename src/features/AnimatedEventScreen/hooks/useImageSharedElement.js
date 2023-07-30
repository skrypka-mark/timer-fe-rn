import { useCallback } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withTiming,
    withSpring,
    interpolate,
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';
import { useHeaderHeight } from '../../../hooks/useHeaderHeight';
import { SCREEN_PADDING } from '../../../theme';

export const useImageSharedElement = imageSpecs => {
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();
    const { width, height } = Dimensions.get('window');

    const containerAnimatedValue = useSharedValue(0);
    const containerAnimatedValueX = useSharedValue(0);
    const containerAnimatedValueY = useSharedValue(0);

    const animatedValue = useSharedValue(0);
    const tapped = useSharedValue(1);

    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const onLayout = useCallback(() => {
        containerAnimatedValue.value = 0;
        containerAnimatedValueX.value = 0;
        containerAnimatedValueY.value = 0;

        animatedValue.value = 0;
        animatedValue.value = withSpring(1, { stiffness: 210, damping: 20 });
        // animatedValue.value = withTiming(1, { duration: 300 });
    }, []);

    const clipContainerAnimatedStyles = useAnimatedStyle(() => ({
        // position: 'absolute',
        // width,
        // height,

        // borderRadius: interpolate(containerAnimatedValue.value, [0, 1], [imageSpecs.borderRadius, imageSpecs.borderRadius * 1.5]),
        // overflow: 'hidden'
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: interpolate(animatedValue.value, [0, 1], [0, .3]),
        shadowRadius: 6,

        elevation: 6
    }));
    const animatedContainerStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        width,
        height,

        transform: [
            { translateX: interpolate(containerAnimatedValueX.value, [-1, 0, 1], [(-width / 100) * 50, 0, (width / 100) * 20], Extrapolate.CLAMP) },
            { translateY: interpolate(containerAnimatedValueY.value, [-1, 0, 1], [(-height / 100) * 20, 0, (height / 100) * 10], Extrapolate.CLAMP) },
            {
                scale: interpolate(
                    containerAnimatedValueY.value - ((containerAnimatedValueX.value < 0 ? -containerAnimatedValueX.value : containerAnimatedValueX.value) / 100) * 50,
                    [-1, 0, 1],
                    [.7, 1, .7],
                    Extrapolate.CLAMP
                )
            }
        ],

        borderRadius: interpolate(Math.abs(containerAnimatedValueY.value - (containerAnimatedValueX.value / 100) * 50), [0, 1], [imageSpecs.borderRadius, imageSpecs.borderRadius * 2]),
        overflow: 'hidden'
    }));
    const animatedEventContainerStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, 1], [imageSpecs.pageY, 0]),
        left: interpolate(animatedValue.value, [0, 1], [imageSpecs.pageX, 0]),

        width: interpolate(animatedValue.value, [0, 1], [imageSpecs.width, width]),
        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, height]),

        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, imageSpecs.borderRadius * 2]),
        // borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, imageSpecs.borderRadius * 4]),
        // opacity: interpolate(animatedValue.value, [0, 1], [imageSpecs.opacity ?? 1, 1]),
        // opacity: interpolate(animatedValue.value, [0, .05, 1], [0, .95, 1]),
        overflow: 'hidden'
    }));
    const animatedImageStyles = useAnimatedStyle(() => ({
        // position: 'absolute',
        // top: interpolate(animatedValue.value, [0, 1], [imageSpecs.pageY, 0]),
        // left: interpolate(animatedValue.value, [0, 1], [imageSpecs.pageX, 0]),
        // width: interpolate(animatedValue.value, [0, 1], [imageSpecs.width, width]),
        // height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, height]),
        // borderRadius: interpolate(animatedValue.value, [0, .9, 1], [imageSpecs.borderRadius, Math.floor(imageSpecs.borderRadius / 2), 0]),

        // opacity: interpolate(animatedValue.value, [0, .2, 1], [0, .9, 1])
    }));
    const animatedTimerStyles = useAnimatedStyle(() => ({
        position: 'absolute',

        top: interpolate(animatedValue.value, [0, 1], [0, 200]),
        left: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        right: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),

        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, 130], Extrapolate.CLAMP),
        // height: imageSpecs.height,

        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, 20]),
        // opacity: imageSpecs?.opacity !== undefined
        //     ? interpolate(animatedValue.value, [0, .8, 1], [imageSpecs.opacity, .1, 1])
        //     : interpolate(animatedValue.value, [0, 1], [0, 1]),
        opacity: interpolate(animatedValue.value, [0, .5], [imageSpecs?.opacity === undefined ? 1 : 0, 0])
    }));
    const animatedBlurredTimerStyles = useAnimatedStyle(() => ({
        position: 'absolute',

        top: interpolate(animatedValue.value, [0, 1], [0, 200]),
        left: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),
        right: interpolate(animatedValue.value, [0, 1], [0, SCREEN_PADDING]),

        height: interpolate(animatedValue.value, [0, 1], [imageSpecs.height, 130], Extrapolate.CLAMP),
        // height: imageSpecs.height,

        borderRadius: interpolate(animatedValue.value, [0, 1], [imageSpecs.borderRadius, 20]),
        // opacity: imageSpecs?.opacity !== undefined
        //     ? interpolate(animatedValue.value, [0, .8, 1], [imageSpecs.opacity, .1, 1])
        //     : interpolate(animatedValue.value, [0, 1], [0, 1]),
        opacity: interpolate(animatedValue.value, [0, .5], [0, 1])
    }));
    const animatedHeaderStyles = useAnimatedStyle(() => ({
        position: 'relative',
        transform: [{
            translateY: interpolate(
                animatedValue.value - (containerAnimatedValue.value < 0 ? -containerAnimatedValue.value : containerAnimatedValue.value),
                [0, 1],
                [-(headerHeight * 4), 0],
                Extrapolate.CLAMP
            )
        }]
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

        containerAnimatedValue.value = withTiming(0);
        containerAnimatedValueX.value = withTiming(0);
        containerAnimatedValueY.value = withTiming(0);

        animatedValue.value = withTiming(0, null, finished => finished && runOnJS(closeCallback)());
    };

    const panGestureEventHandler = useAnimatedGestureHandler({
        onStart: event => {
            x.value = event.translationX;
            y.value = event.translationY;
        },
        onActive: event => {
            containerAnimatedValueX.value = interpolate(event.translationX - x.value, [0, width], [0, 1]);
            containerAnimatedValueY.value = interpolate(event.translationY - y.value, [0, height], [0, 1]);
            containerAnimatedValue.value = containerAnimatedValueX.value + containerAnimatedValueY.value;
        },
        onEnd: () => {
            if(Math.abs(containerAnimatedValueX.value) > 0.25 || Math.abs(containerAnimatedValueY.value) > 0.3) {
                runOnJS(closeHandler)();
            } else {
                containerAnimatedValue.value = withTiming(0, { duration: 200 });
                containerAnimatedValueX.value = withTiming(0, { duration: 200 });
                containerAnimatedValueY.value = withTiming(0, { duration: 200 });
            }
        }
    });
    const tapGestureActiveHandler = () => {
        // toggles the value from 1 to 0 and backwards
        tapped.value = withTiming(Number(!Boolean(tapped.value)), { duration: 300 });
        StatusBar.setHidden(tapped.value, 'fade');
    };

    return {
        animatedHeaderStyles, animatedEventContainerStyles,
        animatedImageStyles, animatedTimerStyles,
        animatedBlurredTimerStyles, pressHeaderAnimationStyles,
        panGestureEventHandler, tapGestureActiveHandler, closeHandler,
        onLayout,

        animatedContainerStyles, clipContainerAnimatedStyles
    };
};
