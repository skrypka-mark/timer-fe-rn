import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedRef,
    useAnimatedScrollHandler,
    interpolate,
    withSequence,
    withTiming,
    withSpring,
    Extrapolate,
    scrollTo
} from 'react-native-reanimated';
import { Asset } from 'expo-asset';
import { SFSymbol } from 'react-native-sfsymbols';
import { BlurView } from 'expo-blur';
import SearchBar from 'react-native-search-bar';
import { useSearch } from '../../hooks/useSearch';
import EventsListScreen from './EventsListScreen';
import { listAppearences, toggleListAppearence } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import HeaderButton from '../../components/HeaderButton';
import { SCREEN_PADDING } from '../../theme';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const { width } = Dimensions.get('window');

const EventsListContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();
    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();

    // const [ready, setReady] = useState(false);
    const { events, eventsListAppearence } = useSelector(eventsSelector);
    // const prevEventsSearchRef = useRef(events);

    const scrollViewAnimatedRef = useAnimatedRef(null);
    const searchBarRef = useRef(null);

    // const [eventsSearch, setEventsSearchValue] = useSearch(events, 'title');

    const headerSharedValue = useSharedValue(0);
    const headerTitleSharedValue = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const searchBarOpacity = useSharedValue(1);
    const momentumEndScrollY = useSharedValue(0);

    const [titleWidth, setTitleWidth] = useState();

    const titleTextSpecs = {
        fontSize: 18,
        fontWeight: '500'
    };

    const scrollReleaseCallback = e => {
        'worklet';
        if(e.contentOffset.y > 0 && e.contentOffset.y < insets.top / 2) {
            scrollTo(scrollViewAnimatedRef, 0, 0, true);
        }
        else if(e.contentOffset.y > insets.top / 2 && e.contentOffset.y < insets.top + SCREEN_PADDING) {
            scrollTo(scrollViewAnimatedRef, 0, insets.top, true);
        }
    };
    const scrollHandler = useAnimatedScrollHandler({
        onEndDrag: e => {
            // if(e.contentOffset.y < insets.top + SCREEN_PADDING && (!e.velocity?.y || e.velocity?.y > 0)) return;
            scrollReleaseCallback(e);
            // momentumEndScrollY.value = 0;
        },
        onMomentumEnd: e => {
            momentumEndScrollY.value = e.contentOffset.y;
            scrollReleaseCallback(e);
        },
        onScroll: e => {
            scrollY.value = e.contentOffset.y;
            headerSharedValue.value = e.contentOffset.y;
            if(e.contentOffset.y > insets.top + SCREEN_PADDING) {
                headerTitleSharedValue.value = withTiming(1);
            } else {
                headerTitleSharedValue.value = withTiming(0);
            }
        }
    });

    const searchBarPressHandler = () => {
        searchBarRef.current?.measure((x, y, width, height, pageX, pageY) => {
            searchBarOpacity.value = withTiming(0, { duration: 100 });

            const searchBarSpecs = { pageX, pageY };
            navigation.navigate('search', { data: events, searchBarSpecs });
        });
    };

    const renderLayoutSFSymbol = name => (
        <SFSymbol
            name={name}
            size={20}
            style={{ width: 20, height: 20 }}
        />
    );

    const headerAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(headerSharedValue.value, [insets.top, insets.top + 10], [0, 1], Extrapolate.CLAMP),
        borderBottomWidth: interpolate(headerSharedValue.value, [insets.top, insets.top + 10], [0, 0.5], Extrapolate.CLAMP),
        borderBottomColor: 'rgba(255, 255, 255, .1)'
    }));
    const titleAnimatedStyles = useAnimatedStyle(() => {
        const translateX = interpolate(headerTitleSharedValue.value, [0, 1], [0, (width / 2) - (titleWidth / 2) - SCREEN_PADDING], Extrapolate.CLAMP);
        const scale = interpolate(headerTitleSharedValue.value, [0, 1], [1, 0.65], Extrapolate.CLAMP);
        return {
            // fontSize: interpolate(scrollY.value, [-(insets.top * 2), -insets.top], [26, titleTextSpecs.fontSize], Extrapolate.CLAMP),
            fontSize: 26,
            fontWeight: titleTextSpecs.fontWeight,
            // opacity: interpolate(scrollY.value, [-(insets.top + SCREEN_PADDING * 2), -(insets.top + SCREEN_PADDING * 1.5), -(insets.top + SCREEN_PADDING * 0.2), 0], [1, 1, 0.1, 1], Extrapolate.CLAMP),
            transform: titleWidth ? [{ translateX }, { scale }] : []
        };
    }, [titleWidth]);
    const titleContainerAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: interpolate(
                    headerSharedValue.value,
                    [-insets.top, 0],
                    [SCREEN_PADDING / 3, 0],
                    Extrapolate.CLAMP
                ) },
                { scale: interpolate(headerSharedValue.value, [-insets.top, 0], [1.1, 1], Extrapolate.CLAMP) }
            ]
        };
    }, [titleWidth]);
    const searchBarContainerAnimatedStyles = useAnimatedStyle(() => ({
        // opacity: interpolate(scrollY.value, [0, headerHeight / 2], [1, 0], Extrapolate.CLAMP),
        transform: [
            { scale: interpolate(scrollY.value, [0, headerHeight], [1, 0.9], Extrapolate.CLAMP) },
            { translateY: interpolate(scrollY.value, [0, headerHeight], [0, headerHeight], Extrapolate.CLAMP) },
        ],
        opacity: searchBarOpacity.value
    }));

    useFocusEffect(() => {
        searchBarOpacity.value = withTiming(1, { duration: 100 });
    });

    // useEffect(() => {
    //     (async () => {
    //         await Promise.all(events.map(timer => Asset.loadAsync(timer.image)));
    //         setReady(true);
    //     })();
    // }, [events]);
    useLayoutEffect(() => {
        navigation.setOptions({
            // headerSearchBarOptions: {
            //     placeholder: 'Search',
            //     onChangeText: event => setEventsSearchValue(event.nativeEvent.text)
            // },
            headerLeft: () => (
                <Animated.Text style={{ marginLeft: -5 }}>
                    <View style={{ justifyContent: 'center' }} onLayout={({ nativeEvent }) => !titleWidth && setTitleWidth(nativeEvent.layout.width)}>
                        <Animated.View style={titleContainerAnimatedStyles}>
                            <Animated.Text style={[{ color: theme.colors.text }, titleAnimatedStyles]}>
                                Events
                            </Animated.Text>
                        </Animated.View>
                    </View>
                </Animated.Text>
            ),
            headerRight: () => (
                <HeaderButton onPress={() => dispatch(toggleListAppearence())} style={{ marginRight: -5 }}>
                    { eventsListAppearence === listAppearences.REGULAR && renderLayoutSFSymbol('rectangle.grid.1x2') }
                    { eventsListAppearence === listAppearences.DETAIL && renderLayoutSFSymbol('square.fill.text.grid.1x2') }
                </HeaderButton>
            ),
            headerBackground: () => (
                <View style={{ width: '100%', height: '100%' }}>
                    <AnimatedBlurView intensity={60} style={[StyleSheet.absoluteFillObject, headerAnimatedStyles]}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.dark ? 'rgba(0, 0, 0, .8)' : 'rgba(255, 255, 255, .8)' }]} />
                    </AnimatedBlurView>
                </View>
            )
        });
    }, [navigation, eventsListAppearence]);

    const eventsListContainerAnimatedStyles = useAnimatedStyle(() => ({
        paddingBottom: headerHeight + insets.bottom
    }));
    const eventsListAnimatedStyles = useAnimatedStyle(() => ({
        height: '100%',
        paddingTop: headerHeight
    }));

    const EventsListScreenProps = {
        events: [...events].reverse(),
        appearence: eventsListAppearence,
        scrollViewRef: scrollViewAnimatedRef,
        scrollViewStyle: eventsListAnimatedStyles,
        style: eventsListContainerAnimatedStyles,
        scrollHandler
    };
    // TODO: Here Loader must be shown instead of null when assets are loading
    // if(!ready) return <ActivityIndicator style={{ marginTop: 160 }} animating />;
    return (
        <View>
            <EventsListScreen { ...EventsListScreenProps }>
                <Animated.View style={searchBarContainerAnimatedStyles}>
                    <Pressable onPress={searchBarPressHandler} ref={searchBarRef}>
                        <SearchBar
                            placeholder='Search'
                            hideBackground={true}
                            editable={false}
                            // showsCancelButtonWhileEditing={false}
                            // onChangeText={setEventsSearchValue}
                        />
                    </Pressable>
                </Animated.View>
            </EventsListScreen>
        </View>
    );
};

export default EventsListContainer;
