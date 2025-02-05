<script setup>
import { ref, onMounted } from 'vue'
import CopyIcon from './icons/CopyIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import OpenLinkIcon from './icons/OpenLinkIcon.vue'
import SeenIcon from './icons/SeenIcon.vue'

// Aquí guardaremos el array de enlaces
const shortLinks = ref([])

// Cargar los enlaces cuando se monte el componente
onMounted(async () => {
  try {
    const response = await fetch('http://localhost/ShortURL/getShortLinks.php', {
      credentials: 'include' // si usas sesión
    })
    const result = await response.json()
    if (result.success) {
      shortLinks.value = result.shortLinks
    } else {
      console.error(result.message || 'Failed to load short links')
    }
  } catch (error) {
    console.error('Error:', error)
  }

})

// Función para copiar
function copyToClipboard(link) {
  navigator.clipboard.writeText(link.short_url)
    .then(() => {
      alert('¡Enlace copiado al portapapeles!')
    })
    .catch((err) => {
      console.error('Error al copiar el enlace: ', err)
    })
}

// Función para eliminar un link
async function deleteLink(link) {
  if (!confirm('¿Estás seguro de que deseas eliminar este enlace?')) {
    return
  }
  try {
    const response = await fetch('http://localhost/ShortURL/deleteLink.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ idUrl: link.idUrl })
    })
    const result = await response.json()
    if (result.success) {
      // Eliminamos el link localmente
      shortLinks.value = shortLinks.value.filter(item => item.idUrl !== link.idUrl)
      alert('Enlace eliminado con éxito')
    } else {
      console.error('Fallo al eliminar:', result.message)
    }
  } catch (error) {
    console.error('Error al eliminar:', error)
  }
}

// Función para manejar el clic en el enlace corto
async function handleOpenLink(link) {
  // Abrir el enlace en una nueva pestaña
  window.open(link.short_url, '_blank')
}  

// Función para formatear fecha/hora (opcional)
function timeAgo(dateString) {
  const date = new Date(dateString);
  // Devuelve solo la fecha en formato local
  return date.toLocaleDateString();
}
</script>

<template>
  <div class="flex flex-wrap justify-start items-center content-center gap-3 md:gap-4 items-stretch md:pl-[7%] lg:pl-[3.2%] md:pl-[7%] xl:pl-[3.6%]">
    <div
      v-for="link in shortLinks"
      :key="link.idUrl"
      class="w-full md:w-[45%] lg:w-[31%] p-4 bg-[#5858584d] rounded-md flex flex-col"
    >
      <!-- Título -->
      <h3 class="text-white font-semibold mb-3">Your URL {{ link.idUrl }}</h3>

      <!-- Bloque principal de la tarjeta -->
      <div class="flex-1 flex flex-col gap-y-2.5 w-full">
        <!-- Enlace original: "truncate" + tooltip -->
        <div class="relative w-full overflow-hidden group">
          <!-- 1 línea con ... -->
          <p class="text-white text-sm font-semibold w-full truncate">
            {{ link.original_url }}
          </p>
          <!-- Tooltip con max-w-xs + break-words -->
          <span
            class="absolute top-full left-0 mt-1 max-w-xs p-1 text-white bg-black text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none break-words"
          >
            {{ link.original_url }}
          </span>
        </div>

        <!-- Enlace corto -->
        <div class="flex gap-x-1.5 items-center">
          <p class="text-blue-600 text-sm font-semibold truncate w-full">
            {{ link.short_url }}
          </p>
          <button @click="handleOpenLink">
            <OpenLinkIcon />
          </button>
        </div>
      </div>

      <!-- Bloque inferior: anclado abajo con "mt-auto" -->
      <div class="mt-auto flex justify-between items-center pt-2">
        <p class="text-white/40 italic text-xs flex items-center gap-x-1">
          <SeenIcon class="text-white/40 mb-0.5" />
          <span>{{ link.click_count }}</span>
        </p>
        <p class="text-white/40 italic text-xs">
          {{ /* timeAgo(link.creation) */ link.creation }}
        </p>
        <div class="flex gap-x-1 items-center">
          <CopyIcon class="hover:cursor-pointer" />
          <DeleteIcon class="hover:cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>




