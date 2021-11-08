import React, { useState, useEffect} from 'react'
import { View, Text, ActivityIndicator, FlatList} from 'react-native'
import FeedModule from '../../modules/Feed/FeedModule'
import { useTheme } from '../../services/themes/ThemeManager'
import { useLocale } from '../../services/locale/LocaleManager'
import { getEventsApiCall } from '../../services/api/feed'


export default function EventsScreen(){
    const [eventList, setEventList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {theme} = useTheme()
    const {locale} = useLocale()

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async () => {
        const data = await getEventsApiCall();
        setEventList(data);
        setLoaded(true);
    }
    
    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 120}}>
                <ActivityIndicator color={theme.blueColor} size='large' />
            </View> :
            <>
            {eventList.length === 0 &&
                <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 20, color: theme.labelColor}}>{locale['empty']}</Text>}
            <FlatList 
                data={eventList}
                renderItem={({ item }) => <FeedModule data={item} type={'events'}/>}
                keyExtractor={item => item.text}
                contentContainerStyle={{paddingBottom: 120}}
                initialNumToRender={4}/>
            </>}
        </View>
    )
}
