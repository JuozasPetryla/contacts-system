<template>
  <div class="w-screen h-screen bg-dark-blue grid place-items-center">
    <LoginAdmin></LoginAdmin>
    <!-- <LoginForgotPassword></LoginForgotPassword> -->
    <BaseIconButton
      class="bg-white hover:bg-light-gray absolute top-10 left-10"
    >
      <img src="../assets/Curved Arrow.svg" />
    </BaseIconButton>
  </div>
</template>

<script>
import LoginForgotPassword from "../components/login/LoginForgotPassword.vue";
import LoginAdmin from "../components/login/LoginAdmin.vue";
export default {
  components: {
    LoginAdmin,
    LoginForgotPassword,
  },
};
</script>

<style>
</style>