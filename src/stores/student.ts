import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

interface Student {
  id: number
  first_name: string
  last_name: string
  index: string
  birthdate: string
  address: string
  phone: string
  field_of_study: string
}

export const useStudentStore = defineStore('student', () => {
  const student = ref<Student | null>(null)
  const fetchStudent = async () => {
    const userStore = useUserStore()
    const response = await axios.get('http://localhost:3000/api/students/' + userStore.user?.id)
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
    student.value = response.data
  }

  return {
    student,
    fetchStudent
  }
})
