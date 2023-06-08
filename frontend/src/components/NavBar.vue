<template>
  <v-card>
    <v-app-bar
        dark
        src="https://images.theconversation.com/files/442675/original/file-20220126-17-1i0g402.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
    >
      <template v-slot:img="{ props }">
        <v-img
            gradient="to top right, rgba(19,84,122,.5), rgba(139, 132, 186, .7)"
            v-bind="props"
        ></v-img>
      </template>
      <v-app-bar-nav-icon>
        <v-img
            max-height="40"
            max-width="40"
            src="@/assets/weather-app.png"
        ></v-img>
      </v-app-bar-nav-icon>
      <v-app-bar-title>Hava Durumu</v-app-bar-title>
      <v-spacer></v-spacer>
      <div class="mr-4 text--black">
        <city-auto-complete @cityChange="cityChange"></city-auto-complete>
      </div>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>

    </v-app-bar>


  </v-card>

</template>

<script>
import CityAutoComplete from "@/components/CityAutoComplete.vue";
import store from "@/store";

export default {
  name: "Navbar",
  components: {CityAutoComplete},
  methods: {
    cityChange(city) {
      store.dispatch('setWeatherData', city)
    },
    logout() {
      store.dispatch('userLogout')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>

</style>
