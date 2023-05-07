import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
// import { editNewEvent, saveNewEvent, setNewEvent, resetNewEvent } from '../../stores/new-event/new-event.reducer';
import { addEmptyEvent, editNewEvent, saveNewEvent, resetNewEvent } from '../../stores/events/events.reducer';
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

    const saveNewEventHandler = () => {
        dispatch(saveNewEvent());
        navigation.goBack();
    };
    
    useEffect(() => {
        dispatch(addEmptyEvent());

        dispatch(editNewEvent({ type: CHANGE_DATE, value: JSON.stringify(new Date()) }));
        dispatch(editNewEvent({ type: CHANGE_TIME, value: JSON.stringify(new Date()) }));
        dispatch(editNewEvent({
            type: CHANGE_BACKGROUND_COLOR,
            value: {
                backgroundColor: convertColorWithAlpha(theme.colors.background, newEvent?.timer?.backgroundOpacity)
            }
        }));
        dispatch(editNewEvent({ type: CHANGE_FONT_COLOR, value: { fontColor: theme.colors.text } }));

        return () => {
            dispatch(resetNewEvent());
        };
    }, []);
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
    }, [navigation]);

    const NewEventScreenProps = { newEvent };
    return <NewEventScreen { ...NewEventScreenProps } />;
};

export default NewEventContainer;
