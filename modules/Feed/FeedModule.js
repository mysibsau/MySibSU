import React, { useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Linking} from 'react-native'
import {useLocale} from '../../services/locale/LocaleManager'
import {useTheme} from '../../services/themes/ThemeManager'
import RegExpHelper from '../../helpers/RexExpHelper'
import { BASE_URL, w } from '../constants'
import Hyperlink from 'react-native-hyperlink'
import { setViewApiCall } from '../../services/api/feed'

const FeedModule = ({data, type}) => {
    const [mode, setMode] = useState(false)
    const {theme} = useTheme()
    const {locale} = useLocale()
    const regExpHelper = new RegExpHelper(data.text)

    const setView = async () => {
        await setViewApiCall(data.id);
    }
    
    let coef = 1
    if (type === 'news'){
        if (data.images.length)
        coef = data.images[0].height/data.images[0].width
    } else {
        coef = data.logo.height/data.logo.width
    }
    
    return(
            <View style={[styles.box, {backgroundColor: theme.blockColor}]}>
                {type === 'news' ? 
                <> 
                    {data.images.length !== 0 && 
                    <Image style={[styles.image, {height: w * 0.9 * coef}]}
                        source={{ uri: BASE_URL + data.images[0].url }} 
                    />}
                </> : 
                    <Image style={[styles.image, {height: w * 0.9 * coef}]}
                    source={{ uri: BASE_URL + data.logo.url }} />
                }
                <View> 
                        {String(regExpHelper.text).length >= 100 && mode === false ? 
                        <View>
                            <Hyperlink linkStyle={{ color: theme.blueColor, fontSize: 16 }}
                            linkText={ url => regExpHelper.setLink(url)}>
                                <Text numberOfLines={3} style={{width: w * 0.85, color: theme.labelColor, padding: 5, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16}}>{regExpHelper.text}</Text>
                            </Hyperlink>
                            <TouchableWithoutFeedback onPress={() => {
                                setView();
                                setMode(!mode)
                            }}>
                                <Text style={styles.tip}>{locale['read_more']}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        : 
                        <View>
                            <Hyperlink linkStyle={ { color: theme.blueColor, fontSize: 16, } }
                            onPress={(url, text) => Linking.openURL(url)}
                            linkText={url => regExpHelper.setLink(url)}
                            >
                                <Text style={{width: w * 0.85, padding: 5, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: theme.labelColor}}>{regExpHelper.text}</Text>
                            </Hyperlink>
                                {String(regExpHelper.text).length >= 100 &&
                                <TouchableWithoutFeedback onPress={() => setMode(!mode)}>
                                    <Text style={styles.tip}>{locale['hide']}</Text>
                                </TouchableWithoutFeedback>}
                        </View>
                        }
                </View>
            </View>
    )
}
const styles = StyleSheet.create({
    box: {
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.9, 
        flexDirection: 'column',
        paddingBottom: 10,
        alignSelf: 'center',
        marginTop: 20,
        elevation: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },

    image: {
        width: w * 0.9, 
        resizeMode: 'contain', 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15
    },

    text: {

    },

    tip: { 
        fontFamily: 'roboto', 
        fontSize: 16, 
        color: 'gray', 
        marginLeft: 15
    }
})

export default FeedModule