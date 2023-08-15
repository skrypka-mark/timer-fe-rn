import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { addEmptyEvent, editEvent, saveEvent, resetEmptyEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import EditEventScreen from './EditEventScreen';
import HeaderBackground from '../../components/HeaderBackground';

const EditEventScreenContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();

    const { event } = route.params;

    const { emptyEvent } = useSelector(eventsSelector);
    const [error, setError] = useState({ message: '' });
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(e => {
        scrollY.value = e.contentOffset.y;
    });

    const saveEventHandler = event => {
        if(!event.title) return setError({ message: 'Name must be specified' });

        dispatch(saveEvent(event));
        navigation.goBack();
    };
    
    useEffect(() => {
        dispatch(addEmptyEvent(event));

        return () => {
            dispatch(resetEmptyEvent());
        };
    }, []);
    useEffect(() => {
        if(error.message) {
            Alert.alert('Error', error.message);
            setError({ message: '' });
        }
    }, [error]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => (
                <HeaderBackground
                    title='Edit event'
                    leftTitle='Cancel'
                    rightTitle='Save'
                    scrollY={scrollY}
                    modal
                    onLeft={navigation.goBack}
                    onRight={() => saveEventHandler(emptyEvent)}
                />
            )
        });
    }, [navigation, emptyEvent]);

    const EditEventScreenProps = { event: emptyEvent, scrollHandler };
    return <EditEventScreen { ...EditEventScreenProps } />;
};

export default EditEventScreenContainer;
