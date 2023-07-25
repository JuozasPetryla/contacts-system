<template>
  <md-card class="w-96 flex space-x-20 items-center p-4">
    <h3 class="text-base font-medium">
      <slot name="companyName">Įmonės pavadinimas...</slot>
    </h3>
    <div class="flex space-x-3">
      <BaseIconButton>
        <img
          class="md-icon md-size-1x"
          src="../../assets/Pencil Drawing.svg"
          alt="Home page icon"
        />
      </BaseIconButton>
      <BaseIconButton class="bg-light-red hover:bg-dark-red">
        <img
          class="md-icon md-size-1x"
          src="../../assets/Trash Can.svg"
          alt="Home page icon"
        />
      </BaseIconButton>
    </div>
  </md-card>
</template>