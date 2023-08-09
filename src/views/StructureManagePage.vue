<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Struktūra</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton class="h-12 w-12">
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Pridėti naują struktūrą</p>
    </div>
    <StructureTable></StructureTable>
    <BaseSmallModal>
      <template #header>
        <h2 class="text-4xl font-normal">Redaguoti struktūrą:</h2>
      </template>
    </BaseSmallModal>
    <BaseInfoDialog>
      <template #header> Ar tikrai norite ištrinti struktūrą? </template>
      <template #content>
        Struktūros pavadinimas: struktūros pavadinimas
      </template>
      <template #actions>
        <md-button class="md-primary">NE</md-button>
        <md-button class="md-primary">TAIP</md-button>
      </template>
    </BaseInfoDialog>
  </div>
</template>
  
  <script>
import StructureTable from "../components/structure/StructureTable.vue";
export default {
  components: {
    StructureTable,
  },
};
</script>
  