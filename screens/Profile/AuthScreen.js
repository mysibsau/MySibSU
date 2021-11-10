import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, AsyncStorage, ActivityIndicator } from 'react-native'
import { Octicons } from '@expo/vector-icons'; 
import { h, w } from '../../modules/constants'
import { useLocale } from '../../services/locale/LocaleManager'
import { useTheme } from '../../services/themes/ThemeManager'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useUser } from '../../services/auth/AuthManager';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DefaultIcon from '../../services/icons/icon'
import { useToast } from '../../services/toasts/ToastsManager';

export default function PersonScreen(props) {
    const {callToast} = useToast();
    const {locale} = useLocale()
    const {theme} = useTheme()
    const {login} = useUser()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [fetching, setFetching] = React.useState(false)
    const insets = useSafeAreaInsets();

    const tryToLogin = async () => {
        setFetching(true)
        const response = await login(username, password)
        if (response) {
            setUsername('');
            setPassword('');
            props.navigation.navigate('Profile')
        } else {
            callToast(locale.wrong_login, theme.blockColor, theme.labelColor)
        }
        setFetching(false);
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
            <View style={[styles.box, styles.shadow, { backgroundColor: theme.blockColor, paddingTop: insets.top }]}>
                <Image source={require('../../assets/header_logo.png')} style={{ width: 25, height: 25, marginBottom: 3, marginRight: 10, marginLeft: 10 }} />
                <Text style={[styles.maintext, { color: theme.headerTitle }]}>{locale['personal_account']}</Text>
                <TouchableOpacity onPress={() => {
                    const modes = { "Default": 0, "Light": 1, "Dark": 2, null: 0 }
                    AsyncStorage.getItem('Theme')
                        .then(res => props.navigation.navigate('AnotherSettings', { theme: modes[res], user: {} }))
                }}>
                    <DefaultIcon image={require('../../assets/icons/gear.png')} color={theme.headerTitle} style={{ marginBottom: 3, marginRight: 10, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={{ width: w, marginTop: 100 }}>
                    <View style={{ width: w * 0.8, borderRadius: 15, elevation: 6, backgroundColor: theme.blockColor, alignSelf: 'center', marginTop: 40 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Ionicons name='md-person' size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10 }} />
                            <TextInput value={username} onChangeText={value => setUsername(value)} placeholderTextColor={'gray'} placeholder={locale['login']} numberOfLines={1} style={{ width: w * 0.7, color: theme.labelColor }} />
                        </View>
                        <View style={{ alignSelf: 'center', width: w * 0.7, height: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="key" size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10 }} />
                            <TextInput value={password} onChangeText={value => setPassword(value)} placeholderTextColor={'gray'} placeholder={locale['password']} numberOfLines={1} secureTextEntry={true} style={{ width: w * 0.7, color: theme.labelColor }} />
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => {
                        tryToLogin();
                    }}>
                        <View style={styles.okay_button}>
                            <Text style={styles.okay_button_text}>{locale['sign_in']}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ width: w * 0.8, marginTop: 20, alignSelf: 'center', textAlign: 'center', color: 'gray' }}>{locale['sign_in_tip']}</Text>
                </View>
                {fetching && <ActivityIndicator color={'#006AB3'} size={'large'} />}
            </ScrollView>

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

    shadow: elevationShadowStyle(5),
    box: {
        backgroundColor: 'white',
        width: w,
        padding: 10,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
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
