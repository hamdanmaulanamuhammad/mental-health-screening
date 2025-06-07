<template>
  <div class="mt-8 animate-fade-in">
    <div class="text-center mb-8">
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <svg class="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="mt-4 text-3xl font-bold text-gray-800">Pendaftaran Berhasil</h2>
      <p class="text-gray-500 text-lg">Detail kunjungan Anda sudah terdaftar</p>
    </div>

    <div ref="printableCard" class="max-w-2xl mx-auto overflow-hidden bg-white rounded-2xl shadow-lg">
      <!-- Card Header -->
      <div class="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-white text-xl font-bold">Bukti Pendaftaran Kunjungan</h3>
            <p class="text-teal-100">{{ faskesInfo.name }}</p>
          </div>
          <div class="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Card Content -->
      <div class="p-6">
        <!-- Patient Info -->
        <div class="flex items-center mb-6 pb-4 border-b border-gray-100">
          <div class="bg-blue-100 rounded-full p-2 mr-4">
            <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Nama Pasien</p>
            <p class="text-gray-800 font-medium text-lg">{{ patientName }}</p>
          </div>
        </div>
        
        <!-- Doctor Info -->
        <div class="flex items-center mb-6 pb-4 border-b border-gray-100">
          <div class="bg-green-100 rounded-full p-2 mr-4">
            <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Nama Dokter</p>
            <p class="text-gray-800 font-medium text-lg">{{ doctorName }}</p>
          </div>
        </div>

        <!-- Location Info -->
        <div class="flex items-center mb-6 pb-4 border-b border-gray-100">
          <div class="bg-purple-100 rounded-full p-2 mr-4">
            <svg class="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Fasilitas Kesehatan</p>
            <p class="text-gray-800 font-medium">{{ faskesInfo.name }}</p>
            <p class="text-gray-600 text-sm">{{ faskesInfo.address }}</p>
          </div>
        </div>

        <!-- Room Info -->
        <div class="flex items-center mb-6 pb-4 border-b border-gray-100">
          <div class="bg-yellow-100 rounded-full p-2 mr-4">
            <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Lokasi & Ruangan</p>
            <p class="text-gray-800 font-medium">{{ locationName }}</p>
          </div>
        </div>

        <!-- Encounter ID -->
        <div class="flex items-center">
          <div class="bg-red-100 rounded-full p-2 mr-4">
            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Encounter ID</p>
            <p class="text-gray-800 font-medium">{{ encounterId }}</p>
          </div>
        </div>
      </div>
      
      <!-- Card Footer -->
      <div class="bg-gray-50 px-6 py-3 flex items-center justify-between">
        <div class="flex items-center text-gray-500">
          <svg class="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-sm">{{ formatDate() }}</span>
        </div>
        <div class="text-sm text-teal-600 font-medium">
          TERDAFTAR
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-8 flex justify-center space-x-4">
       <button @click="printToPdf" class="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center shadow-md">
        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Cetak Kartu
      </button>
       <button @click="$emit('close')" class="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center shadow-md">
        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Selesai
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  confirmationData: {
    type: Object,
    required: true,
  }
});

defineEmits(['close']);

const printableCard = ref(null);

const encounterId = computed(() => props.confirmationData.encounter_id);
const encounterResource = computed(() => props.confirmationData.encounter_resource || {});

const patientName = computed(() => encounterResource.value.subject?.display || 'Data tidak tersedia');
const doctorName = computed(() => encounterResource.value.participant?.[0]?.individual?.display || 'Data tidak tersedia');
const locationName = computed(() => encounterResource.value.location?.[0]?.location?.display || 'Data tidak tersedia');

const faskesInfo = {
  name: 'RS Panti Rini',
  address: 'Jl. Solo Km.11, Tirtomartani, Kalasan, Sleman, Yogyakarta 55571'
};

const formatDate = () => {
  const startDate = encounterResource.value.period?.start;
  if (!startDate) return 'Tanggal tidak tersedia';
  
  const date = new Date(startDate);
  return new Intl.DateTimeFormat('id-ID', { 
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(date);
};

const printToPdf = () => {
  const content = printableCard.value.innerHTML;
  const printWindow = window.open('/print-card.html', '_blank', 'width=800,height=600');

  printWindow.onload = () => {
    const cardContent = printWindow.document.getElementById('card-content');
    if (cardContent) {
        cardContent.innerHTML = content;
    }

    setTimeout(() => {
        printWindow.print();
    }, 250);
  };
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>