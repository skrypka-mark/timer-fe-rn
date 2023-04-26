import React, { useLayoutEffect } from 'react';
import EventsListScreen from './EventsListScreen';

const EventsListContainer = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search'
            }
        });
    }, [navigation]);

    return <EventsListScreen />;
};

export default EventsListContainer;
