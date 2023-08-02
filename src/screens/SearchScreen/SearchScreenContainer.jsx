import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useTheme, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedGestureHandler,
    interpolate,
    withSequence,
    withTiming,
    withSpring,
    Extrapolate,
    scrollTo,
    runOnJS
} from 'react-native-reanimated';
import _ from 'lodash';
import { SFSymbol } from 'react-native-sfsymbols';
import { useSearch } from '../../hooks/useSearch';
import SearchScreen from './SearchScreen';
// import { listAppearences, toggleListAppearence } from '../../stores/events/events.reducer';
// import { eventsSelector } from '../../stores/events/events.selector';
// import HeaderButton from '../../components/HeaderButton';
import { SCREEN_PADDING } from '../../theme';

const { height } = Dimensions.get('window');

const SEARCHBAR_CONTAINER_PADDING = 5;

const SearchScreenContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();

    const { data, searchBarSpecs } = route.params;

    const scrollViewAnimatedRef = useAnimatedRef(null);

    const [searchResult, setSearchValue, { searchValue, resetSearchResult }] = useSearch(data, 'title');
    const prevSearchResultRef = useRef(data);

    const sharedValue = useSharedValue(0);
    const searchBarOpacity = useSharedValue(1);
    const scrollY = useSharedValue(0);

    // const scrollReleaseCallback = e => {
    //     'worklet';
    //     if(e.contentOffset.y > 0 && e.contentOffset.y < insets.top / 2) {
    //         scrollTo(scrollViewAnimatedRef, 0, 0, true);
    //     }
    //     else if(e.contentOffset.y > insets.top / 2 && e.contentOffset.y < insets.top + SCREEN_PADDING) {
    //         scrollTo(scrollViewAnimatedRef, 0, insets.top, true);
    //     }
    // };
    const scrollHandler = useAnimatedScrollHandler({
        // onEndDrag: scrollReleaseCallback,
        // onMomentumEnd: scrollReleaseCallback,
        onScroll: e => {
            scrollY.value = e.contentOffset.y;
        }
    });
    const panGestureEventHandler = useAnimatedGestureHandler({
        onActive: e => {
            sharedValue.value = interpolate(e.translationY, [0, height / 4], [1, 0]);
        },
        onEnd: () => {
            if(sharedValue.value < 0.4) {
                sharedValue.value = withTiming(0);
            } else {
                sharedValue.value = withTiming(1);
            }
        },
    });

    const cancelButtonPress = () => {
        const cancelCallback = () => {
            // searchBarOpacity.value = withTiming(0, { duration: 100 });
            navigation.goBack();
        };
        sharedValue.value = withTiming(0, null, finished => finished && runOnJS(cancelCallback)());
    };
    const searchBarPressHandler = () => {
        sharedValue.value = withTiming(1);
    };

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            sharedValue.value = withTiming(1);
        }
    }, [isFocused]);
    useEffect(() => {
        if(!_.isEqual(prevSearchResultRef.current.map(({ title }) => title), searchResult.map(({ title }) => title)) && searchResult?.length)
            sharedValue.value = withSequence(withTiming(0, { duration: 150 }), withTiming(1, { duration: 300 }));
        if(!searchResult?.length)
            sharedValue.value = withTiming(0, { duration: 200 });
        
        prevSearchResultRef.current = searchResult;
    }, [searchResult]);
    useEffect(() => {
        if(!searchValue) {
            sharedValue.value = withTiming(0, null, finished => finished && runOnJS(resetSearchResult)());
        }
    }, [searchValue]);

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <Animated.Text style={{ marginLeft: -5 }}>
    //                 <View style={{ justifyContent: 'center' }} onLayout={({ nativeEvent }) => !titleWidth && setTitleWidth(nativeEvent.layout.width)}>
    //                     <Animated.View style={titleContainerAnimatedStyles}>
    //                         <Animated.Text style={[{ color: theme.colors.text }, titleAnimatedStyles]}>
    //                             Events
    //                         </Animated.Text>
    //                     </Animated.View>
    //                 </View>
    //             </Animated.Text>
    //         ),
    //         headerRight: () => (
    //             <HeaderButton onPress={() => dispatch(toggleListAppearence())} style={{ marginRight: -5 }}>
    //                 { eventsListAppearence === listAppearences.REGULAR && renderLayoutSFSymbol('rectangle.grid.1x2') }
    //                 { eventsListAppearence === listAppearences.DETAIL && renderLayoutSFSymbol('square.fill.text.grid.1x2') }
    //             </HeaderButton>
    //         ),
    //         headerBackground: () => (
    //             <View style={{ width: '100%', height: '100%' }}>
    //                 <AnimatedBlurView intensity={60} style={[StyleSheet.absoluteFillObject, headerAnimatedStyles]}>
    //                     <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.dark ? 'rgba(0, 0, 0, .8)' : 'rgba(255, 255, 255, .8)' }]} />
    //                 </AnimatedBlurView>
    //             </View>
    //         )
    //     });
    // }, [navigation, eventsListAppearence]);

    const containerStyles = useAnimatedStyle(() => ({
        flex: 1
    }));
    const wrapperStyles = useAnimatedStyle(() => ({
        // height: '100%',
        transform: [{ translateY: interpolate(sharedValue.value, [0, 1], [searchBarSpecs.pageY + (SEARCHBAR_CONTAINER_PADDING * 2), insets.top]) }]
    }));
    const blurViewStyles = useAnimatedStyle(() => ({
        opacity: sharedValue.value
    }));
    const searchBarStyles = useAnimatedStyle(() => ({
        paddingTop: insets.top + searchBarSpecs.pageY - (SEARCHBAR_CONTAINER_PADDING * 2),
        marginTop: -(insets.top + searchBarSpecs.pageY),
        backgroundColor: `rgba(0, 0, 0, ${interpolate(sharedValue.value, [0, 1], [0, .2])})`,
        opacity: searchBarOpacity.value
    }));
    const scrollViewStyle = useAnimatedStyle(() => ({
        // height: '100%',
        // transform: [{ scale: interpolate(sharedValue.value, [0, 1], [.9, 1]) }],
        opacity: sharedValue.value
    }));

    const SearchScreenProps = {
        searchResult,
        containerStyles,
        wrapperStyles,
        blurViewStyles,
        searchBarStyles,
        scrollViewStyle,
        scrollHandler,
        cancelButtonPress,
        searchChangeHandler: setSearchValue,
        searchBarPressHandler,
        panGestureEventHandler
    };
    return <SearchScreen { ...SearchScreenProps } />;
};

export default SearchScreenContainer;
