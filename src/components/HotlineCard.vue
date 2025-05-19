<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <!-- Icon and Title -->
    <div class="flex items-center mb-4">
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
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        ></path>
      </svg>
      <h3 class="text-2xl font-semibold text-gray-900">{{ hotline.name }}</h3>
    </div>
    <!-- Description -->
    <p class="text-gray-600 mb-6 leading-relaxed">{{ hotline.description }}</p>
    <!-- Number and Button -->
    <div class="flex items-center justify-between">
      <a
        :href="`tel:${hotline.number}`"
        class="text-teal-600 font-semibold text-lg hover:text-teal-800 transition-all duration-200"
      >
        {{ hotline.number }}
      </a>
      <a
        :href="`tel:${hotline.number}`"
        class="inline-block bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Hubungi Sekarang
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  hotline: {
    type: Object,
    required: true,
    validator: (hotline) => ['name', 'number', 'description'].every((key) => key in hotline),
  },
})
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
  .text-lg {
    font-size: 1rem;
  }
  .p-8 {
    padding: 1.5rem;
  }
}
</style>
