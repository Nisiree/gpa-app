import { defineStore } from "pinia";
import  { ref } from 'vue'
import { api } from '@/boot/axios'

export const usePostStore = defineStore('posts',() => {
    const postItem =ref([])
    const isLoading = ref(false)

    async function fetchAllPosts() {
        isLoading.value = true
        try{
            const res =await api.get('/posts')
            postItem.value=res.data
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }
    async function createNewPost(newPost) {
        try{
            // const res = await api.post('/posts', newPost,{
            //     headers:{
            //         'Content-Type': 'application/json; charset=UTF-8'
            //     }
            // });
            const res = await api.post('/posts', newPost)
            postItem.value.unshift(res.data)
        }catch (error){
            console.log("Create error: ", error)
        }
    }
    async function updatePost(id, updateData) {
        try{
            // const res = await api.put(`/posts/${id}`, updateData,{
            //     headers:{
            //         'Content-Type': 'application/json; charset=UTF-8'
            //     },
            // })
            const res = await api.put(`/posts/${id}`, updateData)
            console.log('Update success:', res.data)
            const index = postItem.value.findIndex(item => item.id == id)
            if(index !== -1) postItem.value[index] = res.data
        }catch (error){
            console.log('Update error:',error)
        }
    }   // ← เพิ่ม } ปิด updatePost
    async function deletePost(id) {
        try{
            await api.delete(`/posts/${id}`)
            console.log('Delete success: ', id)
            postItem.value = postItem.value.filter(item => item.id !== id)
        } catch (error){
            console.log('Delete error: ', error)
        }
    }
    async function filterPost(userId) {
        isLoading.value = true
        try{
            const res = await api.get(`/posts?userId=${userId}`)
            postItem.value = res.data
            console.log(`filter id: ${userId} success :`, res.data)
        } catch(error){
            console.log('Filter error:', error)
        }finally{
            isLoading.value = false
        }
    }
    async function fetchComment(id) {
        try{
            const res = await api.get(`/posts/${id}/comments`)
            console.log(`Comment for post id: ${id} `, res.data)
            return res.data
        }catch (error) {
            console.log('Comment error: ', error)
        }
    }
    return { postItem, isLoading, fetchAllPosts, createNewPost, updatePost, deletePost,
        filterPost, fetchComment
    }
})