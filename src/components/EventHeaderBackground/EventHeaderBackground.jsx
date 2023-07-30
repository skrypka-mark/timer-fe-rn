import React from 'react';
import { View, Animated } from 'react-native';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { BlurView } from '@react-native-community/blur';
import { styles } from './EventHeaderBackground.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const EventHeaderBackground = ({ style, leftButton, rightButton }) => {
    const headerHeight = useHeaderHeight();

    return (
        <AnimatedBlurView style={[styles.header, style, { height: headerHeight }]} blurType='regular'>
            <View style={styles.headerWrapper}>
                { leftButton && leftButton() }
                { rightButton && rightButton() }
            </View>
        </AnimatedBlurView>
    );
};

export default EventHeaderBackground;
