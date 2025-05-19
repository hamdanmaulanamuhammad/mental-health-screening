<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <!-- Hero Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Perjalanan Kesehatan Mental Anda Dimulai di Sini
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in-up">
          Kami menyediakan alat skrining dan sumber daya untuk mendukung kesehatan mental Anda
          dengan penuh empati dan profesionalisme.
        </p>
        <router-link
          to="/rules"
          class="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Mulai Skrining Sekarang
        </router-link>
      </section>
      <!-- Features Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in">
          Mengapa Memilih Kami?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Skrining Mudah</h3>
            <p class="text-gray-600 leading-relaxed">
              Alat skrining kami dirancang untuk membantu Anda memahami kesehatan mental dengan
              cepat dan aman.
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Dukungan 24/7</h3>
            <p class="text-gray-600 leading-relaxed">
              Akses hotline darurat kapan saja untuk mendapatkan bantuan langsung dari profesional.
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Privasi Terjamin</h3>
            <p class="text-gray-600 leading-relaxed">
              Data Anda dilindungi dengan standar keamanan tertinggi untuk kenyamanan Anda.
            </p>
          </div>
        </div>
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
  p {
    font-size: 1.125rem;
  }
  h2 {
    font-size: 1.875rem;
  }
  .grid {
    gap: 1.5rem;
  }
}
</style>
