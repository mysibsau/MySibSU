import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useLocale } from '../../services/locale/LocaleManager'
import { useTheme } from '../../services/themes/ThemeManager'
import FeedModule from '../../modules/Feed/FeedModule'
import { getNewsApiCall } from '../../services/api/feed'

export default function NewsScreen() {
    const [newsList, setNewsList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const { theme } = useTheme()
    const { locale } = useLocale()

    useEffect(() => {
        getNews();
    }, [])

    const getNews = async () => {
        const data = await getNewsApiCall();
        setNewsList(data)
        setLoaded(true);
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
            {!loaded ?
                <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 120 }}>
                    <ActivityIndicator color={theme.blueColor} size='large' />
                </View> :
                <>
                    {newsList.length === 0 &&
                        <Text style={{  fontSize: 18, alignSelf: 'center', marginTop: 20, color: theme.labelColor }}>{locale['empty']}</Text>}
                    <FlatList
                        data={newsList}
                        renderItem={({ item }) => <FeedModule data={item} type={'news'} />}
                        keyExtractor={item => item.text}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        initialNumToRender={4} />
                </>}
        </View>
    )
}
