<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 pt-16">
      <!-- Header Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Skrining Kesehatan Mental</h1>
        <p class="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Gunakan alat skrining kami untuk memahami kondisi kesehatan mental Anda. Jawab pertanyaan
          dengan jujur untuk hasil terbaik.
        </p>
      </section>
      <!-- Screening Form -->
      <section class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScreeningForm />
      </section>
      <!-- Support CTA -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Butuh Dukungan?</h2>
        <p class="text-gray-600 mb-6">
          Jika Anda merasa membutuhkan bantuan, hotline kami tersedia 24/7.
        </p>
        <router-link
          to="/hotlines"
          class="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-200 text-lg font-medium"
        >
          Lihat Hotline
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import ScreeningForm from '../components/ScreeningForm.vue'
</script>
