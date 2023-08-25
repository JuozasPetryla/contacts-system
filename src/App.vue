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
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions(["getCurrentUserPermissions", "currentUser"]),
  },
  created() {
    if (this.currentUser !== {}) {
      const auth = JSON.parse(localStorage.getItem("pocketbase_auth"));
      this.getCurrentUserPermissions(auth.model.permissions_id);
    }
    let curVal = localStorage.getItem("user");
    this.lastChange = new Date();
    this.timer = setInterval(() => {
      const newVal = localStorage.getItem("user");
      if (newVal !== curVal || (newVal && !curVal)) {
        curVal = newVal;
        this.$router.go(0);
        this.lastChange = new Date();
      }
    }, 0);
  },
};
</script>

