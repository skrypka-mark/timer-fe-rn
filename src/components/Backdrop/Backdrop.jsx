import React, { useEffect, useState, useRef } from 'react';
import { TouchableWithoutFeedback, Animated, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { styles } from './Backdrop.styles';

const Backdrop = ({ open, onPress }) => {
    const [visible, setVisible] = useState(true);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    const startAnimation = toValue => {
        if(open) setVisible(true);
        Animated.timing(animatedValue, {
            toValue,
            duration: 300,
            useNativeDriver: true
        }).start(({ finished }) => {
            if(finished && visible) setVisible(false);
        });
    };

    useEffect(() => {
        startAnimation(open ? 1 : 0);
    }, [open]);

    return visible && (
        <TouchableWithoutFeedback style={styles.backdrop} onPressOut={onPress}>
            <AnimatedBlurView style={[styles.backdrop, { opacity: animatedValue }]} intensity={50}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0, 0, 0, .8)' }]} />
            </AnimatedBlurView>
        </TouchableWithoutFeedback>
    );
};

export default Backdrop;
