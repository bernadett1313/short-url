<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

// Variable que controla el menú desplegable en pantallas < sm
const dropdownOpen = ref(false)

// Toggle para el menú
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

// Comprueba la sesión al montar
async function checkSession() {
  try {
    const res = await fetch('http://localhost/ShortURL/checkSession.php', {
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success && data.user) {
      userStore.setUser(data.user)
    } else {
      userStore.clearUser()
    }
  } catch (err) {
    userStore.clearUser()
    console.error(err)
  }
}

// Logout
async function handleLogout() {
  try {
    const res = await fetch('http://localhost/ShortURL/logout.php', {
      method: 'POST',
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success) {
      userStore.clearUser()
      router.push('/login')
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  checkSession()
})
</script>

<template>
  <nav>
    <ul class="flex space-x-8 text-white mt-1">
      <!-- Caso 1: Usuario logueado -->
      <template v-if="userStore.user">
        <!-- Versión DESKTOP (≥ sm): inline "Hi, user" + "Logout" -->
        <li class="hidden sm:flex items-center">
          Hi, <span class="text-base font-semibold text-blue-600 ml-1">
            {{ userStore.user.username }}
          </span>
          <button
            @click="handleLogout"
            class="hover:opacity-80 ml-4"
          >
            Logout
          </button>
        </li>

        <!-- Versión MÓVIL (< sm): "Hi, user ▼" y al hacer click se despliega menú con "Logout" -->
        <li class="sm:hidden relative">
          <button
            @click="toggleDropdown"
            class="inline-flex items-center gap-1 focus:outline-none"
          >
            Hi, 
            <span class="font-semibold text-blue-600">
              {{ userStore.user.username }}
            </span>
            <!-- Flecha: ▼ si está cerrado, ▲ si está abierto -->
            <span v-if="!dropdownOpen" class="text-xs">▼</span>
            <span v-else class="text-xs">▲</span>
          </button>
          <!-- Menú desplegable: aparece solo si dropdownOpen es true -->
          <div
            v-if="dropdownOpen"
            class="absolute right-1 top-full text-white px-1 py-0.5 z-10"
          >
            <button
              @click="handleLogout"
              class="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </li>
      </template>

      <!-- Caso 2: Usuario NO logueado => enlaces a login y register -->
      <template v-else>
        <li>
          <RouterLink to="/login" class="text-base font-medium hover:opacity-80">
            Log in
          </RouterLink>
          <RouterLink to="/register" class="text-base font-medium hover:opacity-80 ml-4">
            Sign up
          </RouterLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
