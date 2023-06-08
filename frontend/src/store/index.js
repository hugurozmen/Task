import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/module/user";
import WeatherService from "@/services/WeatherService";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        city: 'Ankara',
        weatherData: {},
        isLoading: false
    },
    getters: {
        getLoading(state) {
            return state.isLoading;
        },
        getCity(state) {
            return state.city;
        },
        getWeatherData(state) {
            return state.weatherData;
        }
    },
    mutations: {
        setCity(state, payload) {
            state.city = payload;
        },
        setWeatherData(state, payload) {
            state.weatherData = payload;
        }
    },
    actions: {
        setCity({commit}, payload) {
            commit('setCity', payload);
        },
        setWeatherData({commit}, payload) {
            this.state.isLoading = true;
            commit('setCity', payload)
            let resp = WeatherService.getWeatherData({city: this.state.city}).then((response) => {
                commit('setWeatherData', response.data);
                this.state.isLoading = false;
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    modules: {
        user
    }
})
