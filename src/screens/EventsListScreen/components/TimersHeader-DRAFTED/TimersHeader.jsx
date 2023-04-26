import React, { forwardRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';

import MagnifierIcon from '../../../../components/icons/MagnifierIcon';
import BarLayoutIcon from '../icons/BarLayoutIcon';

import { styles } from './TimersHeader.styles';

const TimersHeader = forwardRef(({ scrollY }, forwardedRef) => {
    const insets = useSafeAreaInsets();
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    return (
        <AnimatedBlurView
            style={[styles.container, { paddingTop: insets.top }]}
            blurType='xlight'
            blurAmount={10}
            blurRadius={90}
            ref={forwardedRef}
        >
            <Text style={styles.title}>Timers</Text>
            <View style={styles.iconsContainer}>
                <MagnifierIcon />
                <BarLayoutIcon />
            </View>
        </AnimatedBlurView>
    );
});

export default TimersHeader;
