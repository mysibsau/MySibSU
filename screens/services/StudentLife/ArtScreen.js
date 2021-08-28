import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, BackHandler, Image, Pressable, Linking } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveElement from '../../../modules/Services/StudentLife/StudentLifeListElement'
import AskHeader from '../../../modules/AskHeader'
import { BASE_URL, h, w } from '../../../modules/constants'
import {useLocale} from '../../../services/locale/LocaleManager'
import { useTheme } from '../../../services/themes/ThemeManager'
import { getCreativityApiCall } from '../../../services/api/creativity'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import AskModal from '../../../modules/AskModal'
import { AskQuestionApiCall } from '../../../services/api/faq'

const REGEXES = [
    {reg: /(\+7|8) ?[\( -]?\d{3}[\) -]? ?\d{3}[ -]?\d{2}[ -]?\d{2}/, type: 'phone'}, 
{reg: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, type: 'email'},
{reg: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, type: 'link'}]


export default function ArtScreen(props){
    const [info, setInfo] = useState({})
    const [loaded, setLoaded] = useState(false)
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const [visible, setVisible] = React.useState(false)

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        setInfo(await getCreativityApiCall());
        console.log(info)
        setLoaded(true)
    };

    const sendQuestion = async (text, isPublic) => {
        await AskQuestionApiCall(text, 'ktc', isPublic);
    }

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <AskHeader title={locale['art']} onPress={() => props.navigation.navigate('Navigator')} onQuestion={() => setVisible(true)}/>
            <AskModal visible={visible} onClose={() => setVisible(false)} onSend={(text, isPublic) => sendQuestion(text, isPublic)}/>
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                {loaded ? 
                <>
                <View style={{ borderBottomWidth: 2, borderColor: 'gray'}}>
                    <Image source={info.logo ? {uri: BASE_URL + info.logo} : require('../../../assets/back.png')}  style={{ width: w, height: w / 2, resizeMode: 'cover', backgroundColor: 'white'}}/>
                </View>


                <View style={[styles.descriptionBox, {backgroundColor: theme.blockColor}]}>
                    <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7', paddingLeft: 5, textAlign: 'center'}}>{info.name}</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: info.photo ? w * 0.2 + 20 : 20, marginLeft: 20, color: '#5575A7',}}>{locale['description']}</Text>
                    <View style={[styles.descriptionBox, {padding: 10, backgroundColor: theme.blockColor}]}>
                        <Text style={{fontFamily: 'roboto', fontSize: 15, color: '#5575A7', paddingLeft: 5}}>{info.about}</Text>
                    </View>
                </View>

                <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: info.photo ? w * 0.2 + 20 : 20, marginLeft: 20, color: '#5575A7',}}>{locale['contacts']}</Text>
                <View style={[styles.descriptionBox, {padding: 10, backgroundColor: theme.blockColor}]}>
                {info.contacts.split('\n').map(item => {
                            let contact = {}
                            REGEXES.map(reg => {
                                if (item.match(reg.reg)){
                                    contact['type'] = reg.type
                                    contact['data'] = item
                                }
                            })

                            return(
                            <Text style={{fontFamily: 'roboto', fontSize: 15, color: '#5575A7', paddingLeft: 5, textDecorationLine: contact.type ? 'underline' : 'none'}} onPress={() => {
                                if (contact.data){
                                    switch(contact.type){
                                        case 'phone':
                                            Linking.openURL(`tel:${contact.data}`)
                                            break
                                        case 'email':
                                            Linking.openURL(`mailto:${contact.data}`)
                                            break
                                        
                                        case 'link':
                                            Linking.openURL(contact.data)
                                            break
                                    }
                                }
                            }}>
                                {contact.data ? contact.data : item}
                            </Text>)
                        })}
                </View>
                {info.vk_link &&
                <Pressable style={[styles.descriptionBox, {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, backgroundColor: theme.blockColor}]} onPress={() => Linking.openURL(info.vk_link)}>
                    <Entypo name="vk" size={30} color="rgb(115, 182, 28)" />
                    <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7', paddingLeft: 10, textAlign: 'center'}}>{locale.group_vk}</Text>
                </Pressable>}
                {info.instagram_link &&
                <Pressable style={[styles.descriptionBox, {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, backgroundColor: theme.blockColor}]} onPress={() => Linking.openURL(info.instagram_link)}>
                    <AntDesign name="instagram" size={30} color={'rgb(115, 182, 28)'} />
                    <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7', paddingLeft: 10, textAlign: 'center'}}>Instagram</Text>
                </Pressable>}

                <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: info.photo ? w * 0.2 + 20 : 20, marginLeft: 20, color: '#5575A7',}}>{locale['teams']}</Text>
                {info.ensembles.map( item => {
                    return(<ActiveElement onPress={() => props.navigation.navigate('Ensemble', {data: item})} title={item.name} source={item.logo} key={item[0]} />)
                })}
                </> : <View style={{height: h, justifyContent: 'center', paddingBottom: 120}}><ActivityIndicator size='large' color='#0060B3' /></View>}   
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingBottom: 150, 
        width: w,
    },

    text: {
        fontSize: 25,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 10,
    },

    descriptionBox: {
        borderRadius: 15,
        backgroundColor: 'white',
        minHeight: 55,
        width: w * 0.9,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
})
