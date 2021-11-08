import React from 'react'
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {useLocale} from '../../services/locale/LocaleManager'
import {useTheme} from '../../services/themes/ThemeManager'
import { useUser } from '../../services/auth/AuthManager'
import Header from '../../modules/Header'
import { w } from '../../modules/constants'
import { getMarksApiCall } from '../../services/api/user'


export default function MarksScreen(props){
    const [marks, setMarks] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)

    const {theme} = useTheme()
    const {locale} = useLocale()
    const {authData} = useUser();

    React.useEffect(() => {
        getMarks();
    }, [])

    const getMarks = async () => {
        const data = await getMarksApiCall(authData)
        setMarks(data);
        setLoaded(true);
    }

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['marks']} onPress={() => props.navigation.navigate('Profile')} />
            {!loaded ? 
            <View style={{flex: 1, paddingBottom: 100, justifyContent: 'center'}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> : 
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                {marks.map(item => {
                    return(
                        <View key={item.term}>
                            <Text style={{  fontSize: 18, color: '#006AB3', marginBottom: 5, marginTop: 15, paddingLeft: w * 0.05}}>{item.term} {locale['term']}</Text>
                            <View style={{ width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, elevation: 5, alignSelf: 'center', paddingTop: 10, paddingBottom: 10}}>
                            {item.items.map(subject => {
                                return(
                                <>
                                <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                                    <Text style={{width: w * 0.7, paddingLeft: 10,  color: theme.labelColor}}>{subject.name} <Text style={{color: 'gray'}}>({subject.type})</Text></Text>
                                    <Text style={{width: w * 0.2, textAlign: 'center', textAlignVertical: 'center',  color: theme.labelColor}}>{subject.mark}</Text>
                                </View>
                                {item.items.indexOf(subject) !== item.items.length - 1 ? 
                                <View style={{width: w * 0.9, height: 1, backgroundColor: 'gray', opacity: 0.5, alignSelf: 'center'}}/> : null}
                                </>
                            )})}
                            </View>
                        </View>
                    )
                })}
            </ScrollView>}
        </View>
    )

}