<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="animate-fade-in">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Hasil Skrining Anda</h2>
    
    <div class="space-y-8">
      <!-- Scores -->
      <div class="bg-blue-50 p-5 rounded-xl">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Depresi</h3>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Skor: {{ resultScores.depression }}</span>
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium" :class="{'bg-red-100 text-red-800': isSevere(resultScores.depression, 'depression')}">{{ getCategory('depression') }}</span>
        </div>
      </div>
      <div class="bg-purple-50 p-5 rounded-xl">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Kecemasan</h3>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Skor: {{ resultScores.anxiety }}</span>
          <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium" :class="{'bg-red-100 text-red-800': isSevere(resultScores.anxiety, 'anxiety')}">{{ getCategory('anxiety') }}</span>
        </div>
      </div>
      <div class="bg-green-50 p-5 rounded-xl">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Stres</h3>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Skor: {{ resultScores.stress }}</span>
          <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium" :class="{'bg-red-100 text-red-800': isSevere(resultScores.stress, 'stress')}">{{ getCategory('stress') }}</span>
        </div>
      </div>
    </div>
    
    <!-- General Error Message -->
    <div v-if="globalError" class="mt-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
      {{ globalError }}
    </div>

    <!-- Initial Recommendation & CTA -->
    <div v-if="hasVerySevereScore && currentStep === 'initial'" class="mt-8 bg-red-50 p-6 rounded-xl border border-red-200">
      <div class="flex items-start">
          <div class="flex-shrink-0"><svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
          <div class="ml-3">
              <h3 class="text-lg font-medium text-red-800">Rekomendasi Medis</h3>
              <p class="mt-2 text-red-700">Anda memiliki tingkat keparahan yang tinggi. Kami menyarankan untuk segera mendaftar konsultasi.</p>
              <div class="mt-4">
                  <button @click="showConsentDialog" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                      Mulai Pendaftaran
                  </button>
              </div>
          </div>
      </div>
    </div>

    <!-- Final Success Message -->
    <div v-if="currentStep === 'finalSuccess'" class="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
        <div class="flex items-start">
            <div class="flex-shrink-0"><svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div>
            <div class="ml-3">
                <h3 class="text-lg font-medium text-green-800">Proses Selesai</h3>
                <p class="mt-2 text-green-700">Terima kasih telah menggunakan layanan kami.</p>
            </div>
        </div>
    </div>

    <!-- View Detailed Results Button -->
    <div class="mt-8 flex justify-center">
      <button @click="viewDetailedResults" class="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700">
        Lihat Hasil Lengkap
      </button>
    </div>

    <!-- MODALS AND FORMS -->
    <ConsultationRecommendationDialog v-if="currentStep === 'consent'" @agree="handleConsentAgree" @decline="handleConsentDecline" />
    <PatientRegistrationForm v-if="currentStep === 'patientRegistration'" :userData="userData" @registration-success="handlePatientRegistrationSuccess" @registration-error="handleError" />
    <RegistrationSuccessDialog v-if="currentStep === 'patientSuccess'" @proceed="handleProceedToVisit" />
    <VisitRegistrationForm v-if="currentStep === 'visitRegistration'" :patientId="registeredPatientId" :patientName="registeredPatientName" @visit-success="handleVisitSuccess" @visit-error="handleError" />
    <VisitConfirmation v-if="currentStep === 'visitConfirmation'" :confirmation-data="visitConfirmationData" @close="handleConfirmationClose" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PatientRegistrationForm from './PatientRegistrationForm.vue';
import ConsultationRecommendationDialog from './ConsultationRecommendationDialog.vue';
import RegistrationSuccessDialog from './RegistrationSuccessDialog.vue';
import VisitRegistrationForm from './VisitRegistrationForm.vue';
import VisitConfirmation from './VisitConfirmation.vue';

const props = defineProps({
  resultScores: { type: Object, required: true },
  userData: { type: Object, required: true }
});

const router = useRouter();

// State management for the multi-step flow
const currentStep = ref('initial');
const globalError = ref(null);
const registeredPatientId = ref(null);
const registeredPatientName = ref(null);
const visitConfirmationData = ref(null);

const categoryConfig = {
    depression: [{t:28,l:'Sangat Berat'},{t:21,l:'Berat'},{t:14,l:'Sedang'},{t:10,l:'Ringan'},{t:0,l:'Normal'}],
    anxiety: [{t:20,l:'Sangat Berat'},{t:15,l:'Berat'},{t:10,l:'Sedang'},{t:8,l:'Ringan'},{t:0,l:'Normal'}],
    stress: [{t:34,l:'Sangat Berat'},{t:26,l:'Berat'},{t:19,l:'Sedang'},{t:15,l:'Ringan'},{t:0,l:'Normal'}]
};

const getCategory = (type) => {
    const score = props.resultScores[type];
    return categoryConfig[type].find(c => score >= c.t).l;
};

const isSevere = (score, type) => {
    return getCategory(type) === 'Sangat Berat';
}

const hasVerySevereScore = computed(() => {
  const { depression, anxiety, stress } = props.resultScores;
  return isSevere(depression, 'depression') || isSevere(anxiety, 'anxiety') || isSevere(stress, 'stress');
});

// Step 1: Show consent dialog
const showConsentDialog = () => {
  currentStep.value = 'consent';
  globalError.value = null;
};

// Step 2: Handle consent result
const handleConsentAgree = () => {
  currentStep.value = 'patientRegistration';
};

const handleConsentDecline = () => {
  currentStep.value = 'initial';
  globalError.value = "Pendaftaran dibatalkan. Anda dapat mendaftar nanti jika berubah pikiran.";
};

// Step 3: Handle patient registration result
const handlePatientRegistrationSuccess = (patientData) => {
  registeredPatientId.value = patientData.patientId;
  registeredPatientName.value = patientData.patientName;
  currentStep.value = 'patientSuccess';
};

// Step 4: Proceed to visit registration
const handleProceedToVisit = () => {
  currentStep.value = 'visitRegistration';
};

// Step 5: Handle visit registration result
const handleVisitSuccess = (confirmationData) => {
  visitConfirmationData.value = confirmationData;
  currentStep.value = 'visitConfirmation';
};

// Step 6: Close confirmation and end flow
const handleConfirmationClose = () => {
    currentStep.value = 'finalSuccess';
};

// Generic error handler
const handleError = (errorMessage) => {
  globalError.value = errorMessage;
  // Reset to a safe step if an error occurs
  if (currentStep.value === 'patientRegistration' || currentStep.value === 'visitRegistration') {
  } else {
    currentStep.value = 'initial';
  }
};

const viewDetailedResults = () => {
  router.push({
    path: '/result',
    query: { scores: JSON.stringify(props.resultScores) },
  });
};
</script>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style> 