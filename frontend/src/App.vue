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
};
</script>
