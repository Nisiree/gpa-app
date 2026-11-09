<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
        <div v-if="store.user">
          <q-btn size="sm" color="negative" icon="logout" @click="onLogout"></q-btn>
        </div>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
       <q-list bordered separator>
    <q-item clickable v-ripple>
      <q-item-section>Homepage</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label>Item with caption</q-item-label>
        <q-item-label caption>Caption</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label overline>OVERLINE</q-item-label>
        <q-item-label>Item with overline</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const store = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const rightDrawerOpen = ref(false)
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const onLogout = () => {
  $q.dialog({
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    store.logout()
    $q.notify({
      type: 'positive',
      message: 'Logout successful.',
    })
    router.replace({ name: 'login' })
  })
}
</script>