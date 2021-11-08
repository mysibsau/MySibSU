import React from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { h, w } from '../modules/constants';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useLocale } from '../services/locale/LocaleManager';
import { useTheme } from '../services/themes/ThemeManager';

const AskModal = ({visible, onClose, onSend}) => {
    const {theme, mode} = useTheme();
    const {locale} = useLocale();
    const [text, setText] = React.useState('');
    const [isPublic, setIsPublic] = React.useState(false)

    return(
    <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={[styles.modal, {backgroundColor: theme.blockColor}]}>
            <View style={styles.cancel}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={{color: '#006AB3', fontSize: 50, marginLeft: 6}}>˟</Text>
                </TouchableOpacity>
            </View>
            <TextInput 
                placeholderTextColor={'black'} 
                onChangeText={text => setText(text)}
                onSubmitEditing={() => onSend(text, isPublic)}
                placeholder={locale['input_question']} 
                multiline 
                numberOfLines={5} 
                style={[styles.input, {color: 'black', backgroundColor: "#ddd"}]} 
                scrollEnabled={true}/>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity onPress={() => setIsPublic(!isPublic)} style={{width: 20, height: 20, borderRadius: 5, borderColor: theme.blueColor, borderWidth: 1, marginRight: 10, marginLeft: 10}}>
                    {isPublic && <MaterialIcons name="done" size={18} color={theme.blueColor} />}
                </TouchableOpacity>
                <Text style={{ color: theme.headerTitle}}>{locale['make_the_question_public']}</Text>
            </View>
            <TouchableOpacity style={[styles.send_button, {backgroundColor: theme.blockColor}]} onPress={() => {
                if (text.length) {
                    onSend(text,isPublic);
                    onClose();
                } else {

                }
            }}>
                <Text style={styles.send_text}>{locale['send']}</Text>
            </TouchableOpacity>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        borderRadius: 30, 
        // borderWidth: 1, 
        // borderColor: '#0060B3', 
        borderRadius: 15, 
        elevation: 5, 
        // marginTop: 100, 
        padding: 10, 
        width: w, 
        height: h,
        alignSelf: 'center', 
        // justifyContent: 'center', 
        marginBottom: 20,
    },

    cancel: {
        width: w * 0.8, 
        height: 45
    },

    input: {
        textAlignVertical: 'top', 
        backgroundColor: '#eee',
        // borderWidth: 1, 
        // borderColor: '#0060B3', 
        borderRadius: 15, 
        padding: 10
    },

    send_button: {
        width: w * 0.4, 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#006AB3', 
        borderRadius: 15, 
        padding: 10, 
        margin: 10, 
        alignSelf: 'center',
    },

    send_text: {
         
        color: '#006AB3', 
        fontSize: 15
    },
})

export default AskModal