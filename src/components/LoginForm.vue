<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''

  try {
    const response = await fetch('http://localhost/ShortURL/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      }),
      credentials: 'include'
    })

    const result = await response.json()

    if (result.success) {
      // Guardas los datos en la store
      userStore.setUser(result.user)

      // Limpias campos
      email.value = ''
      password.value = ''

      // Rediriges
      router.push('/')
    } else {
      errorMessage.value = result.message || 'Email or password is incorrect'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred: ' + error.message
  }
}
</script>

<template>
  <div class="w-full flex justify-center items-start">
    <div class="w-full md:w-[60%] flex flex-col items-center py-[4%]">
      <h3 class="text-[2.50rem] text-center text-orange-500 font-semibold mt-5 mb-10">Login</h3>
      <form @submit.prevent="handleLogin" class="w-[65%]" id="form-login">
        <div v-if="errorMessage" class="text-red-500 text-sm text-center mt-1 mb-8">
          {{ errorMessage }}
        </div>
        <div class="mb-10">
          <input
            type="text"
            v-model="email"
            class="w-full border border-gray-200 py-2 px-3"
            placeholder="Email"
          />
        </div>
        <div class="mb-8">
          <input
            type="password"
            v-model="password"
            class="w-full border border-gray-200 py-2 px-3"
            placeholder="Password"
          />
        </div>
        <div class="flex justify-center">
          <button class="bg-orange-500 text-white py-2 px-4 rounded-md">
            Log in
          </button>
        </div>
      </form>
      <a href="#" class="mt-6 text-center text-sm text-white hover:text-white/70"
        >Forgot your password?</a
      >
    </div>
  </div>
</template>
