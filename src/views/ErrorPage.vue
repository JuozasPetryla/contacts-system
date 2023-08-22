<template>
  <div class="w-screen flex justify-center mt-64">
    <h3 class="text-7xl font-medium" v-if="errorMessage">
      {{ errorMessage }}
    </h3>
    <h3 class="text-7xl font-medium" v-else>Puslapis nerastas</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["errorMessage"]),
  },
};
</script>

<style>
</style>