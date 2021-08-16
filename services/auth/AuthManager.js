import AsyncStorage from '@react-native-community/async-storage';
import React from 'react'
import { CurrentWeekApiCall } from '../api/timetable';
import { signInApiCall } from '../api/user';


export const ManageAuthContext = React.createContext({
    user: {},
    isAuthorizated: false,
    setUserInfo: () => {},
    login: () => {},
    logout: () => {},
  });

export const useUser = () => React.useContext(ManageAuthContext);

export class AuthManager extends React.Component {

    state = {
      user: {},
      authData: {},
      isAuthorizated: false,
    };

    async componentDidMount() {
        this.setUserInfo();
    }

    async setUserInfo() {
        const userData = JSON.parse(await AsyncStorage.getItem('User'));
        const authData = JSON.parse(await AsyncStorage.getItem('AuthData'));
        if (userData){
            this.setState({user: userData, authData: authData, isAuthorizated: true});
        } else {
            this.setState({user: {}, authData: {}, isAuthorizated: false})
        }
    }

    async login(login, password){
        const user = await signInApiCall(login, password);
        if (user) {
            AsyncStorage.setItem('User', JSON.stringify(user))
            AsyncStorage.setItem('AuthData', JSON.stringify({username: login, password: password}))
            this.setState({user: user, authData: {username: login, password: password}, isAuthorizated: true})
            return true;
        } else {
            return false;
        }
    }

    async logout(){
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