<template>
  <q-page class="flex flex-center bg-grey-2 q-pa-md">
    <q-card
      class="q-pa-lg shadow-5"
      style="width: 100%; max-width: 400px; border-radius: 12px;"
    >
      <q-card-section class="text-center q-pb-none">
        <q-avatar size="64px" color="primary" text-color="white" icon="lock" class="q-mb-md" />
        <div class="text-h5 text-weight-bold text-grey-9">Welcome Back</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-form @submit.prevent="onLogin">
          <q-input
            v-model="username"
            label="Username"
            outlined
            dense
            lazy-rules
            :rules="[val => !!val || 'Please enter your username']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="primary" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            type="password"
            label="Password"
            outlined
            dense
            lazy-rules
            :rules="[val => !!val || 'Please enter your password']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
          </q-input>

          <q-banner v-if="store.errMsg" rounded class="bg-red-1 text-negative q-mt-md">
            {{ store.errMsg }}
          </q-banner>

          <div class="q-mt-lg">
            <q-btn
              type="submit"
              color="primary"
              label="LOGIN"
              class="full-width text-weight-bold"
              size="lg"
              unelevated
              :loading="store.loading"
              :disable="!username || !password"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const store = useAuthStore()
const username = ref('')
const password = ref('')

const onLogin = async () => {
  try {
    await store.login(username.value, password.value)
  } catch (error) {
    console.error('Login error:', error)
    return
  }

  // login ไม่สำเร็จ (store ไม่ throw แต่ user ยังเป็น null)
  if (!store.user) return

  const role = store.user.role

  $q.notify({
    type: 'positive',
    icon: 'check_circle',
    message: `Welcome back, ${store.user.username}`,
    caption: `Role: ${role}`,
  })

  username.value = ''
  password.value = ''

  if (role === 'admin') router.push({ name: 'admin' })
  else if (role === 'teacher') router.push({ name: 'teacher' })
  else router.push({ name: 'profile' })
}
</script>