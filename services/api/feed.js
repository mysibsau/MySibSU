import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const getEventsApiCall = async () => {
    try {
        const uuid = await AsyncStorage.getItem('UUID')
        const response = await axios.get(`/v2/informing/all_events/?uuid=${uuid}`)
        return response.data;
    } catch (err) {
        console.log(err)
        return []
    }
}

export const getNewsApiCall = async () => {
    try {
        const uuid = await AsyncStorage.getItem('UUID')
        const response = await axios.get(`/v2/informing/all_news/?uuid=${uuid}`)
        return response.data;
    } catch (err) {
        console.log(err)
        return [];
    }
}

export const setViewApiCall = async (id) => {
    try {
        await axios.get(`/v2/informing/view/${id}`)
    } catch (err) {
        console.log(err)
        return [];
    }
}