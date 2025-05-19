<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <svg
              class="w-8 h-8 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span class="text-xl font-semibold text-gray-800">MentalCare</span>
          </router-link>
        </div>
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/home"
            class="text-gray-600 hover:text-teal-500 transition duration-200"
            active-class="text-teal-500 font-medium"
            >Home</router-link
          >
          <router-link
            to="/about"
            class="text-gray-600 hover:text-teal-500 transition duration-200"
            active-class="text-teal-500 font-medium"
            >About</router-link
          >
          <router-link
            to="/hotlines"
            class="text-gray-600 hover:text-teal-500 transition duration-200"
            active-class="text-teal-500 font-medium"
            >Hotlines</router-link
          >
          <router-link
            to="/rules"
            class="text-gray-600 hover:text-teal-500 transition duration-200"
            active-class="text-teal-500 font-medium"
            >Screening</router-link
          >
          <router-link
            to="/profile"
            class="text-gray-600 hover:text-teal-500 transition duration-200"
            active-class="text-teal-500 font-medium"
            >Profile</router-link
          >
          <button
            v-if="isAuthenticated"
            @click="logout"
            class="text-gray-600 hover:text-red-500 transition duration-200"
          >
            Logout
          </button>
        </div>
        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-gray-600 hover:text-teal-500 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          to="/"
          class="block px-3 py-2 text-gray-600 hover:text-teal-500 hover:bg-teal-50 rounded-md"
          active-class="text-teal-500 font-medium"
          >Home</router-link
        >
        <router-link
          to="/about"
          class="block px-3 py-2 text-gray-600 hover:text-teal-500 hover:bg-teal-50 rounded-md"
          active-class="text-teal-500 font-medium"
          >About</router-link
        >
        <router-link
          to="/hotlines"
          class="block px-3 py-2 text-gray-600 hover:text-teal-500 hover:bg-teal-50 rounded-md"
          active-class="text-teal-500 font-medium"
          >Hotlines</router-link
        >
        <router-link
          to="/screening"
          class="block px-3 py-2 text-gray-600 hover:text-teal-500 hover:bg-teal-50 rounded-md"
          active-class="text-teal-500 font-medium"
          >Screening</router-link
        >
        <router-link
          to="/profile"
          class="block px-3 py-2 text-gray-600 hover:text-teal-500 hover:bg-teal-50 rounded-md"
          active-class="text-teal-500 font-medium"
          >Profile</router-link
        >
        <button
          v-if="isAuthenticated"
          @click="logout"
          class="block w-full text-left px-3 py-2 text-gray-600 hover:text-red-500 hover:bg-teal-50 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const isAuthenticated = ref(false) // Replace with actual auth state
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = () => {
  // Add actual logout logic here (e.g., clear token, update auth state)
  isAuthenticated.value = false
  isMenuOpen.value = false
  router.push('/login')
}
</script>

<style scoped>
/* Ensure navbar stays above content */
nav {
  z-index: 50;
}
</style>
