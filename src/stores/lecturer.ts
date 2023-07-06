import { defineStore } from 'pinia'
import axios from 'axios'
import { Notify } from 'quasar'
import { ref, type VNodeRef } from 'vue'
import { useUserStore } from '@/stores/user'

export interface Lecturer {
  id: number
  first_name: string
  last_name: string
  date_of_birth: string
  phone: string
  email: string
  home_address: string
  billing_address: string
  academic_title: string
  subjects_taught: string
  type_of_contract: string
  bank_account_number: string
  tax_identification_number: string
  employee_identification_number: string
  series_and_number_of_identity_card: string
  id_card_issuing_authority: string
  passport_number: string
  nationality: string
  citizenship: string
  contract_duration: string
  gender: boolean
}

export const useLecturerStore = defineStore('lecturer', () => {
  const lecturer = ref<Lecturer>({} as Lecturer)
  const newLecturer = ref<Lecturer>({} as Lecturer)
  const newLecturerRef = ref({
    first_name: {} as VNodeRef,
    last_name: {} as VNodeRef,
    date_of_birth: {} as VNodeRef,
    phone: {} as VNodeRef,
    email: {} as VNodeRef,
    home_address: {} as VNodeRef,
    billing_address: {} as VNodeRef,
    academic_title: {} as VNodeRef,
    subjects_taught: {} as VNodeRef,
    type_of_contract: {} as VNodeRef,
    bank_account_number: {} as VNodeRef,
    tax_identification_number: {} as VNodeRef,
    employee_identification_number: {} as VNodeRef,
    series_and_number_of_identity_card: {} as VNodeRef,
    id_card_issuing_authority: {} as VNodeRef,
    passport_number: {} as VNodeRef,
    nationality: {} as VNodeRef,
    citizenship: {} as VNodeRef,
    contract_duration: {} as VNodeRef,
    gender: {} as VNodeRef
  })

  const newLecturerRules = ref({
    first_name: [
      { required: true, message: 'Imię jest wymagane', trigger: 'blur' },
      { min: 3, message: 'Imię musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    last_name: [
      { required: true, message: 'Nazwisko jest wymagane', trigger: 'blur' },
      { min: 3, message: 'Nazwisko musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    date_of_birth: [{ required: true, message: 'Data urodzenia jest wymagana', trigger: 'blur' }],
    phone: [
      { required: true, message: 'Numer telefonu jest wymagany', trigger: 'blur' },
      { min: 9, message: 'Numer telefonu musi mieć minimum 9 znaków', trigger: 'blur' }
    ],
    email: [
      { required: true, message: 'Email jest wymagany', trigger: 'blur' },
      { type: 'email', message: 'Niepoprawny format email', trigger: 'blur' }
    ],
    home_address: [
      { required: true, message: 'Adres zamieszkania jest wymagany', trigger: 'blur' },
      { min: 3, message: 'Adres zamieszkania musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    billing_address: [
      { required: true, message: 'Adres korespondencyjny jest wymagany', trigger: 'blur' },
      { min: 3, message: 'Adres korespondencyjny musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    academic_title: [
      { required: true, message: 'Tytuł naukowy jest wymagany', trigger: 'blur' },
      { min: 3, message: 'Tytuł naukowy musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    subjects_taught: [
      { required: true, message: 'Przedmioty prowadzone są wymagane', trigger: 'blur' },
      { min: 3, message: 'Przedmioty prowadzone muszą mieć minimum 3 znaki', trigger: 'blur' }
    ],
    type_of_contract: [
      { required: true, message: 'Typ umowy jest wymagany', trigger: 'blur' },
      { min: 3, message: 'Typ umowy musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    bank_account_number: [
      { required: true, message: 'Numer konta bankowego jest wymagany', trigger: 'blur' },
      { min: 26, message: 'Numer konta bankowego musi mieć minimum 26 znaków', trigger: 'blur' }
    ],
    tax_identification_number: [
      { required: true, message: 'Numer identyfikacji podatkowej jest wymagany', trigger: 'blur' },
      {
        min: 10,
        message: 'Numer identyfikacji podatkowej musi mieć minimum 10 znaków',
        trigger: 'blur'
      }
    ],
    employee_identification_number: [
      { required: true, message: 'Numer identyfikacji pracownika jest wymagany', trigger: 'blur' },
      {
        min: 11,
        message: 'Numer identyfikacji pracownika musi mieć minimum 11 znaków',
        trigger: 'blur'
      }
    ],
    series_and_number_of_identity_card: [
      { required: true, message: 'Seria i numer dowodu osobistego są wymagane', trigger: 'blur' },
      {
        min: 9,
        message: 'Seria i numer dowodu osobistego muszą mieć minimum 9 znaków',
        trigger: 'blur'
      }
    ],
    id_card_issuing_authority: [
      { required: true, message: 'Organ wydający dowód osobisty jest wymagany', trigger: 'blur' },
      {
        min: 3,
        message: 'Organ wydający dowód osobisty musi mieć minimum 3 znaki',
        trigger: 'blur'
      }
    ],
    passport_number: [
      { required: true, message: 'Numer paszportu jest wymagany', trigger: 'blur' },
      { min: 9, message: 'Numer paszportu musi mieć minimum 9 znaków', trigger: 'blur' }
    ],
    nationality: [
      { required: true, message: 'Narodowość jest wymagana', trigger: 'blur' },
      { min: 3, message: 'Narodowość musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    citizenship: [
      { required: true, message: 'Obywatelstwo jest wymagane', trigger: 'blur' },
      { min: 3, message: 'Obywatelstwo musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    contract_duration: [
      { required: true, message: 'Czas trwania umowy jest wymagany', trigger: 'blur' },
      { min: 3, message: 'Czas trwania umowy musi mieć minimum 3 znaki', trigger: 'blur' }
    ],
    gender: [{ required: true, message: 'Płeć jest wymagana', trigger: 'blur' }]
  }) as any

  const selectedLecturer = ref<Lecturer>({} as Lecturer)
  const fetchLecturer = async () => {
    try {
      const userStore = useUserStore()
      const response = await axios.get('/lecturers/' + userStore.user?.id)
      lecturer.value = response.data
      lecturer.value.email = userStore.user?.email as string
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: 'Nie udało się pobrać danych wykładowcy'
      })
    }
  }

  const lecturers = ref<Lecturer[]>([])
  const fetchLecturers = async () => {
    try {
      const response = await axios.get('/lecturers')
      lecturers.value = response.data
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: 'Nie udało się pobrać danych wykładowców: ' + error
      })
    }
  }

  const updateLecturer = async (lecturer: Lecturer) => {
    try {
      const response = await axios.put('/lecturers/' + lecturer.id, lecturer)
      Notify.create({
        type: 'positive',
        message: 'Dane wykładowcy zostały zaktualizowane'
      })
      return response.data
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: 'Nie udało się zaktualizować danych wykładowcy: ' + error
      })
    }
  }

  return {
    lecturer,
    lecturers,
    selectedLecturer,
    newLecturer,
    newLecturerRef,
    newLecturerRules,
    fetchLecturer,
    fetchLecturers,
    updateLecturer
  }
})
