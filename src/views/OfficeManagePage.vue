<template>
  <div class="px-12 my-8 w-full grid">
    <h3 class="text-5xl font-light mb-10 px-2">Ofisai</h3>
    <div class="flex space-x-6 items-center">
      <BaseIconButton class="h-12 w-12">
        <img src="../assets/Plus Math.svg" />
      </BaseIconButton>
      <p class="text-lg">Pridėti naują ofisą</p>
    </div>
    <OfficesTable></OfficesTable>
    <BaseSmallModal>
      <template #header>
        <h2 class="text-4xl font-normal">Redaguoti ofisą:</h2>
      </template>
    </BaseSmallModal>
    <BaseInfoDialog>
      <template #header> Ar tikrai norite ištrinti ofisą? </template>
      <template #content> Ofiso pavadinimas: ofiso pavadinimas </template>
      <template #actions>
        <md-button class="md-primary">NE</md-button>
        <md-button class="md-primary">TAIP</md-button>
      </template>
    </BaseInfoDialog>
  </div>
</template>
    
    <script>
import OfficesTable from "../components/offices/OfficesTable.vue";
export default {
  components: {
    OfficesTable,
  },
};
</script>
    