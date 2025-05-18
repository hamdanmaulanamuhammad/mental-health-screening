<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 pt-16">
      <!-- Header Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Hotline Dukungan Kesehatan Mental
        </h1>
        <p class="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Kami menyediakan akses cepat ke layanan darurat dan dukungan profesional. Jangan ragu
          untuk menghubungi jika Anda membutuhkan bantuan.
        </p>
      </section>
      <!-- Hotlines List -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <HotlineCard v-for="hotline in hotlines" :key="hotline.id" :hotline="hotline" />
        </div>
        <p v-if="!hotlines.length" class="text-center text-gray-600">
          Tidak ada hotline tersedia saat ini.
        </p>
      </section>
      <!-- Support CTA -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Butuh Bantuan Lebih Lanjut?</h2>
        <p class="text-gray-600 mb-6">
          Kami di sini untuk mendukung Anda. Jelajahi layanan kami atau hubungi tim dukungan.
        </p>
        <router-link
          to="/support"
          class="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-200 text-lg font-medium"
        >
          Hubungi Dukungan
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import HotlineCard from '../components/HotlineCard.vue'

const hotlines = ref([])

onMounted(() => {
  // Simulate fetching hotlines from an API
  hotlines.value = [
    {
      id: 1,
      name: 'Hotline Kesehatan Mental Indonesia',
      number: '+62-123-456-7890',
      description: 'Layanan 24/7 untuk dukungan kesehatan mental darurat.',
    },
    {
      id: 2,
      name: 'Krisis Anak dan Remaja',
      number: '+62-987-654-3210',
      description: 'Dukungan khusus untuk anak-anak dan remaja yang mengalami krisis.',
    },
    {
      id: 3,
      name: 'Layanan Konseling Nasional',
      number: '+62-555-123-4567',
      description: 'Konseling profesional untuk semua usia, tersedia setiap hari.',
    },
  ]
})
</script>
