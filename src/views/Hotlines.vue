<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <!-- Header Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Hotline Dukungan Kesehatan Mental
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-4xl mx-auto animate-fade-in-up">
          Kami menyediakan akses cepat ke layanan darurat dan dukungan profesional. Jangan ragu
          untuk menghubungi jika Anda membutuhkan bantuan.
        </p>
      </section>
      <!-- Hotlines List -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <HotlineCard
            v-for="hotline in hotlines"
            :key="hotline.id"
            :hotline="hotline"
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          />
        </div>
        <p v-if="!hotlines.length" class="text-center text-xl text-gray-700 animate-fade-in">
          Tidak ada hotline tersedia saat ini.
        </p>
      </section>
      <!-- Support CTA -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fade-in-down">
          Butuh Bantuan Lebih Lanjut?
        </h2>
        <p class="text-xl text-gray-700 mb-8 animate-fade-in-up">
          Kami di sini untuk mendukung Anda. Jelajahi layanan kami atau hubungi tim dukungan.
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

<style scoped>
/* Animations */
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
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
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.875rem;
  }
  p {
    font-size: 1.125rem;
  }
  .grid {
    gap: 1.5rem;
  }
}
</style>
