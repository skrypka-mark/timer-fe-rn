import React from 'react';
import Animated from 'react-native-reanimated';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { BlurView } from '@react-native-community/blur';
import { styles } from './EventHeaderBackground.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const EventHeaderBackground = ({ leftButton, rightButton, contentStyle, style }) => {
    const headerHeight = useHeaderHeight();

    return (
        <AnimatedBlurView style={[styles.header, style, { height: headerHeight }]} blurType='regular'>
            <Animated.View style={[styles.headerWrapper, contentStyle]}>
                { leftButton && leftButton() }
                { rightButton && rightButton() }
            </Animated.View>
        </AnimatedBlurView>
    );
};

export default EventHeaderBackground;
