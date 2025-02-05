<script setup>
import LinkInput from '../components/LinkInput.vue'
import ShortLink from '../components/ShortLink.vue'
import AllShortLinks from '../components/AllShortLinks.vue'
</script>

<template>
  <!-- Contenedor global: centrado horizontal con mx-auto, ancho máximo "max-w-screen-lg" -->
  <div class="flex flex-col items-center mt-28 px-4 sm:px-8 md:px-16 lg:px-20"> 
    
    <h2 class="text-4xl md:text-5xl text-center text-orange-500 font-semibold mb-12 md:mb-6">
      Trim those <span class="font-semibold text-blue-600">looong</span> links!
    </h2>
    <h4 class="text-white text-center">
      Copy and paste your long URL here, and we'll shorten it for you in a flash!
    </h4>

    <div class="w-full flex flex-col items-center mt-12 md:mt-16">
      <LinkInput />
      <ShortLink />
    </div>

    <h2 class="text-2xl md:text-3xl text-center text-blue-600 font-semibold mb-5 mt-[4rem] md:mt-[4.5rem]">
      Here are all your previous shortened links
    </h2>
    <h4 class="text-white text-center">
      You can just copy and reuse them anytime you want!
    </h4>

    <!-- Contenedor centrado con mx-auto y un max-w -->
    <div class="max-w-screen-lg w-full mt-8 mb-10 md:mt-14 md:mb-12 mx-auto px-2">
      <AllShortLinks />
    </div>
  </div>
</template>
