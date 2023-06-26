import { ref, type VNodeRef } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export interface Student {
  id: number
  first_name: string
  last_name: string
  birthdate: string
  address: string
  phone: string
  index_number: string
  field_of_study: string
  email: string
  middle_name: string
  nationality: string
  citizenship: string
  personal_id_number: string
  mother: string
  father: string
  gender: string
  marital_status: string
  tax_identification_number: string
  series_and_number_of_identity_card: string
  id_card_issuing_authority: string
  passport_number: string
  series_and_number_of_military_booklet: string
  mothers_maiden_name: string
  maiden_name: string
  course_of_study: string
  student_status: string
  year_term: string
  type_of_study: string
  department: string
  speciality: string
  specialization: string
  title_obtained: string
  start_date_of_studies: string
  expected_date_of_graduation: string
  individual_course: string
  date_and_number_of_contract: string
}

export const useStudentStore = defineStore('student', () => {
  const student = ref<Student>({} as Student)
  const newStudent = ref<Student>({} as Student)
  const newStudentRef = ref({
    first_name: {} as VNodeRef,
    last_name: {} as VNodeRef,
    birthdate: {} as VNodeRef,
    address: {} as VNodeRef,
    phone: {} as VNodeRef,
    index_number: {} as VNodeRef,
    field_of_study: {} as VNodeRef,
    middle_name: {} as VNodeRef,
    nationality: {} as VNodeRef,
    citizenship: {} as VNodeRef,
    personal_id_number: {} as VNodeRef,
    mother: {} as VNodeRef,
    father: {} as VNodeRef,
    gender: {} as VNodeRef,
    marital_status: {} as VNodeRef,
    tax_identification_number: {} as VNodeRef,
    series_and_number_of_identity_card: {} as VNodeRef,
    id_card_issuing_authority: {} as VNodeRef,
    passport_number: {} as VNodeRef,
    series_and_number_of_military_booklet: {} as VNodeRef,
    mothers_maiden_name: {} as VNodeRef,
    maiden_name: {} as VNodeRef,
    course_of_study: {} as VNodeRef,
    student_status: {} as VNodeRef,
    year_term: {} as VNodeRef,
    type_of_study: {} as VNodeRef,
    department: {} as VNodeRef,
    speciality: {} as VNodeRef,
    specialization: {} as VNodeRef,
    title_obtained: {} as VNodeRef,
    start_date_of_studies: {} as VNodeRef,
    expected_date_of_graduation: {} as VNodeRef,
    individual_course: {} as VNodeRef,
    date_and_number_of_contract: {} as VNodeRef
  })

  const newStudentRule = ref({
    first_name: [(v: string) => !!v || 'First name is required'],
    last_name: [(v: string) => !!v || 'Last name is required'],
    birthdate: [(v: string) => !!v || 'Birthdate is required'],
    address: [(v: string) => !!v || 'Address is required'],
    phone: [(v: string) => !!v || 'Phone is required'],
    index_number: [(v: string) => !!v || 'Index is required'],
    field_of_study: [(v: string) => !!v || 'Field of study is required'],
    middle_name: [(v: string) => !!v || 'Middle name is required'],
    nationality: [(v: string) => !!v || 'Nationality is required'],
    citizenship: [(v: string) => !!v || 'Citizenship is required'],
    personal_id_number: [(v: string) => !!v || 'Personal ID number is required'],
    mother: [(v: string) => !!v || 'Mother is required'],
    father: [(v: string) => !!v || 'Father is required'],
    gender: [(v: string) => v === '0' || v === '1' || 'Gender is required'],
    marital_status: [(v: string) => !!v || 'Marital status is required'],
    tax_identification_number: [(v: string) => !!v || 'Tax identification number is required'],
    series_and_number_of_identity_card: [
      (v: string) => !!v || 'Series and number of identity card is required'
    ],
    id_card_issuing_authority: [(v: string) => !!v || 'ID card issuing authority is required'],
    passport_number: [],
    series_and_number_of_military_booklet: [],
    mothers_maiden_name: [(v: string) => !!v || 'Mothers maiden name is required'],
    maiden_name: [],
    course_of_study: [(v: string) => !!v || 'Course of study is required'],
    student_status: [(v: string) => !!v || 'Student status is required'],
    year_term: [(v: string) => !!v || 'Year term is required'],
    type_of_study: [(v: string) => !!v || 'Type of study is required'],
    department: [(v: string) => !!v || 'Department is required'],
    speciality: [(v: string) => !!v || 'Speciality is required'],
    specialization: [(v: string) => !!v || 'Specialization is required'],
    title_obtained: [(v: string) => !!v || 'Title obtained is required'],
    start_date_of_studies: [(v: string) => !!v || 'Start date of studies is required'],
    expected_date_of_graduation: [(v: string) => !!v || 'Expected date of graduation is required'],
    individual_course: [(v: string) => !!v || 'Individual course is required'],
    date_and_number_of_contract: [(v: string) => !!v || 'Date and number of contract is required']
  })

  const selectedStudent = ref<Student>({} as Student)

  const fetchStudent = async () => {
    const userStore = useUserStore()
    const response = await axios.get('/students/' + userStore.user?.id)
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
    student.value = response.data
    student.value.email = userStore.user?.email as string
  }

  const students = ref<Student[]>([])
  const fetchStudents = async () => {
    const response = await axios.get('/students')
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
    students.value = response.data
  }

  const updateStudent = async (student: Student) => {
    const response = await axios.put('/students/' + student.id, student)
    if (response.status !== 200) {
      throw new Error('Failed to authenticate.')
    }
  }

  const createStudent = async (id: number) => {
    const response = await axios.post('/students', {
      userId: id,
      data: newStudent.value
    })

    newStudent.value = {} as Student
    fetchStudents()
  }

  const resetNewStudent = () => {
    newStudent.value = {} as Student
  }

  return {
    student,
    students,
    newStudent,
    newStudentRef,
    newStudentRule,
    fetchStudent,
    fetchStudents,
    createStudent,
    updateStudent,
    resetNewStudent,
    selectedStudent
  }
})
