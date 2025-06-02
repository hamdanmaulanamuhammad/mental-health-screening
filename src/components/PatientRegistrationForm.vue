<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mt-8 p-6 bg-white rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Form Pendaftaran Kunjungan</h2>
    
    <div class="space-y-4">
      <!-- NIK -->
      <div class="flex flex-col">
        <label for="nik" class="text-sm font-medium text-gray-700">NIK</label>
        <input
          id="nik"
          v-model="registrationForm.nik"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Name -->
      <div class="flex flex-col">
        <label for="name" class="text-sm font-medium text-gray-700">Nama</label>
        <input
          id="name"
          v-model="registrationForm.name"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Gender -->
      <div class="flex flex-col">
        <label for="gender" class="text-sm font-medium text-gray-700">Jenis Kelamin</label>
        <select
          id="gender"
          v-model="registrationForm.gender"
          class="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
      </div>
      
      <!-- Birthdate -->
      <div class="flex flex-col">
        <label for="birthdate" class="text-sm font-medium text-gray-700">Tanggal Lahir</label>
        <input
          id="birthdate"
          v-model="registrationForm.birthdate"
          type="date"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Address -->
      <div class="flex flex-col">
        <label for="address_line" class="text-sm font-medium text-gray-700">Alamat</label>
        <input
          id="address_line"
          v-model="registrationForm.address_line"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Postal Code -->
      <div class="flex flex-col">
        <label for="address_postal_code" class="text-sm font-medium text-gray-700">Kode Pos</label>
        <input
          id="address_postal_code"
          v-model="registrationForm.address_postal_code"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Province -->
      <div class="flex flex-col">
        <label for="address_province_code" class="text-sm font-medium text-gray-700">Provinsi</label>
        <select
          id="address_province_code"
          v-model="registrationForm.address_province_code"
          @change="handleProvinceChange"
          class="mt-1 block w-full border-gray-300 rounded-md"
          :disabled="isLoadingAreaCodes"
        >
          <option value="">Pilih Provinsi</option>
          <option v-for="province in provinces" :key="province.code" :value="province.code">{{ province.name }}</option>
        </select>
        <div v-if="isLoadingAreaCodes && !registrationForm.address_province_code" class="mt-1 text-sm text-gray-500">
          Memuat data provinsi...
        </div>
      </div>
      
      <!-- City -->
      <div class="flex flex-col">
        <label for="address_city_code" class="text-sm font-medium text-gray-700">Kota/Kabupaten</label>
        <select
          id="address_city_code"
          v-model="registrationForm.address_city_code"
          @change="handleCityChange"
          class="mt-1 block w-full border-gray-300 rounded-md"
          :disabled="!registrationForm.address_province_code || isLoadingAreaCodes"
        >
          <option value="">Pilih Kota/Kabupaten</option>
          <option v-for="city in cities" :key="city.code" :value="city.code">{{ city.name }}</option>
        </select>
        <div v-if="isLoadingAreaCodes && registrationForm.address_province_code && !registrationForm.address_city_code" class="mt-1 text-sm text-gray-500">
          Memuat data kota/kabupaten...
        </div>
      </div>
      
      <!-- District -->
      <div class="flex flex-col">
        <label for="address_district_code" class="text-sm font-medium text-gray-700">Kecamatan</label>
        <select
          id="address_district_code"
          v-model="registrationForm.address_district_code"
          @change="handleDistrictChange"
          class="mt-1 block w-full border-gray-300 rounded-md"
          :disabled="!registrationForm.address_city_code || isLoadingAreaCodes"
        >
          <option value="">Pilih Kecamatan</option>
          <option v-for="district in districts" :key="district.code" :value="district.code">{{ district.name }}</option>
        </select>
        <div v-if="isLoadingAreaCodes && registrationForm.address_city_code && !registrationForm.address_district_code" class="mt-1 text-sm text-gray-500">
          Memuat data kecamatan...
        </div>
      </div>
      
      <!-- Village -->
      <div class="flex flex-col">
        <label for="address_village_code" class="text-sm font-medium text-gray-700">Kelurahan/Desa</label>
        <select
          id="address_village_code"
          v-model="registrationForm.address_village_code"
          class="mt-1 block w-full border-gray-300 rounded-md"
          :disabled="!registrationForm.address_district_code || isLoadingAreaCodes"
        >
          <option value="">Pilih Kelurahan/Desa</option>
          <option v-for="village in villages" :key="village.code" :value="village.code">{{ village.name }}</option>
        </select>
        <div v-if="isLoadingAreaCodes && registrationForm.address_district_code && !registrationForm.address_village_code" class="mt-1 text-sm text-gray-500">
          Memuat data kelurahan/desa...
        </div>
      </div>
      
      <!-- Address Use -->
      <div class="flex flex-col">
        <label for="address_use" class="text-sm font-medium text-gray-700">Penggunaan Alamat</label>
        <select
          id="address_use"
          v-model="registrationForm.address_use"
          class="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option value="home">Rumah</option>
          <option value="work">Tempat Kerja</option>
          <option value="other">Lainnya</option>
        </select>
      </div>
      
      <!-- Address RT -->
      <div class="flex flex-col">
        <label for="address_rt" class="text-sm font-medium text-gray-700">RT</label>
        <input
          id="address_rt"
          v-model="registrationForm.address_rt"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Address RW -->
      <div class="flex flex-col">
        <label for="address_rw" class="text-sm font-medium text-gray-700">RW</label>
        <input
          id="address_rw"
          v-model="registrationForm.address_rw"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Marital Status -->
      <div class="flex flex-col">
        <label for="marital_status_code" class="text-sm font-medium text-gray-700">Status Perkawinan</label>
        <select
          id="marital_status_code"
          v-model="registrationForm.marital_status_code"
          @change="handleMaritalStatusChange"
          class="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option value="">Pilih Status Perkawinan</option>
          <option v-for="option in maritalStatusOptions" :key="option.code" :value="option.code">{{ option.text }}</option>
        </select>
      </div>
      
      <!-- Contact Information -->
      <div class="flex flex-col">
        <label for="contact_name_text" class="text-sm font-medium text-gray-700">Nama Kontak</label>
        <input
          id="contact_name_text"
          v-model="registrationForm.contact_name_text"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Contact Telecom -->
      <div class="flex flex-col">
        <label for="contact_telecom_value" class="text-sm font-medium text-gray-700">Nomor Telepon</label>
        <input
          id="contact_telecom_value"
          v-model="registrationForm.contact_telecom_value"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      
      <!-- Contact Relationship -->
      <div class="flex flex-col">
        <label for="contact_relationship_code" class="text-sm font-medium text-gray-700">Hubungan Kontak</label>
        <select
          id="contact_relationship_code"
          v-model="registrationForm.contact_relationship_code"
          class="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option value="">Pilih Hubungan Kontak</option>
          <option v-for="option in contactRelationshipOptions" :key="option.code" :value="option.code">{{ option.text }}</option>
        </select>
      </div>
      
      <!-- Area Code Error -->
      <div v-if="areaCodeError" class="mt-2 p-3 bg-red-50 text-red-600 rounded-md text-sm">
        {{ areaCodeError }}
      </div>
      
      <!-- Registration Error -->
      <div v-if="registrationError" class="mt-2 p-3 bg-red-50 text-red-600 rounded-md text-sm">
        {{ registrationError }}
      </div>
    </div>
    
    <!-- Submit Button -->
    <div class="mt-8 flex justify-center">
      <button
        @click="register"
        :disabled="isRegistering"
        class="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        {{ isRegistering ? 'Menyimpan...' : 'Daftar' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import middlewareService from '../services/middlewareService.js'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  },
  screeningResults: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['registration-success', 'registration-error'])

