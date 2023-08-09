<template>
  <md-card class="mt-16">
    <div class="flex justify-between bg-light-gray">
      <p class="text-base pl-12">Vardas</p>
      <p class="text-base">El. paštas</p>
      <p class="text-base px-48">Veiksmas</p>
    </div>
    <ul class="flex flex-col space-y-5 mt-10 mb-6 justify-center">
      <li
        v-for="admin in 4"
        :key="admin"
        class="text-xl px-14 flex justify-between"
      >
        <h4>{{ "Vardas" + admin }}</h4>
        <h4 class="pl-72">{{ "example@gmail.com" }}</h4>
        <div class="flex space-x-4 pl-12">
          <BaseButton class="rounded-full">Keisti leidimus</BaseButton>
          <BaseButton class="rounded-full">Modifikuoti</BaseButton>
          <BaseButton class="w-32 rounded-full bg-light-red hover:bg-dark-red"
            >Ištrinti</BaseButton
          >
        </div>
      </li>
    </ul>
  </md-card>
</template>
  
  <script>
export default {};
</script>
  
  