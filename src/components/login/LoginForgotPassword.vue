<template>
  <md-card
    class="h-3/6 w-fit flex flex-col items-center justify-center py-10 px-36 space-y-12"
  >
    <h2 class="text-5xl">Priminti slaptažodį:</h2>
    <BaseInputField
      :inputPlaceHolder="'Įveskite el. pašto adresą...'"
      :inputId="'email'"
      :inputType="'email'"
    >
      <template #label> Elektroninis paštas: </template>
    </BaseInputField>
    <BaseButton>PATEIKTI</BaseButton>
  </md-card>
</template>