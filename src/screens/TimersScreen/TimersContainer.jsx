import React, { useLayoutEffect } from 'react';
import TimersScreen from './TimersScreen';

const TimersContainer = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search'
            }
        });
    }, [navigation]);

    return <TimersScreen />;
};

export default TimersContainer;
