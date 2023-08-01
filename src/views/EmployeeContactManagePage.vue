<template>
  <div class="px-12 my-8 w-full grid overflow-x-hidden h-fit">
    <h3 class="text-5xl font-light mb-10 px-2">Kontaktų sistema</h3>
    <div class="flex space-x-6">
      <TheSearchBar class="mb-4 mx-2"></TheSearchBar>
      <BaseIconButton class="h-12 w-16">
        <img src="../assets/FilterIcon.svg" />
      </BaseIconButton>
      <BaseIconButton class="h-12 w-16" @click="toggleMode">
        <img src="../assets/BulletList.svg" v-if="mode === 'grid'" />
        <img src="../assets/UserIcon.svg" v-if="mode === 'table'" />
      </BaseIconButton>
      <BaseIconButton class="h-12 w-12">
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
    </div>
    <p class="mb-4 px-2">Iš viso rasta: <strong>10 kontaktų</strong></p>
    <div class="flex mb-4 px-2 space-x-12">
      <BaseFilter :selectId="'imone'">
        <template #filter-name>Įmonė</template>
        <template #filter>Filtruoti įmones...</template>
      </BaseFilter>
      <BaseFilter :selectId="'padalinys'">
        <template #filter-name>Padalinys</template>
        <template #filter>Filtruoti divizijas...</template>
      </BaseFilter>
      <BaseFilter :selectId="'skyrius'">
        <template #filter-name>Skyrius</template>
        <template #filter>Filtruoti skyrius...</template>
      </BaseFilter>
      <BaseFilter :selectId="'grupe'">
        <template #filter-name>Grupė</template>
        <template #filter>Filtruoti grupes...</template>
      </BaseFilter>
      <BaseFilter :selectId="'ofisas'">
        <template #filter-name>Ofisas</template>
        <template #filter>Filtruoti adresus...</template>
      </BaseFilter>
    </div>
    <component :is="currentContacts"></component>
    <ThePagination class="mb-6"></ThePagination>
    <BaseModal></BaseModal>
  </div>
</template>
  
  <script>
import TheSearchBar from "../components/layout/TheSearchBar.vue";
import ThePagination from "../components/layout/ThePagination.vue";
import ContactsGridExpanded from "../components/contacts/ContactsGridExpanded.vue";
import ContactsTable from "../components/contacts/ContactsTable.vue";
export default {
  data() {
    return {
      mode: "grid",
    };
  },
  components: {
    TheSearchBar,
    ThePagination,
    ContactsGridExpanded,
    ContactsTable,
  },
  computed: {
    currentContacts() {
      if (this.mode === "table") {
        return ContactsTable;
      }
      if (this.mode === "grid") {
        return ContactsGridExpanded;
      }
    },
  },
  methods: {
    toggleMode() {
      this.mode === "grid" ? (this.mode = "table") : (this.mode = "grid");
    },
  },
};
</script>
  