import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/boot/axios';

export const useSubjectStore = defineStore('subject', () =>{
    const subject = ref([])
    async function fechAll() {
        try{
            const res =await api.get('/subjects')
            subject.value =res.data
        }catch (error){
            console.error('Error:',error)
        }
    }
    return{ subject, fechAll}
})