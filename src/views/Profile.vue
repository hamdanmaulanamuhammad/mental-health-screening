<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <!-- Header Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Profil Anda
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-4xl mx-auto animate-fade-in-up">
          Kelola informasi pribadi Anda untuk pengalaman yang lebih personal.
        </p>
      </section>
      <!-- Profile Card -->
      <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProfileCard :user="user" @update:user="updateUser" />
      </section>
      <!-- Support CTA -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fade-in-down">Butuh Bantuan?</h2>
        <p class="text-xl text-gray-700 mb-8 animate-fade-in-up">
          Tim kami siap membantu Anda kapan saja.
        </p>
        <router-link
          to="/support"
          class="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Hubungi Dukungan
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ProfileCard from '../components/ProfileCard.vue'

const user = ref({
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  age: 25,
  gender: 'Laki-laki',
})

const updateUser = (updatedUser) => {
  user.value = updatedUser
  // Add API call to persist changes, e.g.:
  // await updateUserProfile(updatedUser)
}
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
