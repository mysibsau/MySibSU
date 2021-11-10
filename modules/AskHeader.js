import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { w } from './constants'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../services/themes/ThemeManager'
import { useUser } from '../services/auth/AuthManager';
import AsyncStorage from '@react-native-community/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButtonIcon } from '../services/icons/icons';

const AskHeader = ({ title, onPress, onQuestion }) => {
    const { isAuthorizated } = useUser();
    const { theme } = useTheme()
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.box, { backgroundColor: theme.blockColor, paddingTop: insets.top }]}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onPress}>
                    <View style={{ height: w / 8, justifyContent: 'center' }}>
                        <BackButtonIcon />
                    </View>
                </TouchableOpacity>
                <Text numberOfLines={1} style={[styles.maintext, { color: theme.headerTitle }]}>{title}</Text>
            </View>
            {isAuthorizated &&
                <TouchableOpacity onPress={onQuestion} style={{ height: w / 8, alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
                    <Ionicons name="ios-create-outline" size={30} color={theme.blueColor} />
                </TouchableOpacity>}
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

    },

    box: {
        height: w / 8,
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