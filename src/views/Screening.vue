<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <!-- Header Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Skrining Kesehatan Mental
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-4xl mx-auto animate-fade-in-up">
          Gunakan alat skrining kami untuk memahami kondisi kesehatan mental Anda. Jawab pertanyaan
          dengan jujur untuk hasil terbaik.
        </p>
      </section>
      
      <!-- Loading or Error State -->
      <section v-if="isLoading" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <p class="text-gray-700">Memuat data pengguna...</p>
        </div>
      </section>
      
      <!-- Screening Form -->
      <section v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScreeningForm :userData="userData" />
      </section>
      
      <!-- Support CTA -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fade-in-down">Butuh Dukungan?</h2>
        <p class="text-xl text-gray-700 mb-8 animate-fade-in-up">
          Jika Anda merasa membutuhkan bantuan, hotline kami tersedia 24/7.
        </p>
        <router-link
          to="/hotlines"
          class="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Lihat Hotline
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import ScreeningForm from '../components/ScreeningForm.vue'
import middlewareService from '../services/middlewareService.js'

const router = useRouter()
const userData = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const token = localStorage.getItem('authToken')
  
  if (!token) {
    // No token found, redirect to login
    router.push('/login')
    return
  }
  
  try {
    // Fetch authenticated user data
    const response = await middlewareService.getAuthenticatedUser(token)
    if (response && response.data) {
      userData.value = response.data
      
      // Transform user data for ScreeningForm if needed
      console.log('User data loaded:', userData.value)
    } else {
      throw new Error('Failed to fetch user data')
    }
  } catch (error) {
    console.error('Authentication error:', error)
    // Clear invalid token
    localStorage.removeItem('authToken')
    router.push('/login')
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
/* Animations */
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.875rem;
  }
  p {
    font-size: 1.125rem;
  }
}
</style>
