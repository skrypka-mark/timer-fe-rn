import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Text, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue, useAnimatedStyle, interpolate,
    withTiming, withSpring, withDelay, runOnJS
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { nanoid } from 'nanoid/non-secure'
import HapticFeedback from 'react-native-haptic-feedback';;
import Backdrop from '../Backdrop';

import { SCREEN_PADDING } from '../../theme';
import { styles } from './Options.styles';
import { SFSymbol } from 'react-native-sfsymbols';

const DURATION = 400;
const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

const OptionsButton = ({ name, systemName, open, delay, style, onPress, onLayout }) => {
    const animatedValue = useSharedValue(open ? 0 : 1);

    useEffect(() => {
        const animationDelay = open ? DURATION - delay : delay || 0;

        animatedValue.value = withDelay(animationDelay, withSpring(Number(open)));
    }, [open]);

    const optionContainerAnimatedStyles = useAnimatedStyle(() => ({
        opacity: animatedValue.value
    }));
    const optionButtonAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: animatedValue.value }],
        opacity: animatedValue.value
    }));

    return (
        <AnimatedTouchableWithoutFeedback onPressOut={onPress} onLayout={onLayout}>
            <Animated.View style={[styles.optionContainer, style ? style : optionContainerAnimatedStyles]}>
                { name && (
                    <Text style={styles.optionName}>
                        { name }
                    </Text>
                ) }
                <Animated.View style={[styles.optionBtnWrapper, optionButtonAnimatedStyles]}>
                    <BlurView style={styles.optionBtn} blurAmount={10} blurType='light'>
                        <SFSymbol name={systemName} style={styles.optionIcon} size={18} color='black' />
                    </BlurView>
                </Animated.View>
            </Animated.View>
        </AnimatedTouchableWithoutFeedback>
    );
};

const Options = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const animatedValue = useSharedValue(Number(!isOpen));
    const [isOpen, setIsOpen] = useState(false);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);

    const openOptions = () => setIsOpen(true);
    const closeOptions = () => setIsOpen(false);

    useEffect(() => {
        StatusBar.setHidden(isOpen, 'fade');

        if(isOpen) setIsOptionsVisible(true);

        animatedValue.value = withTiming(Number(isOpen), {
            damping: 20,
            mass: 1.5,
            stiffness: 1000,
            restDisplacementThreshold: 0.001,
            restSpeedThreshold: 0.001
        }, finished => {
            if(finished && isOptionsVisible) runOnJS(setIsOptionsVisible)(false);
        });

        HapticFeedback.trigger('impactMedium');
    }, [isOpen]);

    const mainOptionButtonAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ rotate: `${interpolate(animatedValue.value, [0, 1], [0, 180])}deg` }],
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: interpolate(animatedValue.value, [0, 1], [0.27, 0]),
        shadowRadius: 4.65,

        elevation: 6
    }));

    const optionPressHandler = routeName => () => {
        closeOptions();
        navigation.navigate(routeName);
    };

    const options = [
        { name: 'New event', systemName: 'plus', onPress: optionPressHandler('new-event') },
        { name: 'Import event', systemName: 'square.and.arrow.down', onPress: optionPressHandler('new-event') },
        { name: 'Built-in events', systemName: 'rectangle.badge.plus', onPress: optionPressHandler('builtin-events-list') }
    ];

    return (
        <>
            <Backdrop open={isOpen} onPress={closeOptions} />
            <Animated.View style={[styles.optionsListContainer, { bottom: 60, right: SCREEN_PADDING }]} pointerEvents='box-none'>
                { isOptionsVisible && options.map((option, index) => (
                    <OptionsButton
                        key={nanoid()}
                        open={isOpen}
                        delay={DURATION / options.length * index}
                        { ...option }
                    />
                )) }
                <OptionsButton
                    systemName={isOpen ? 'xmark' : 'ellipsis'}
                    open={true}
                    delay={DURATION}
                    style={mainOptionButtonAnimatedStyles}
                    onPress={isOpen ? closeOptions : openOptions}
                />
            </Animated.View>
        </>
    );
};

export default Options;
