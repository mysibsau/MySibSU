// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const getCreativityApiCall = async () => {
    try {
        // const token = JSON.parse(await AsyncStorage.getItem('User')).token;
        let infoResponse = (await axios.get('/v2/campus/ensembles/ktc_info/')).data
        let ensemblesList = (await axios.get('/v2/campus/ensembles/')).data
        infoResponse['ensembles'] = ensemblesList
        return infoResponse
    } catch(err) {
        return false
    }
}

export const sendRequestApiCall = async (data) => {
    console.log(data)
    try {
        const token = JSON.parse(await AsyncStorage.getItem('User')).token
        await axios.post('/v2/campus/ensembles/join/', data, {headers: {Authorization: `Bearer ${token}`}})

        return true
    } catch(err) {
        console.log(err)
        return false
    }
}