<template>
  <div class="w-screen h-screen bg-dark-blue grid place-items-center">
    <md-card class="h-4/6 w-fit">
      <h2>Admin prisijungimas:</h2>
      <BaseInputField
        :inputPlaceHolder="'Įveskite el. pašto adresą...'"
        :inputId="'email'"
        :inputType="'email'"
      >
        <template #label> Elektroninis paštas: </template>
      </BaseInputField>
      <BaseInputField
        :inputPlaceHolder="'Įveskite slaptažodį...'"
        :inputId="'password'"
        :inputType="'password'"
      >
        <template #label> Slaptažodis: </template>
        <template #image-right>
          <img src="../assets/Trailing Icon.svg" class="Mail icon" />
        </template>
        <template #image-left>
          <img src="../assets/Lock.svg" class="Mail icon" />
        </template>
      </BaseInputField>
      <p>
        Pamiršote slaptažodį? <a class="no-underline">Pakeiskite slaptažodį</a>
      </p>
      <BaseButton>PRISIJUNGTI</BaseButton>
    </md-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>