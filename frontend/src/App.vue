<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  // created() {
  //   console.log(this.isAuthenticated)
  //   if (this.isAuthenticated) {
  //     this.$router.push({name: 'Dashboard'})
  //   } else {
  //     this.$router.push({name: 'Login'})
  //   }
  // }
};
</script>
