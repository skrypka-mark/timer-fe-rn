import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import { Alert, InteractionManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme, useFocusEffect, UNSTABLE_usePreventRemove, usePreventRemoveContext } from '@react-navigation/native';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import moment from 'moment';
// import { editNewEvent, saveNewEvent, setNewEvent, resetNewEvent } from '../../stores/new-event/new-event.reducer';
import { addEmptyEvent, editEvent, saveEvent, resetEmptyEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import HeaderBackground from '../../components/HeaderBackground';
import NewEventScreen from './NewEventScreen';
import { convertColorWithAlpha } from '../../helpers/utils/convertColorWithAlpha';
import { CHANGE_DATE, CHANGE_TIME, CHANGE_BACKGROUND_COLOR, CHANGE_FONT_COLOR } from '../../constants';

const NewEventContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();

    const { emptyEvent: newEvent } = useSelector(eventsSelector);
    const [error, setError] = useState({ message: '' });
    // const [isPreventRemove, setIsPreventRemove] = useState(true);
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(e => {
        scrollY.value = e.contentOffset.y;
    });

    const saveNewEventHandler = event => {
        if(!event.title) return setError({ message: 'Name must be specified' });

        navigation.goBack();

        InteractionManager.runAfterInteractions(() => {
            event.createdAt = moment().format('DD-MM-YYYY');
            dispatch(saveEvent(event));
        });
    };
    
    // usePreventRemoveContext();
    // UNSTABLE_usePreventRemove(isPreventRemove, ({ data }) => {
    //     const { action } = data;
    //     console.log('====================================');
    //     console.log(action);
    //     console.log('====================================');
    //     setIsPreventRemove(!isPreventRemove);
    //     if(action.type === 'GO_BACK') navigation.goBack();
    //     if(action.type === 'NAVIGATE') {
    //         navigation.navigate(action.payload.name);
    //     }
    //     if(action.type === 'POP') {
    //         setTimeout(() => {
    //             Alert.alert('Are you sure?', 'You are about to reset changes.', [
    //                 {
    //                     text: 'Reset',
    //                     style: 'destructive',
    //                     onPress: navigation.goBack
    //                 },
    //                 {
    //                     text: 'Save',
    //                     isPreferred: true,
    //                     onPress: () => console.log('OK Pressed')
    //                 }
    //             ]);
    //         }, 500);
    //     }
    // });
    useEffect(() => {
        // dispatch(addEmptyEvent());

        // dispatch(editEvent({ type: CHANGE_DATE, value: JSON.stringify(new Date()) }));
        // dispatch(editEvent({ type: CHANGE_TIME, value: JSON.stringify(new Date()) }));
    }, []);
    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                dispatch(resetEmptyEvent());
            });

            return () => task.cancel();
        }, [])
    );
    useEffect(() => {
        // if(!newEvent) return;

        // dispatch(editEvent({ type: CHANGE_FONT_COLOR, value: { fontColor: theme.colors.text } }));

        // dispatch(editEvent({
        //     type: CHANGE_BACKGROUND_COLOR,
        //     value: {
        //         backgroundColor: convertColorWithAlpha(theme.colors.background, newEvent?.timer?.backgroundOpacity)
        //     }
        // }));

        // return () => {
        //     dispatch(resetEmptyEvent());
        // };
    }, []);
    useEffect(() => {
        if(error.message) {
            Alert.alert('Error', error.message);
            setError({ message: '' });
        }
    }, [error]);
    useLayoutEffect(() => {
        navigation.setOptions({
            // headerLeft: () => (
            //     <HeaderButton onPress={navigation.goBack}>
            //         <HeaderText color={theme.colors.notification}>Cancel</HeaderText>
            //     </HeaderButton>
            // ),
            // headerRight: () => (
            //     <HeaderButton onPress={() => saveNewEventHandler(newEvent)}>
            //         <HeaderText color={theme.colors.primary}>Save</HeaderText>
            //     </HeaderButton>
            // ),
            headerBackground: () => (
                <HeaderBackground
                    title='New event'
                    leftTitle='Cancel'
                    rightTitle='Save'
                    scrollY={scrollY}
                    modal
                    onLeft={navigation.goBack}
                    onRight={() => saveNewEventHandler(newEvent)}
                />
            )
        });
    }, [navigation, newEvent]);

    const NewEventScreenProps = { newEvent, scrollHandler };
    return <NewEventScreen { ...NewEventScreenProps } />;
};

export default NewEventContainer;
