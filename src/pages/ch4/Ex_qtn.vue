<template>
  <q-page class="q-pa-md">
    <q-btn label="SaveMe" color="primary" text-color="white" icon="emoji_emotions" />
    <q-btn outline label="No BG" />

    <q-separator spaced size="16px" color="yellow" />

    <div class="row items-center">
      <q-btn icon="share" />
      <q-space />
      <q-btn round label="Confirm" />
    </div>

    <q-separator spaced size="16px" />

    <q-btn-group push>
      <q-btn push label="Yesterday" />
      <q-btn push label="Today" />
      <q-btn push label="Tomorrow" />
    </q-btn-group>

    <q-separator spaced="16px" />

    <q-btn
      :loading="isSaved"
      color="primary"
      :label="isSaved ? 'Saving...' : 'Save'"
      @click="save"
    >
      <template v-slot:loading>
        <q-spinner-dots
          color="white"
          size="3rem"
          :thickness="5"
          class="on-left"
        />Saving...
      </template>
    </q-btn> 
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const isSaved = ref(false)

const save = async () => {
  isSaved.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Data Saved')
  } catch (error) {
    console.log('Error:', error)
  } finally {
    isSaved.value = false
  }
}
</script>