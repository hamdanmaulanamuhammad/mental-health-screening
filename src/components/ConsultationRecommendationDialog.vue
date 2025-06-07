<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all animate-fade-in-up">
      <div class="flex items-start">
        <div class="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-xl font-bold text-gray-800">Rekomendasi Konsultasi</h3>
          <div class="mt-2 text-gray-600">
            <p>Hasil skrining Anda menunjukkan tingkat depresi, kecemasan, atau stres yang sangat berat. Kami sangat menyarankan Anda untuk melanjutkan ke tahap pendaftaran konsultasi dengan ahli medis profesional.</p>
            <p class="mt-2">Apakah Anda setuju untuk melanjutkan?</p>
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-end space-x-4">
        <button @click="$emit('decline')" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Tolak
        </button>
        <button @click="$emit('agree')" class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md">
          Setuju
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['agree', 'decline']);
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style> 