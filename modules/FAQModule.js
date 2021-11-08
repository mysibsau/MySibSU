import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {h, w} from './constants'
import {useTheme} from '../services/themes/ThemeManager'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Hyperlink from 'react-native-hyperlink'
import { watchFAQApiCall } from '../services/api/faq'
import { useLocale } from '../services/locale/LocaleManager'

const FAQModule = (data) => {
    const {theme} = useTheme()
    const [show, setShow] = useState(false)
    const {locale} = useLocale();

    const watchQuestion = async () => {
        await watchFAQApiCall(data.data.id)
    }

    return(
        <>
            <View style={[styles.container, {backgroundColor: theme.blockColor}]}>
                <TouchableWithoutFeedback onPress={() => {
                setShow(!show)
                if(!show) watchQuestion()
                }}>
                    <Text style={styles.question}>{data.data.question}<Text style={{color: 'gray'}}>{!data.data.answer && ` [${locale['in_processing']}]`}</Text></Text>
                </TouchableWithoutFeedback>
                {show ? 
                <Hyperlink linkStyle={ { color: theme.blueColor, fontSize: 16, } }
                linkDefault>
                    <Text style={[styles.answer, {color: theme.labelColor}]}>{data.data.answer}</Text>
                </Hyperlink> : null}
            </View>
        
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: w * 0.9, 
        padding: 10, 
        marginBottom: 7,
        marginTop: 5,
        borderRadius: 15, 
        elevation: 4, 
        alignSelf: 'center'
    },

    question: {
         
        fontSize: 18, 
        color: '#0060B3'
    },

    answer: {
         
        fontSize: 16, 
        marginTop: 10
    }
})

export default FAQModule