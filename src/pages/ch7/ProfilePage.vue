<template>
  <q-page padding>
    <div class="text-h4 q-mb-lg">My Profile</div>

    <div v-if="loading" class="row justify-center q-mt-xl">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <q-banner v-else-if="error" rounded class="bg-red-1 text-negative">
      {{ error }}
    </q-banner>

    <q-card v-else-if="profile" bordered flat>
      <q-card-section>
        <div><strong>Name:</strong> {{ profile.name ?? profile.username }}</div>
        <div><strong>Role:</strong> {{ profile.role }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getProfile } from '@/services/auth.service'

const profile = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await getProfile()
    profile.value = response.data.data
  } catch (e) {
    error.value = e.response?.data?.message ?? 'Unable to load profile.'
    console.log(e)
  } finally {
    loading.value = false
  }
})
</script>