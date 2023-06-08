<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="forecast"
        :items-per-page="5"
        :loading="getLoading"
        class="elevation-1"
        loading-text="Loading... Please wait"
    >
      <template #item.operations="{ item }">
        <v-btn color="primary" text @click="goDetail(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <forecast-detail ref="detail" :detailedForecast="detail"></forecast-detail>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ForecastTable",
  data() {
    return {
      detail: [],
      headers: [
        {
          text: 'Tarih',
          align: 'start',
          value: 'date',
        },
        {text: 'Ortalama Sıcaklık', value: 'avgtempC'},
        {text: 'En Düşük Sıcaklık', value: 'mintempC'},
        {text: 'En Yüksek Sıcaklık', value: 'maxtempC'},
        {text: 'Gündüz Süresi', value: 'sunHour'},
        {text: '', value: 'operations'},
      ],
    }
  },
  props: {
    forecast: {
      type: Array,
      required: true
    }
  },
  methods: {
    goDetail(item) {
      this.forecast.find((data) => {
        if (data.date === item.date) {
          this.detail = data.hourly
          this.$refs.detail.dialog = true
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    weatherData() {
      return this.$store.getters.getWeatherData.data
    },
  },
  components: {
    'forecast-detail': () => import('@/components/ForecastDetail.vue')
  }
}
</script>

<style scoped>

</style>
