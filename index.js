// import { registerRootComponent } from 'expo';
import App from './App';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios'
import { BASE_URL } from './modules/constants';

axios.defaults.baseURL = BASE_URL

// // Register background push notifications
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });


// // Subscribe to topic for notifications
// messaging()
//   .subscribeToTopic('allUsers_android')
//   .then(() => console.log('Subscribed to topic!'));

// messaging()
//   .subscribeToTopic('debug_android')
//   .then(() => console.log('Subscribed to topic!'));



AppRegistry.registerComponent('mysibsu', () => App);
// AppRegistry.registerComponent('MySibSU', () => App);

// registerRootComponent(App)

