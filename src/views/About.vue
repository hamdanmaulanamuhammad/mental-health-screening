<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 pt-16">
      <!-- Mission Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tentang MentalCare</h1>
        <p class="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          MentalCare adalah platform yang berdedikasi untuk mendukung kesehatan mental masyarakat
          dengan menyediakan alat skrining, sumber daya, dan akses ke bantuan profesional.
        </p>
      </section>
      <!-- Vision Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-semibold text-gray-800 text-center mb-8">Visi & Misi Kami</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 class="text-xl font-medium text-gray-800 mb-2">Visi</h3>
            <p class="text-gray-600">
              Menciptakan dunia di mana setiap orang memiliki akses mudah dan aman ke dukungan
              kesehatan mental.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 class="text-xl font-medium text-gray-800 mb-2">Misi</h3>
            <p class="text-gray-600">
              Menyediakan alat skrining yang mudah digunakan, sumber daya edukasi, dan koneksi ke
              layanan profesional untuk semua.
            </p>
          </div>
        </div>
      </section>
      <!-- Support CTA -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Butuh Bantuan?</h2>
        <p class="text-gray-600 mb-6">
          Kami di sini untuk Anda. Hubungi kami atau jelajahi layanan kami.
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
</script>
