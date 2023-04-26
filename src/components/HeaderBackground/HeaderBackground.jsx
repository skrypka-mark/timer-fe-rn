import React from 'react';
import { View, Animated } from 'react-native';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { BlurView } from '@react-native-community/blur';
import { styles } from './HeaderBackground.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const HeaderBackground = ({ style, leftButton, rightButton }) => {
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

export default HeaderBackground;
