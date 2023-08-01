<template>
  <md-card
    class="h-5/6 w-fit flex flex-col items-center py-10 px-36 space-y-12"
  >
    <h2 class="text-5xl">Admin prisijungimas:</h2>
    <BaseInputField
      :inputPlaceHolder="'Įveskite el. pašto adresą...'"
      :inputId="'email'"
      :inputType="'email'"
    >
      <template #image-left>
        <img src="../../assets/Mail.svg" alt="Mail icon" />
      </template>
      <template #label> Elektroninis paštas: </template>
    </BaseInputField>
    <BaseInputField
      :inputPlaceHolder="'Įveskite slaptažodį...'"
      :inputId="'password'"
      :inputType="'password'"
    >
      <template #label> Slaptažodis: </template>
      <template #image-right>
        <img src="../../assets/Trailing Icon.svg" class="Mail icon" />
      </template>
      <template #image-left>
        <img src="../../assets/Lock.svg" class="Mail icon" />
      </template>
    </BaseInputField>
    <p>
      Pamiršote slaptažodį? <a class="no-underline">Pakeiskite slaptažodį</a>
    </p>
    <BaseButton>PRISIJUNGTI</BaseButton>
  </md-card>
</template>