// State for the form
const isLoadingAreaCodes = ref(false)
const areaCodeError = ref(null)
const isRegistering = ref(false)
const registrationError = ref(null)

// Area code data
const provinces = ref([])
const cities = ref([])
const districts = ref([])
const villages = ref([])

// Registration form data
const registrationForm = reactive({
  nik: '',
  name: '',
  gender: 'male',
  birthdate: '',
  address_use: 'home',
  address_line: '',
  address_city: '',
  address_postal_code: '',
  address_country: 'ID',
  address_province_code: '',
  address_city_code: '',
  address_district_code: '',
  address_village_code: '',
  address_rt: '',
  address_rw: '',
  marital_status_code: '',
  marital_status_text: '',
  contact_relationship_code: '',
  contact_name_text: '',
  contact_telecom_system: 'phone',
  contact_telecom_value: '',
  contact_telecom_use: 'mobile'
})

// Marital status options
const maritalStatusOptions = [
  { code: 'M', text: 'Married' },
  { code: 'S', text: 'Single' },
  { code: 'D', text: 'Divorced' },
  { code: 'W', text: 'Widowed' }
]

// Contact relationship options
const contactRelationshipOptions = [
  { code: 'C', text: 'Keluarga Inti (Suami/Istri/Anak)' },
  { code: 'F', text: 'Keluarga Besar (Orang Tua/Saudara)' },
  { code: 'N', text: 'Tetangga' },
  { code: 'O', text: 'Lainnya' }
]

