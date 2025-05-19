<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <!-- Header Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Dukungan untuk Anda
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-4xl mx-auto animate-fade-in-up">
          Kami di sini untuk membantu. Hubungi kami melalui formulir di bawah ini atau jelajahi
          pertanyaan umum untuk jawaban cepat.
        </p>
      </section>
      <!-- Contact Form -->
      <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
        >
          <!-- Icon and Title -->
          <div class="flex items-center mb-6">
            <svg
              class="w-8 h-8 text-teal-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <h2 class="text-2xl font-semibold text-gray-900">Hubungi Kami</h2>
          </div>
          <ContactForm />
        </div>
      </section>
      <!-- FAQ Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in">
          Pertanyaan Umum
        </h2>
        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <button
              class="flex justify-between items-center w-full text-left"
              @click="toggleFaq(index)"
            >
              <h3 class="text-xl font-semibold text-gray-900">{{ faq.question }}</h3>
              <svg
                class="w-6 h-6 text-teal-600 transform transition-transform duration-200"
                :class="{ 'rotate-180': faq.isOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div v-show="faq.isOpen" class="mt-4 text-gray-600 leading-relaxed animate-fade-in">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>
      <!-- Hotline CTA -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fade-in-down">
          Butuh Bantuan Segera?
        </h2>
        <p class="text-xl text-gray-700 mb-8 animate-fade-in-up">
          Hotline kami tersedia 24/7 untuk dukungan kesehatan mental Anda.
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
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ContactForm from '../components/ContactForm.vue'

const faqs = ref([
  {
    question: 'Bagaimana cara menggunakan alat skrining kesehatan mental?',
    answer:
      'Alat skrining kami mudah digunakan. Kunjungi halaman Skrining, jawab pertanyaan dengan jujur, dan lihat hasil Anda. Hasil ini dapat membantu Anda memahami kondisi kesehatan mental Anda.',
    isOpen: false,
  },
  {
    question: 'Apakah data saya aman di platform ini?',
    answer:
      'Kami sangat menjaga privasi Anda. Semua data dilindungi dengan standar keamanan tertinggi, dan informasi Anda tidak akan dibagikan tanpa izin Anda.',
    isOpen: false,
  },
  {
    question: 'Bagaimana cara menghubungi dukungan profesional?',
    answer:
      'Anda dapat menghubungi hotline kami yang tersedia 24/7 melalui halaman Hotline atau mengirimkan pesan melalui formulir kontak di halaman ini.',
    isOpen: false,
  },
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
  .text-xl {
    font-size: 1.125rem;
  }
  .p-8 {
    padding: 1.5rem;
  }
}
</style>
