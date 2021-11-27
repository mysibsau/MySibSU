// import { registerRootComponent } from 'expo';
import App from './App';
import { AppRegistry, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios'
import { BASE_URL } from './modules/constants';

axios.defaults.baseURL = BASE_URL

// Register background push notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});


// Subscribe to topic for notifications
messaging()
    .subscribeToTopic('allUsers_android')
    .then(() => console.log('Subscribed to topic1!'));

messaging()
    .subscribeToTopic('debug_android')
    .then(() => console.log('Subscribed to topic2!'));

messaging()
    .subscribeToTopic('react_ios_test_topic')
    .then(() => console.log('Subscribed to topic3!'));



AppRegistry.registerComponent(Platform.OS === 'ios' ? 'mysibsu' : 'main', () => App);
// AppRegistry.registerComponent('MySibSU', () => App);

// registerRootComponent(App)

