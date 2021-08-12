import React from 'react'
import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import {useLocale} from '../../services/locale/LocaleManager'
import {useTheme} from '../../services/themes/ThemeManager'
import Header from '../../modules/Header'
import {h, w } from '../../modules/constants'
import FAQModule from '../../modules/FAQModule'


export default function QuestionsScreen(props){
    // const [attestation, setAttestation] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    // React.useEffect(() => {
    //     fetch('https://mysibsau.ru/v2/user/attestation/', {
    //         method: 'POST',
    //         body: JSON.stringify(props.route.params.data)})
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log(json)
    //             setAttestation(json)
    //             setLoaded(true)
    //         })
    // }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['myQuestions']} onPress={() => props.navigation.goBack()} />
            {/* {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> : */}
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                <FAQModule data={{question: 'А как получать стипендию?', answer: 'А никак, иди работай'}} />
                <FAQModule data={{question: 'А как вступить в творческий коллектив? Мне так нравится танцевать, я без этого жить не могу', answer: 'А никак, иди работай'}} />
                <FAQModule data={{question: 'А как перевестись в лучшую на свете группу БПИ18-01?', answer: 'А никак, иди работай'}} />
            </ScrollView>
        </View>
    )

}