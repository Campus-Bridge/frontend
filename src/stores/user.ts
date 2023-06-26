import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import router from '@/router'
import axios from 'axios'
import type { VNodeRef } from 'vue'

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
    const { cookies } = useCookies()
    const response = await axios.get('/user', {
      headers: {
        Authorization: cookies.get('token')
      }
    })
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
    user.value = response.data
  }

  const createUser = async () => {
    const response = await axios.post('/user', {
      email: newUser.value.email,
      username: newUser.value.username,
      role: newUser.value.role
    })
    console.log(response.data)

    return response.data
  }

  const resetNewUser = () => {
    newUser.value = {} as User
  }

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
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
  }

  const logOut = async () => {
    const response = await axios.get('/user/logout')
    const { cookies } = useCookies()
    cookies.remove('token')
    if (response.status !== 200) {
      console.log('Error logging out')
      return
    }
    user.value = null
    router.push({ name: 'home' })
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
