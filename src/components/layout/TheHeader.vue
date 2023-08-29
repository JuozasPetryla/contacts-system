<template>
  <header class="h-20 p-4 bg-dark-blue flex items-center justify-between">
    <img
      src="../../assets/TELTONIKA-LOGO-WHITE.svg"
      alt="Teltonika company logo"
      class="md-image h-12"
    />
    <div @click="redirect">
      <img
        src="../../assets/login-svgrepo-com.svg"
        class="h-9 w-9 fill-white hover:cursor-pointer hover:fill-gray-300"
      />
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push("/login");
    },
  },
};
</script>