import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { addEmptyEvent, saveEvent, resetEmptyEvent } from '../../stores/events/events.reducer';
import { eventsSelector } from '../../stores/events/events.selector';
import EditEventScreen from './EditEventScreen';
import HeaderBackground from '../../components/HeaderBackground';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import moment from 'moment';

const EditEventScreenContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { event } = route.params;

  const { emptyEvent } = useSelector(eventsSelector);
  const [error, setError] = useState({ message: '' });
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });

  const saveEventHandler = event => {
    if (!event.title) return setError({ message: 'Name must be specified' });

    PushNotificationIOS.removePendingNotificationRequests([event.id]);

    PushNotificationIOS.addNotificationRequest({
      id: event.id,
      title: 'Event Tracker',
      body: event.title,
      fireDate: moment(
        [
          moment(JSON.parse(event.timer.date)).format('YYYY-MM-DD'),
          moment(JSON.parse(event.timer.time)).format('HH:mm:ss.SSSZ')
        ].join('T')
      ).toISOString()
    });

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
    if (error.message) {
      Alert.alert('Error', error.message);
      setError({ message: '' });
    }
  }, [error]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <HeaderBackground
          title="Edit event"
          leftTitle="Cancel"
          rightTitle="Save"
          scrollY={scrollY}
          modal
          onLeft={navigation.goBack}
          onRight={() => saveEventHandler(emptyEvent)}
        />
      )
    });
  }, [navigation, emptyEvent]);

  const EditEventScreenProps = { event: emptyEvent, scrollHandler };
  return <EditEventScreen {...EditEventScreenProps} />;
};

export default EditEventScreenContainer;
