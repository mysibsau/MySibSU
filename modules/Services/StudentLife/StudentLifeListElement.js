import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { w } from '../../constants';
import { useTheme } from '../../../services/themes/ThemeManager'


const StudentLifeListElement = ({onPress, title, source}) => {
    const {theme} = useTheme()
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.box, {backgroundColor: theme.blockColor}]}>
                {source ? 
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri:'https://mysibsau.ru' + source }}/>
                </View> : null}
                <Text style={styles.text} >{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        width: w * 0.9 - 80,
        fontSize: 14,
        color: '#006AB3',
        fontFamily: 'roboto',
        textAlign: 'left',
        marginLeft: w * 0.9 - (w * 0.9 - 80) - 60
    },

    box: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 0,
        height: 60,
        width: w * 0.9,
        marginTop: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        elevation: 10,
        alignItems: 'center',
    },

    imageContainer: { 
        height: 50, 
        width: 50, 
        borderRadius: 25, 
        marginLeft: 5,
    },

    image: { 
        height: 50, 
        width: 50, 
        borderRadius: 25,
        resizeMode: 'cover', 
        borderWidth: 1, 
        borderColor: 'gray', 
        backgroundColor: 'white'
    },
})

export default StudentLifeListElement