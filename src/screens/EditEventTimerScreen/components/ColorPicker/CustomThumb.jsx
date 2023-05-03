import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const CustomThumb = ({
    width,
    height,
    positionStyle,
    adaptiveColor,
    currentColor,
    initialColor
}) => {
    const animatedStyles = useAnimatedStyle(() => ({
        borderColor: adaptiveColor.value
    }));
    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius: width / 2,
                    overflow: 'hidden',
                    borderWidth: 1
                },
                positionStyle,
                animatedStyles
            ]}
        >
            <BlurView style={[StyleSheet.absoluteFillObject, { backgroundColor: initialColor }]} intensity={15} />
        </Animated.View>
    );
};

export default CustomThumb;
