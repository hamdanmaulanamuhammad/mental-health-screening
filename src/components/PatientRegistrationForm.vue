<template>
  <div class="mt-8 p-6 bg-white rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Form Pendaftaran Pasien Lengkap</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- NIK -->
      <div class="flex flex-col">
        <label for="nik" class="text-sm font-medium text-gray-700">NIK</label>
        <input id="nik" v-model="registrationForm.nik" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>
      
      <!-- Nama -->
      <div class="flex flex-col">
        <label for="name" class="text-sm font-medium text-gray-700">Nama</label>
        <input id="name" v-model="registrationForm.name" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>

      <!-- Gender -->
      <div class="flex flex-col">
        <label for="gender" class="text-sm font-medium text-gray-700">Jenis Kelamin</label>
        <select id="gender" v-model="registrationForm.gender" class="mt-1 block w-full border-gray-300 rounded-md">
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
      </div>

      <!-- Birthdate -->
      <div class="flex flex-col">
        <label for="birthdate" class="text-sm font-medium text-gray-700">Tanggal Lahir</label>
        <input id="birthdate" v-model="registrationForm.birthdate" type="date" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>

      <!-- Alamat -->
      <div class="flex flex-col md:col-span-2">
        <label for="address_line" class="text-sm font-medium text-gray-700">Alamat</label>
        <input id="address_line" v-model="registrationForm.address_line" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>
      
      <!-- Provinsi -->
      <div class="flex flex-col">
        <label for="address_province_code" class="text-sm font-medium text-gray-700">Provinsi</label>
        <select id="address_province_code" v-model="registrationForm.address_province_code" @change="handleProvinceChange" class="mt-1 block w-full border-gray-300 rounded-md" :disabled="isLoadingAreaCodes">
          <option value="">Pilih Provinsi</option>
          <option v-for="province in provinces" :key="province.code" :value="province.code">{{ province.name }}</option>
        </select>
      </div>

      <!-- Kota/Kabupaten -->
      <div class="flex flex-col">
        <label for="address_city_code" class="text-sm font-medium text-gray-700">Kota/Kabupaten</label>
        <select id="address_city_code" v-model="registrationForm.address_city_code" @change="handleCityChange" class="mt-1 block w-full border-gray-300 rounded-md" :disabled="!registrationForm.address_province_code || isLoadingAreaCodes">
          <option value="">Pilih Kota/Kabupaten</option>
          <option v-for="city in cities" :key="city.code" :value="city.code">{{ city.name }}</option>
        </select>
      </div>

      <!-- Kecamatan -->
      <div class="flex flex-col">
        <label for="address_district_code" class="text-sm font-medium text-gray-700">Kecamatan</label>
        <select id="address_district_code" v-model="registrationForm.address_district_code" @change="handleDistrictChange" class="mt-1 block w-full border-gray-300 rounded-md" :disabled="!registrationForm.address_city_code || isLoadingAreaCodes">
          <option value="">Pilih Kecamatan</option>
          <option v-for="district in districts" :key="district.code" :value="district.code">{{ district.name }}</option>
        </select>
      </div>

      <!-- Kelurahan/Desa -->
      <div class="flex flex-col">
        <label for="address_village_code" class="text-sm font-medium text-gray-700">Kelurahan/Desa</label>
        <select id="address_village_code" v-model="registrationForm.address_village_code" class="mt-1 block w-full border-gray-300 rounded-md" :disabled="!registrationForm.address_district_code || isLoadingAreaCodes">
          <option value="">Pilih Kelurahan/Desa</option>
          <option v-for="village in villages" :key="village.code" :value="village.code">{{ village.name }}</option>
        </select>
      </div>
      
      <!-- Kode Pos -->
      <div class="flex flex-col">
          <label for="address_postal_code" class="text-sm font-medium text-gray-700">Kode Pos</label>
          <input id="address_postal_code" v-model="registrationForm.address_postal_code" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>

      <!-- RT -->
      <div class="flex flex-col">
        <label for="address_rt" class="text-sm font-medium text-gray-700">RT</label>
        <input id="address_rt" v-model="registrationForm.address_rt" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>

      <!-- RW -->
      <div class="flex flex-col">
        <label for="address_rw" class="text-sm font-medium text-gray-700">RW</label>
        <input id="address_rw" v-model="registrationForm.address_rw" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>

      <!-- Marital Status -->
      <div class="flex flex-col">
        <label for="marital_status_code" class="text-sm font-medium text-gray-700">Status Perkawinan</label>
        <select id="marital_status_code" v-model="registrationForm.marital_status_code" @change="handleMaritalStatusChange" class="mt-1 block w-full border-gray-300 rounded-md">
          <option value="">Pilih Status</option>
          <option v-for="option in maritalStatusOptions" :key="option.code" :value="option.code">{{ option.text }}</option>
        </select>
      </div>

      <!-- Contact Name -->
      <div class="flex flex-col">
        <label for="contact_name_text" class="text-sm font-medium text-gray-700">Nama Kontak Darurat</label>
        <input id="contact_name_text" v-model="registrationForm.contact_name_text" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>

      <!-- Contact Relationship -->
      <div class="flex flex-col">
        <label for="contact_relationship_code" class="text-sm font-medium text-gray-700">Hubungan Kontak</label>
        <select id="contact_relationship_code" v-model="registrationForm.contact_relationship_code" class="mt-1 block w-full border-gray-300 rounded-md">
          <option value="">Pilih Hubungan</option>
          <option v-for="option in contactRelationshipOptions" :key="option.code" :value="option.code">{{ option.text }}</option>
        </select>
      </div>

      <!-- Contact Telecom Value -->
      <div class="flex flex-col">
        <label for="contact_telecom_value" class="text-sm font-medium text-gray-700">Nomor Telepon Kontak</label>
        <input id="contact_telecom_value" v-model="registrationForm.contact_telecom_value" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>
      
      <!-- Area Code Error -->
      <div v-if="areaCodeError" class="md:col-span-2 mt-2 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {{ areaCodeError }}
      </div>

      <!-- Registration Error -->
      <div v-if="registrationError" class="md:col-span-2 mt-2 p-3 bg-red-50 text-red-600 rounded-md text-sm">
        {{ registrationError }}
      </div>
    </div>
    
    <div class="mt-8 flex justify-center">
      <button @click="registerPatient" :disabled="isRegistering" class="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg">
        {{ isRegistering ? 'Mendaftarkan...' : 'Daftarkan Pasien' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import middlewareService from '../services/middlewareService.js';

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['registration-success', 'registration-error']);

const isRegistering = ref(false);
const registrationError = ref(null);
const isLoadingAreaCodes = ref(false);
const areaCodeError = ref(null);

const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const villages = ref([]);

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
  contact_telecom_use: 'mobile',
  communication_language_code: 'id-ID',
  communication_language_text: 'Indonesian',
  communication_preferred: true
});

