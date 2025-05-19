<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <!-- Header with animation -->
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          {{ rulesPage.title }}
        </h1>
        <!-- Rules list with subtle shadow and hover effects -->
        <ul
          class="text-lg text-gray-700 mb-10 max-w-3xl mx-auto list-disc list-inside bg-white p-8 rounded-xl shadow-lg"
        >
          <li
            v-for="rule in rulesPage.rules"
            :key="rule"
            class="mb-3 transition-transform duration-200 hover:scale-105 hover:text-teal-600"
          >
            {{ rule }}
          </li>
        </ul>
        <!-- Buttons with enhanced styling and animations -->
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link
            to="/screening"
            class="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            {{ rulesPage.button }}
          </router-link>
          <router-link
            to="/"
            class="inline-block text-teal-600 hover:text-teal-800 font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:bg-teal-100"
          >
            {{ rulesPage.back }}
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import DASS21Id from '../data/DASS21Id.json'

const rulesPage = DASS21Id.rulesPage
</script>

<style scoped>
/* Custom animation for header */
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
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

/* Ensure responsive font sizes */
@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
  }
  ul {
    font-size: 1rem;
  }
}
</style>
