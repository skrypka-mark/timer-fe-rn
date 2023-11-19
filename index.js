/**
 * @format
 */

import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotificationIOS.addEventListener('localNotification', notification => console.log(notification));

AppRegistry.registerComponent(appName, () => App);
