import React, { useState } from 'react'
import { useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Modal, ToastAndroid} from 'react-native'
import Header from '../../modules/Header'
import {useTheme} from '../../services/themes/ThemeManager'
import {useLocale} from '../../services/locale/LocaleManager'
import FAQModule from '../../modules/FAQModule'
import AskHeader from '../../modules/AskHeader'
import {h, w} from '../../modules/constants'
import { FlatList } from 'react-native-gesture-handler'
import AskModal from '../../modules/AskModal'
import { AskQuestionApiCall, FAQListApiCall } from '../../services/api/faq'


export default function FAQScreen(props){

    const [questions, setQuestions] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ownQuestion, setOwnQuestion] = useState('')
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        getQuestions();
    }, [])
    
    const getQuestions = async () => {
        const data = await FAQListApiCall();
        setQuestions(data);
        setLoaded(true);
    }

    const sendQuestion = async (text, isPublic) => {
        await AskQuestionApiCall(text, 'general', isPublic);
    }

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <AskHeader title={'FAQ'} onPress={() => props.navigation.goBack()} onQuestion={() => setVisible(true)}/>
            <AskModal visible={visible} onClose={() => setVisible(false)} onSend={(text, isPublic) => sendQuestion(text,isPublic)}/>
            {loaded ? 
                <FlatList 
                    data={questions}
                    keyExtractor={item => item.id}
                    renderItem={data => <FAQModule data={data.item}/>}
                    contentContainerStyle={{paddingTop: 10, paddingBottom: 120}}
                />
                : 
                <View style={{flex: 1, justifyContent: 'center', }}>
                    <ActivityIndicator color={'#006AB3'} size={'large'}/>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%', 
    },

    ask: {
        width: w * 0.6, 
        padding: 10, 
        borderRadius: 15, 
        elevation: 4, 
        alignSelf: 'center', 
        marginBottom: 140, 
        alignItems: 'center'
    }

})