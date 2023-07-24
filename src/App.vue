<template>
  <div id="app">
    <TheHeader></TheHeader>
    <TheHeaderNavigation></TheHeaderNavigation>
    <TheSearchBar></TheSearchBar>
    <ContactContainer></ContactContainer>
    <ContactContainerExpanded></ContactContainerExpanded>
  </div>
</template>

<script>
import TheSearchBar from "./components/layout/TheSearchBar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheHeaderNavigation from "./components/layout/TheHeaderNavigation.vue";
import ContactContainer from "./components/contacts/ContactContainer.vue";
import ContactContainerExpanded from "./components/contacts/ContactContainerExpanded.vue";
import BaseIconButton from "./components/UI/BaseIconButton.vue";

export default {
  components: {
    TheHeader,
    TheHeaderNavigation,
    TheSearchBar,
    ContactContainer,
    ContactContainerExpanded,
    BaseIconButton,
  },
};
</script>

<style>
</style>
