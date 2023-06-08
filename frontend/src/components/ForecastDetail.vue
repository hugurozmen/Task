<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <VDivider></VDivider>
      <v-card-text class="my-4">
        <v-data-table
            :headers="headers"
            :items="detailedForecast"
            :items-per-page="8"
            class="elevation-1"
        >
          <template #item.time="{ item }">
            <span>{{ hours[item?.time] }}</span>
          </template>
          <template #item.weatherIconUrl="{ item }">
            <img :src="item?.weatherIconUrl[0].value" alt="">
          </template>
        </v-data-table>
      </v-card-text>
      <VDivider></VDivider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Kapat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ForecastDetail",
  data() {
    return {
      dialog: false,
      title: 'Saatlik Detaylı Hava Durumu',
      hours: {
        0: '00:00',
        300: '03:00',
        600: '06:00',
        900: '09:00',
        1200: '12:00',
        1500: '15:00',
        1800: '18:00',
        2100: '21:00',
      },
      headers: [
        {
          text: 'Saat',
          align: 'start',
          value: 'time',
        },
        {text: 'Hava Durumu', value: 'weatherIconUrl'},
        {text: 'Sıcaklık', value: 'tempC'},
        {text: 'Hissedilen Sıcaklık', value: 'FeelsLikeC'},
        {text: 'Nem', value: 'humidity'},
        {text: 'Rüzgar(KM/S)', value: 'windspeedKmph'},
        {text: 'Yağmur Şansı', value: 'chanceofrain'},
        {text: 'Bulutluluk Oranı', value: 'cloudcover'},
      ]
    }
  },
  props: {
    detailedForecast: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
