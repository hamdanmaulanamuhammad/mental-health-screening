<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="bg-teal-600 h-3 rounded-full transition-all duration-500"
          :style="{ width: `${(currentStep / questions.length) * 100}%` }"
        ></div>
      </div>
      <p class="text-sm text-gray-700 mt-3 font-medium">
        Pertanyaan {{ currentStep + 1 }} dari {{ questions.length }}
      </p>
    </div>
    <!-- Question -->
    <div v-if="currentStep < questions.length" class="animate-fade-in">
      <h3 class="text-xl font-semibold text-gray-900 mb-6">{{ questions[currentStep].text }}</h3>
      <div class="space-y-4">
        <label
          v-for="option in options"
          :key="option.value"
          class="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-teal-50 transition-all duration-200"
        >
          <input
            type="radio"
            v-model="answers[currentStep]"
            :value="option.value"
            class="w-5 h-5 text-teal-600 focus:ring-teal-500 border-gray-300"
          />
          <span class="text-gray-700 text-lg">{{ option.text }}</span>
        </label>
      </div>
    </div>
    <!-- Navigation Buttons -->
    <div v-if="currentStep < questions.length" class="mt-8 flex justify-between">
      <button
        @click="previousStep"
        :disabled="currentStep === 0"
        class="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all duration-200 font-semibold"
      >
        Sebelumnya
      </button>
      <button
        @click="nextStep"
        :disabled="answers[currentStep] === undefined"
        class="px-6 py-3 text-white bg-teal-600 rounded-xl hover:bg-teal-700 disabled:opacity-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        {{ currentStep === questions.length - 1 ? 'Selesai' : 'Berikutnya' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DASS21Id from '../data/DASS21Id.json'

const questions = ref(DASS21Id.quizPage.questions)
const options = ref(DASS21Id.quizPage.options)
const currentStep = ref(0)
const answers = ref([])
const router = useRouter()

const nextStep = () => {
  if (answers.value[currentStep.value] !== undefined) {
    if (currentStep.value < questions.value.length - 1) {
      currentStep.value++
    } else {
      // Calculate scores and redirect to Result page
      const scores = {
        depression: 0,
        anxiety: 0,
        stress: 0,
      }
      questions.value.forEach((question, index) => {
        if (answers.value[index] !== undefined) {
          scores[question.type] += answers.value[index]
        }
      })
      // Multiply by 2 for DASS-21 scoring
      scores.depression *= 2
      scores.anxiety *= 2
      scores.stress *= 2
      router.push({
        path: '/result',
        query: { scores: JSON.stringify(scores) },
      })
    }
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
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
  .text-xl {
    font-size: 1.125rem;
  }
  .text-lg {
    font-size: 1rem;
  }
  .p-8 {
    padding: 1.5rem;
  }
}
</style>
