import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Asset } from 'expo-asset';
import EventsListScreen from './EventsListScreen';
import { eventsSelector } from '../../stores/events/events.selector';

const EventsListContainer = ({ navigation }) => {
    const [ready, setReady] = useState(false);
    const { events, eventsListAppearence } = useSelector(eventsSelector);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search'
            }
        });

        (async () => {
            await Promise.all(events.map(timer => Asset.loadAsync(timer.image)));
            setReady(true);
        })();
    }, [navigation]);

    // TODO: Here Loader must be shown instead of null when assets are loading
    if(!ready) return null;
    return <EventsListScreen events={events} appearence={eventsListAppearence} />;
};

export default EventsListContainer;
