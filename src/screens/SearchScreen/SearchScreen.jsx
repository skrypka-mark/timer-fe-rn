import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import SearchBar from 'react-native-search-bar';
import { BlurView } from 'expo-blur';
import { useKeyboardAwareStyles } from '../../hooks/useKeyboardAwareStyles';
import EventsListRegular from '../../components/EventsListRegular';

const AnimatedScrollViewGestureHandler = Animated.createAnimatedComponent(ScrollView);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SearchScreen = ({
    searchResult,
    containerStyles,
    wrapperStyles,
    blurViewStyles,
    searchBarStyles,
    searchBarRef,
    scrollViewStyle,
    scrollViewWrapperStyle,
    scrollHandler,
    cancelButtonPress,
    searchChangeHandler,
    searchBarPressHandler,
    panGestureEventHandler
}) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const eventsListContainerAnimatedStyles = useKeyboardAwareStyles(insets.bottom * 4);

    // const backdropPressHandler = () => {
    //     cancelButtonPress();
    //     searchBarRef.current?.clearText();
    //     searchBarRef.current?.blur();
    // };

    return (
        <PanGestureHandler onGestureEvent={panGestureEventHandler}>
            <Animated.View style={containerStyles}>
                <AnimatedBlurView intensity={60} style={[StyleSheet.absoluteFillObject, blurViewStyles]}>
                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.dark ? 'rgba(0, 0, 0, .8)' : 'rgba(255, 255, 255, .8)' }]} />
                </AnimatedBlurView>
                <Animated.View style={wrapperStyles}>
                    <Animated.View style={searchBarStyles}>
                        <Pressable onPress={searchBarPressHandler}>
                            <SearchBar
                                hideBackground={true}
                                // barStyle='black'
                                // textFieldBackgroundColor='black'
                                // searchBarStyle='prominent'
                                ref={searchBarRef}
                                onChangeText={searchChangeHandler}
                                onCancelButtonPress={cancelButtonPress}
                                onSearchButtonPress={() => searchBarRef.current?.blur()}
                            />
                        </Pressable>
                    </Animated.View>
                    {/* <AnimatedPressable onPress={backdropPressHandler}> */}
                        <AnimatedScrollViewGestureHandler
                            style={scrollViewStyle}
                            // ref={scrollViewRef}
                            scrollEventThrottle={16}
                            showsVerticalScrollIndicator={false}
                            onScroll={scrollHandler}
                        >
                            <Animated.View style={scrollViewWrapperStyle}>
                                <EventsListRegular
                                    events={searchResult}
                                    style={eventsListContainerAnimatedStyles}
                                />
                            </Animated.View>
                        </AnimatedScrollViewGestureHandler>
                    {/* </AnimatedPressable> */}
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default SearchScreen;
