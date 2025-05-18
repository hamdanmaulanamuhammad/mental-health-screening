<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-medium text-gray-800 mb-4">Profil Anda</h3>
    <div v-if="!isEditing">
      <div class="space-y-4">
        <p><span class="font-medium text-gray-700">Nama Lengkap:</span> {{ user.fullName }}</p>
        <p><span class="font-medium text-gray-700">Email:</span> {{ user.email }}</p>
        <p><span class="font-medium text-gray-700">Umur:</span> {{ user.age }}</p>
        <p><span class="font-medium text-gray-700">Jenis Kelamin:</span> {{ user.gender }}</p>
      </div>
      <button
        @click="isEditing = true"
        class="mt-6 w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-200"
      >
        Edit Profil
      </button>
    </div>
    <form v-else @submit.prevent="saveProfile">
      <div class="space-y-4">
        <div>
          <label for="fullName" class="block text-gray-700 font-medium mb-1">Nama Lengkap</label>
          <input
            id="fullName"
            v-model="editedUser.fullName"
            type="text"
            class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            :class="{ 'border-red-400': error && !editedUser.fullName }"
          />
        </div>
        <div>
          <label for="email" class="block text-gray-700 font-medium mb-1">Email</label>
          <input
            id="email"
            v-model="editedUser.email"
            type="email"
            class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            :class="{ 'border-red-400': error && !editedUser.email }"
          />
        </div>
        <div>
          <label for="age" class="block text-gray-700 font-medium mb-1">Umur</label>
          <input
            id="age"
            v-model.number="editedUser.age"
            type="number"
            min="1"
            class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            :class="{ 'border-red-400': error && !editedUser.age }"
          />
        </div>
        <div>
          <label for="gender" class="block text-gray-700 font-medium mb-1">Jenis Kelamin</label>
          <select
            id="gender"
            v-model="editedUser.gender"
            class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            :class="{ 'border-red-400': error && !editedUser.gender }"
          >
            <option value="" disabled>Pilih jenis kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
      </div>
      <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
      <div class="mt-6 flex space-x-4">
        <button
          type="button"
          @click="isEditing = false"
          class="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Batal
        </button>
        <button
          type="submit"
          class="flex-1 px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
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
