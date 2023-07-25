<template>
  <div class="px-16 my-8 w-screen grid">
    <h3 class="text-5xl font-light mb-10 px-2">Kontaktų sistema</h3>
    <div class="flex space-x-6">
      <TheSearchBar class="mb-4 mx-2"></TheSearchBar>
      <BaseIconButton class="h-12 w-16">
        <img src="../assets/FilterIcon.svg" />
      </BaseIconButton>
      <BaseIconButton class="h-12 w-16">
        <img src="../assets/BulletList.svg" />
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
    <ContactsGrid v-if="mode === 'grid'"></ContactsGrid>
    <ContactsTable v-if="mode === 'table'"></ContactsTable>
    <ThePagination></ThePagination>
  </div>
</template>

<script>
import TheSearchBar from "../components/layout/TheSearchBar.vue";
import ThePagination from "../components/layout/ThePagination.vue";
import ContactsGrid from "../components/contacts/ContactsGrid.vue";
import ContactsTable from "../components/contacts/ContactsTable.vue";
export default {
  components: {
    TheSearchBar,
    ThePagination,
    ContactsGrid,
    ContactsTable,
  },
  computed: {
    mode() {
      return "table";
    },
  },
};
</script>

