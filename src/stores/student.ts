import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

export const useStudentStore = defineStore('student', () => {
  const { cookies } = useCookies()
  const dataIsLoaded = ref(false)
  const id = ref(0)
  const first_name = ref('')
  const last_name = ref('')
  const birthdate = ref('')
  const adress = ref('')
  const phone = ref('')
  const index = ref('')
  const field_of_study = ref('')

  const getUserID = async () => {
    const token = cookies.get('token')
    const response = await axios.get('http://localhost:3000/api/user/checkToken', {
      headers: {
        Authorization: token
      }
    })
    return response.data.id
  }

  async function loadStudent() {
    const userId = await getUserID()
    const response = await axios.get('http://localhost:3000/api/students/' + userId)
    id.value = response.data.id
    first_name.value = response.data.first_name
    last_name.value = response.data.last_name
    birthdate.value = response.data.birthdate
    adress.value = response.data.adress
    phone.value = response.data.phone
    index.value = response.data.index
    field_of_study.value = response.data.field_of_study
  }
  if (!dataIsLoaded.value) {
    loadStudent()
    dataIsLoaded.value = true
  }

  return {
    id,
    first_name,
    last_name,
    birthdate,
    adress,
    phone,
    index,
    field_of_study,
    loadStudent
  }
})
