import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import HeaderButton from '../HeaderButton';
import HeaderText from '../HeaderText';
import HeaderTitle from '../HeaderTitle';
import { SCREEN_PADDING } from '../../theme';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const HeaderBackground = ({ title, leftTitle, rightTitle, scrollY, modal, onLeft, onRight }) => {
    const theme = useTheme();
    const height = useHeaderHeight();
    const insets = useSafeAreaInsets();

    const headerAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value, [-height + 15, -height + 40], [0, 1], Extrapolate.CLAMP),
        borderBottomWidth: 0.5,
        borderBottomColor: `rgba(255, 255, 255, ${interpolate(scrollY.value, [-height + 15, -height + 40], [0, 0.1], Extrapolate.CLAMP)})`
    }));

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                paddingTop: modal ? 0 : insets.top
            }}
        >
            <AnimatedBlurView intensity={40} style={[StyleSheet.absoluteFill, headerAnimatedStyles]}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.dark ? 'rgba(0, 0, 0, .6)' : 'rgba(255, 255, 255, .6)' }]} />
            </AnimatedBlurView>
            <View style={{ position: 'relative', width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                { leftTitle && (
                    <View style={{ position: 'absolute', left: SCREEN_PADDING }}>
                        <HeaderButton onPress={onLeft}>
                            <HeaderText color={theme.colors.notification}>
                                { leftTitle }
                            </HeaderText>
                        </HeaderButton>
                    </View>
                ) }
                <View style={{ margin: 'auto' }}>
                    <HeaderTitle>
                        { title }
                    </HeaderTitle>
                </View>
                { rightTitle && (
                    <View style={{ position: 'absolute', right: SCREEN_PADDING }}>
                        <HeaderButton onPress={onRight}>
                            <HeaderText color={theme.colors.primary}>
                                { rightTitle }
                            </HeaderText>
                        </HeaderButton>
                    </View>
                ) }
            </View>
        </View>
    );
};

export default HeaderBackground;
