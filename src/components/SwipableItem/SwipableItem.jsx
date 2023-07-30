import React, { useLayoutEffect, useEffect, useState, useRef, useCallback, memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated as RNAnimated } from 'react-native';
import { PanGestureHandler, Swipeable } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import { SFSymbol } from 'react-native-sfsymbols';
import { nanoid } from 'nanoid/non-secure';
import { SCREEN_PADDING } from '../../theme';

const { width } = Dimensions.get('window');
const ACTION_BUTTON_MIN_WIDTH = width * .2;

const SwipableItem = ({
    leftActions,
    rightActions,
    refs,
    index,
    enabled,
    style,
    closeItem,
    children
}) => {
    const x = useSharedValue(0);
    const positionX = useSharedValue(0);
    const isActive = useSharedValue(false);
    const animatedValue = useSharedValue(0);

    const swipableItemRef = useRef(null);
    const [swipableItemHeight, setSwipableItemHeight] = useState(null);

    const swipableItemLayoutHandler = useCallback(() => {
        !swipableItemHeight && swipableItemRef?.current?.measure((x, y, width, height) => {
            setSwipableItemHeight(+height?.toFixed(0));
        });
    }, []);

    useLayoutEffect(swipableItemLayoutHandler, [swipableItemHeight]);

    const X_THRESHOLD = width * .7;

    const gestureEventHandler = useAnimatedGestureHandler({
        onStart: () => {
            positionX.value = x.value;
            isActive.value = true;
        },
        onActive: event => {
            if(!leftActions && event.translationX > 0) return;
            if(!rightActions && event.translationX < 0) return;

            x.value = event.translationX + positionX.value;
        },
        onEnd: () => {
            isActive.value = false;

            if(x.value < -X_THRESHOLD) {
                x.value = withTiming(-width);
                animatedValue.value = withTiming(1);
                return;
            }
            if(x.value > X_THRESHOLD) {
                x.value = withTiming(width);
                animatedValue.value = withTiming(1);
                return;
            }

            // if(x.value > ACTION_BUTTON_MIN_WIDTH / 2) {
            //     x.value = withTiming(ACTION_BUTTON_MIN_WIDTH + SCREEN_PADDING);
            //     return;
            // }
            // if(x.value < -ACTION_BUTTON_MIN_WIDTH / 2) {
            //     x.value = withTiming(-ACTION_BUTTON_MIN_WIDTH - SCREEN_PADDING);
            //     return;
            // }

            x.value = withTiming(0);
            positionX.value = 0;
        },
    });

    const containerAnimatedStyles = useAnimatedStyle(() => {
        const interpolateWidth = swipableItemHeight ? interpolate(animatedValue.value, [0, 1], [swipableItemHeight, 0]) : 'auto';
        const interpolateMarginTop = swipableItemHeight ? interpolate(animatedValue.value, [0, 1], [0, -swipableItemHeight]) : 0;

        return {
            height: interpolateWidth,
            // marginTop: interpolateMarginTop,
            opacity: interpolate(animatedValue.value, [0, 1], [1, 0]),
            zIndex: isActive.value ? 1 : 2
        };
    });
    const swipableItemAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }]
    }));

    const leftActionsContainerAnimatedStyles = useAnimatedStyle(() => ({
        width: x.value - SCREEN_PADDING,
        opacity: interpolate(x.value, [0, Math.floor(width * .2)], [0, 1])
    }));
    const rightActionsContainerAnimatedStyles = useAnimatedStyle(() => ({
        width: -x.value - SCREEN_PADDING,
        opacity: interpolate(x.value, [0, -Math.floor(width * .2)], [0, 1])
    }));

    const LeftActions = (progress, dragX) => {
        const opacity = dragX.interpolate({
            inputRange: [SCREEN_PADDING * 4, ACTION_BUTTON_MIN_WIDTH - SCREEN_PADDING],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const translateX = dragX.interpolate({
            inputRange: [0, ACTION_BUTTON_MIN_WIDTH - SCREEN_PADDING],
            outputRange: [-(ACTION_BUTTON_MIN_WIDTH + SCREEN_PADDING), 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.buttonContainer}>
                <RNAnimated.View style={{ transform: [{ translateX }] }}>
                    { leftActions?.map(({ systemName, color, onPress }) => (
                        <RNAnimated.View key={nanoid()} style={{ opacity, transform: [{ scale: 1 }] }}>
                            <TouchableOpacity onPress={onPress} style={[styles.button, { marginRight: -SCREEN_PADDING }]} activeOpacity={0.7}>
                                <SFSymbol name={systemName} color={color} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </RNAnimated.View>
                    )) }
                </RNAnimated.View>
            </View>
        );
    };
    const RightActions = (progress, dragX) => {
        const opacity = dragX.interpolate({
            inputRange: [-ACTION_BUTTON_MIN_WIDTH + SCREEN_PADDING, -(SCREEN_PADDING * 4)],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const translateX = dragX.interpolate({
            inputRange: [-(ACTION_BUTTON_MIN_WIDTH - SCREEN_PADDING), 0],
            outputRange: [0, ACTION_BUTTON_MIN_WIDTH + SCREEN_PADDING],
            extrapolate: 'clamp'
        });
        return (
            <View style={styles.buttonContainer}>
                <RNAnimated.View style={{ transform: [{ translateX }] }}>
                    { rightActions?.map(({ systemName, color, onPress }) => (
                        <RNAnimated.View key={nanoid()} style={{ opacity, transform: [{ scale: 1 }] }}>
                            <TouchableOpacity onPress={onPress} style={[styles.button, { marginLeft: -SCREEN_PADDING }]} activeOpacity={0.5}>
                                <SFSymbol name={systemName} color={color} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </RNAnimated.View>
                    )) }
                </RNAnimated.View>
            </View>
        );
    };
    return (
        <Animated.View style={[containerAnimatedStyles, style]}>
            <Swipeable
                renderRightActions={RightActions}
                renderLeftActions={LeftActions}
                containerStyle={{ overflow: 'visible' }}
                onActivated={() => closeItem(index)}
                ref={ref => refs[index] = ref}
                enabled={enabled}
                // rightThreshold={50}
            >
                {/* <Animated.View ref={swipableItemRef}>
                    <Animated.View style={[styles.container, style]}>
                        <Animated.View style={[styles.buttonContainer, { left: 0 }, leftActionsContainerAnimatedStyles]}>
                            { leftActions?.map(({ systemName, onPress }) => (
                                <Pressable key={nanoid()} onPress={onPress} style={styles.button}>
                                    <SFSymbol name={systemName} style={{ width: 30, height: 30 }} />
                                </Pressable>
                            )) }
                        </Animated.View>
                        <Animated.View style={[styles.buttonContainer, { right: 0 }, rightActionsContainerAnimatedStyles]}>
                            { rightActions?.map(({ systemName, onPress }) => (
                                <Pressable key={nanoid()} onPress={onPress} style={styles.button}>
                                    <SFSymbol name={systemName} style={{ width: 30, height: 30 }} />
                                </Pressable>
                            )) }
                        </Animated.View> */}
                        <Animated.View style={[swipableItemAnimatedStyles, { paddingHorizontal: SCREEN_PADDING }]}>
                            { children }
                        </Animated.View>
                    {/* </Animated.View>
                </Animated.View> */}
            </Swipeable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    buttonContainer: {
        // position: 'absolute',
        // top: 0,
        // bottom: 0
        // width: '100%'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minWidth: ACTION_BUTTON_MIN_WIDTH,
        // backgroundColor: 'rgba(0, 0, 0, .2)',
        // borderRadius: 15
    }
});

export default memo(SwipableItem);
