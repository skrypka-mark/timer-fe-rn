import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { Alert, InteractionManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import moment from 'moment';
import { saveEvent, resetEmptyEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import HeaderBackground from '../../components/HeaderBackground';
import NewEventScreen from './NewEventScreen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getRandomId } from '../../helpers/utils';

const NewEventContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { emptyEvent: newEvent } = useSelector(eventsSelector);
  const [error, setError] = useState({ message: '' });
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });

  const saveNewEventHandler = event => {
    if (!event.title) return setError({ message: 'Name must be specified' });

    navigation.goBack();

    InteractionManager.runAfterInteractions(() => {
      const eventId = getRandomId();

      PushNotificationIOS.addNotificationRequest({
        id: eventId,
        title: 'Event Tracker',
        body: event.title,
        fireDate: moment(
          [
            moment(JSON.parse(event.timer.date)).format('YYYY-MM-DD'),
            moment(JSON.parse(event.timer.time)).format('HH:mm:ss.SSSZ')
          ].join('T')
        ).toISOString()
      });

      event.id = eventId;
      event.createdAt = moment().format('DD-MM-YYYY');
      dispatch(saveEvent(event));
    });
  };

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        dispatch(resetEmptyEvent());
      });

      return () => task.cancel();
    }, [])
  );
  useEffect(() => {
    if (error.message) {
      Alert.alert('Error', error.message);
      setError({ message: '' });
    }
  }, [error]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <HeaderBackground
          title="New event"
          leftTitle="Cancel"
          rightTitle="Save"
          scrollY={scrollY}
          modal
          onLeft={navigation.goBack}
          onRight={() => saveNewEventHandler(newEvent)}
        />
      )
    });
  }, [navigation, newEvent]);

  const NewEventScreenProps = { newEvent, scrollHandler };
  return <NewEventScreen {...NewEventScreenProps} />;
};

export default NewEventContainer;
