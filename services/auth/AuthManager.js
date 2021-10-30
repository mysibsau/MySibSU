import AsyncStorage from '@react-native-community/async-storage';
import React from 'react'
import messaging from '@react-native-firebase/messaging';
import { signInApiCall } from '../api/user';


export const ManageAuthContext = React.createContext({
    user: {},
    authData: {},
    isAuthorizated: false,
    setUserInfo: () => {},
    login: () => {},
    logout: () => {},
  });

export const useUser = () => React.useContext(ManageAuthContext);

export class AuthManager extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            authData: {},
            isAuthorizated: null,
        }

        this.login.bind(this);
        this.logout.bind(this);
    }

    

    async componentDidMount() {
        this.setUserInfo();
    }

    async setUserInfo() {
        const userData = JSON.parse(await AsyncStorage.getItem('User'));
        const authData = JSON.parse(await AsyncStorage.getItem('AuthData'));
        if (userData){
            await messaging().subscribeToTopic(userData.token)
            this.setState({user: userData, authData: authData, isAuthorizated: true});
        } else {
            this.setState({user: {}, authData: {}, isAuthorizated: false})
        }
    }

    login = async (login, password) => {
        const user = await signInApiCall(login, password);
        if (user) {
            await messaging().subscribeToTopic(user.token)
            this.setState({user: user, authData: {username: login, password: password}, isAuthorizated: true})
            await AsyncStorage.setItem('User', JSON.stringify(user))
            await AsyncStorage.setItem('AuthData', JSON.stringify({username: login, password: password}))
            console.log('USER', user)
            return true;
        } else {
            return false;
        }
    }

    logout = async () => {
        const token = JSON.parse(await AsyncStorage.getItem('User')).token;
        await messaging().unsubscribeFromTopic(token)
        await AsyncStorage.removeItem('User');
        await AsyncStorage.removeItem('AuthData');
        this.setState({user: {}, authData: {}, isAuthorizated: false})
    }

    render () {
      return (
        <ManageAuthContext.Provider value={{
          user: this.state.user,
          authData: this.state.authData,
          isAuthorizated: this.state.isAuthorizated,
          setUserInfo: this.setUserInfo,
          login: this.login,
          logout: this.logout,
        }}>
          {this.props.children}
        </ManageAuthContext.Provider>
      )
    }
  }