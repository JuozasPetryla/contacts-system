<template>
  <header class="h-20 p-4 bg-dark-blue flex items-center justify-between">
    <img
      src="../../assets/TELTONIKA-LOGO-WHITE.svg"
      alt="Teltonika company logo"
      class="md-image h-12"
    />
    <ul
      class="flex items-center text-lg text-white font-medium space-x-36 pl-8"
    >
      <li
        v-if="
          currentUserPermissions.edit_employees ||
          currentUserPermissions.delete_employees
        "
      >
        <router-link class="link" to="/">Kontaktai</router-link>
      </li>
      <li
        v-if="
          currentUserPermissions.edit_companies ||
          currentUserPermissions.delete_companies
        "
      >
        <router-link class="link" to="/company-manage">Kompanijos</router-link>
      </li>
      <li
        v-if="
          currentUserPermissions.edit_structure ||
          currentUserPermissions.delete_structure
        "
      >
        <router-link class="link" to="/structure-manage/divisions"
          >Struktūra</router-link
        >
      </li>
      <li
        v-if="
          currentUserPermissions.edit_offices ||
          currentUserPermissions.delete_offices
        "
      >
        <router-link class="link" to="/office-manage">Ofisai</router-link>
      </li>
      <li v-if="currentUserPermissions.id === adminPermissions">
        <router-link class="link" to="/admin-accounts">Paskyros</router-link>
      </li>
    </ul>
    <md-menu md-direction="bottom-start" md-size="medium">
      <BaseIconButton
        md-menu-trigger
        class="bg-[#1F3F77] hover:bg-[#1F3F77] shadow-none"
      >
        <img src="../../assets/Male User.svg" />
      </BaseIconButton>
      <md-menu-content class="mt-16">
        <md-menu-item class="hover:bg-light-gray cursor-pointer"
          ><p>Pakeisti slaptažodį</p>
          <img src="../../assets/Vector.svg" class="pl-2" />
        </md-menu-item>
        <md-menu-item @click="logout" class="hover:bg-light-gray cursor-pointer"
          ><p>Atsijungti</p></md-menu-item
        >
      </md-menu-content>
    </md-menu>
  </header>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      componentKey: 0,
      adminPermissions: "4y2zp4n8ehzyzi0",
    };
  },
  methods: {
    ...mapActions(["logout"]),
  },
  computed: {
    ...mapGetters(["currentUserPermissions"]),
  },
};
</script>
  
<style scoped>
.link {
  color: white !important;
}

.link:hover {
  text-decoration: none;
  color: #adadad !important;
}

.router-link-exact-active {
  color: #adadad !important;
}
</style>

