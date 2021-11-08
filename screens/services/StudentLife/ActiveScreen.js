import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, BackHandler, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveElement from '../../../modules/Services/StudentLife/StudentLifeListElement'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useLocale} from '../../../services/locale/LocaleManager'
import { useTheme } from '../../../services/themes/ThemeManager'


export default function ActiveScreen(props){
    const [unions, setUnions] = useState([])
    const [loaded, setLoaded] = useState(false)
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    useEffect(() => {
        fetch('https://mysibsau.ru/v2/campus/unions/?language=' + String(localeMode), {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setUnions(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])


    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['active']} onPress={() => props.navigation.goBack()}/>
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                {loaded ? 
                unions.map( item => {
                    return(<ActiveElement onPress={() => props.navigation.navigate('Ermak', {data: item})} title={item.name} source={item.logo} key={item[0]} />)
                }) : <View style={{height: h, justifyContent: 'center', paddingBottom: 120}}><ActivityIndicator size='large' color='#0060B3' /></View>}   
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
        
        marginTop: 10,
        marginLeft: 10,
    },
})
