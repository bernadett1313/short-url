<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Logo from './components/Logo.vue';
  import NavBar from './components/NavBar.vue';

</script>

<template>
    <div class="flex justify-between pt-3 md:pt-4 px-4 sm:px-8">
      <Logo></Logo>
      <NavBar></NavBar>
    </div>
    <main>
      <RouterView />
    </main>
</template>

