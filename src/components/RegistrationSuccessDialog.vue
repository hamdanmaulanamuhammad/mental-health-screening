<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all animate-fade-in-up">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="mt-4 text-xl font-bold text-gray-800">Pendaftaran Berhasil!</h3>
        <div class="mt-2 text-gray-600">
          <p>Data pasien Anda telah berhasil terdaftar di SATUSEHAT.</p>
          <p class="mt-1">Selanjutnya, silakan pilih lokasi dan jadwal kunjungan Anda.</p>
        </div>
        <div class="mt-6">
          <button @click="$emit('proceed')" class="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md">
            Lanjutkan ke Pendaftaran Kunjungan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['proceed']);
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