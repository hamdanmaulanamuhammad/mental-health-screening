<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <!-- Include the Navbar component -->
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 pt-20">
      <!-- Header Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Profil Anda
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-4xl mx-auto animate-fade-in-up">
          Kelola informasi pribadi Anda untuk pengalaman yang lebih personal.
        </p>
      </section>
      <!-- Profile Card -->
      <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProfileCard :user="user" @update:user="updateUser" />
      </section>
      <!-- Support CTA -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 animate-fade-in-down">Butuh Bantuan?</h2>
        <p class="text-xl text-gray-700 mb-8 animate-fade-in-up">
          Tim kami siap membantu Anda kapan saja.
        </p>
        <router-link
          to="/support"
          class="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Hubungi Dukungan
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ProfileCard from '../components/ProfileCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const user = ref({
  email: '',
  name: '',
  nik: '',
  birthdate: '',
  gender: '',
  telecom: '',
  address: ''
});

onMounted(() => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    const authUser = JSON.parse(userDataString);
    user.value.email = authUser.email || '';
    if (authUser.patient_details) {
      user.value.name = authUser.patient_details.name || '';
      user.value.nik = authUser.patient_details.nik || '';
      user.value.birthdate = authUser.patient_details.birthdate || '';
      user.value.gender = authUser.patient_details.gender || '';
      user.value.telecom = authUser.patient_details.telecom || '';
      user.value.address = authUser.patient_details.address || '';
    } else {
      console.warn('Patient details not found in user data from localStorage.');
    }
  } else {
    console.warn('User data not found in localStorage. Redirecting to login.');
    router.push('/login');
  }
});

const updateUser = async (updatedProfileData) => {
  console.log('Received updated profile data in Profile.vue:', updatedProfileData);

  const backendPayload = {
    email: updatedProfileData.email,
    patient_details: {
      name: updatedProfileData.name,
      nik: updatedProfileData.nik,
      birthdate: updatedProfileData.birthdate,
      gender: updatedProfileData.gender,
      telecom: updatedProfileData.telecom,
      address: updatedProfileData.address
    }
  };

  try {
    console.log('Simulating API call to update user profile with:', backendPayload);
    await new Promise(resolve => setTimeout(resolve, 1000));

    user.value = { ...user.value, ...updatedProfileData };

    const updatedAuthUser = {
        email: updatedProfileData.email,
        patient_details: {
            name: updatedProfileData.name,
            nik: updatedProfileData.nik,
            birthdate: updatedProfileData.birthdate,
            gender: updatedProfileData.gender,
            telecom: updatedProfileData.telecom,
            address: updatedProfileData.address
        }
    };

    const existingUserDataString = localStorage.getItem('userData');
    if(existingUserDataString){
        const existingAuthUser = JSON.parse(existingUserDataString);
        const finalUserDataToStore = {
            ...existingAuthUser,
            email: updatedProfileData.email,
            patient_details: backendPayload.patient_details
        };
        localStorage.setItem('userData', JSON.stringify(finalUserDataToStore));
        console.log('localStorage updated with new profile data.');
    } else {
        localStorage.setItem('userData', JSON.stringify(updatedAuthUser));
    }

    alert('Profil berhasil diperbarui (simulasi).');

  } catch (error) {
    console.error('Gagal memperbarui profil (simulasi):', error);
    alert('Gagal memperbarui profil (simulasi).');
  }
}
</script>

<style scoped>
/* Animations */
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.875rem;
  }
  p {
    font-size: 1.125rem;
  }
}
</style>
