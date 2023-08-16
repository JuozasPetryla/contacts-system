<template>
  <div id="app">
    <TheHeader v-if="headerVisible"></TheHeader>
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
  computed: {
    headerVisible() {
      if (this.$router.currentRoute.path !== "/login") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>
