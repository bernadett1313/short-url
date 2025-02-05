<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  shortUrl: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <!-- Muestra el div sólo si hay contenido en shortUrl -->
  <div v-if="shortUrl" class="p-4 rounded-md font-medium text-white/60 bg-[#5858584d] mt-12">
    <h3 class="text-md text-white font-semibold mb-2">Shortened URL</h3>
    <div>
      <!-- Enlaza a shortUrl, para que al hacer clic, abra la URL real (redirección del back) -->
      <a :href="shortUrl" target="_blank">
        {{ shortUrl }}
      </a>
    </div>
  </div>
</template>
