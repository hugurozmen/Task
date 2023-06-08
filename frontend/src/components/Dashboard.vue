<template>
  <div>
    <nav-bar></nav-bar>
    <v-container style="background-color: aliceblue">
      <v-row>
        <v-col cols="12">
          <v-card min-height="43rem">
            <v-card-title>
              <h1>{{ selectedCity }} İçin Hava Durumu</h1>
            </v-card-title>
            <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"
                grow
            >
              <v-tab
                  v-for="item in types"
                  :key="item"
              >
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">

              <forecast-table v-if="weatherData && tab === 0"
                              :forecast="weatherData?.three_days?.data?.weather"></forecast-table>
              <forecast-table v-if="weatherData && tab === 1"
                              :forecast="weatherData?.five_days?.data?.weather"></forecast-table>
            </v-tabs-items>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import store from "@/store";
import ForecastTable from "@/components/ForecastTable.vue";

export default {
  name: "Dashboard",
  data: () => ({
    tab: null,
    types: ['3 Günlük', '5 Günlük'],
  }),
  components: {ForecastTable, NavBar},
  computed: {
    weatherData() {
      return store.getters.getWeatherData.data
    },
    selectedCity() {
      return store.getters.getCity
    }
  },
  created() {
    store.dispatch('setWeatherData', 'Ankara')
  },
}
</script>

<style scoped>

</style>
