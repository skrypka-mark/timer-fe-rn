import React, { useLayoutEffect, useState, useRef } from 'react';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import { VibrancyView } from '@react-native-community/blur';
import { styles } from './Backdrop.styles';

const Backdrop = ({ open, onPress }) => {
    const [visible, setVisible] = useState(true);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const AnimatedVibrancyView = Animated.createAnimatedComponent(VibrancyView);

    const startAnimation = toValue => {
        // if(!open) setVisible(true);
        Animated.timing(animatedValue, {
            toValue,
            duration: 300,
            useNativeDriver: true
        }).start(({ finished }) => {
            // if(finished && open) setVisible(false);
        });
    };

    useLayoutEffect(() => {
        startAnimation(open ? 1 : 0);
    }, [open]);

    return visible && (
        <TouchableWithoutFeedback style={styles.backdrop} onPressOut={onPress}>
            <AnimatedVibrancyView style={[styles.backdrop, { backgroundColor: 'rgba(0, 0, 0, .5)', opacity: animatedValue }]} blurAmount={20} />
        </TouchableWithoutFeedback>
    );
};

export default Backdrop;
