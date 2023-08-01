<template>
  <md-card class="w-11/12">
    <div class="flex space-x-4 items-center px-2 py-8">
      <img src="../../assets/Test Account.svg" alt="Blank account icon" />
      <div>
        <h3 class="font-medium"><slot name="name">Vardas ir pavarde</slot></h3>
        <p><slot name="position">Pozicija: pozicija</slot></p>
      </div>
    </div>
    <div class="flex flex-col space-y-2 pl-4 pb-6">
      <slot name="contact-info">
        <p>Telefono nr: +000000000000</p>
        <p>El. paštas: example@gmail.com</p>
        <p>Adresas: Saltoniskiu g. 2, Vilnius</p>
      </slot>
    </div>
    <div class="flex space-x-4 pl-4 pb-8">
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
  
