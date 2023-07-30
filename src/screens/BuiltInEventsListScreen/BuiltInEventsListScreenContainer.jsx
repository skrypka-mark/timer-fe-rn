import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    withSequence,
    withTiming,
    withSpring,
    Extrapolate
} from 'react-native-reanimated';
import SearchBar from 'react-native-search-bar';
import _ from 'lodash';
import { useSearch } from '../../hooks/useSearch';
import { eventsSelector } from '../../stores/events/events.selector';
import BuiltInEventsListScreen from './BuiltInEventsListScreen';
import HeaderBackground from '../../components/HeaderBackground';
import { getRandomId } from '../../utils/getRandomId';
import { fontFamilies, repeatPickerValues } from '../../constants';

const BuiltInEventsListScreenContainer = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const headerHeight = useHeaderHeight();

    const events = useMemo(() => [
        {
            id: getRandomId(),
            title: 'Happy 8th of March',
            timer: {
                date: JSON.stringify(new Date('2023-03-08')),
                time: JSON.stringify(new Date('2023-03-08T00:00:00')),
                repeat: {
                    amount: repeatPickerValues.amounts[0],
                    label: repeatPickerValues.labels[2]
                },
                fontFamily: fontFamilies[0],
                fontColor: '#fff',
                backgroundColor: '#E4A2C2',
                backgroundOpacity: 0.5,
                displayUnits: {
                    years: true,
                    months: true,
                    weeks: true,
                    days: true,
                    hours: true,
                    minutes: true,
                    seconds: true
                }
            },
            image: require('../../assets/images/wedding.jpg')
        },
        {
            id: getRandomId(),
            title: 'May Day',
            timer: {
                date: JSON.stringify(new Date('2023-03-08')),
                time: JSON.stringify(new Date('2023-03-08T00:00:00')),
                repeat: {
                    amount: repeatPickerValues.amounts[0],
                    label: repeatPickerValues.labels[2]
                },
                fontFamily: fontFamilies[0],
                fontColor: '#fff',
                backgroundColor: '#E4A2C2',
                backgroundOpacity: 0.5,
                displayUnits: {
                    years: true,
                    months: true,
                    weeks: true,
                    days: true,
                    hours: true,
                    minutes: true,
                    seconds: true
                }
            },
            image: require('../../assets/images/wedding.jpg')
        },
        {
            id: getRandomId(),
            title: 'May Day',
            timer: {
                date: JSON.stringify(new Date('2023-03-08')),
                time: JSON.stringify(new Date('2023-03-08T00:00:00')),
                repeat: {
                    amount: repeatPickerValues.amounts[0],
                    label: repeatPickerValues.labels[2]
                },
                fontFamily: fontFamilies[0],
                fontColor: '#fff',
                backgroundColor: '#E4A2C2',
                backgroundOpacity: 0.5,
                displayUnits: {
                    years: true,
                    months: true,
                    weeks: true,
                    days: true,
                    hours: true,
                    minutes: true,
                    seconds: true
                }
            },
            image: require('../../assets/images/wedding.jpg')
        },
        {
            id: getRandomId(),
            title: 'May Day',
            timer: {
                date: JSON.stringify(new Date('2023-03-08')),
                time: JSON.stringify(new Date('2023-03-08T00:00:00')),
                repeat: {
                    amount: repeatPickerValues.amounts[0],
                    label: repeatPickerValues.labels[2]
                },
                fontFamily: fontFamilies[0],
                fontColor: '#fff',
                backgroundColor: '#E4A2C2',
                backgroundOpacity: 0.5,
                displayUnits: {
                    years: true,
                    months: true,
                    weeks: true,
                    days: true,
                    hours: true,
                    minutes: true,
                    seconds: true
                }
            },
            image: require('../../assets/images/wedding.jpg')
        },
        {
            id: getRandomId(),
            title: 'May Day',
            timer: {
                date: JSON.stringify(new Date('2023-03-08')),
                time: JSON.stringify(new Date('2023-03-08T00:00:00')),
                repeat: {
                    amount: repeatPickerValues.amounts[0],
                    label: repeatPickerValues.labels[2]
                },
                fontFamily: fontFamilies[0],
                fontColor: '#fff',
                backgroundColor: '#E4A2C2',
                backgroundOpacity: 0.5,
                displayUnits: {
                    years: true,
                    months: true,
                    weeks: true,
                    days: true,
                    hours: true,
                    minutes: true,
                    seconds: true
                }
            },
            image: require('../../assets/images/wedding.jpg')
        }
    ], []);

    const { eventsListAppearence } = useSelector(eventsSelector);
    const prevBuiltinEventsSearchRef = useRef(events);
    const [builtinEventsSearch, setBuiltinEventsSearchValue] = useSearch(events, 'title');
    const sharedValue = useSharedValue(1);
    const scrollY = useSharedValue(0);
    const searchBarSharedValue = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(e => {
        // console.log('====================================');
        // console.log(e.contentOffset.y);
        // console.log('====================================');
        scrollY.value = e.contentOffset.y;
        searchBarSharedValue.value = e.contentOffset.y;
    });

    const searchBarContainerAnimatedStyles = useAnimatedStyle(() => ({
        // opacity: interpolate(searchBarSharedValue.value, [-headerHeight, -headerHeight / 3], [1, 0], Extrapolate.CLAMP),
        // transform: [{ scale: interpolate(searchBarSharedValue.value, [-headerHeight, -headerHeight / 2], [1, 0.9], Extrapolate.CLAMP) }],

        // opacity: interpolate(searchBarSharedValue.value, [-headerHeight, -headerHeight / 3], [1, 0], Extrapolate.CLAMP),
        // transform: [
        //     { scale: interpolate(searchBarSharedValue.value, [-headerHeight, -headerHeight / 2], [1, 0.9], Extrapolate.CLAMP) },
        //     { translateY: interpolate(searchBarSharedValue.value, [-headerHeight, -headerHeight / 2], [0, headerHeight], Extrapolate.CLAMP) },
        // ]
    }));

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerSearchBarOptions: {
            //     placeholder: 'Search',
            //     hideNavigationBar: false,
            //     onChangeText: event => updateBuiltinEventsSearch(event.nativeEvent.text)
            // }
            headerBackground: () => (
                <HeaderBackground
                    title='Built-in events'
                    leftTitle='Cancel'
                    // rightTitle='Save'
                    scrollY={scrollY}
                    modal
                    onLeft={navigation.goBack}
                    // onRight={() => saveNewEventHandler(newEvent)}
                />
            )
        });
    }, [navigation]);
    useEffect(() => {
        if(!_.isEqual(prevBuiltinEventsSearchRef.current.map(({ title }) => title), builtinEventsSearch.map(({ title }) => title)) && builtinEventsSearch?.length)
            sharedValue.value = withSequence(withTiming(0, { duration: 100 }), withTiming(1));
        if(!builtinEventsSearch?.length)
            sharedValue.value = withTiming(0, { duration: 200 });
        prevBuiltinEventsSearchRef.current = builtinEventsSearch;
    }, [builtinEventsSearch]);

    const eventsListContainerAnimatedStyles = useAnimatedStyle(() => ({
        opacity: sharedValue.value
    }));

    const BuiltInEventsListScreenProps = {
        events: builtinEventsSearch,
        appearence: eventsListAppearence,
        style: eventsListContainerAnimatedStyles,
        scrollHandler
    };
    return (
        <BuiltInEventsListScreen { ...BuiltInEventsListScreenProps }>
            <Animated.View style={searchBarContainerAnimatedStyles}>
                <SearchBar
                    placeholder='Search'
                    hideBackground={true}
                    onChangeText={setBuiltinEventsSearchValue}
                />
            </Animated.View>
        </BuiltInEventsListScreen>
    );
};

export default BuiltInEventsListScreenContainer;
