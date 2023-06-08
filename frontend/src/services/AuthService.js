import $axios from '@/plugins/axios';
import {API_URL} from '@/configs';

export default {
    login(payload) {
        return $axios.post(API_URL + 'auth/', payload);
    },
    userSignUp(payload) {
        return $axios.post(API_URL + 'user/register/', payload);
    }
}


