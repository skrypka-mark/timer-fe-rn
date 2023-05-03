import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import HeaderButton from '../HeaderButton';
import HeaderText from '../HeaderText';
import { styles } from './EditTimerBottomBar.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const EditTimerBottomBar = ({ closeHandler, saveHandler, children }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const animatedValue = useSharedValue(0);

    useEffect(() => {
        animatedValue.value = 0;
        animatedValue.value = withSpring(1, { damping: 10 });
    }, []);

    const containerAnimatedStyles = useAnimatedStyle(() => ({
        // marginBottom: [{ translateY: interpolate(animatedValue.value, [0, 1], [150, 0]) }]
        marginBottom: interpolate(animatedValue.value, [0, 1], [-150, 0])
    }));

    return (
        <AnimatedBlurView style={[styles.container, { bottom: insets.bottom }]} blurType='regular'>
            <View style={{ overflow: 'hidden' }}>
                <Animated.View style={[styles.contentBox, containerAnimatedStyles]}>
                    { children }
                </Animated.View>
            </View>
            <View style={[styles.footer, { borderColor: theme.colors.border }]}>
                <HeaderButton onPress={closeHandler}>
                    <HeaderText color={theme.colors.notification}>
                        Cancel
                    </HeaderText>
                </HeaderButton>
                <HeaderButton onPress={saveHandler}>
                    <HeaderText color={theme.colors.primary}>
                        Save
                    </HeaderText>
                </HeaderButton>
            </View>
        </AnimatedBlurView>
    );
};

export default EditTimerBottomBar;
