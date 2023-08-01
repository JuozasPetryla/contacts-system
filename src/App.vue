<template>
  <div id="app">
    <TheHeader v-if="!login"></TheHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  data() {
    return {
      login: true,
    };
  },
  components: {
    TheHeader,
  },
};
</script>

<style>
</style>
