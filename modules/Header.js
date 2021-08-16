import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { h, w } from './constants'
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from '../services/themes/ThemeManager'

const Header = ({title, onPress}) => {
    const {theme} = useTheme()
    return(
        <View style={[styles.box,{backgroundColor: theme.blockColor}]}>
            <TouchableOpacity onPress={onPress}>
                <View style={{ height: w / 8 , justifyContent: 'center'}}>
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
        height: w / 8,
        fontSize: 25,
        color: 'gray',
        textAlignVertical: 'center',
        marginLeft: 10,
        fontFamily: 'roboto',
      },

    box: {
        height: w/8,
        width: w,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 4,
        elevation: 5,
      },
})

export default Header