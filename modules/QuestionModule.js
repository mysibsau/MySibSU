import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {h, w} from './constants'
import {useTheme} from '../services/themes/ThemeManager'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Hyperlink from 'react-native-hyperlink'
import { useLocale } from '../services/locale/LocaleManager'

const QuestionModule = (data) => {
    const {theme} = useTheme()
    const [show, setShow] = useState(false)
    const {locale} = useLocale();

    return(
        <>
            <View style={[styles.container, {backgroundColor: theme.blockColor}]}>
                <TouchableWithoutFeedback onPress={() => {
                setShow(!show)
                }}>
                    <Text style={styles.question}>{data.data.question}<Text style={{color: 'gray'}}>{!data.data.answer && ` [${locale['in_processing']}]`}</Text></Text>
                </TouchableWithoutFeedback>
                {show ? 
                <Hyperlink linkStyle={ { color: theme.blueColor, fontSize: 16, } }
                linkDefault>
                    {data.data.answer ?<Text style={[styles.answer, {color: theme.labelColor}]}>{data.data.answer}</Text> : 
                    <Text style={[styles.answer, {color: theme.labelColor}]}>{locale['answer_is_in_processing']}</Text>}
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
        fontFamily: 'roboto', 
        fontSize: 18, 
        color: '#0060B3'
    },

    answer: {
        fontFamily: 'roboto', 
        fontSize: 16, 
        marginTop: 10
    }
})

export default QuestionModule