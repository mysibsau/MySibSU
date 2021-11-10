import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { h, w } from './constants'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../services/themes/ThemeManager'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButtonIcon } from '../services/icons/icons';

const Header = ({ title, onPress }) => {
    const { theme } = useTheme()
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.box, { backgroundColor: theme.blockColor, paddingTop: insets.top }]}>
            <TouchableOpacity onPress={onPress}>
                <BackButtonIcon />
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.maintext, { color: theme.headerTitle }]}>{title}</Text>
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