import React from 'react'
import { View , Text, Image, TextInput, ScrollView, StyleSheet, ToastAndroid, AsyncStorage, TouchableOpacity, ActivityIndicator} from 'react-native'
import {useTheme} from '../../services/themes/ThemeManager'
import {useLocale} from '../../services/locale/LocaleManager'
import { h, w } from '../../modules/constants'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useUser } from '../../services/auth/AuthManager'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'; 



export default function AuthScreen(props){
    const {theme} = useTheme()
    const {locale} = useLocale()
    const {login} = useUser()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fetching, setFetching] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(false)

    const prohibitUsing = () => {
        
    }

    const checkAgreement = () => {
        if (!isChecked) {
            ToastAndroid.show(
                locale['should_accept'],
                ToastAndroid.LONG,
              );
            return false
        }

        return true
    }

    const toAuth = async () => {
        if(checkAgreement()){
            setFetching(true)
            const response = await login(username, password);
            if (response){
                setUsername('');
                setPassword('');
                signIn();
            } else {
                ToastAndroid.show(
                    locale['wrong_login'],
                    ToastAndroid.LONG,
                );
                setFetching(false)
            }
        }  
    };

    const signIn = async () => {
        await AsyncStorage.setItem('agreement', 'true');
        props.navigation.navigate('Bottom')
    }

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground,}}>
            <ScrollView contentContainerStyle={{flex: 1, marginTop: 100}}>
                <View>
                    <Image source={require('../../assets/header_logo.png')} style={{height: 100, alignSelf: 'center', width: 100,}} />
                    <View style={{ width: w * 0.8, borderRadius: 15, elevation: 6, backgroundColor: theme.blockColor, alignSelf: 'center', marginTop: 40}}>
                        <View style={{flexDirection: 'row', }}>
                            <Ionicons name='md-person' size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10}}/>
                            <TextInput value={login} onChangeText={value => setUsername(value)} placeholderTextColor={'gray'} placeholder={locale['login']} numberOfLines={1} style={{ width: w * 0.7, fontFamily: 'roboto', color: theme.labelColor}}/>
                        </View>
                        <View  style={{alignSelf: 'center', width: w * 0.7, height: 1, backgroundColor: 'gray', opacity: 0.5}}/>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name="key" size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10}} />
                            <TextInput onSubmitEditing={() => toAuth()} value={password} onChangeText={value => setPassword(value)} placeholderTextColor={'gray'} placeholder={locale['password']} numberOfLines={1} secureTextEntry={true} style={{ width: w * 0.7, fontFamily: 'roboto', color: theme.labelColor}}/>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}  style={{flexDirection: 'row', marginLeft: w * 0.1, marginTop: 10, overflow: 'visible'}}>
                        <View style={{backgroundColor: 'white', width: 20, height: 20, borderRadius: 3, borderColor: theme.blueColor, borderWidth: 1, marginRight: 10}}>
                            {isChecked && <MaterialIcons name="done" size={18} color={theme.blueColor} />}
                        </View>
                        <Text>{locale['accept']}<Text>{locale['user_agreement']}</Text></Text>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => toAuth()}>
                        <View style={styles.okay_button}>
                            <Text style={styles.okay_button_text}>{locale['sign_in']}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => checkAgreement() && signIn()}>
                        <Text style={{ alignSelf: 'center', fontFamily: 'roboto', marginTop: 20, color: 'gray'}}>{locale['sign_in_as_guest']}</Text>
                    </TouchableOpacity>
                </View>
                {fetching && <ActivityIndicator color={'#006AB3'} size={'large'}/>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
        fontFamily: 'roboto',
        alignSelf: 'center',
        height: 40,
        textAlignVertical: 'center',
        fontSize: 20,
    }
})