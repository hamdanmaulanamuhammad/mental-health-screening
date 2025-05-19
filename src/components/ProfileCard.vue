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
          <span class="font-semibold text-gray-700 w-32">Nama Lengkap:</span>
          <span class="text-gray-600">{{ user.fullName }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-32">Email:</span>
          <span class="text-gray-600">{{ user.email }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-32">Umur:</span>
          <span class="text-gray-600">{{ user.age }}</span>
        </p>
        <p class="flex items-center">
          <span class="font-semibold text-gray-700 w-32">Jenis Kelamin:</span>
          <span class="text-gray-600">{{ user.gender }}</span>
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
          <label for="fullName" class="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
          <input
            id="fullName"
            v-model="editedUser.fullName"
            type="text"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.fullName }"
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
          <label for="age" class="block text-gray-700 font-semibold mb-2">Umur</label>
          <input
            id="age"
            v-model.number="editedUser.age"
            type="number"
            min="1"
            class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            :class="{ 'border-red-500': error && !editedUser.age }"
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
            <option value="Lainnya">Lainnya</option>
          </select>
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
import { ref, reactive } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (user) => ['fullName', 'email', 'age', 'gender'].every((key) => key in user),
  },
})

const emit = defineEmits(['update:user'])

const isEditing = ref(false)
const error = ref('')
const loading = ref(false)
const editedUser = reactive({ ...props.user })

const saveProfile = async () => {
  error.value = ''
  loading.value = true

  try {
    if (!editedUser.fullName || !editedUser.email || !editedUser.age || !editedUser.gender) {
      error.value = 'Semua kolom harus diisi'
      return
    }
    if (editedUser.age < 1) {
      error.value = 'Umur harus lebih dari 0'
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Emit updated user data
    emit('update:user', { ...editedUser })
    isEditing.value = false
  } catch (err) {
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
  .w-32 {
    width: 100px;
  }
}
</style>
