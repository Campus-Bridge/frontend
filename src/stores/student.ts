import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

interface Student {
  id: number
  first_name: string
  last_name: string
  birthdate: string
  address: string
  phone: string
  index: string
  field_of_study: string
  email: string
  middle_name: string
  nationality: string
  citizenship: string
  personal_id_number: string
  mother: string
  father: string
  gender: boolean
}

export const useStudentStore = defineStore('student', () => {
  const student = ref<Student>({
    id: 0,
    first_name: '',
    last_name: '',
    index: '',
    birthdate: '',
    address: '',
    phone: '',
    field_of_study: '',
    email: '',
    middle_name: '',
    nationality: '',
    citizenship: '',
    personal_id_number: '',
    mother: '',
    father: '',
    gender: false
  })

  const fetchStudent = async () => {
    const userStore = useUserStore()
    const response = await axios.get('http://localhost:3000/api/students/' + userStore.user?.id)
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
    student.value = response.data
    student.value.email = userStore.user?.email as string
  }

  const students = ref<Student[]>([])
  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:3000/api/students')
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
    students.value = response.data
  }

  const updateStudent = async (student: Student) => {
    const response = await axios.put('http://localhost:3000/api/students/' + student.id, student)
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
  }

  return {
    student,
    students,
    fetchStudent,
    fetchStudents,
    updateStudent
  }
})
