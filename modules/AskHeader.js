import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { w } from './constants'
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from '../services/themes/ThemeManager'

const AskHeader = ({title, onPress, onQuestion}) => {
    const {theme} = useTheme()
    return(
        <View style={[styles.box,{backgroundColor: theme.blockColor}]}>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onPress}>
                <View style={{ height: w / 8 , justifyContent: 'center'}}>
                  <Ionicons name="ios-arrow-back" size={30} style={{ color: theme.blueColor, paddingRight: 10, paddingLeft: 15}}/>
                </View>
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.maintext, {color: theme.headerTitle}]}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onQuestion} style={{height: w/8, alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginRight: 10}}>
            <Ionicons name="ios-create-outline" size={30} color={theme.blueColor} />
                {/* <Image source={{uri: "https://e7.pngegg.com/pngimages/458/214/png-clipart-scalable-graphics-icon-question-mark-text-speech-balloon.png"}} style={{height: 30, width: 30, resizeMode: 'contain'}} /> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    maintext: {
        // width: w * 0.75,
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
        // alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 4,
        elevation: 5,
      },
})

export default AskHeader