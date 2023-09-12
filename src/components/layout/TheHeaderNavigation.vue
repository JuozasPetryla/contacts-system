<template>
  <header
    class="h-20 p-4 bg-dark-blue flex items-center justify-between relative"
  >
    <img
      src="../../assets/TELTONIKA-LOGO-WHITE.svg"
      alt="Teltonika company logo"
      class="md-image h-12"
    />
    <div @click="setMobileNavVisible">
      <img
        v-if="mobile"
        src="../../assets/icons8-menu.svg"
        class="md-image h-10"
      />
    </div>
    <ul
      class="flex items-center text-lg text-white font-medium space-x-16 xl:space-x-24 2xl:space-x-36 pl-8"
      v-if="mobileNavVisible || !mobile"
      :class="{ mobile: mobile }"
    >
      <li @click="closeMobileNav" class="remove-margin">
        <router-link class="link" to="/">Kontaktai</router-link>
      </li>
      <li
        @click="closeMobileNav"
        class="remove-margin"
        v-if="
          currentUserPermissions.edit_companies ||
          currentUserPermissions.delete_companies
        "
      >
        <router-link class="link" to="/company-manage">Kompanijos</router-link>
      </li>
      <li
        @click="closeMobileNav"
        class="remove-margin"
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
        @click="closeMobileNav"
        class="remove-margin"
        v-if="
          currentUserPermissions.edit_offices ||
          currentUserPermissions.delete_offices
        "
      >
        <router-link class="link" to="/office-manage">Ofisai</router-link>
      </li>
      <li
        class="remove-margin"
        @click="closeMobileNav"
        v-if="currentUserPermissions.id === adminPermissions"
      >
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
        <md-menu-item
          @click="
            getModalType('pass');
            getModalMode('pass');
            openModal();
          "
          class="hover:bg-light-gray cursor-pointer"
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
      adminPermissions: "xnlm3734nii55tm",
      mobile: false,
      mobileNavVisible: false,
    };
  },
  methods: {
    setMobile() {
      this.mobile = window.innerWidth < 1024;
    },
    setMobileNavVisible() {
      this.mobileNavVisible = !this.mobileNavVisible;
    },
    closeMobileNav() {
      this.mobileNavVisible = false;
    },
    ...mapActions(["logout", "openModal", "getModalType", "getModalMode"]),
  },
  computed: {
    ...mapGetters(["currentUserPermissions"]),
  },
  created() {
    if (window.innerWidth < 1024) {
      this.mobile = true;
    }
    window.addEventListener("resize", this.setMobile);
  },
};
</script>

<style scoped>
.link {
  color: white !important;
  margin: 0;
}

.link:hover {
  text-decoration: none;
  color: #adadad !important;
}

.router-link-exact-active {
  color: #adadad !important;
}

.mobile {
  position: absolute;
  top: 100%;
  background: #1f3f77;
  display: flex;
  flex-direction: column;
  width: 11rem;
  padding: 0;
  margin: 0 auto;
  gap: 2rem;
  padding-bottom: 2rem;
  left: 51.5%;
}

@media (max-width: 1024px) {
  .remove-margin {
    margin: 0 !important;
  }
}
</style>
