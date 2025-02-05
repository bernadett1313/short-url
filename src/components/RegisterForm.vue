<script setup>
  import { ref } from 'vue';

  const username = ref('');
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');

  async function handleRegister() {
    errorMessage.value = ''; 

    // 1. Verificar que 'username' no esté vacío
    if (!username.value) {
      errorMessage.value = 'Username cannot be empty.';
      return;
    }

    // 2. Validar email con RegEx
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      errorMessage.value = 'Please enter a valid email address.';
      return;
    }

    // 3. Verificar que 'password' no esté vacío, etc.
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password.value)) {
      errorMessage.value = 'Password must contain at least 8 characters, one number, one uppercase letter and one special character.';
      return;
    }

    try { 
      const response = await fetch('http://localhost/ShortURL/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
      });

      const result = await response.json();

      if (result.success) {
        errorMessage.value = ''; 
        alert('User registered successfully!'); 
        username.value = '';
        email.value = '';
        password.value = '';

      } else {
        errorMessage.value = result.message || 'Registration failed';
      }
    } catch (error) {
      errorMessage.value = 'An error occurred: ' + error.message;
    }
  }
</script>

<template>
  <div class="w-full flex justify-center items-start">
    <div class="w-full md:w-[60%] flex flex-col items-center py-[4%]">
      <h3 class="text-[2.50rem] text-center text-orange-500 font-semibold mt-5 mb-12">Create account</h3>
      <form @submit.prevent="handleRegister" class="w-[65%]" id="form-register">
        <div v-if="errorMessage" class="text-red-500 text-sm text-center mt-1 mb-8">{{ errorMessage }}</div>
        <div class="mb-10">
          <input type="text" v-model="username" class="w-full border border-gray-200 py-2 px-3" placeholder="Username">
        </div>
        <div class="mb-10">
          <input type="text" v-model="email" class="w-full border border-gray-200 py-2 px-3" placeholder="Email">
        </div>
        <div class="mb-8">
          <input type="password" v-model="password" class="w-full border border-gray-200 py-2 px-3" placeholder="Password">
        </div>
        <div class="flex justify-center">
          <button type="submit" class="bg-orange-500 text-white text-lg py-2 px-4 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-orange-600">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>
