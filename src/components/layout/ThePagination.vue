<template>
  <div class="flex space-x-4 mt-2 justify-center">
    <button
      @click="goToPrevPage"
      class="bg-light-blue flex space-x-2 rounded-md items-center justify-start w-72 pl-2 h-9 shadow-md hover:bg-dark-blue"
    >
      <img src="../../assets/Double Left.svg" />
      <p class="text-white font-medium">PRAEITAS PUSLAPIS</p>
    </button>
    <button
      @click="goToNextPage"
      class="bg-light-blue flex space-x-2 rounded-md items-center justify-end w-72 pl-2 h-9 shadow-md hover:bg-dark-blue"
    >
      <p class="text-white font-medium">KITAS PUSLAPIS</p>
      <img src="../../assets/Double Right.svg" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["page"]),
  },
  methods: { ...mapActions(["goToNextPage", "goToPrevPage", "getContacts"]) },
  watch: {
    "$store.state.contacts.page": {
      deep: true,
      handler() {
        this.getContacts();
      },
    },
  },
};
</script>