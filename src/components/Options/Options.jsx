import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Text, Animated } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { nanoid } from 'nanoid/non-secure';
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
        startAnimation(
            open ? 1 : 0,
            open ? DURATION - delay : delay
        );
    }, [open]);

    return (
        <AnimatedTouchableWithoutFeedback onPressOut={onPress}>
            <Animated.View style={[styles.optionContainer, style, { opacity: animatedValue }]}>
                {name && (
                    <Text style={styles.optionName}>
                        { name }
                    </Text>
                )}
                <Animated.View
                    style={[
                        styles.optionBtnWrapper,
                        {
                            transform: [{ scale: animatedValue }],
                            opacity: animatedValue
                        }
                    ]}
                >
                    <BlurView style={styles.optionBtn} blurAmount={3} blurType='regular'>
                        <Icon style={styles.optionIcon} color={color} />
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
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);

    React.useLayoutEffect(() => {
        if(isOpen) setIsOptionsVisible(true);
        Animated.timing(animatedValue, {
            toValue: Number(isOpen),
            duration: 300,
            useNativeDriver: false
        }).start(finished => {
            if(!isOpen && finished) setIsOptionsVisible(false);
        });

        navigation.addListener('state', close);
        return () => navigation.removeListener('state', close);
    });

    const options = [
        { name: 'Create event', Icon: CreateIcon, onPress: () => navigation.navigate('new-event') },
        { name: 'Import event', Icon: ImportIcon, onPress: () => navigation.navigate('new-event') },
        { name: 'Add event from template', Icon: ImportIcon, onPress: () => navigation.navigate('new-event') },
        // { name: 'Settings', Icon: SettingsIcon, onPress: () => console.log('xui') }
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
                        color={theme.colors.text}
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
                        shadowOpacity: 0.27,
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
