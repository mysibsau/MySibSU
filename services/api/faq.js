import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const FAQListApiCall = async () => {
    try {
        const token = JSON.parse(await AsyncStorage.getItem('User')).token
        const response = await axios.get('/v3/support/faq/', {headers: {
            Authorization: `Bearer ${token}`
        }})

        return response.data;
    } catch(err) {
        console.log(err)
        return [];
    }
}

export const AskQuestionApiCall = async (text, theme, isPublic) => {
    try {
        const token = JSON.parse(await AsyncStorage.getItem('User')).token
        await axios.post('/v3/support/faq/', {question: text, theme: theme, is_public: isPublic}, {headers: {
            Authorization: `Bearer ${token}`
        }})

        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}