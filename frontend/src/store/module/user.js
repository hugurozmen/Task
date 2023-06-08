import AuthService from "@/services/AuthService";
import {TOKEN_TYPE} from "@/configs";

const state = {
    access: null,
    refresh: null,
    isAuthenticated: localStorage.getItem('access') ? true : false,
};

const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
};

const actions = {
    userLogin({commit}, payload) {
        return new Promise((resolve, reject) => {
            AuthService.login(payload)
                .then(({data}) => {
                    console.log(data)
                    commit('SET_TOKEN', data);
                    resolve(data);
                })
                .catch(error => reject(error));
        });
    },
    userLogout({commit}) {
        commit('LOGOUT');
    }
};

const mutations = {
    SET_TOKEN(state, payload) {
        state.access = payload?.access;
        state.refresh = payload?.refresh;
        state.isAuthenticated = true;
        localStorage.setItem('access', state.access);
        localStorage.setItem('refresh', state.refresh);
    },

    LOGOUT(state) {
        state.access = null;
        state.refresh = null;
        state.isAuthenticated = false;
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
