<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <!-- Mission Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Tentang MentalCare
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-4xl mx-auto animate-fade-in-up">
          MentalCare adalah platform yang berdedikasi untuk mendukung kesehatan mental masyarakat
          dengan menyediakan alat skrining, sumber daya, dan akses ke bantuan profesional.
        </p>
      </section>
      <!-- Vision Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in">
          Visi & Misi Kami
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Visi</h3>
            <p class="text-gray-600 leading-relaxed">
              Menciptakan dunia di mana setiap orang memiliki akses mudah dan aman ke dukungan
              kesehatan mental.
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Misi</h3>
            <p class="text-gray-600 leading-relaxed">
              Menyediakan alat skrining yang mudah digunakan, sumber daya edukasi, dan koneksi ke
              layanan profesional untuk semua.
            </p>
          </div>
        </div>
      </section>
      <!-- Support CTA -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fade-in-down">Butuh Bantuan?</h2>
        <p class="text-xl text-gray-700 mb-8 animate-fade-in-up">
          Kami di sini untuk Anda. Hubungi kami atau jelajahi layanan kami.
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
import Navbar from '@/components/Navbar.vue'
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
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
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
