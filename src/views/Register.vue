<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4"
  >
    <div
      class="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-all hover:shadow-xl duration-300"
    >
      <!-- Decorative top border -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-t-2xl"
      ></div>
      <h1 class="text-2xl font-semibold text-center mb-2 text-gray-800">Bergabung Bersama Kami</h1>
      <p class="text-center text-gray-500 mb-6 text-sm">
        Mulai perjalanan kesehatan mental Anda dengan mendaftar
      </p>

      <!-- Progress Steps -->
      <div class="flex justify-between mb-8">
        <div class="text-center flex-1">
          <div 
            class="rounded-full h-10 w-10 flex items-center justify-center mx-auto mb-2"
            :class="[currentStep === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700']"
          >1</div>
          <div class="text-xs text-gray-600">Detail Pasien</div>
        </div>
        <div class="w-full flex items-center mx-4">
          <div class="h-0.5 w-full bg-gray-200" :class="{ 'bg-teal-500': currentStep === 2 }"></div>
        </div>
        <div class="text-center flex-1">
          <div 
            class="rounded-full h-10 w-10 flex items-center justify-center mx-auto mb-2"
            :class="[currentStep === 2 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700']"
          >2</div>
          <div class="text-xs text-gray-600">Akun</div>
        </div>
      </div>

      <!-- Step 1: Patient Details -->
      <div v-if="currentStep === 1" class="animate-fade-in">
        <div class="space-y-5">
          <div>
            <label for="name" class="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Masukkan nama lengkap"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error && !formData.name }"
            />
          </div>
          
          <div>
            <label for="nik" class="block text-gray-700 font-medium mb-2">NIK</label>
            <input
              id="nik"
              v-model="formData.nik"
              type="text"
              placeholder="Masukkan NIK"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error && !formData.nik }"
            />
          </div>
          
          <div>
            <label for="birthdate" class="block text-gray-700 font-medium mb-2">Tanggal Lahir</label>
            <input
              id="birthdate"
              v-model="formData.birthdate"
              type="date"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error && !formData.birthdate }"
            />
          </div>
          
          <div>
            <label for="gender" class="block text-gray-700 font-medium mb-2">Jenis Kelamin</label>
            <select
              id="gender"
              v-model="formData.gender"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error && !formData.gender }"
            >
              <option value="" disabled>Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          
          <div>
            <label for="telecom" class="block text-gray-700 font-medium mb-2">Nomor Telepon</label>
            <input
              id="telecom"
              v-model="formData.telecom"
              type="tel"
              placeholder="Masukkan nomor telepon"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error && !formData.telecom }"
            />
          </div>
          
          <div>
            <label for="address" class="block text-gray-700 font-medium mb-2">Alamat</label>
            <textarea
              id="address"
              v-model="formData.address"
              placeholder="Masukkan alamat lengkap"
              rows="3"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error && !formData.address }"
            ></textarea>
          </div>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-4 mb-4 text-center">{{ error }}</p>
        <button
          @click="nextStep"
          class="mt-8 w-full bg-teal-500 text-white p-3 rounded-xl hover:bg-teal-600 transition duration-200 flex items-center justify-center font-semibold"
        >
          Berikutnya
        </button>
      </div>

      <!-- Step 2: Auth Details -->
      <div v-if="currentStep === 2" class="animate-fade-in">
        <div class="space-y-5">
          <div>
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Masukkan email Anda"
              class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              :class="{ 'border-red-400': error && !formData.email }"
            />
          </div>
          
          <div>
            <label for="password" class="block text-gray-700 font-medium mb-2">Kata Sandi</label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan kata sandi"
                class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
                :class="{ 'border-red-400': error && !formData.password }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                @click="togglePassword"
              >
                <svg
                  v-if="showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-4 mb-4 text-center">{{ error }}</p>

        <div class="mt-8 flex space-x-4">
          <button
            @click="prevStep"
            class="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
          >
            Kembali
          </button>
          <button
            @click="handleSubmit"
            :disabled="loading"
            class="flex-1 px-6 py-3 text-white bg-teal-500 rounded-xl hover:bg-teal-600 transition duration-200 flex items-center justify-center font-semibold"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memuat...
            </span>
            <span v-else>Daftar</span>
          </button>
        </div>
      </div>

      <p class="mt-6 text-center text-gray-600">
        Sudah punya akun?
        <router-link
          to="/login"
          class="text-teal-500 hover:text-teal-700 font-medium transition duration-200"
          >Masuk</router-link
        >
      </p>
      <p class="mt-2 text-center text-gray-500 text-sm">
        Butuh bantuan? <a href="/support" class="text-teal-500 hover:text-teal-700">Hubungi Kami</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../services/middlewareService.js'

const router = useRouter()
const currentStep = ref(1)
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

// Consolidated form data
const formData = reactive({
  // Step 1: Patient Details
  name: '',
  nik: '',
  birthdate: '',
  gender: '',
  telecom: '',
  address: '',
  // Step 2: Auth Details
  email: '',
  password: '',
  // IDs - will be sent as empty strings
  participant_id: '',
  response_id: ''
});

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const nextStep = () => {
  // Basic validation for Step 1 (can be more thorough)
  if (!formData.name || !formData.nik || !formData.birthdate || !formData.gender || !formData.telecom || !formData.address) {
    error.value = 'Semua detail pasien harus diisi pada langkah ini.'
    return;
  }
  error.value = ''; // Clear previous errors
  currentStep.value = 2;
}

const prevStep = () => {
  error.value = ''; // Clear previous errors
  currentStep.value = 1;
}

const handleSubmit = async () => {
  error.value = '' // Clear previous errors
  // Basic validation for Step 2
  if (!formData.email || !formData.password) {
    error.value = 'Email dan kata sandi harus diisi.'
    return;
  }
  // Add more password validation if needed (e.g., length, complexity)

  loading.value = true

  const payload = {
    email: formData.email,
    password: formData.password,
    patient_details: {
      nik: formData.nik,
      name: formData.name,
      birthdate: formData.birthdate,
      gender: formData.gender === 'Laki-laki' ? 'male' : (formData.gender === 'Perempuan' ? 'female' : ''),
      telecom: formData.telecom,
      address: formData.address
    },
    participant_id: formData.participant_id, // ""
    response_id: formData.response_id      // ""
  };

  try {
    const response = await registerUser(payload)
    console.log('Registration successful:', response.data)
    alert('Pendaftaran berhasil! Silakan masuk.');
    router.push('/login')
  } catch (err) {
    console.error('Registration error:', err.response ? err.response.data : err.message);
    error.value = err.response?.data?.message || 'Pendaftaran gagal. Periksa kembali data Anda atau coba lagi nanti.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Subtle shadow animation on hover */
.shadow-lg:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
</style>
