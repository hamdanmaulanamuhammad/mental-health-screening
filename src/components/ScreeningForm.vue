<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <!-- Error message if any -->
    <div v-if="error" class="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
      {{ error }}
    </div>

    <!-- Results Display Component -->
    <ScreeningResults
      v-if="showResults"
      :resultScores="resultScores"
      :userData="userData"
    />

    <!-- Questionnaire Section -->
    <div v-else>
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
          :disabled="answers[currentStep] === undefined || isSubmitting"
          class="px-6 py-3 text-white bg-teal-600 rounded-xl hover:bg-teal-700 disabled:opacity-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          {{ currentStep === questions.length - 1 ? (isSubmitting ? 'Menyimpan...' : 'Selesai') : 'Berikutnya' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DASS21Id from '../data/DASS21Id.json'
import { createResponse, createParticipant, getParticipantById } from '../services/apiService.js'
import middlewareService from '../services/middlewareService.js'
import PatientRegistrationForm from './PatientRegistrationForm.vue'
import ScreeningResults from './ScreeningResults.vue'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

const questions = ref(DASS21Id.quizPage.questions)
const options = ref(DASS21Id.quizPage.options)
const currentStep = ref(0)
const answers = ref([])
const router = useRouter()
const isSubmitting = ref(false)
const showResults = ref(false) 
const resultScores = ref(null) 
const participantId = ref(null)
const error = ref(null)

// State for visit registration
const showRegistrationForm = ref(false)
const isRegistering = ref(false)
const visitRegistered = ref(false)
const registrationError = ref(null)

// Method to create participant from user data
const createScreeningParticipant = async () => {
  try {
    const patientDetails = props.userData.patient_details || {}
    
    // Create participant payload
    const participantPayload = {
      name: patientDetails.name || 'Unknown User',
      age: calculateAge(patientDetails.birthdate) || 0,
      gender: patientDetails.gender === 'male' ? 'Male' : 
              patientDetails.gender === 'female' ? 'Female' : 'Unknown'
    }
    
    console.log('Creating participant with data:', participantPayload)
    
    // Call API to create participant
    const response = await createParticipant(participantPayload)
    
    if (response && response.data && response.data.id) {
      participantId.value = response.data.id
      console.log('Participant created with ID:', participantId.value)
      return participantId.value
    } else {
      throw new Error('Failed to get participant ID from response')
    }
  } catch (err) {
    console.error('Error creating participant:', err)
    error.value = 'Gagal membuat data peserta. Silakan coba lagi.'
    throw err
  }
}

// Helper function to calculate age from birthdate
const calculateAge = (birthdate) => {
  if (!birthdate) return null
  
  const today = new Date()
  const birthDate = new Date(birthdate)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

const nextStep = async () => {
  if (answers.value[currentStep.value] !== undefined) {
    if (currentStep.value < questions.value.length - 1) {
      currentStep.value++
    } else {
      isSubmitting.value = true
      error.value = null
      
      try {
        // Calculate scores first
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
        
      scores.depression *= 2
      scores.anxiety *= 2
      scores.stress *= 2
        
        // Store scores for result display
        resultScores.value = scores
        
        // Create participant if not already created
        if (!participantId.value) {
          await createScreeningParticipant()
        }
        
        // Now create the screening response
        const currentDate = new Date().toISOString()
        
        const payload = {
          participantId: participantId.value,
          responseDate: currentDate,
          totalDepressionScore: scores.depression,
          totalAnxietyScore: scores.anxiety,
          totalStressScore: scores.stress
        }
        
        const response = await createResponse(payload)
        console.log('Screening data saved:', response.data)
        
        // Show results immediately instead of redirecting
        showResults.value = true
        
      } catch (err) {
        console.error('Error in screening process:', err)
        error.value = err.message || 'Gagal menyimpan data screening. Silakan coba lagi.'
      } finally {
        isSubmitting.value = false
      }
    }
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Calculate depression category
const depressionCategory = computed(() => {
  if (!resultScores.value) return ''
  const score = resultScores.value.depression
  if (score >= 28) return 'Sangat Berat'
  if (score >= 21) return 'Berat'
  if (score >= 14) return 'Sedang'
  if (score >= 10) return 'Ringan'
  return 'Normal'
})

// Calculate anxiety category
const anxietyCategory = computed(() => {
  if (!resultScores.value) return ''
  const score = resultScores.value.anxiety
  if (score >= 20) return 'Sangat Berat'
  if (score >= 15) return 'Berat'
  if (score >= 10) return 'Sedang'
  if (score >= 8) return 'Ringan'
  return 'Normal'
})

// Calculate stress category
const stressCategory = computed(() => {
  if (!resultScores.value) return ''
  const score = resultScores.value.stress
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
    query: { scores: JSON.stringify(resultScores.value) },
  })
}

// Check if any score is in the 'Sangat Berat' category
const hasVerySevereScore = computed(() => {
  if (!resultScores.value) return false
  
  const { depression, anxiety, stress } = resultScores.value
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
