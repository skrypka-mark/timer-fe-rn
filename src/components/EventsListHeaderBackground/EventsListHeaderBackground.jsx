import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import SearchBar from 'react-native-search-bar';
import { SCREEN_PADDING } from '../../theme';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const { width } = Dimensions.get('window');

const EventsListHeaderBackground = ({ title, headerRight, scrollY }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const searchBarRef = useRef(null);
    const [titleWidth, setTitleWidth] = useState();
    const [searchBarHeight, setSearchBarHeight] = useState();

    const titleTextSpecs = {
        fontSize: 18,
    };

    const headerAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY?.value, [-insets.top, -insets.top + 40], [0, 1], Extrapolate.CLAMP),
        borderBottomWidth: interpolate(scrollY?.value, [-insets.top, -insets.top + 10], [0, 0.5], Extrapolate.CLAMP),
        borderBottomColor: 'rgba(255, 255, 255, .1)'
    }));
    const titleAnimatedStyles = useAnimatedStyle(() => ({
        fontSize: interpolate(scrollY?.value, [-insets.top, 0], [26, titleTextSpecs.fontSize], Extrapolate.CLAMP),
        transform: titleWidth ? [{ translateX: interpolate(scrollY?.value, [-insets.top, 0], [0, (width / 2) - (titleWidth / 2)], Extrapolate.CLAMP) }] : []
    }), [titleWidth]);
    const searchBarContainerAnimatedStyles = useAnimatedStyle(() => ({
        // height: searchBarHeight ? interpolate(scrollY?.value, [-insets.top, 0], [searchBarHeight, 0], Extrapolate.CLAMP) : 'auto',
        // opacity: interpolate(scrollY?.value, [-insets.top, -(insets.top - 40)], [1, 0], Extrapolate.CLAMP),
        // transform: [{ scale: interpolate(scrollY?.value, [-(insets.top), 0], [1, .9], Extrapolate.CLAMP) }],
    }), [searchBarHeight]);

    return (
        <View style={{ paddingTop: insets.top, paddingHorizontal: SCREEN_PADDING, overflow: 'hidden' }}>
            <AnimatedBlurView intensity={40} style={[StyleSheet.absoluteFill, headerAnimatedStyles]}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0, 0, 0, .6)' }]} />
            </AnimatedBlurView>
            <View style={{ position: 'relative', justifyContent: 'center' }}>
                <Animated.Text>
                    <View style={{ justifyContent: 'center' }} onLayout={({ nativeEvent }) => !titleWidth && setTitleWidth(nativeEvent.layout.width)}>
                        <Animated.Text style={[{ color: theme.colors.text }, titleAnimatedStyles]}>
                            { title }
                        </Animated.Text>
                    </View>
                </Animated.Text>
                <View style={{ position: 'absolute', right: SCREEN_PADDING }}>
                    { headerRight() }
                </View>
            </View>
            <View ref={searchBarRef}>
                <Animated.View
                    style={[{ marginHorizontal: -SCREEN_PADDING }, searchBarContainerAnimatedStyles]}
                    onLayout={({ nativeEvent }) => !searchBarHeight && setSearchBarHeight(nativeEvent.layout.height)}
                >
                    <SearchBar
                        placeholder='Search'
                        hideBackground={true}
                        // style={{ backgroundColor: 'black' }}
                        // barStyle='black'
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default memo(EventsListHeaderBackground);
