import { useAuthStore } from '../stores/auth_store'
export default async () => {
    const auth =useAuthStore()
    await auth.checkAuth()
}