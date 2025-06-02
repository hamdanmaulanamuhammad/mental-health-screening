<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
  >
    <!-- Icon and Title -->
    <div class="flex items-center mb-6">
      <svg
        class="w-8 h-8 text-teal-600 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>
      <h3 class="text-2xl font-semibold text-gray-900">Profil Anda</h3>
    </div>
    <!-- View Mode -->
    <div v-if="!isEditing">
      <div class="space-y-5">
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-36">Nama Lengkap:</span>
          <span class="text-gray-600">{{ user.name }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-36">Email:</span>
          <span class="text-gray-600">{{ user.email }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-36">NIK:</span>
          <span class="text-gray-600">{{ user.nik }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-36">Tanggal Lahir:</span>
          <span class="text-gray-600">{{ user.birthdate }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-36">Jenis Kelamin:</span>
          <span class="text-gray-600">{{ displayGender(user.gender) }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-36">No. Telepon:</span>
          <span class="text-gray-600">{{ user.telecom }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-36">Alamat:</span>
          <span class="text-gray-600">{{ user.address }}</span>
        </p>
      </div>
      <button
        @click="isEditing = true"
        class="mt-8 w-full bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Edit Profil
      </button>
    </div>
    <!-- Edit Mode -->
    <form v-else @submit.prevent="saveProfile">
      <div class="space-y-6">
        <div>
          <label for="name" class="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
          <input
            id="name"
            v-model="editedUser.name"
            type="text"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.name }"
          />
        </div>
        <div>
          <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            id="email"
            v-model="editedUser.email"
            type="email"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.email }"
          />
        </div>
        <div>
          <label for="nik" class="block text-gray-700 font-semibold mb-2">NIK</label>
          <input
            id="nik"
            v-model="editedUser.nik"
            type="text"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.nik }"
          />
        </div>
        <div>
          <label for="birthdate" class="block text-gray-700 font-semibold mb-2">Tanggal Lahir</label>
          <input
            id="birthdate"
            v-model="editedUser.birthdate"
            type="date"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.birthdate }"
          />
        </div>
        <div>
          <label for="gender" class="block text-gray-700 font-semibold mb-2">Jenis Kelamin</label>
          <select
            id="gender"
            v-model="editedUser.gender"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.gender }"
          >
            <option value="" disabled>Pilih jenis kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
            <!-- <option value="Lainnya">Lainnya</option> -->
          </select>
        </div>
        <div>
          <label for="telecom" class="block text-gray-700 font-semibold mb-2">No. Telepon</label>
          <input
            id="telecom"
            v-model="editedUser.telecom"
            type="tel"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.telecom }"
          />
        </div>
        <div>
          <label for="address" class="block text-gray-700 font-semibold mb-2">Alamat</label>
          <textarea
            id="address"
            v-model="editedUser.address"
            rows="3"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.address }"
          ></textarea>
        </div>
      </div>
      <p v-if="error" class="text-red-500 text-sm mt-4 font-medium">{{ error }}</p>
      <div class="mt-8 flex space-x-4">
        <button
          type="button"
          @click="isEditing = false"
          class="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
        >
          Batal
        </button>
        <button
          type="submit"
          class="flex-1 px-6 py-3 text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
          :disabled="loading"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      email: '',
      name: '',
      nik: '',
      birthdate: '',
      gender: '',
      telecom: '',
      address: ''
    }),
    validator: (user) => {
      const expectedKeys = ['email', 'name', 'nik', 'birthdate', 'gender', 'telecom', 'address'];
      if (Object.keys(user).length === 0) return true; 
      return expectedKeys.every((key) => key in user);
    },
  },
})

const emit = defineEmits(['update:user'])

const isEditing = ref(false)
const error = ref('')
const loading = ref(false)

const editedUser = reactive({
  email: props.user.email || '',
  name: props.user.name || '',
  nik: props.user.nik || '',
  birthdate: props.user.birthdate || '',
  gender: props.user.gender === 'male' ? 'Laki-laki' : (props.user.gender === 'female' ? 'Perempuan' : ''),
  telecom: props.user.telecom || '',
  address: props.user.address || ''
});

watch(() => props.user, (newUser) => {
  editedUser.email = newUser.email || '';
  editedUser.name = newUser.name || '';
  editedUser.nik = newUser.nik || '';
  editedUser.birthdate = newUser.birthdate || '';
  editedUser.gender = newUser.gender === 'male' ? 'Laki-laki' : (newUser.gender === 'female' ? 'Perempuan' : '');
  editedUser.telecom = newUser.telecom || '';
  editedUser.address = newUser.address || '';
}, { deep: true });

const displayGender = (genderValue) => {
  if (genderValue === 'male') return 'Laki-laki';
  if (genderValue === 'female') return 'Perempuan';
  return genderValue;
};

const saveProfile = async () => {
  error.value = ''
  loading.value = true

  try {
    // Validation for new fields
    if (
      !editedUser.name ||
      !editedUser.email ||
      !editedUser.nik ||
      !editedUser.birthdate ||
      !editedUser.gender || // This is 'Laki-laki'/'Perempuan' from the form
      !editedUser.telecom ||
      !editedUser.address
    ) {
      error.value = 'Semua kolom harus diisi'
      loading.value = false;
      return
    }
    // Add any other specific validations if needed (e.g., NIK format, phone format, birthdate sanity)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Map gender back to backend format before emitting
    let genderToEmit = editedUser.gender; // Default to form value
    if (editedUser.gender === 'Laki-laki') {
      genderToEmit = 'male';
    } else if (editedUser.gender === 'Perempuan') {
      genderToEmit = 'female';
    }

    // Emit updated user data in the structure expected by the backend/parent
    emit('update:user', {
      email: editedUser.email,
      // These fields are part of patient_details for the backend, 
      // but Profile.vue will handle nesting it if needed before an API call.
      // For now, emit a flat structure that Profile.vue can then process.
      name: editedUser.name,
      nik: editedUser.nik,
      birthdate: editedUser.birthdate,
      gender: genderToEmit, // male/female
      telecom: editedUser.telecom,
      address: editedUser.address,
    })
    isEditing.value = false
  } catch (err) {
    console.error('Error saving profile:', err);
    error.value = 'Gagal menyimpan profil. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
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
  .text-2xl {
    font-size: 1.5rem;
  }
  .text-xl {
    font-size: 1.125rem;
  }
  .p-8 {
    padding: 1.5rem;
  }
  .w-36 {
    width: 100px;
  }
}
</style>
