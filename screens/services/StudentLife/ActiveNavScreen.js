import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { w } from '../../../modules/constants';
import Header from '../../../modules/Header';
import { useTheme } from '../../../services/themes/ThemeManager';
import { useLocale } from '../../../services/locale/LocaleManager';


export default function TestScreen(props){
    const {theme, mode} = useTheme();
    const {locale} = useLocale()

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale.student_life} onPress={() => props.navigation.goBack()} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={[styles.block, {backgroundColor: theme.blockColor}]} onPress={() => props.navigation.navigate('Active')}>
                    <Text style={[styles.label, {color: theme.headerTitle}]}>{locale.active}</Text>
                    <View style={[styles.imageContainer, {backgroundColor: 'rgba(76, 174, 50, 0.6)'}]}>
                    <Image source={require('../../../assets/icons/active.png')} style={styles.image} tintColor={theme.blockColor}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.block, {backgroundColor: theme.blockColor}]} onPress={() => props.navigation.navigate('Sport')}>
                    <Text style={[styles.label, {color: theme.headerTitle}]}>{locale.sport}</Text>
                    <View style={[styles.imageContainer, {backgroundColor: 'rgba(0, 108, 181, 0.6)'}]}>
                    <Image source={require('../../../assets/icons/sport.png')} style={styles.image} tintColor={theme.blockColor}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.block, {backgroundColor: theme.blockColor}]} onPress={() => props.navigation.navigate('Tech')}>
                    <Text style={[styles.label, {color: theme.headerTitle}]}>{locale.tech}</Text>
                    <View style={[styles.imageContainer, {backgroundColor: '#FF7133'}]}>
                    <Image source={require('../../../assets/icons/tech.png')} style={styles.image} tintColor={theme.blockColor}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.block, {backgroundColor: theme.blockColor}]} onPress={() => props.navigation.navigate('Art')}>
                    <Text style={[styles.label, {color: theme.headerTitle}]}>{locale.art}</Text>
                    <View style={[styles.imageContainer, {backgroundColor: mode === 'light' ? 'rgba(0,0,0, 0.4)' : 'lightgray'}]}>
                    <Image source={require('../../../assets/icons/art.png')} style={styles.image} tintColor={theme.blockColor}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        width: w * 0.45, 
        height: w * 0.45, 
        borderRadius: 15, 
        elevation: 5, 
        marginTop: w * 0.03, 
        padding: 10
    },

    label: {
        fontFamily: 'roboto',
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: w / 15,
        height: w * 0.45 / 2,
        textAlignVertical: 'center'
    },

    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },

    imageContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 15,
        padding: 10,
    },
})