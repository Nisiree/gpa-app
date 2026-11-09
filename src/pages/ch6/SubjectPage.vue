<template>
<q-page class="q-pa-md">
    <q-card class="q-mt-md" v-for="item in store.subject" :key="item.id">
        <q-card-section>
            <div class="text-h6">{{ item.code }} {{ item.name  }}</div>
            <div class="text-subtitle">credit {{ item.credit  }}</div>
        </q-card-section>
    </q-card>
</q-page>
</template>
<script setup>
import { useSubjectStore } from '@/stores/sucject-store';
const store = useSubjectStore()
store.fechAll()
</script>