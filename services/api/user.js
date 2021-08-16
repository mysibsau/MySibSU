import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const getUserQuestionsApiCall = async () => {
    try {
        const token = JSON.parse(await AsyncStorage.getItem('User')).token
        const response = await axios.get(`/v3/support/faq/my/`, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data;
    } catch(err) {
        console.log(err);
        return [];
    }
};

export const signInApiCall = async (login, password) => {
    try {
        const response = await axios.post('/v2/user/auth/', {username: login, password: password});
        return response.data;
    } catch (err) {
        return false;
    }
};

export const getAttestationApiCall = async (authData) => {
    console.log(authData)
    try {
        const response = await axios.post('/v2/user/attestation/', authData)
        
        return response.data;
    } catch(err) {
        console.log(err)
        return []
    }
}