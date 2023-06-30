import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import router from '@/router'
import axios from 'axios'
import type { VNodeRef } from 'vue'
import { Notify } from 'quasar'

export interface User {
  id: number
  email: string
  role: number
  username: string
}

interface NavigationItem {
  name: string
  icon: string
  link: string
}

const studentNavigation = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard'
  },
  {
    name: 'Schedule',
    icon: 'today',
    link: '/schedule'
  },
  {
    name: 'Grades',
    icon: 'grade',
    link: '/grades'
  },
  {
    name: 'Announcements',
    icon: 'announcement',
    link: '/announcement'
  },
  {
    name: 'Finance',
    icon: 'account_balance',
    link: '/finances'
  },
  {
    name: 'Files',
    icon: 'cloud_download',
    link: '/files'
  },
  {
    name: 'Account',
    icon: 'account_circle',
    link: '/account'
  }
] as NavigationItem[]

const adminNavigation = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard'
  },
  {
    name: 'Schedule',
    icon: 'today',
    link: '/schedule'
  },
  {
    name: 'Grades',
    icon: 'grade',
    link: '/grades'
  },
  {
    name: 'Users',
    icon: 'people',
    link: '/users'
  },
  {
    name: 'Announcements',
    icon: 'announcement',
    link: '/announcement'
  },
  {
    name: 'Finance',
    icon: 'account_balance',
    link: '/finances'
  },
  {
    name: 'Files',
    icon: 'cloud_download',
    link: '/files'
  },
  {
    name: 'Account',
    icon: 'account_circle',
    link: '/account'
  }
] as NavigationItem[]

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const newUser = ref<User>({} as User)
  const newUserRef = ref({
    email: {} as VNodeRef,
    role: {} as VNodeRef
  })
  const newUserRule = ref({
    email: [
      (v: string) => !!v || 'Email is required',
      (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
    ],
    role: [
      (v: number) => v === 0 || v === 1 || v === 2 || 'Role must be Student, Admin or Lecturer'
    ]
  })

  const fetchUser = async () => {
    try {
      const { cookies } = useCookies()
      const response = await axios.get('/user', {
        headers: {
          Authorization: cookies.get('token')
        }
      })
      user.value = response.data
    } catch (error: any) {
      Notify.create({
        color: 'negative',
        position: 'top-right',
        message: error.response.data.message
      })
    }
  }

  const createUser = async () => {
    try {
      Notify.create({
        color: 'info',
        position: 'top-right',
        message: 'Creating user...'
      })
      const response = await axios.post('/user', {
        email: newUser.value.email,
        username: newUser.value.username,
        role: newUser.value.role
      })
      Notify.create({
        color: 'positive',
        position: 'top-right',
        message: 'User created successfully.'
      })

      return response.data
    } catch (error: any) {
      Notify.create({
        color: 'negative',
        position: 'top-right',
        message: error.response.data.message
      })
    }
  }

  const resetNewUser = () => {
    newUser.value = {} as User
  }

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const response = await axios.get('/user/login', {
        params: {
          email: email,
          password: password
        }
      })
      if (response.status !== 200) {
        throw new Error('Failed to authenticate.')
      }
      const { cookies } = useCookies()
      const expires = rememberMe ? '30d' : '1h'
      cookies.set('token', response.data, expires, '/', 'localhost', true, 'Strict')
      await fetchUser()
      router.push('/dashboard')
    } catch (error: any) {
      Notify.create({
        color: 'negative',
        position: 'top-right',
        message: error.response.data.message
      })
    }
  }

  const logOut = async () => {
    try {
      const response = await axios.get('/user/logout')
      const { cookies } = useCookies()
      cookies.remove('token')
      user.value = null
      router.push({ name: 'home' })
      Notify.create({
        color: 'positive',
        position: 'top-right',
        message: "You've been logged out."
      })
    } catch (error: any) {
      Notify.create({
        color: 'negative',
        position: 'top-right',
        message: error.response.data.message
      })
    }
  }

  const checkToken = async () => {
    const { cookies } = useCookies()
    if (!cookies.isKey('token')) {
      return false
    }
    const response = await axios.get('/user/checkToken', {
      headers: {
        Authorization: cookies.get('token')
      }
    })

    if (response.data.message === 'Unauthorized') {
      return false
    }
    await fetchUser()
    return true
  }

  const isLoggedIn = async () => {
    if (user.value) return true
    return await checkToken()
  }

  const getNavigation = () => {
    if (user.value?.role === 0) {
      return studentNavigation
    }

    if (user.value?.role === 1) {
      return adminNavigation
    }
  }

  return {
    user,
    newUser,
    newUserRef,
    newUserRule,
    fetchUser,
    createUser,
    signIn,
    logOut,
    isLoggedIn,
    getNavigation,
    resetNewUser
  }
})
