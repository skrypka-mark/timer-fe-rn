import React, { useLayoutEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Image } from 'react-native';
import { useSharedValue, useAnimatedStyle, interpolate, withSpring, withRepeat, withSequence } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

const GradientBackground = () => {
    const theme = useTheme();

    const animatedValue = useRef(new Animated.Value(0)).current;
    // const animatedValue2 = useSharedValue(0);

    const blueTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    });
    const blueTranslateY = animatedValue.interpolate({
        inputRange: [0, .3, .6, .8, .9, 1],
        outputRange: [0, -60, -30, 10, -20, -40]
    });
    // const blueAnimatedStyles = useAnimatedStyle(() => ({
    //     transform: [
    //         { translateX: interpolate(animatedValue2.value, [0, 1], [0, 200]) },
    //         { translateY: interpolate(animatedValue2.value, [0, .3, .6, .8, .9, 1], [0, -60, -30, 10, -20, -40]) }
    //     ]
    // }));

    const yellowTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100]
    });
    const yellowTranslateY = animatedValue.interpolate({
        inputRange: [0, .3, .6, 1],
        outputRange: [0, 20, 30, 10]
    });
    
    const orangeTranslateX = animatedValue.interpolate({
        inputRange: [0, .6, 1],
        outputRange: [0, 10, -20]
    });
    const orangeTranslateY = animatedValue.interpolate({
        inputRange: [0, .3, .5, .8, 1],
        outputRange: [0, 10, 30, 5, -10]
    });

    const pinkTranslateX = animatedValue.interpolate({
        inputRange: [0, .2, .4, .5, .7, 1],
        outputRange: [0, -10, 5, 0, -7, -15]
    });
    const pinkTranslateY = animatedValue.interpolate({
        inputRange: [0, .4, .6, 1],
        outputRange: [0, -15, 5, -10]
    });

    const ellipses = [
        {
            image: require('../../assets/bg-ellipses/blue.png'),
            style: { bottom: -45, left: -30, width: 140, height: 310, transform: [{ translateX: blueTranslateX }, { translateY: blueTranslateY }] }
        },
        {
            image: require('../../assets/bg-ellipses/yellow.png'),
            style: { top: -30, right: -25, width: 140, height: 310, transform: [{ translateX: yellowTranslateX }, { translateY: yellowTranslateY }] }
        },
        {
            image: require('../../assets/bg-ellipses/orange.png'),
            style: { top: -22, left: 165, width: 110, height: 180, transform: [{ translateX: orangeTranslateX }, { translateY: orangeTranslateY }] }
        },
        {
            image: require('../../assets/bg-ellipses/pink.png'),
            style: { top: 170, right: 0, width: 121, height: 255, transform: [{ translateX: pinkTranslateX }, { translateY: pinkTranslateY }] }
        }
    ];

    useLayoutEffect(() => {
        // animatedValue2.value = withSequence(1, 0)
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 10000,
                    useNativeDriver: true
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 10000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    const renderEllipse = ({ image, style }) => (
        <Animated.View
            key={image}
            style={[
                style,
                {
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'white'
                }
            ]}
        >
            <Image source={image} progressiveRenderingEnabled={true} />
        </Animated.View>
    );
    return (
        <View
            style={[
                StyleSheet.absoluteFillObject,
                // { backgroundColor: theme.dark ? '#09061A' : 'white' }
            ]}
        >
            { ellipses.map(ellipse => renderEllipse(ellipse)) }
        </View>
    );
};

export default GradientBackground;
