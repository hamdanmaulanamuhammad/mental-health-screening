<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 pt-16">
      <!-- Hero Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Perjalanan Kesehatan Mental Anda Dimulai di Sini
        </h1>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Kami menyediakan alat skrining dan sumber daya untuk mendukung kesehatan mental Anda
          dengan penuh empati dan profesionalisme.
        </p>
        <router-link
          to="/screening"
          class="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-200 text-lg font-medium"
        >
          Mulai Skrining Sekarang
        </router-link>
      </section>
      <!-- Features Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-semibold text-gray-800 text-center mb-8">Mengapa Memilih Kami?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 class="text-xl font-medium text-gray-800 mb-2">Skrining Mudah</h3>
            <p class="text-gray-600">
              Alat skrining kami dirancang untuk membantu Anda memahami kesehatan mental dengan
              cepat dan aman.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 class="text-xl font-medium text-gray-800 mb-2">Dukungan 24/7</h3>
            <p class="text-gray-600">
              Akses hotline darurat kapan saja untuk mendapatkan bantuan langsung dari profesional.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 class="text-xl font-medium text-gray-800 mb-2">Privasi Terjamin</h3>
            <p class="text-gray-600">
              Data Anda dilindungi dengan standar keamanan tertinggi untuk kenyamanan Anda.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>
