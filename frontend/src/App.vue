<template>
    <router-view />
</template>

<script>

import { mapActions } from 'vuex';

  export default {
      name: 'app',
      
      methods: {
        ...mapActions({
          initializeUser: "auth/initializeUser"
        })
      },

      created() {
        this.initializeUser();
      }
  }
</script>
