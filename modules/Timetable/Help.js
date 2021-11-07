import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { h, w} from '../constants'
import { useTheme } from '../../services/themes/ThemeManager'

const Help = ({group, onPress, onPlus}) => {
    const {theme} = useTheme()
    return(
        <>
        <TouchableOpacity onPress={onPress} style={{ height: 40, width: w * 0.9, justifyContent: 'space-between', flexDirection: 'row'}}>
            {/* <TouchableOpacity > */}
                <Text allowFontScaling={false} style={{ height: 40, textAlignVertical: 'center', fontFamily: 'System', fontSize: 18, backgroundColor: 'transparent', color: theme.labelColor, zIndex: 2, paddingLeft: 10, paddingTop: 4, paddingBottom: 4}}>{group.name}</Text>
            {/* </TouchableOpacity> */}
            <TouchableOpacity onPress={onPlus}>
                <Text style={{height: 40, textAlignVertical: 'center', color: '#006AB3', fontWeight: 'bold', width: 40, fontSize: 20}}>+</Text>
            </TouchableOpacity>   
        </TouchableOpacity>
        <View style={{ width: w * 0.9, height: 1, backgroundColor: 'gray', opacity: 0.5}} />
        </>
    )
}


export default Help