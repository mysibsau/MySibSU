import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet, Linking } from 'react-native'
import { useTheme } from '../../../services/themes/ThemeManager'
import { useLocale } from '../../../services/locale/LocaleManager' 
import { w } from '../../constants'

const Cafedra = (props) => {
    const {theme} = useTheme()
    const {locale} = useLocale()
    const [show, setShow] = useState(false)

    return(
        <TouchableWithoutFeedback onPress={() => setShow(!show)}>
            <View style={[styles.box, {backgroundColor: theme.blockColor}]}>  
                    <Text style={styles.view}>{props.name}</Text>
                {show && 
                    <View style={{ borderLeftWidth: 2, borderLeftColor: '#006AB3', paddingLeft: 10, marginLeft: 10 }}>
                        <Text style={styles.text}>{locale['head']}: {props.fio}</Text>
                        <Text style={styles.text}>{locale['address']}: {props.address}</Text>
                        <Text style={styles.text}>{locale['phone']}: <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL(`tel:${props.phone}`)}>{props.phone}</Text></Text>
                        <Text style={styles.text}>{locale['email']}: <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL(`mailto:${props.email}`)}>{props.email}</Text></Text>
                    </View>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    view: { 
        textAlignVertical: 'center',
        color: '#006AB3', 
        fontFamily: 'roboto', 
        fontSize: 14, 
        flexWrap:'wrap', 
        marginLeft: 10,
        minHeight: 50,
    },

    text: {
        height: 'auto', 
        color: '#006AB3', 
        fontFamily: 'roboto', 
        fontSize: 14, 
        flexWrap:'wrap',
    },

    box: {
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.9, 
        marginTop: 10,
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 19,
        paddingLeft: 15,
        alignSelf: 'center',
        minHeight: 50,
        elevation: 5,
    },
})

export default Cafedra