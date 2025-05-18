<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4"
  >
    <div
      class="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-all hover:shadow-xl duration-300"
    >
      <!-- Decorative top border -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-t-2xl"
      ></div>
      <h1 class="text-2xl font-semibold text-center mb-2 text-gray-800">Selamat Datang Kembali</h1>
      <p class="text-center text-gray-500 mb-6 text-sm">
        Kami di sini untuk mendukung perjalanan kesehatan mental Anda
      </p>
      <form @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Masukkan email Anda"
            class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
            :class="{ 'border-red-400': error }"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">Kata Sandi</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan kata sandi"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error }"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              @click="togglePassword"
            >
              <svg
                v-if="showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>
        </div>
        <p v-if="error" class="text-red-500 text-sm mb-4 text-center">{{ error }}</p>
        <button
          type="submit"
          class="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition duration-200 flex items-center justify-center"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Memuat...
          </span>
          <span v-else>Masuk</span>
        </button>
      </form>
      <p class="mt-6 text-center text-gray-600">
        Belum punya akun?
        <router-link
          to="/register"
          class="text-teal-500 hover:text-teal-700 font-medium transition duration-200"
          >Daftar Sekarang</router-link
        >
      </p>
      <p class="mt-2 text-center text-gray-500 text-sm">
        Butuh bantuan? <a href="/support" class="text-teal-500 hover:text-teal-700">Hubungi Kami</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)
const router = useRouter()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!email.value || !password.value) {
      error.value = 'Email dan kata sandi harus diisi'
      return
    }

    // Add your actual authentication logic here
    console.log('Login attempt with:', email.value, password.value)

    // Redirect to dashboard or home page after successful login
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Login gagal. Periksa kembali email dan kata sandi.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Subtle shadow animation on hover */
.shadow-lg:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
</style>
