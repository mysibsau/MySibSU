import React, { useEffect, useState } from 'react'
import { View, Text, Image, Linking, StyleSheet, Pressable, TouchableWithoutFeedback, Modal, TextInput, BackHandler, ScrollView, Platform } from 'react-native'
import Header from '../../../modules/Header'
import { BASE_URL, h, w } from '../../../modules/constants'
import { Entypo } from '@expo/vector-icons'; 
import {useTheme} from '../../../services/themes/ThemeManager'
import {useLocale} from '../../../services/locale/LocaleManager'
import AsyncStorage from '@react-native-community/async-storage'
import { useUser } from '../../../services/auth/AuthManager';
import { sendRequestApiCall } from '../../../services/api/creativity';
import { AntDesign } from '@expo/vector-icons';


const REGEXES = [
    {reg: /(\+7|8) ?[\( -]?\d{3}[\) -]? ?\d{3}[ -]?\d{2}[ -]?\d{2}/, type: 'phone'}, 
{reg: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, type: 'email'},
{reg: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, type: 'link'}]

export default function EnsembleScreen(props){
    const {user, isAuthorizated} = useUser();
    const [onVisible, setVisible] = useState(false)
    const [fio, setFio] = useState(user.FIO)
    const [phone, setPhone] = useState('')
    const [vk, setVk] = useState('')
    const [experience, setExperience] = useState('')
    const [comment, setComment] = useState('')

    const {theme} = useTheme()
    
    const {locale} = useLocale()
    const data = props.route.params.data

    async function sendMessage(){
        let req = {
            ensemble: data.id,
            fio: fio,
            phone: phone,
            link_on_vk: vk,
            experience: experience,
            comment: comment,
        }

       const response = await sendRequestApiCall(req)
       if (response) {
           setVisible(false)
       }
    }
    
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={data.short_name ? data.short_name : data.name} onPress={() => props.navigation.navigate('Art')}/>
            <ScrollView>

                <View style={{ borderBottomWidth: 2, borderColor: 'gray'}}>
                    <Image source={data.logo ? {uri: BASE_URL + data.logo} : require('../../../assets/back.png')}  style={{ width: w, height: w / 2, resizeMode: 'cover', backgroundColor: 'white'}}/>
                </View>

                <View>
                    <Text style={{ fontFamily: 'System', fontSize: 20, marginTop: data.photo ? w * 0.2 + 20 : 20, marginLeft: 20, color: '#5575A7',}}>{locale['description']}</Text>
                    <View style={[styles.box, styles.centerContent, styles.shadow2, {padding: 10, backgroundColor: theme.blockColor}]}>
                        <Text style={{fontFamily: 'System', fontSize: 15, color: '#5575A7', paddingLeft: 5}}>{data.about}</Text>
                    </View>
                </View>

                <View>
                <Text style={{ fontFamily: 'System', fontSize: 20, marginTop: data.photo ? w * 0.2 + 20 : 20, marginLeft: 20, color: '#5575A7',}}>{locale['contacts']}</Text>
                    <View style={[styles.box, styles.centerContent, styles.shadow2, {padding: 10, backgroundColor: theme.blockColor}]}>
                        {data.contacts.split('\n').map(item => {
                            let contact = {}
                            REGEXES.map(reg => {
                                if (item.match(reg.reg)){
                                    contact['type'] = reg.type
                                    contact['data'] = item
                                }
                            })

                            return(
                            <Text style={{fontFamily: 'System', fontSize: 15, color: '#5575A7', paddingLeft: 5, textDecorationLine: contact.type ? 'underline' : 'none'}} onPress={() => {
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
                </View>
                {data.vk_link &&
                <Pressable style={[styles.descriptionBox, {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, backgroundColor: theme.blockColor}]} onPress={() => Linking.openURL(data.vk_link)}>
                    <Entypo name="vk" size={30} color="rgb(115, 182, 28)" />
                    <Text style={{fontFamily: 'System', fontSize: 20, color: '#5575A7', paddingLeft: 10, textAlign: 'center'}}>{locale.group_vk}</Text>
                </Pressable>}
                {data.instagram_link &&
                <Pressable style={[styles.descriptionBox, {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, backgroundColor: theme.blockColor}]} onPress={() => Linking.openURL(data.instagram_link)}>
                    <AntDesign name="instagram" size={30} color={'rgb(115, 182, 28)'} />
                    <Text style={{fontFamily: 'System', fontSize: 20, color: '#5575A7', paddingLeft: 10, textAlign: 'center'}}>Instagram</Text>
                </Pressable>}

                <Pressable style={[styles.descriptionBox, {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, backgroundColor: theme.blockColor}]} onPress={() => setVisible(!onVisible)}>
                    <Entypo name="circle-with-plus" size={30} color="rgb(115, 182, 28)" />
                    <Text style={{fontFamily: 'System', fontSize: 20, color: '#5575A7', paddingLeft: 10, textAlign: 'center'}}>{locale.join}</Text>
                </Pressable>

                <View style={{flexDirection: 'column', paddingBottom: 180}}>
                    <Modal animationType="slide" visible={onVisible}>
                        <View style={[styles.modal, {backgroundColor: theme.primaryBackground}]}>
                        <View style={{width: w * 0.8, height: 45}}>
                            <TouchableWithoutFeedback onPress={() => setVisible(!onVisible)}>
                                <Text style={{color: '#006AB3', fontSize: 50, marginLeft: 6}}>˟</Text>
                            </TouchableWithoutFeedback>
                            </View>

                            <Text style={{fontFamily: 'System', color: theme.blueColor, fontSize: 24, marginBottom: 10}}>Заявка на вступление</Text>

                            {!isAuthorizated && <TextInput style={[styles.input, {color: theme.labelColor}]} placeholderTextColor={'gray'} onChangeText={text => setFio(text)} placeholder={'ФИО'} defaultValue={user.FIO}/>}
                            <TextInput style={[styles.input, {color: theme.labelColor}]} placeholderTextColor={'gray'} onChangeText={text => setPhone(text)} placeholder={'Телефон'} />
                            <TextInput style={[styles.input, {color: theme.labelColor}]} placeholderTextColor={'gray'} onChangeText={text => setVk(text)} placeholder={'ID в VK'} />
                            <TextInput style={[styles.input, {color: theme.labelColor}]} placeholderTextColor={'gray'} onChangeText={text => setExperience(text)} placeholder={'Ваш опыт'} multiline scrollEnabled={true}/>
                            <TextInput style={[styles.input, {color: theme.labelColor}]} placeholderTextColor={'gray'} onChangeText={text => setComment(text)} placeholder={'Комментарий к заявке'} multiline scrollEnabled={true} selectTextOnFocus={true}/>

                            <Pressable onPress={() => sendMessage()} style={{borderWidth: 1, borderColor: theme.blueColor, borderRadius: 4, paddingBottom: 3, paddingTop: 3, paddingLeft: 5, paddingRight: 5, marginBottom: 10}}>
                                <Text style={{fontFamily: 'System', color: theme.blueColor, fontSize: 15, textAlign: 'center'}}>ОТПРАВИТЬ</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
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

    container:{
        width: w,
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 1,
    },

    input: {
        width: w * 0.75,
        borderBottomWidth: 1,
        borderColor: '#5575A7',
        marginBottom: 15,
        fontFamily: 'System',
        fontSize: 18
    },

    buttonText: {
        width: w * 0.8,
        color: '#5575A7', 
        fontFamily: 'System', 
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10, 
    },

    shadow2: elevationShadowStyle(10),

    profile: {
        borderRadius: w * 0.2,
        backgroundColor: 'white',
        width: w * 0.4,
        height: w * 0.4,
        alignSelf: 'center',
        position: 'absolute',
        top: w / 2 - 75,
    },

    modal: {
        borderRadius: 30,
        padding: 10,
        width: w,
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
    },

    box: {
        borderRadius: 15,
        backgroundColor: 'white',
        minHeight: 55,
        width: w * 0.9,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
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