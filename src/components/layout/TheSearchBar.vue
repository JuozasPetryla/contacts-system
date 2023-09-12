<template>
  <div
    class="bg-light-gray flex w-64 w-fit lg:w-96 md:w-72 space-x-4 p-3 rounded-sm hover:cursor-pointer"
  >
    <img src="../../assets/Search.svg" class="Magnifying glass icon" />
    <input
      type="search"
      placeholder="Ieškoti kontakto..."
      class="w-64 bg-inherit focus:outline-none"
      v-model="searchTerm"
      v-debounce:1000="onGetSearchTerm"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    onGetSearchTerm() {
      this.getSearchTerm(this.searchTerm);
    },

    ...mapActions(["getSearchTerm"]),
  },
  watch: {
    "$store.state.contacts.filter": {
      deep: true,
      handler(value) {
        if (value === "") {
          this.searchTerm = "";
        }
      },
    },
  },
};
</script>
