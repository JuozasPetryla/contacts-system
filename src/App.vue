<template>
  <div id="app">
    <component
      :is="header"
      v-if="$router.currentRoute.path !== '/login'"
    ></component>
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
    header() {
      if (localStorage.getItem("user")) {
        return TheHeaderNavigation;
      } else {
        return TheHeader;
      }
    },
  },
};
</script>

<style>
</style>
