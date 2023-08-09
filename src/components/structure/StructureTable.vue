<template>
  <md-card class="mt-16">
    <div class="flex justify-between bg-light-gray">
      <p class="text-base px-12">Pavadinimas</p>
      <p class="text-base px-48">Veiksmas</p>
    </div>
    <ul class="flex flex-col space-y-5 mt-10 mb-6 justify-center">
      <li
        v-for="struct in 4"
        :key="struct"
        class="text-xl px-14 flex justify-between"
      >
        <h4>{{ struct }}</h4>
        <div class="flex space-x-4">
          <BaseButton class="rounded-full">Redaguoti</BaseButton>
          <BaseButton class="w-36 rounded-full bg-light-red hover:bg-dark-red"
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
  
  