// Initialize form with user data
onMounted(() => {
  initRegistrationForm()
})

// Function to initialize form with user data
const initRegistrationForm = () => {
  const patientDetails = props.userData.patient_details || {}
  
  // Fill in basic information from user data
  registrationForm.nik = patientDetails.nik || ''
  registrationForm.name = patientDetails.name || ''
  registrationForm.gender = patientDetails.gender || 'male'
  registrationForm.birthdate = patientDetails.birthdate || ''
  registrationForm.contact_telecom_value = patientDetails.telecom || ''
  
  // Parse address if available
  if (patientDetails.address) {
    registrationForm.address_line = patientDetails.address
  }
  
  // Load provinces on initialization
  fetchProvinces()
}

// Function to fetch provinces
const fetchProvinces = async () => {
  try {
    isLoadingAreaCodes.value = true
    areaCodeError.value = null
    
    console.log('Fetching provinces from emsifa API')
    
    // Set a timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    // Try with CORS proxy
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json'
    
    try {
      const response = await fetch(corsProxy + apiUrl, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Origin': window.location.origin
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Province data fetched successfully via CORS proxy:', data.length, 'provinces found')
      
      // The emsifa API already returns data in format [{id, name}]
      provinces.value = data.map(province => ({
        code: province.id,
        name: province.name
      }))
      
    } catch (corsError) {
      console.error('CORS proxy fetch failed:', corsError)
      // Fall back to hardcoded data if CORS proxy fails
      throw new Error('CORS issue: Unable to fetch from API directly. Using fallback data.')
    }
    
    clearTimeout(timeoutId)
    console.log(`Successfully loaded ${provinces.value.length} provinces`)
    
  } catch (err) {
    console.error('Error fetching provinces:', err)
    areaCodeError.value = `Gagal memuat data provinsi. ${err.message || 'Network error'}. Menggunakan data cadangan.`
    
    // Use hardcoded provinces since the API is unavailable
    provinces.value = [
      { code: '11', name: 'ACEH' },
      { code: '12', name: 'SUMATERA UTARA' },
      { code: '13', name: 'SUMATERA BARAT' },
      { code: '14', name: 'RIAU' },
      { code: '15', name: 'JAMBI' },
      { code: '16', name: 'SUMATERA SELATAN' },
      { code: '17', name: 'BENGKULU' },
      { code: '18', name: 'LAMPUNG' },
      { code: '19', name: 'KEPULAUAN BANGKA BELITUNG' },
      { code: '21', name: 'KEPULAUAN RIAU' },
      { code: '31', name: 'DKI JAKARTA' },
      { code: '32', name: 'JAWA BARAT' },
      { code: '33', name: 'JAWA TENGAH' },
      { code: '34', name: 'DI YOGYAKARTA' },
      { code: '35', name: 'JAWA TIMUR' },
      { code: '36', name: 'BANTEN' },
      { code: '51', name: 'BALI' },
      { code: '52', name: 'NUSA TENGGARA BARAT' },
      { code: '53', name: 'NUSA TENGGARA TIMUR' },
      { code: '61', name: 'KALIMANTAN BARAT' },
      { code: '62', name: 'KALIMANTAN TENGAH' },
      { code: '63', name: 'KALIMANTAN SELATAN' },
      { code: '64', name: 'KALIMANTAN TIMUR' },
      { code: '65', name: 'KALIMANTAN UTARA' },
      { code: '71', name: 'SULAWESI UTARA' },
      { code: '72', name: 'SULAWESI TENGAH' },
      { code: '73', name: 'SULAWESI SELATAN' },
      { code: '74', name: 'SULAWESI TENGGARA' },
      { code: '75', name: 'GORONTALO' },
      { code: '76', name: 'SULAWESI BARAT' },
      { code: '81', name: 'MALUKU' },
      { code: '82', name: 'MALUKU UTARA' },
      { code: '91', name: 'PAPUA BARAT' },
      { code: '94', name: 'PAPUA' }
    ]
    console.log('Using hardcoded fallback province data')
  } finally {
    isLoadingAreaCodes.value = false
  }
}

// Static data for cities by province ID
const staticCitiesData = {
  // DI Yogyakarta
  '34': [
    { code: '3401', name: 'KABUPATEN KULON PROGO' },
    { code: '3402', name: 'KABUPATEN BANTUL' },
    { code: '3403', name: 'KABUPATEN GUNUNG KIDUL' },
    { code: '3404', name: 'KABUPATEN SLEMAN' },
    { code: '3471', name: 'KOTA YOGYAKARTA' }
  ],
  // Jakarta
  '31': [
    { code: '3101', name: 'KABUPATEN KEPULAUAN SERIBU' },
    { code: '3171', name: 'KOTA JAKARTA PUSAT' },
    { code: '3172', name: 'KOTA JAKARTA UTARA' },
    { code: '3173', name: 'KOTA JAKARTA BARAT' },
    { code: '3174', name: 'KOTA JAKARTA SELATAN' },
    { code: '3175', name: 'KOTA JAKARTA TIMUR' }
  ],
  // Jawa Barat
  '32': [
    { code: '3201', name: 'KABUPATEN BOGOR' },
    { code: '3202', name: 'KABUPATEN SUKABUMI' },
    { code: '3203', name: 'KABUPATEN CIANJUR' },
    { code: '3204', name: 'KABUPATEN BANDUNG' },
    { code: '3205', name: 'KABUPATEN GARUT' },
    { code: '3206', name: 'KABUPATEN TASIKMALAYA' },
    { code: '3207', name: 'KABUPATEN CIAMIS' },
    { code: '3208', name: 'KABUPATEN KUNINGAN' },
    { code: '3209', name: 'KABUPATEN CIREBON' },
    { code: '3210', name: 'KABUPATEN MAJALENGKA' },
    { code: '3211', name: 'KABUPATEN SUMEDANG' },
    { code: '3212', name: 'KABUPATEN INDRAMAYU' },
    { code: '3213', name: 'KABUPATEN SUBANG' },
    { code: '3214', name: 'KABUPATEN PURWAKARTA' },
    { code: '3215', name: 'KABUPATEN KARAWANG' },
    { code: '3216', name: 'KABUPATEN BEKASI' },
    { code: '3217', name: 'KABUPATEN BANDUNG BARAT' },
    { code: '3218', name: 'KABUPATEN PANGANDARAN' },
    { code: '3271', name: 'KOTA BOGOR' },
    { code: '3272', name: 'KOTA SUKABUMI' },
    { code: '3273', name: 'KOTA BANDUNG' },
    { code: '3274', name: 'KOTA CIREBON' },
    { code: '3275', name: 'KOTA BEKASI' },
    { code: '3276', name: 'KOTA DEPOK' },
    { code: '3277', name: 'KOTA CIMAHI' },
    { code: '3278', name: 'KOTA TASIKMALAYA' },
    { code: '3279', name: 'KOTA BANJAR' }
  ]
}

// Static data for districts by city ID
const staticDistrictsData = {
  // Kabupaten Sleman
  '3404': [
    { code: '3404010', name: 'MOYUDAN' },
    { code: '3404020', name: 'MINGGIR' },
    { code: '3404030', name: 'SEYEGAN' },
    { code: '3404040', name: 'GODEAN' },
    { code: '3404050', name: 'GAMPING' },
    { code: '3404060', name: 'MLATI' },
    { code: '3404070', name: 'DEPOK' },
    { code: '3404080', name: 'BERBAH' },
    { code: '3404090', name: 'PRAMBANAN' },
    { code: '3404100', name: 'KALASAN' },
    { code: '3404110', name: 'NGEMPLAK' },
    { code: '3404120', name: 'NGAGLIK' },
    { code: '3404130', name: 'SLEMAN' },
    { code: '3404140', name: 'TEMPEL' },
    { code: '3404150', name: 'TURI' },
    { code: '3404160', name: 'PAKEM' },
    { code: '3404170', name: 'CANGKRINGAN' }
  ]
}

// Static data for villages by district ID
const staticVillagesData = {
  // Kecamatan KALASAN
  '3404100': [
    { code: '3404100001', name: 'PURWO MARTANI' },
    { code: '3404100002', name: 'TIRTO MARTANI' },
    { code: '3404100003', name: 'TAMAN MARTANI' },
    { code: '3404100004', name: 'SELO MARTANI' }
  ]
}

// Function to fetch cities based on selected province
const fetchCities = async (provinceCode) => {
  if (!provinceCode) {
    cities.value = []
    districts.value = []
    villages.value = []
    return
  }
  
  try {
    isLoadingAreaCodes.value = true
    areaCodeError.value = null
    
    // Clear dependent dropdowns
    districts.value = []
    villages.value = []
    registrationForm.address_city_code = ''
    registrationForm.address_district_code = ''
    registrationForm.address_village_code = ''
    
    // Check if we have static data for this province
    if (staticCitiesData[provinceCode]) {
      console.log(`Using static data for cities in province ${provinceCode}`)
      cities.value = staticCitiesData[provinceCode]
      console.log(`Loaded ${cities.value.length} cities from static data`)
      return
    }
    
    console.log(`Fetching regencies/cities for province ${provinceCode}`)
    
    // Set a timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    try {
      // Try with CORS proxy
      const corsProxy = 'https://cors-anywhere.herokuapp.com/'
      const apiUrl = `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceCode}.json`
      
      const response = await fetch(corsProxy + apiUrl, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Origin': window.location.origin
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('City data fetched successfully via CORS proxy:', data.length, 'cities found')
      
      // Map the data to match our expected format
      cities.value = data.map(city => ({
        code: city.id,
        name: city.name
      }))
    } catch (corsError) {
      console.error('CORS proxy fetch failed:', corsError)
      throw new Error('CORS issue: Unable to fetch from API directly')
    }
    
    console.log(`Successfully loaded ${cities.value.length} cities for province ${provinceCode}`)
    
  } catch (err) {
    console.error('Error fetching cities:', err)
    areaCodeError.value = `Gagal memuat data kota/kabupaten. ${err.message || 'Network error'}. Silakan pilih provinsi lain atau hubungi administrator.`
    
    // Reset to empty if there was an error and no static data
    cities.value = []
  } finally {
    isLoadingAreaCodes.value = false
  }
}

// Function to fetch districts based on selected city
const fetchDistricts = async (cityCode) => {
  if (!cityCode) {
    districts.value = []
    villages.value = []
    return
  }
  
  try {
    isLoadingAreaCodes.value = true
    areaCodeError.value = null
    
    // Clear dependent dropdown
    villages.value = []
    registrationForm.address_district_code = ''
    registrationForm.address_village_code = ''
    
    // Check if we have static data for this city
    if (staticDistrictsData[cityCode]) {
      console.log(`Using static data for districts in city ${cityCode}`)
      districts.value = staticDistrictsData[cityCode]
      console.log(`Loaded ${districts.value.length} districts from static data`)
      return
    }
    
    console.log(`Fetching districts for regency/city ${cityCode}`)
    
    // Set a timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    try {
      // Try with CORS proxy
      const corsProxy = 'https://cors-anywhere.herokuapp.com/'
      const apiUrl = `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityCode}.json`
      
      const response = await fetch(corsProxy + apiUrl, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Origin': window.location.origin
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('District data fetched successfully via CORS proxy:', data.length, 'districts found')
      
      // Map the data to match our expected format
      districts.value = data.map(district => ({
        code: district.id,
        name: district.name
      }))
    } catch (corsError) {
      console.error('CORS proxy fetch failed:', corsError)
      throw new Error('CORS issue: Unable to fetch from API directly')
    }
    
    console.log(`Successfully loaded ${districts.value.length} districts for city ${cityCode}`)
    
  } catch (err) {
    console.error('Error fetching districts:', err)
    areaCodeError.value = `Gagal memuat data kecamatan. ${err.message || 'Network error'}. Silakan pilih kota/kabupaten lain atau hubungi administrator.`
    
    // Reset to empty if there was an error and no static data
    districts.value = []
  } finally {
    isLoadingAreaCodes.value = false
  }
}

// Function to fetch villages based on selected district
const fetchVillages = async (districtCode) => {
  if (!districtCode) {
    villages.value = []
    return
  }
  
  try {
    isLoadingAreaCodes.value = true
    areaCodeError.value = null
    
    registrationForm.address_village_code = ''
    
    // Check if we have static data for this district
    if (staticVillagesData[districtCode]) {
      console.log(`Using static data for villages in district ${districtCode}`)
      villages.value = staticVillagesData[districtCode]
      console.log(`Loaded ${villages.value.length} villages from static data`)
      return
    }
    
    console.log(`Fetching villages for district ${districtCode}`)
    
    // Set a timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    try {
      // Try with CORS proxy
      const corsProxy = 'https://cors-anywhere.herokuapp.com/'
      const apiUrl = `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtCode}.json`
      
      const response = await fetch(corsProxy + apiUrl, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Origin': window.location.origin
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Village data fetched successfully via CORS proxy:', data.length, 'villages found')
      
      // Map the data to match our expected format
      villages.value = data.map(village => ({
        code: village.id,
        name: village.name
      }))
    } catch (corsError) {
      console.error('CORS proxy fetch failed:', corsError)
      throw new Error('CORS issue: Unable to fetch from API directly')
    }
    
    console.log(`Successfully loaded ${villages.value.length} villages for district ${districtCode}`)
    
  } catch (err) {
    console.error('Error fetching villages:', err)
    areaCodeError.value = `Gagal memuat data kelurahan/desa. ${err.message || 'Network error'}. Silakan pilih kecamatan lain atau hubungi administrator.`
    
    // Reset to empty if there was an error and no static data
    villages.value = []
  } finally {
    isLoadingAreaCodes.value = false
  }
}

// Watch for province changes
const handleProvinceChange = () => {
  fetchCities(registrationForm.address_province_code)
}

// Watch for city changes
const handleCityChange = () => {
  // Find the selected city name
  const selectedCity = cities.value.find(city => city.code === registrationForm.address_city_code)
  if (selectedCity) {
    registrationForm.address_city = selectedCity.name
  }
  
  fetchDistricts(registrationForm.address_city_code)
}

// Watch for district changes
const handleDistrictChange = () => {
  fetchVillages(registrationForm.address_district_code)
}

// Set marital status text based on code
const handleMaritalStatusChange = () => {
  const selected = maritalStatusOptions.find(option => option.code === registrationForm.marital_status_code)
  if (selected) {
    registrationForm.marital_status_text = selected.text
  }
}

// Validate registration form
const validateRegistrationForm = () => {
  // Required fields
  const requiredFields = [
    'nik', 'name', 'gender', 'birthdate', 'address_line', 'address_postal_code',
    'address_province_code', 'address_city_code', 'address_district_code', 'address_village_code',
    'address_rt', 'address_rw', 'marital_status_code', 'contact_name_text', 'contact_telecom_value'
  ]
  
  for (const field of requiredFields) {
    if (!registrationForm[field]) {
      registrationError.value = `Mohon lengkapi field ${field.replace(/_/g, ' ')}`
      return false
    }
  }
  
  return true
}

// Register function to handle form submission
const register = async () => {
  if (isRegistering.value) return
  
  // Validate form
  if (!validateRegistrationForm()) {
    return
  }
  
  isRegistering.value = true
  registrationError.value = null
  
  try {
    const token = localStorage.getItem('authToken')
    if (!token) {
      throw new Error('Anda harus login untuk mendaftar kunjungan')
    }
    
    // Create visit registration payload
    const visitPayload = {
      nik: registrationForm.nik,
      name: registrationForm.name,
      gender: registrationForm.gender,
      birthdate: registrationForm.birthdate,
      address_use: registrationForm.address_use,
      address_line: [registrationForm.address_line],
      address_city: registrationForm.address_city,
      address_postal_code: registrationForm.address_postal_code,
      address_country: registrationForm.address_country,
      address_province_code: registrationForm.address_province_code,
      address_city_code: registrationForm.address_city_code,
      address_district_code: registrationForm.address_district_code,
      address_village_code: registrationForm.address_village_code,
      address_rt: registrationForm.address_rt,
      address_rw: registrationForm.address_rw,
      marital_status_code: registrationForm.marital_status_code,
      marital_status_text: registrationForm.marital_status_text,
      contact_relationship_code: registrationForm.contact_relationship_code,
      contact_name_text: registrationForm.contact_name_text,
      contact_telecom_system: registrationForm.contact_telecom_system,
      contact_telecom_value: registrationForm.contact_telecom_value,
      contact_telecom_use: registrationForm.contact_telecom_use,
      // Add screening results to payload
      screeningResults: props.screeningResults
    }
    
    console.log('Registering Satu Sehat visit with data:', visitPayload)
    
    // Call middleware service to register patient and visit
    const response = await middlewareService.registerPatientAndVisitSatusehat(visitPayload, token)
    
    if (response && response.data) {
      console.log('Visit registration successful:', response.data)
      emit('registration-success')
    } else {
      throw new Error('Respon pendaftaran tidak valid')
    }
  } catch (err) {
    console.error('Error registering visit:', err)
    registrationError.value = err.message || 'Gagal mendaftar kunjungan. Silakan coba lagi.'
    emit('registration-error', registrationError.value)
  } finally {
    isRegistering.value = false
  }
}
</script>

<style scoped>
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