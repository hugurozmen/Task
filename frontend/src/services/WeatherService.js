import $axios from '@/plugins/axios';
import {API_URL} from '@/configs';

function format_query_params(params = {}) {
    let query = "";
    if (params) {
        Object.keys(params).forEach((key) => {
            if (params[key] === undefined || params[key] === null) {
                delete params[key];
            }
        });
        Object.keys(params).forEach((q, index) => {
            query += (index > 0 ? "&" : "") + q + "=" + params[q];
        });
    }
    return query;
}

export default {
    getWeatherData(payload) {
        let query = format_query_params(payload)
        return $axios.get(`${API_URL}weather/forecast/?${query}`);
    }
}


