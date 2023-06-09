import React, { useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, Animated, StatusBar } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { nanoid } from 'nanoid/non-secure'
import HapticFeedback from 'react-native-haptic-feedback';;
import Backdrop from '../Backdrop';

import OptionsIcon from '../icons/options/OptionsIcon';
import CloseIcon from '../icons/options/CloseIcon';
import CreateIcon from '../icons/options/CreateIcon';
import ImportIcon from '../icons/options/ImportIcon';
import SettingsIcon from '../icons/options/SettingsIcon';
import { SCREEN_PADDING } from '../../theme';
import { styles } from './Options.styles';

const DURATION = 400;
const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

const OptionsButton = ({ name, Icon, open, duration, delay, style, color, onPress }) => {
    const animatedValue = useRef(new Animated.Value(open ? 0 : 1)).current;

    const startAnimation = (toValue, delay) => {
        Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: false
        }).start();
    };

    useEffect(() => {
        const animationDelay = open ? DURATION - delay : delay;
        startAnimation(Number(open), animationDelay);
    }, [open]);

    return (
        <AnimatedTouchableWithoutFeedback onPressOut={onPress}>
            <Animated.View style={[styles.optionContainer, style, { opacity: animatedValue }]}>
                { name && (
                    <Text style={styles.optionName}>
                        { name }
                    </Text>
                ) }
                <Animated.View style={[styles.optionBtnWrapper, { transform: [{ scale: animatedValue }], opacity: animatedValue }]}>
                    <BlurView style={styles.optionBtn} blurAmount={10} blurType='light'>
                        <Icon style={styles.optionIcon} color={'black'} />
                    </BlurView>
                </Animated.View>
            </Animated.View>
        </AnimatedTouchableWithoutFeedback>
    );
};

const Options = ({ isOpen, open, close }) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const navigation = useNavigation();
    const animatedValue = useRef(new Animated.Value(Number(!isOpen))).current;
    const optionButtonRotate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });
    const optionButtonShadowOpacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.27, 0]
    });
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);

    React.useLayoutEffect(() => {
        StatusBar.setHidden(isOpen);

        if(isOpen) setIsOptionsVisible(true);
        Animated.spring(animatedValue, {
            toValue: Number(isOpen),
            duration: 500,
            damping: 20,
            mass: 1.5,
            stiffness: 1000,
            restDisplacementThreshold: 0.001,
            restSpeedThreshold: 0.001,
            useNativeDriver: false
        }).start(finished => {
            if(!isOpen && finished) setIsOptionsVisible(false);
        });

        HapticFeedback.trigger('impactMedium');

        navigation.addListener('state', close);
        return () => navigation.removeListener('state', close);
    }, [isOpen]);

    const options = [
        { name: 'Create event', Icon: CreateIcon, onPress: () => navigation.navigate('new-event') },
        { name: 'Import event', Icon: ImportIcon, onPress: () => navigation.navigate('new-event') },
        { name: 'Add event from template', Icon: ImportIcon, onPress: () => navigation.navigate('new-event') }
    ];

    return (
        <>
            <Backdrop open={isOpen} onPress={close} />
            <Animated.View style={[styles.optionsListContainer, { bottom: 60, right: SCREEN_PADDING }]} pointerEvents='box-none'>
                { isOptionsVisible && options.map((option, index) => (
                    <OptionsButton
                        key={nanoid()}
                        open={isOpen}
                        duration={DURATION / options.length}
                        delay={DURATION / options.length * index}
                        // color={theme.colors.text}
                        { ...option }
                    />
                )) }
                <OptionsButton
                    Icon={isOpen ? CloseIcon : OptionsIcon}
                    open={true}
                    style={{
                        transform: [{ rotate: optionButtonRotate }],
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: optionButtonShadowOpacity,
                        shadowRadius: 4.65,

                        elevation: 6,
                    }}
                    color={theme.colors.text}
                    onPress={isOpen ? close : open}
                />
            </Animated.View>
        </>
    );
};

export default Options;
