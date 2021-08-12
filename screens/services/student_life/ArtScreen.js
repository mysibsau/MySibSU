import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, BackHandler, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveElement from '../../../modules/ActiveElement'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useLocale} from '../../../locale/LocaleManager'
import { useTheme } from '../../../themes/ThemeManager'


export default function ArtScreen(props){
    const [ensembles, setEnsembles] = useState([])
    const [loaded, setLoaded] = useState(false)
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    useEffect(() => {
        fetch('https://mysibsau.ru/v2/campus/ensembles/', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setEnsembles(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [loaded])

    useEffect(() => {
        BackHandler.addEventListener(
          "hardwareBackPress", function(){
              props.navigation.goBack();
          }
        );
      }, []);

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['art']} onPress={() => props.navigation.goBack()}/>
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                {loaded ? 
                ensembles.map( item => {
                    return(<ActiveElement onPress={() => props.navigation.navigate('Ensemble', {data: item})} title={item.name} source={item.logo} key={item[0]} />)
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
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 10,
    },
})
