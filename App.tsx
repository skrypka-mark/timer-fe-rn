/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/stores';

import Navigation from './src/navigation';
import PushNotificationIOS, { type PushNotification } from '@react-native-community/push-notification-ios';

function App(): JSX.Element {
  useEffect(() => {
    PushNotificationIOS.requestPermissions();

    const type = 'notification';
    PushNotificationIOS.addEventListener(type, onRemoteNotification);
    return () => {
      PushNotificationIOS.removeEventListener(type);
    };
  });

  const onRemoteNotification = (notification: PushNotification) => {
    const result = PushNotificationIOS.FetchResult.NoData;
    notification.finish(result);
  };
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
