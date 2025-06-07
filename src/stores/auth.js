import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { useProductStore } from './products'
import { useAdministrationStore } from './administration'

export const useAuthStore = defineStore('auth', () => {
  const authUser = reactive({
    isAuth: false,
    details: null,
  })

  const useProduct = useProductStore()
  const useAdministration = useAdministrationStore()

  const router = useRouter()

  const getInfos = async () => {
    if (Cookies.get('token')) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + Cookies.get('token')
    }

    try {
      let response = await axios.get('/api/UserInfo/')
      Object.assign(authUser, {
        isAuth: true,
        details: response.data,
      })
    } catch (error) {
      console.error(error)
      Cookies.remove('token')
    }
  }

  const login = async (username, password) => {
    axios.defaults.headers.common['Authorization'] = ''
    try {
      let response = await axios.post('/api/Login/', {
        username: username,
        password: password,
      })

      Cookies.set('token', response.data.token)

      axios.defaults.headers.common['Authorization'] = 'Token ' + Cookies.get('token')

      await useProduct.getConfigs()
      await useAdministration.getConfigs()

      Object.assign(authUser, {
        isAuth: true,
        details: response.data.user,
      })

      router.push({ name: 'app' })

      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return { login, authUser, getInfos }
})
