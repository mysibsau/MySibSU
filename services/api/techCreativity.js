import axios from "axios";

export const getTechCreativityApiCall = async () => {
    try {
        let infoResponse = (await axios.get('/v3/campus/faculties/technogalaxy_info/')).data
        let ensemblesList = (await axios.get('/v3/campus/faculties/')).data
        infoResponse['techList'] = ensemblesList
        return infoResponse
    } catch(err) {
        return false
    }
}

export const sendTechRequestApiCall = async (id, data) => {
    try {
        await axios.post(`/v3/campus/faculties/${id}/join/`, data)

        return true
    } catch(err) {
        console.log(err)
        return false
    }
}