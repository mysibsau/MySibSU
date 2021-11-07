import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { h, w } from './constants'
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from '../services/themes/ThemeManager'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({title, onPress}) => {
    const {theme} = useTheme()
    const insets = useSafeAreaInsets();

    return(
        <View style={[styles.box,{backgroundColor: theme.blockColor, paddingTop: insets.top}]}>
            <TouchableOpacity onPress={onPress}>
                <View style={{justifyContent: 'center'}}>
                  <Ionicons name="ios-arrow-back" size={30} style={{ color: theme.blueColor, paddingRight: 10, paddingLeft: 15}}/>
                </View>
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.maintext, {color: theme.headerTitle}]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    maintext: {
        width: w * 0.75,
        fontSize: 25,
        color: 'gray',
        textAlignVertical: 'center',
        marginLeft: 10,
        fontFamily: 'System',
      },

    box: {
        width: w,
        elevation: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
      },
})

export default Header