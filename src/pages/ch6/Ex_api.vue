<template>
  <q-page padding>
    <!-- แก้ไข: เหลือ @click แค่อันเดียว -->
    <q-btn color="primary" label="Load Albums" @click="albumStore.loadAlbums()" />

    <!-- Loading -->
    <div v-if="loading" class="q-mt-md">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <!-- Error -->
    <q-banner v-else-if="errorMessage" class="bg-red-1 text-negative q-mt-md" rounded>
      <template #avatar>
        <q-icon name="error" color="negative" />
      </template>
      {{ errorMessage }}
    </q-banner>

    <!-- Data -->
    <q-list v-else bordered separator class="q-mt-md">
      <q-item v-for="album in albums" :key="album.id">
        <q-item-section>
          <q-item-label>{{ album.title }}</q-item-label>
          <q-item-label caption>Album ID : {{ album.id }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAlbumStore } from '@/stores/album_store'

const albumStore = useAlbumStore()

// ดึง state ออกมาจาก store เพื่อใช้ใน v-if / v-for ของ template
const { albums, loading, errorMessage } = storeToRefs(albumStore)
</script>