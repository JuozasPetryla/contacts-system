<template>
  <div id="app">
    <component
      :is="header"
      v-if="$router.currentRoute.path !== '/login'"
    ></component>
    <router-view> </router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheHeader from "./components/layout/TheHeader.vue";
import TheHeaderNavigation from "./components/layout/TheHeaderNavigation.vue";

export default {
  components: {
    TheHeader,
    TheHeaderNavigation,
  },
  computed: {
    header() {
      if (localStorage.getItem("pocketbase_auth")) {
        return TheHeaderNavigation;
      } else {
        return TheHeader;
      }
    },
    ...mapGetters(["modalType", "modalOpen", "modalMode"]),
  },
  methods: {
    ...mapActions(["getCurrentUserPermissions", "currentUser"]),
  },
  created() {
    if (localStorage.getItem("pocketbase_auth")) {
      const auth = JSON.parse(localStorage.getItem("pocketbase_auth"));
      this.getCurrentUserPermissions(auth.model.permissions_id);
    } else {
      return;
    }
    let curVal = localStorage.getItem("pocketbase_auth").token;
    this.lastChange = new Date();
    this.timer = setInterval(() => {
      const newVal = localStorage.getItem("pocketbase_auth").token
        ? localStorage.getItem("pocketbase_auth").token
        : "";
      if (newVal !== curVal || (newVal && !curVal)) {
        curVal = newVal;
        this.lastChange = new Date();
      }
    }, 0);
  },
};
</script>

