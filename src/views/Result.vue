<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 pt-16">
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <!-- Header with Icon -->
        <div class="flex justify-center mb-6">
          <svg
            class="w-12 h-12 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ resultPage.title }}</h1>
        <p class="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Berikut adalah hasil skrining kesehatan mental Anda berdasarkan DASS-21.
        </p>

        <!-- Score Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <!-- Depression -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              {{ resultPage.depressionLabel }}
            </h3>
            <p class="text-2xl font-bold text-teal-500">{{ scores.depression }}</p>
            <p class="text-gray-600 mb-4">{{ getResultLevel('depression', scores.depression) }}</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-teal-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(scores.depression / 42) * 100}%` }"
              ></div>
            </div>
          </div>
          <!-- Anxiety -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ resultPage.anxietyLabel }}</h3>
            <p class="text-2xl font-bold text-teal-500">{{ scores.anxiety }}</p>
            <p class="text-gray-600 mb-4">{{ getResultLevel('anxiety', scores.anxiety) }}</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-teal-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(scores.anxiety / 42) * 100}%` }"
              ></div>
            </div>
          </div>
          <!-- Stress -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ resultPage.stressLabel }}</h3>
            <p class="text-2xl font-bold text-teal-500">{{ scores.stress }}</p>
            <p class="text-gray-600 mb-4">{{ getResultLevel('stress', scores.stress) }}</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-teal-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(scores.stress / 42) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Tips Section -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Saran untuk Anda</h2>
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-700">{{ resultPage.depressionLabel }}</h3>
              <p class="text-gray-600">{{ getTips('depression', scores.depression) }}</p>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-700">{{ resultPage.anxietyLabel }}</h3>
              <p class="text-gray-600">{{ getTips('anxiety', scores.anxiety) }}</p>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-700">{{ resultPage.stressLabel }}</h3>
              <p class="text-gray-600">{{ getTips('stress', scores.stress) }}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <router-link
          to="/hotlines"
          class="mr-10 inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-200 text-lg font-medium"
        >
          Cari Bantuan Profesional
        </router-link>
        <router-link to="/" class="inline-block mt-4 text-teal-500 hover:text-teal-700 font-medium">
          {{ resultPage.returnButton }}
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import DASS21Id from '../data/DASS21Id.json'

const resultPage = DASS21Id.resultPage
const route = useRoute()
const scores = ref({ depression: 0, anxiety: 0, stress: 0 })

// DASS-21 scoring thresholds
const thresholds = {
  depression: [0, 9, 13, 20, 27, 42],
  anxiety: [0, 7, 9, 14, 19, 42],
  stress: [0, 14, 18, 25, 33, 42],
}

// Initialize scores from route query
onMounted(() => {
  if (route.query.scores) {
    scores.value = JSON.parse(route.query.scores)
  }
})

// Get result level based on score
const getResultLevel = (type, score) => {
  const levels = resultPage.results // ["Normal", "Ringan", "Sedang", "Berat", "Sangat Berat"]
  const th = thresholds[type]
  if (score <= th[1]) return levels[0]
  if (score <= th[2]) return levels[1]
  if (score <= th[3]) return levels[2]
  if (score <= th[4]) return levels[3]
  return levels[4]
}

// Get tips based on score
const getTips = (type, score) => {
  const th = thresholds[type]
  if (score <= th[1]) return resultPage.resultTips[type][0].join('')
  if (score <= th[2]) return resultPage.resultTips[type][1].join('')
  if (score <= th[3]) return resultPage.resultTips[type][2].join('')
  if (score <= th[4]) return resultPage.resultTips[type][3].join('')
  return resultPage.resultTips[type][4].join('')
}
</script>
