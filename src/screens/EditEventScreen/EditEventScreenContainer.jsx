import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { addEmptyEvent, editEvent, saveEmptyEvent, resetEmptyEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import EditEventScreen from './EditEventScreen';
import HeaderButton from '../../components/HeaderButton';
import HeaderText from '../../components/HeaderText';

const EditEventScreenContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();

    const { event } = route.params;

    const { emptyEvent } = useSelector(eventsSelector);
    const [error, setError] = useState({ message: '' });
    
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
            headerLeft: () => (
                <HeaderButton onPress={navigation.goBack}>
                    <HeaderText color={theme.colors.notification}>Cancel</HeaderText>
                </HeaderButton>
            ),
            headerRight: () => (
                <HeaderButton onPress={() => saveEventHandler(emptyEvent)}>
                    <HeaderText color={theme.colors.primary}>Save</HeaderText>
                </HeaderButton>
            )
        });
    }, [navigation, emptyEvent]);

    const saveEventHandler = event => {
        if(!event.title) return setError({ message: 'Name must be specified' });

        dispatch(saveEmptyEvent(event));
        navigation.goBack();
    };

    const EditEventScreenProps = { event: emptyEvent };
    return <EditEventScreen { ...EditEventScreenProps } />;
};

export default EditEventScreenContainer;
