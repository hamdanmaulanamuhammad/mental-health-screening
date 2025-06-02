<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="animate-fade-in">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Hasil Skrining Anda</h2>
    
    <div class="space-y-8">
      <!-- Depression Score -->
      <div class="bg-blue-50 p-5 rounded-xl">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Depresi</h3>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Skor: {{ resultScores.depression }}</span>
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
                :class="{'bg-red-100 text-red-800': resultScores.depression >= 28}">
            {{ depressionCategory }}
          </span>
        </div>
      </div>
      
      <!-- Anxiety Score -->
      <div class="bg-purple-50 p-5 rounded-xl">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Kecemasan</h3>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Skor: {{ resultScores.anxiety }}</span>
          <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium"
                :class="{'bg-red-100 text-red-800': resultScores.anxiety >= 20}">
            {{ anxietyCategory }}
          </span>
        </div>
      </div>
      
      <!-- Stress Score -->
      <div class="bg-green-50 p-5 rounded-xl">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Stres</h3>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Skor: {{ resultScores.stress }}</span>
          <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium"
                :class="{'bg-red-100 text-red-800': resultScores.stress >= 34}">
            {{ stressCategory }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Registration error message if any -->
    <div v-if="registrationError" class="mt-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
      {{ registrationError }}
    </div>
    
    <!-- Satu Sehat Visit Registration - only shown for severe cases -->
    <div v-if="hasVerySevereScore && !visitRegistered" class="mt-8 bg-red-50 p-6 rounded-xl border border-red-200">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-lg font-medium text-red-800">Rekomendasi Medis</h3>
          <div class="mt-2 text-red-700">
            <p>Anda memiliki tingkat keparahan yang tinggi pada salah satu atau beberapa aspek kesehatan mental. Kami sangat menyarankan untuk segera mendaftar untuk konsultasi dengan profesional kesehatan.</p>
          </div>
          <div class="mt-4">
            <button
              @click="showVisitRegistrationForm"
              :disabled="isRegistering"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <span v-if="isRegistering">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mendaftar...
              </span>
              <span v-else>Daftar Kunjungan Satu Sehat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Visit registered confirmation -->
    <div v-if="visitRegistered" class="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-lg font-medium text-green-800">Kunjungan Terdaftar</h3>
          <div class="mt-2 text-green-700">
            <p>Pendaftaran kunjungan Anda telah berhasil. Anda akan segera dihubungi untuk konfirmasi jadwal konsultasi.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Call to action -->
    <div class="mt-8 flex justify-center">
      <button
        @click="viewDetailedResults"
        class="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Lihat Hasil Lengkap
      </button>
    </div>

    <!-- Patient Registration Form Component -->
    <PatientRegistrationForm 
      v-if="showRegistrationForm" 
      :userData="userData"
      :screeningResults="resultScores"
      @registration-success="handleRegistrationSuccess"
      @registration-error="handleRegistrationError"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PatientRegistrationForm from './PatientRegistrationForm.vue'

const props = defineProps({
  resultScores: {
    type: Object,
    required: true
  },
  userData: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const showRegistrationForm = ref(false)
const isRegistering = ref(false)
const visitRegistered = ref(false)
const registrationError = ref(null)

// Calculate depression category
const depressionCategory = computed(() => {
  if (!props.resultScores) return ''
  const score = props.resultScores.depression
  if (score >= 28) return 'Sangat Berat'
  if (score >= 21) return 'Berat'
  if (score >= 14) return 'Sedang'
  if (score >= 10) return 'Ringan'
  return 'Normal'
})

// Calculate anxiety category
const anxietyCategory = computed(() => {
  if (!props.resultScores) return ''
  const score = props.resultScores.anxiety
  if (score >= 20) return 'Sangat Berat'
  if (score >= 15) return 'Berat'
  if (score >= 10) return 'Sedang'
  if (score >= 8) return 'Ringan'
  return 'Normal'
})

// Calculate stress category
const stressCategory = computed(() => {
  if (!props.resultScores) return ''
  const score = props.resultScores.stress
  if (score >= 34) return 'Sangat Berat'
  if (score >= 26) return 'Berat'
  if (score >= 19) return 'Sedang'
  if (score >= 15) return 'Ringan'
  return 'Normal'
})

// Function to navigate to detailed result page
const viewDetailedResults = () => {
  router.push({
    path: '/result',
    query: { scores: JSON.stringify(props.resultScores) },
  })
}

// Check if any score is in the 'Sangat Berat' category
const hasVerySevereScore = computed(() => {
  if (!props.resultScores) return false
  
  const { depression, anxiety, stress } = props.resultScores
  return (depression >= 28) || (anxiety >= 20) || (stress >= 34)
})

// Show the registration form
const showVisitRegistrationForm = () => {
  showRegistrationForm.value = true
}

// Handle registration success
const handleRegistrationSuccess = () => {
  visitRegistered.value = true
  showRegistrationForm.value = false
  alert('Pendaftaran kunjungan berhasil! Anda akan segera dihubungi untuk konfirmasi jadwal.')
}

// Handle registration error
const handleRegistrationError = (errorMessage) => {
  registrationError.value = errorMessage
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
</style> 