<script setup>
import { ref } from 'vue'
import ShortLink from './ShortLink.vue'

const urlInput = ref('')
const shortUrl = ref('')  // Aquí guardaremos el link corto que viene de PHP

async function shortenUrl() {
  try {
    const response = await fetch('http://localhost/ShortURL/insertURL.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        originalURL: urlInput.value
      })
    })
    const result = await response.json()
    if (result.success) {
      console.log('Short URL inserted:', result.message)
      // Guardamos el shortUrl que nos envía el backend
      shortUrl.value = result.shortUrl  
    } else {
      console.error('Failed to insert:', result.message)
      shortUrl.value = ''  // Limpia si falla
    }
  } catch (err) {
    console.error('Error:', err)
  }
}
</script>

<template>
  <div class=" w-full md:w-[540px] flex flex-col justify-center items-center md:items-start md:pl-[2px]">
    <h3 class="text-md text-white font-semibold mb-2">Your URL</h3>
    <div class="flex justify-center items-center space-x-2 md:space-x-4">
      <input
        v-model="urlInput"
        class="w-[150px] 2xs:w-[170px] xs:w-[280px] md:w-[400px] p-2 text-white border border-[#343636fd] rounded-md bg-[#343636fd]"
        type="text"
        placeholder="Enter the URL here"
      />
      <button
        @click="shortenUrl"
        class="bg-orange-500 text-sm md:text-base text-white py-2.5 px-3 md:py-2 md:px-4 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-orange-600"
      >
        Shorten URL
      </button>
    </div>
    <ShortLink :shortUrl="shortUrl" />
  </div>
</template>
