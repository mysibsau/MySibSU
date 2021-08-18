import React from 'react'
import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import {useLocale} from '../../services/locale/LocaleManager'
import {useTheme} from '../../services/themes/ThemeManager'
import Header from '../../modules/Header'
import {h, w } from '../../modules/constants'
import { getAttestationApiCall } from '../../services/api/user'
import { useUser } from '../../services/auth/AuthManager'
import { FlatList } from 'react-native-gesture-handler'
import AttestationListElement from '../../modules/Profile/AttestationListElement'

export default function AttestationScreen(props){
    const [attestation, setAttestation] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const {authData} = useUser();

    const {theme} = useTheme()
    const {locale} = useLocale()

    React.useEffect(() => {
        getAttestation()
    }, [])

    const getAttestation = async () => {
        const data = await getAttestationApiCall(authData)
        setAttestation(data);
        setLoaded(true)
    }

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['attestation']} onPress={() => props.navigation.goBack()} />
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> :
            <FlatList 
                data={attestation}
                keyExtractor={item => item.name}
                renderItem={data => <AttestationListElement item={data.item} />}
                contentContainerStyle={{paddingBottom: 120}}
            />}
        </View>
    )

}