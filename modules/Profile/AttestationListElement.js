import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useTheme } from '../../services/themes/ThemeManager';
import { w } from '../constants';

const AttestationListElement = ({item}) => {
    const {theme} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: theme.blockColor}]}>
            <Text style={[styles.header, {color: theme.blueColor, borderColor: theme.headerTitle}]}>{item.name} <Text style={{color: theme.headerTitle}}>({item.type})</Text></Text>
            <View style={styles.attestationBox}>
                <View style={styles.column}>
                    <Text style={styles.number}>I</Text>
                    <Text style={[styles.count, {color: theme.labelColor}]}>{item.att1}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.number}>II</Text>
                    <Text style={[styles.count, {color: theme.labelColor}]}>{item.att2}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.number}>III</Text>
                    <Text style={[styles.count, {color: theme.labelColor}]}>{item.att3}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: w * 0.9, 
        borderRadius: 15, 
        elevation: 5, 
        alignSelf: 'center', 
        marginTop: 15, 
        padding: 10
    },

    header: {
         
        fontSize: 15, 
        borderBottomWidth: 1,
    },

    attestationBox: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        marginTop: 3
    },

    column: {
        flexDirection: 'column', 
        width: w * 0.2, 
        alignItems: 'center'
    },

    number: {
        
        color: 'gray',
    },

    count: {
          
        marginTop: 3
    },
})

export default AttestationListElement