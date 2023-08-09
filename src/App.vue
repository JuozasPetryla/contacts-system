<template>
  <div id="app">
    <TheHeader></TheHeader>
    <!-- <TheHeaderNavigation></TheHeaderNavigation> -->
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheHeaderNavigation from "./components/layout/TheHeaderNavigation.vue";

export default {
  components: {
    TheHeader,
    TheHeaderNavigation,
  },
};
</script>

<style>
</style>
