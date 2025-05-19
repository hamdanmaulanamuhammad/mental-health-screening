<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Name Field -->
    <div>
      <label for="name" class="block text-gray-700 font-semibold mb-2">
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-teal-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          Nama
        </div>
      </label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
        :class="{ 'border-red-500': errors.name }"
        placeholder="Masukkan nama Anda"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1 font-medium">{{ errors.name }}</p>
    </div>
    <!-- Email Field -->
    <div>
      <label for="email" class="block text-gray-700 font-semibold mb-2">
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-teal-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.lık2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          Email
        </div>
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
        :class="{ 'border-red-500': errors.email }"
        placeholder="Masukkan email Anda"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1 font-medium">{{ errors.email }}</p>
    </div>
    <!-- Message Field -->
    <div>
      <label for="message" class="block text-gray-700 font-semibold mb-2">
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-teal-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
          Pesan
        </div>
      </label>
      <textarea
        id="message"
        v-model="form.message"
        class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
        :class="{ 'border-red-500': errors.message }"
        rows="5"
        placeholder="Tulis pesan Anda di sini"
      ></textarea>
      <p v-if="errors.message" class="text-red-500 text-sm mt-1 font-medium">
        {{ errors.message }}
      </p>
    </div>
    <!-- Success/Error Message -->
    <p v-if="success" class="text-teal-600 text-sm font-medium">
      Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.
    </p>
    <p v-if="submitError" class="text-red-500 text-sm font-medium">
      Gagal mengirim pesan. Silakan coba lagi.
    </p>
    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full px-6 py-3 text-white bg-teal-600 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
      :disabled="loading"
    >
      {{ loading ? 'Mengirim...' : 'Kirim Pesan' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const success = ref(false)
const submitError = ref(false)
const loading = ref(false)

const submitForm = async () => {
  // Reset errors and messages
  errors.name = ''
  errors.email = ''
  errors.message = ''
  success.value = false
  submitError.value = false
  loading.value = true

  try {
    // Basic validation
    if (!form.name) errors.name = 'Nama harus diisi'
    if (!form.email) errors.email = 'Email harus diisi'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email tidak valid'
    if (!form.message) errors.message = 'Pesan harus diisi'

    if (errors.name || errors.email || errors.message) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // On success
    success.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    submitError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-xl {
    font-size: 1.125rem;
  }
  .text-lg {
    font-size: 1rem;
  }
  .p-8 {
    padding: 1.5rem;
  }
}
</style>
