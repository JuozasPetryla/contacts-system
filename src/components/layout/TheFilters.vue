<template>
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
</template>