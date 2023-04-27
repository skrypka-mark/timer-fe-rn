import React, { useLayoutEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

const GradientBackground = () => {
    const theme = useTheme();

    const animatedValue = useRef(new Animated.Value(0)).current;
    const blueTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    });
    const blueTranslateY = animatedValue.interpolate({
        inputRange: [0, .3, .6, 1],
        outputRange: [0, -100, 50, -100]
    });

    const ellipses = [
        {
            image: require('../../assets/bg-ellipses/blue.png'),
            style: { bottom: 0, width: 140, height: 310, transform: [{ translateX: blueTranslateX }, { translateY: blueTranslateY }] }
        },
        {
            image: require('../../assets/bg-ellipses/yellow.png'),
            style: { top: -30, right: -25, width: 140, height: 310 }
        },
        {
            image: require('../../assets/bg-ellipses/orange.png'),
            style: { top: -22, left: 165, width: 110, height: 180 }
        },
        {
            image: require('../../assets/bg-ellipses/pink.png'),
            style: { top: 170, right: 0, width: 121, height: 255 }
        }
    ];

    useLayoutEffect(() => {
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
                    justifyContent: 'center'
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
