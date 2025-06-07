<template>
  <div class="mt-8 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Pendaftaran Kunjungan</h2>
    
    <div v-if="isLoading" class="text-center text-gray-600">
      <p>Memuat lokasi...</p>
    </div>
    
    <div v-if="error" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
      {{ error }}
    </div>

    <div v-if="!isLoading && !error" class="space-y-4">
      <div class="flex flex-col">
        <label for="location" class="text-sm font-medium text-gray-700">Pilih Lokasi Praktik</label>
        <select
          id="location"
          v-model="selectedLocation"
          class="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option disabled value="">Pilih salah satu lokasi</option>
          <option v-for="location in locations" :key="location.id" :value="location.id">
            {{ location.name }}
          </option>
        </select>
        
        <!-- Details Section -->
        <div v-if="selectedLocation" class="mt-4 space-y-3">
            <!--  Faskes Details -->
            <div class="text-sm text-gray-800 bg-teal-50 p-4 rounded-lg border border-teal-200">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4h4v4h-4z" />
                        </svg>
                    </div>
                    <div class="ml-3 flex-grow">
                        <p class="font-bold text-teal-800">{{ faskesInfo.name }}</p>
                        <p class="mt-1">{{ faskesInfo.address }}</p>
                    </div>
                </div>
            </div>

            <!-- Selected Room Details -->
            <div v-if="selectedLocationDetails" class="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">
                <p class="font-semibold text-gray-800">Ruangan Terpilih:</p>
                <p class="font-medium">{{ selectedLocationDetails.name }}</p>
                <p>{{ selectedLocationDetails.description }}</p>
            </div>
        </div>

      </div>
    </div>
    
    <div class="mt-8 flex justify-center">
      <button
        @click="confirmVisit"
        :disabled="isConfirming || !selectedLocation"
        class="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:bg-gray-400"
      >
        {{ isConfirming ? 'Mengonfirmasi...' : 'Konfirmasi Kunjungan' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import middlewareService from '../services/middlewareService.js';

const props = defineProps({
  patientId: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['visit-success', 'visit-error']);

const locations = ref([]);
const selectedLocation = ref('');
const isLoading = ref(false);
const error = ref(null);
const isConfirming = ref(false);

const faskesInfo = {
  name: 'RS Panti Rini',
  address: 'Jl. Solo Km.11, Tirtomartani, Kalasan, Sleman, Yogyakarta 55571'
};

const fetchLocations = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem('authToken');
    const response = await middlewareService.getLocations(token);
    if (response.data && response.data.length > 0) {
      locations.value = response.data.map(loc => ({
        id: loc.id,
        name: loc.name,
        description: loc.description
      }));
    } else {
      locations.value = [];
      error.value = "Tidak ada lokasi yang tersedia saat ini.";
    }
  } catch (err) {
    console.error("Error fetching locations:", err);
    error.value = "Gagal memuat lokasi. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};

const selectedLocationDetails = computed(() => {
    return locations.value.find(loc => loc.id === selectedLocation.value);
});

const confirmVisit = async () => {
  if (!selectedLocation.value) {
    error.value = "Silakan pilih lokasi terlebih dahulu.";
    return;
  }
  isConfirming.value = true;
  error.value = null;
  
  try {
    const token = localStorage.getItem('authToken');
    const visitPayload = {
      patient_id: props.patientId,
      patient_name: props.patientName,
      location_id: selectedLocation.value
    };
    
    const response = await middlewareService.createVisit(visitPayload, token);
    emit('visit-success', response.data);
  } catch (err) {
    console.error("Error creating visit:", err);
    const errorMessage = err.response?.data?.message || "Gagal membuat kunjungan. Silakan coba lagi.";
    error.value = errorMessage;
    emit('visit-error', errorMessage);
  } finally {
    isConfirming.value = false;
  }
};

onMounted(() => {
  fetchLocations();
});
</script>

<style scoped>
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