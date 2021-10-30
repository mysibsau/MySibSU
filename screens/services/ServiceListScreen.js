import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet, AsyncStorage } from 'react-native'
import MainHeader from '../../modules/MainHeader'
import ServiceElement from '../../modules/ServiceElement'
import { h, w } from '../../modules/constants'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from '../../services/themes/ThemeManager'
import { useLocale } from '../../services/locale/LocaleManager'


export default function ServiceListScreen(props){

    const [UUID, setUUID] = React.useState('')
    // const [token, setToken] = React.useState('')
    const {mode, theme} = useTheme()
    const {locale} = useLocale()
    const services = (locale) => {return [{name: locale['institutes'], path: 'Institutes', image: <View style={{ height: 55, width: 55, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 5, backgroundColor: mode === 'light' ? 'rgba(0,0,0, 0.4)' : 'lightgray'}}><FontAwesome5 name="university" size={40} color={theme.blockColor} /></View>}, 
                    {name: locale['student_life'], path: 'StudentLife', image: <View style={{ height: 55, width: 55, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 5, backgroundColor: 'rgba(76, 174, 50, 0.6)'}}><MaterialIcons name="people-outline" size={45} color={theme.blockColor} /></View>},
                    {name: locale['buildings'], path: 'Map', image: <View style={{ height: 55, width: 55, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 5, backgroundColor: 'rgba(0, 108, 181, 0.6)'}}><Entypo name="map" size={40} color={theme.blockColor} /></View>},
                    // {name: locale['online_catalog'], path: 'Shop', image: <AntDesign name="shoppingcart" style={{alignSelf: 'flex-end', marginBottom: -5, marginRight: -5, opacity: 0.6}} size={60} color="#ef8531" />},
                    // {name: locale['vacancies'], path: 'Vacancies', image: <View style={{ height: 55, width: 55, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 5, backgroundColor: 'rgba(0, 108, 181, 0.6)'}}><MaterialIcons name="engineering" size={40} color={theme.blockColor} /></View>},
                    {name: locale['library'], path: 'LibrarySearch', image: <View style={{ height: 55, width: 55, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 5, backgroundColor: 'rgba(76, 174, 50, 0.6)'}}><Ionicons name="library-outline" size={40} color={theme.blockColor} /></View>}] }



    React.useEffect(() => {
        AsyncStorage.getItem('UUID')
            .then(res => {
                setUUID(res)})
    }, [])

    return(
        <View style={styles.container}>
            <MainHeader title={locale['services']} onPress={() => props.navigation.goBack()}/>
                <View style={{ backgroundColor: theme.headerColor, height: '100%',  width: w, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {services(locale).map(item => {
                        return(<ServiceElement key={item.name} name={item.name} image={item.image} onPress={() => props.navigation.navigate(item.path, {uuid: UUID, id: 3})}/>)
                    })}
                </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: w,
    },
})
