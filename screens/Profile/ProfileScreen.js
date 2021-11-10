import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, AsyncStorage, ActivityIndicator, Linking } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { h, w } from '../../modules/constants'
import { useLocale } from '../../services/locale/LocaleManager'
import { useTheme } from '../../services/themes/ThemeManager'
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../services/auth/AuthManager';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function PersonScreen(props) {
    const { locale } = useLocale()
    const { theme } = useTheme()
    const { user, authData } = useUser();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
            <View style={[styles.box, { backgroundColor: theme.blockColor, paddingTop: insets.top }]}>
                <Image source={require('../../assets/icons/gear.png')} style={{ width: 25, height: 25, marginBottom: 3, marginRight: 10, marginLeft: 10 }} />
                <Text style={[styles.maintext, { color: theme.headerTitle }]}>{locale['personal_account']}</Text>
                <TouchableOpacity onPress={() => {
                    const modes = { "Default": 0, "Light": 1, "Dark": 2, null: 0 }
                    AsyncStorage.getItem('Theme')
                        .then(res => props.navigation.navigate('Settings', { theme: modes[res], user: user }))
                }}>
                    <DefaultIcon name={'gear.png'} color={theme.headerTitle} style={{ marginBottom: 3, marginRight: 10, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: w, padding: w * 0.05, paddingBottom: 120 }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5 }}>{locale['full_name']}</Text>
                <View style={{ padding: 10, width: w * 0.9, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 19, color: theme.labelColor }}>{user.FIO}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15 }}>{locale['group']}</Text>
                        <View style={{ paddingTop: 10, paddingBottom: 10, width: w * 0.425, marginRight: w * 0.05, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5 }}>
                            <Text style={{ width: w * 0.425, textAlign: 'center', fontSize: 19, color: theme.labelColor }}>{user.group}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15 }}>{locale['average']}</Text>
                        <View style={{ paddingTop: 10, paddingBottom: 10, width: w * 0.425, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5 }}>
                            <Text style={{ width: w * 0.425, textAlign: 'center', fontSize: 19, color: theme.labelColor }}>{user.averga}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15 }}>{locale['login']}</Text>
                <View style={{ padding: 10, width: w * 0.9, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 19, color: theme.labelColor }}>{user.zachotka}</Text>
                </View>

                <Text style={{ fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15 }}>{locale['perfomance']}</Text>
                <View style={{ width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, elevation: 5 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Attestation')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ color: theme.labelColor, fontSize: 19 }}>{locale['attestation']}</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#006AB3" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: w * 0.8, height: 1, backgroundColor: 'gray', alignSelf: 'center', opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('Marks', { data: authData })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ color: theme.labelColor, fontSize: 19 }}>{locale['marks']}</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#006AB3" />
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15 }}>{locale['help']}</Text>
                <View style={{ elevation: 5, backgroundColor: theme.blockColor, borderRadius: 15 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Questions')} style={{ width: w * 0.9, backgroundColor: theme.blockColor, padding: 10 }}>
                        <Text style={{ color: theme.labelColor, fontSize: 19 }}>{locale.myQuestions}</Text>
                    </TouchableOpacity>
                    <View style={{ width: w * 0.8, height: 1, backgroundColor: 'gray', alignSelf: 'center', opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('FAQ')} style={{ width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, padding: 10 }}>
                        <Text style={{ color: theme.labelColor, fontSize: 19 }}>FAQ</Text>
                    </TouchableOpacity>
                    <View style={{ width: w * 0.8, height: 1, backgroundColor: 'gray', alignSelf: 'center', opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.getItem('UUID').then(uuid => {
                            props.navigation.navigate('Poll', { uuid: uuid, id: 3 })
                        })
                    }} style={{ width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, padding: 10 }}>
                        <Text style={{ color: theme.labelColor, fontSize: 19 }}>{locale.feedback}</Text>
                    </TouchableOpacity>
                    <View style={{ width: w * 0.8, height: 1, backgroundColor: 'gray', alignSelf: 'center', opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => Linking.openURL('https://mysibsau.ru/user-agreement/')} style={{ width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, padding: 10 }}>
                        <Text style={{ color: theme.labelColor, fontSize: 19 }}>{locale.user_agreement_profile}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: h,
        flex: 1,
        width: w,
        paddingBottom: 40
    },

    text: {
        marginTop: 30,
        fontSize: 20,

        color: '#006AB3'
    },

    box: {
        backgroundColor: 'white',
        width: w,
        paddingLeft: 10,
        padding: 10,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        zIndex: 4,
    },

    maintext: {
        width: w * 0.75,
        fontSize: 25,
        color: 'grey',
        textAlignVertical: 'center',

        textAlign: 'left',
    },

    okay_button: {
        height: 40,
        width: w * 0.66,
        borderRadius: 25,
        backgroundColor: '#006AB3',
        elevation: 5,
        alignSelf: 'center',
        marginTop: 20,
    },

    okay_button_text: {
        color: 'white',

        alignSelf: 'center',
        height: 40,
        textAlignVertical: 'center',
        fontSize: 20,
    }
})
