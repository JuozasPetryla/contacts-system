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
      <li>
        <router-link class="link" to="/employee-manage">Kontaktai</router-link>
      </li>
      <li>
        <router-link class="link" to="/company-manage">Kompanijos</router-link>
      </li>
      <li>
        <router-link class="link" to="/structure-manage">Struktūra</router-link>
      </li>
      <li>
        <router-link class="link" to="/office-manage">Ofisai</router-link>
      </li>
      <li>
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
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"]),
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
</style>