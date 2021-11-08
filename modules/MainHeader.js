import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { h, w } from './constants'
import { useTheme } from '../services/themes/ThemeManager'
import { useLocale } from '../services/locale/LocaleManager'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MainHeader = ({title, onPress}) => {
    const {mode, theme, toggle} = useTheme() 
    const insets = useSafeAreaInsets();

    return(
        <View style={[styles.box, styles.shadow2, {backgroundColor: theme.blockColor, paddingTop: insets.top}]}>
            <Image source={require('../assets/header_logo.png')} style={{ width: 25, height: 25,}} />
            <Text allowFontScaling={false} style={[styles.maintext, {color: theme.headerTitle}]}>{title}</Text>
        </View>
    )
}

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
  }

const styles = StyleSheet.create({
    maintext: {
        fontSize: 25,
        color: 'grey',
        textAlignVertical: 'center',
        
        textAlign: 'left',
        paddingLeft: 10,
    },

      shadow2: elevationShadowStyle(5),
      box: {
          backgroundColor: 'white',
          width: w,
          padding: 10,
          elevation: 10,
          flexDirection: 'row',
          alignItems: 'center',
        },
})

export default MainHeader