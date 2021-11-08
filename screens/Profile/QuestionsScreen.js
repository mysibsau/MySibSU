import React from 'react'
import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import {useLocale} from '../../services/locale/LocaleManager'
import {useTheme} from '../../services/themes/ThemeManager'
import Header from '../../modules/Header'
import QuestionModule from '../../modules/QuestionModule'
import { getUserQuestionsApiCall } from '../../services/api/user'
import { GroupBy } from '../../helpers/GroupByHelper'


export default function QuestionsScreen(props){
    const [loaded, setLoaded] = React.useState(false)
    const [questions, setQuestions] = React.useState({})

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    React.useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = async () => {
        const data = GroupBy(await getUserQuestionsApiCall(localeMode), 'theme');
        // console.log(data)
        setQuestions(data);
        setLoaded(true);
    }

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['myQuestions']} onPress={() => props.navigation.navigate('Profile')} />
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> :
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                {Object.keys(questions).map(topic => {
                    return(
                        <View>
                            <Text style={{marginLeft: '5%',  fontWeight: 'bold', color: theme.headerTitle, marginTop: 20}}>{topic}</Text>
                            {questions[topic].map(item => {
                                return(<QuestionModule data={{question: item.question, answer: item.answer}} />)
                            })}
                        </View>
                    )
                })}
            </ScrollView>}
        </View>
    )
}