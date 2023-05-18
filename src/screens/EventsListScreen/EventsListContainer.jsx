import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { SFSymbol } from 'react-native-sfsymbols';
import EventsListScreen from './EventsListScreen';
import { listAppearences, toggleListAppearence } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import HeaderButton from '../../components/HeaderButton';
import HeaderText from '../../components/HeaderText';

const EventsListContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();

    // const [ready, setReady] = useState(false);
    const { events, eventsListAppearence } = useSelector(eventsSelector);

    const renderLayoutSFSymbol = name => (
        <SFSymbol
            name={name}
            size={20}
            style={{ width: 20, height: 20 }}
        />
    );

    // useEffect(() => {
    //     (async () => {
    //         await Promise.all(events.map(timer => Asset.loadAsync(timer.image)));
    //         setReady(true);
    //     })();
    // }, [events]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search'
            },
            headerLeft: () => (
                <Text style={{ marginLeft: -5, fontSize: 25, fontWeight: '700', color: theme.colors.text }}>
                    Timers
                </Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', gap: 15, marginRight: -5 }}>
                    <HeaderButton>
                        <HeaderText color={theme.colors.primary}>Edit</HeaderText>
                    </HeaderButton>
                    <HeaderButton onPress={() => dispatch(toggleListAppearence())}>
                        { eventsListAppearence === listAppearences.REGULAR && renderLayoutSFSymbol('rectangle.grid.1x2') }
                        { eventsListAppearence === listAppearences.DETAIL && renderLayoutSFSymbol('square.fill.text.grid.1x2') }
                    </HeaderButton>
                </View>
            )
        });
    }, [navigation, eventsListAppearence]);

    // TODO: Here Loader must be shown instead of null when assets are loading
    // if(!ready) return <ActivityIndicator style={{ marginTop: 160 }} animating />;
    return <EventsListScreen events={events} appearence={eventsListAppearence} />;
};

export default EventsListContainer;