const maritalStatusOptions = [
  { code: 'M', text: 'Married' },
  { code: 'S', text: 'Single' },
  { code: 'D', text: 'Divorced' },
  { code: 'W', text: 'Widowed' }
];

const contactRelationshipOptions = [
  { code: 'C', text: 'Keluarga Inti (Suami/Istri/Anak)' },
  { code: 'F', text: 'Keluarga Besar (Orang Tua/Saudara)' },
  { code: 'N', text: 'Tetangga' },
  { code: 'O', text: 'Lainnya' }
];

onMounted(() => {
  const patientDetails = props.userData.patient_details || {};
  registrationForm.nik = patientDetails.nik || '';
  registrationForm.name = patientDetails.name || '';
  registrationForm.gender = patientDetails.gender || 'male';
  registrationForm.birthdate = patientDetails.birthdate || '';
  registrationForm.contact_telecom_value = patientDetails.telecom || '';
  if (patientDetails.address) {
    registrationForm.address_line = patientDetails.address;
  }
  fetchProvinces();
});

const fetchWilayah = async (url, type) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Gagal mengambil data ${type}`);
    const data = await response.json();
    return data.map(item => ({ code: item.kode, name: item.nama }));
  } catch (err) {
    console.error(`Error fetching ${type}:`, err);
    areaCodeError.value = `Gagal memuat data ${type}. ${err.message || 'Network error'}`;
    return [];
  }
};

const fetchProvinces = async () => {
  isLoadingAreaCodes.value = true;
  provinces.value = await fetchWilayah('https://wilayah-api-psi.vercel.app/api/provinsi', 'provinsi');
  isLoadingAreaCodes.value = false;
};

const handleProvinceChange = async () => {
  isLoadingAreaCodes.value = true;
  areaCodeError.value = null;
  registrationForm.address_city_code = '';
  registrationForm.address_district_code = '';
  registrationForm.address_village_code = '';
  cities.value = [];
  districts.value = [];
  villages.value = [];
  if (registrationForm.address_province_code) {
    cities.value = await fetchWilayah(`https://wilayah-api-psi.vercel.app/api/kabupaten?kode_provinsi=${registrationForm.address_province_code}`, 'kota/kabupaten');
  }
  isLoadingAreaCodes.value = false;
};

