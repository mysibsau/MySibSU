import React from 'react'
import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import {useLocale} from '../../services/locale/LocaleManager'
import {useTheme} from '../../services/themes/ThemeManager'
import Header from '../../modules/Header'
import {h, w } from '../../modules/constants'
import FAQModule from '../../modules/FAQModule'
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
        const data = GroupBy(await getUserQuestionsApiCall(), 'theme');
        // console.log(data)
        setQuestions(data);
        setLoaded(true);
    }

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['myQuestions']} onPress={() => props.navigation.goBack()} />
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> :
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                {Object.keys(questions).map(theme => {
                    return(
                        <View>
                            <Text style={{marginLeft: '5%', fontFamily: 'roboto', fontWeight: 'bold', color: theme.labelColor, marginTop: 20}}>{theme}</Text>
                            {questions[theme].map(item => {
                                return(<FAQModule data={{question: item.question, answer: item.answer}} />)
                            })}
                        </View>
                    )
                })}
            </ScrollView>}
        </View>
    )
}