<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
    <h3 class="text-xl font-medium text-gray-800 mb-2">{{ hotline.name }}</h3>
    <p class="text-gray-600 mb-4">{{ hotline.description }}</p>
    <div class="flex items-center justify-between">
      <a
        :href="`tel:${hotline.number}`"
        class="text-teal-500 font-medium hover:text-teal-700 transition duration-200"
      >
        {{ hotline.number }}
      </a>
      <a
        :href="`tel:${hotline.number}`"
        class="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-200"
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
