/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react'
import {AsyncStorage, Text} from 'react-native'
import Navigation from './services/navigation/HomeScreen'
import AppLoading from 'expo-app-loading'
import { useFonts } from '@use-expo/font'
import { AppearanceProvider } from 'react-native-appearance'
import { ThemeManager } from './services/themes/ThemeManager'
import { LocaleManager } from './services/locale/LocaleManager'
import { WeekManager } from './services/week/WeekManager'
import { AuthManager } from './services/auth/AuthManager'


function App(){

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false; 

  const [firstLaunch, setFirstLaunch] = useState(null)
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if(value == null){
           AsyncStorage.setItem('alreadyLaunched', "true");
           setFirstLaunch(true)
      }
      else
           setFirstLaunch(false)
    })
  }, [])

  // Устанавливаем кастомный шрифт, который лежит в ./assets/fonts/
  let [fontsLoaded] = useFonts({
    'roboto': require('./assets/fonts/18811.ttf'),
  });

  // Если шрифты еще не были установлены, продолжаем загружать приложение
  if (!fontsLoaded || firstLaunch === null) {
    return <AppLoading />;
  }

  // Проверяем наличие UUID в хранилище. Если его нет, то генерируем и записываем
  AsyncStorage.getItem('UUID')
  .then(res => {
    if (res === null){
      AsyncStorage.setItem('UUID', Math.random().toString(36).substr(2, 8) + '-' + Math.random().toString(36).substr(2, 4) + '-' + 
      Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 4) + '-' + 
      Math.random().toString(36).substr(2, 12))
    }
  })

  AsyncStorage.getItem('@mode')
    .then(res => {
      if (res === null)
        AsyncStorage.setItem('@mode', '0')
    })

  return (
    <AuthManager>
      <WeekManager>
        <AppearanceProvider>
          <LocaleManager>
            <ThemeManager>
              <Navigation firstLaunch={firstLaunch}/>
            </ThemeManager>
          </LocaleManager>
        </AppearanceProvider> 
      </WeekManager> 
    </AuthManager>
  )
}

export default App;