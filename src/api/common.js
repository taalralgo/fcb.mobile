import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;

const noParamGet = async (url) => {
    const config = {
        method: 'get',
        url: url,
    }
    return axios(config).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err)
        throw err.response
    });
}

const paramGet = async (url, params) => {
    const config = {
        method: 'get',
        url: url,
        params
    }
    return axios(config).then(response => {
        return response.data;
    }).catch(err => {
        throw err.response
    });
}

export { noParamGet, paramGet }