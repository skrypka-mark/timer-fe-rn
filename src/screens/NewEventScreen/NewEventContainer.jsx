import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
// import { editNewEvent, saveNewEvent, setNewEvent, resetNewEvent } from '../../stores/new-event/new-event.reducer';
import { addEmptyEvent, editEvent, saveEmptyEvent, resetEmptyEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import NewEventScreen from './NewEventScreen';
import HeaderButton from '../../components/HeaderButton';
import HeaderText from '../../components/HeaderText';
import { convertColorWithAlpha } from '../../utils/convertColorWithAlpha';
import { CHANGE_DATE, CHANGE_TIME, CHANGE_BACKGROUND_COLOR, CHANGE_FONT_COLOR } from '../../constants';

const NewEventContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();

    const { emptyEvent: newEvent } = useSelector(eventsSelector);
    const [error, setError] = useState({ message: '' });
    
    useEffect(() => {
        dispatch(addEmptyEvent());

        dispatch(editEvent({ type: CHANGE_DATE, value: JSON.stringify(new Date()) }));
        dispatch(editEvent({ type: CHANGE_TIME, value: JSON.stringify(new Date()) }));
        dispatch(editEvent({ type: CHANGE_FONT_COLOR, value: { fontColor: theme.colors.text } }));

        return () => {
            dispatch(resetEmptyEvent());
        };
    }, []);
    useEffect(() => {
        dispatch(editEvent({
            type: CHANGE_BACKGROUND_COLOR,
            value: {
                backgroundColor: convertColorWithAlpha(theme.colors.background, newEvent?.timer?.backgroundOpacity)
            }
        }));
    }, [newEvent]);
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
                <HeaderButton onPress={() => saveNewEventHandler(newEvent)}>
                    <HeaderText color={theme.colors.primary}>Save</HeaderText>
                </HeaderButton>
            )
        });
    }, [navigation, newEvent]);

    const saveNewEventHandler = event => {
        if(!event.title) return setError({ message: 'Name must be specified' });

        dispatch(saveEmptyEvent(event));
        navigation.goBack();
    };

    const NewEventScreenProps = { newEvent };
    return <NewEventScreen { ...NewEventScreenProps } />;
};

export default NewEventContainer;
