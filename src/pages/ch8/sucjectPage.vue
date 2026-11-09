<template>
    <q-page class="q-pa-md">
        <div v-if="loading">
            <q-spinner color="primary" size="40px"></q-spinner>
        </div>
        <div v-else>
            <q-table :columns="columns" :rows="subject"
            row-key="id" :loading="loading" flat bordered></q-table>
        </div>
    </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
const subject = ref([])
const loading = ref(true)
const columns =[
    {name: 'id', labell: 'ID',field: 'id', align:'left'},
    {name: 'code', labell: 'รหัสวิชา',field: 'code', align:'center'},
    {name: 'name', labell: 'ชื่อวิชา',field: 'name', align:'left'},
    {name: 'cerdit', labell: 'หน่วยกิต',field: 'cerdit', align:'rigth'},
    {name: 'score', labell: 'คะแนน',field: 'score', align:'rigth'},
]

onMounted(async () => {
  try {
    const res = await api.get('/subject')
    subject.value = res.data
  } catch (error) {
    console.log('error:', error)
  } finally {
    loading.value = false
  }
})
</script>