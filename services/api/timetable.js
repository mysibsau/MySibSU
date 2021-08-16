import axios from 'axios'


export const CurrentWeekApiCall = async () => {
    try {
        const response = await axios.get('/CurrentWeek/')
        return response.data.week;
    } catch (err) {
        console.log(err);
        return 0;
    }
}