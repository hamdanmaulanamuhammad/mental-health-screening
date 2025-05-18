<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <!-- Progress Bar -->
    <div class="mb-6">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-teal-500 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${(currentStep / questions.length) * 100}%` }"
        ></div>
      </div>
      <p class="text-sm text-gray-600 mt-2">
        Pertanyaan {{ currentStep + 1 }} dari {{ questions.length }}
      </p>
    </div>
    <!-- Question -->
    <div v-if="currentStep < questions.length">
      <h3 class="text-lg font-medium text-gray-800 mb-4">{{ questions[currentStep].text }}</h3>
      <div class="space-y-4">
        <label
          v-for="option in questions[currentStep].options"
          :key="option.value"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            v-model="answers[currentStep]"
            :value="option.value"
            class="text-teal-500 focus:ring-teal-400"
          />
          <span class="text-gray-700">{{ option.label }}</span>
        </label>
      </div>
    </div>
    <!-- Results -->
    <div v-else>
      <h3 class="text-lg font-medium text-gray-800 mb-4">Hasil Skrining</h3>
      <p class="text-gray-600 mb-4">Berdasarkan jawaban Anda, berikut adalah ringkasan:</p>
      <p class="text-gray-700 font-medium">Skor Total: {{ totalScore }} / {{ maxScore }}</p>
      <p class="text-gray-600 mt-2">
        {{ resultMessage }}
      </p>
      <router-link
        to="/hotlines"
        class="inline-block mt-4 text-teal-500 hover:text-teal-700 font-medium"
      >
        Hubungi Hotline untuk Dukungan
      </router-link>
    </div>
    <!-- Navigation Buttons -->
    <div v-if="currentStep < questions.length" class="mt-6 flex justify-between">
      <button
        @click="previousStep"
        :disabled="currentStep === 0"
        class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
      >
        Sebelumnya
      </button>
      <button
        @click="nextStep"
        :disabled="!answers[currentStep]"
        class="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 disabled:opacity-50"
      >
        {{ currentStep === questions.length - 1 ? 'Selesai' : 'Berikutnya' }}
      </button>
    </div>
    <div v-else class="mt-6">
      <button
        @click="resetForm"
        class="w-full px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        Ulangi Skrining
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const questions = ref([
  {
    text: 'Seberapa sering Anda merasa cemas atau khawatir dalam seminggu terakhir?',
    options: [
      { label: 'Tidak pernah', value: 0 },
      { label: 'Jarang', value: 1 },
      { label: 'Kadang-kadang', value: 2 },
      { label: 'Sering', value: 3 },
    ],
  },
  {
    text: 'Apakah Anda merasa sulit untuk tidur atau tetap tidur?',
    options: [
      { label: 'Tidak pernah', value: 0 },
      { label: 'Jarang', value: 1 },
      { label: 'Kadang-kadang', value: 2 },
      { label: 'Sering', value: 3 },
    ],
  },
  {
    text: 'Seberapa sering Anda merasa kehilangan minat pada aktivitas sehari-hari?',
    options: [
      { label: 'Tidak pernah', value: 0 },
      { label: 'Jarang', value: 1 },
      { label: 'Kadang-kadang', value: 2 },
      { label: 'Sering', value: 3 },
    ],
  },
])

const currentStep = ref(0)
const answers = ref([])

const totalScore = computed(() => answers.value.reduce((sum, answer) => sum + (answer || 0), 0))
const maxScore = computed(() => questions.value.length * 3)

const resultMessage = computed(() => {
  if (totalScore.value <= 3) {
    return 'Anda tampaknya dalam kondisi baik. Tetap jaga kesehatan mental Anda!'
  } else if (totalScore.value <= 6) {
    return 'Anda mungkin mengalami sedikit stres. Pertimbangkan untuk berbicara dengan seseorang.'
  } else {
    return 'Kami sarankan untuk menghubungi profesional atau hotline untuk dukungan lebih lanjut.'
  }
})

const nextStep = () => {
  if (answers.value[currentStep.value] !== undefined) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const resetForm = () => {
  currentStep.value = 0
  answers.value = []
}
</script>