const handleCityChange = async () => {
  isLoadingAreaCodes.value = true;
  areaCodeError.value = null;
  registrationForm.address_district_code = '';
  registrationForm.address_village_code = '';
  districts.value = [];
  villages.value = [];
  const selectedCity = cities.value.find(c => c.code === registrationForm.address_city_code);
  if (selectedCity) registrationForm.address_city = selectedCity.name;

  if (registrationForm.address_city_code) {
    districts.value = await fetchWilayah(`https://wilayah-api-psi.vercel.app/api/kecamatan?kode_kabupaten=${registrationForm.address_city_code}`, 'kecamatan');
  }
  isLoadingAreaCodes.value = false;
};

const handleDistrictChange = async () => {
  isLoadingAreaCodes.value = true;
  areaCodeError.value = null;
  registrationForm.address_village_code = '';
  villages.value = [];
  if (registrationForm.address_district_code) {
    villages.value = await fetchWilayah(`https://wilayah-api-psi.vercel.app/api/kelurahan?kode_kecamatan=${registrationForm.address_district_code}`, 'kelurahan/desa');
  }
  isLoadingAreaCodes.value = false;
};

const handleMaritalStatusChange = () => {
  const selected = maritalStatusOptions.find(opt => opt.code === registrationForm.marital_status_code);
  if (selected) registrationForm.marital_status_text = selected.text;
};

const validateForm = () => {
  const requiredFields = [
    'nik', 'name', 'gender', 'birthdate', 'address_line', 'address_postal_code',
    'address_province_code', 'address_city_code', 'address_district_code', 'address_village_code',
    'address_rt', 'address_rw', 'marital_status_code', 'contact_name_text', 'contact_telecom_value',
    'contact_relationship_code'
  ];
  for (const field of requiredFields) {
    if (!registrationForm[field]) {
      registrationError.value = `Mohon lengkapi semua field. Field '${field.replace(/_/g, ' ')}' wajib diisi.`;
      return false;
    }
  }
  registrationError.value = null;
  return true;
};

const registerPatient = async () => {
  if (!validateForm()) return;

  isRegistering.value = true;
  registrationError.value = null;

  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Anda harus login untuk mendaftar.');

    const payload = {
      ...registrationForm,
      address_line: [registrationForm.address_line]
    };
    
    const response = await middlewareService.registerPatient(payload, token);
    
    if (response.data && response.data.patient_id) {
      emit('registration-success', { 
        patientId: response.data.patient_id, 
        patientName: registrationForm.name 
      });
    } else {
      throw new Error('Respon pendaftaran pasien tidak valid.');
    }
  } catch (err) {
    console.error('Error registering patient:', err);
    registrationError.value = err.response?.data?.message || err.message || 'Gagal mendaftarkan pasien.';
    emit('registration-error', registrationError.value);
  } finally {
    isRegistering.value = false;
  }
};
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  .text-xl {
    font-size: 1.125rem;
  }
  .p-6 {
    padding: 1rem;
  }
}
</style>