<template>
  <div class="w-screen h-screen bg-dark-blue grid place-items-center">
    <component :is="loginComponent"></component>
    <BaseIconButton
      @click="goBack"
      class="bg-white hover:bg-light-gray absolute top-10 left-10"
    >
      <img src="../assets/Curved Arrow.svg" />
    </BaseIconButton>
    <BaseInfoDialog>
      <template #header>Invalid email or password</template>
      <template #content
        >Please input check if your email and password are correct</template
      >
      <template #actions>
        <md-button class="md-primary pr-12" @click="closeInfoModal"
          >CLOSE</md-button
        >
      </template>
    </BaseInfoDialog>
  </div>
</template>

<script>
import LoginForgotPassword from "../components/login/LoginForgotPassword.vue";
import LoginAdmin from "../components/login/LoginAdmin.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    LoginAdmin,
    LoginForgotPassword,
  },
  methods: {
    ...mapActions(["closeInfoModal", "closeForgotPassword"]),
    goBack() {
      if (this.forgotPassword) {
        this.closeForgotPassword();
      } else {
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters(["forgotPassword"]),
    loginComponent() {
      if (this.forgotPassword) {
        return LoginForgotPassword;
      } else {
        return LoginAdmin;
      }
    },
  },
};
</script>

<style>
</style>