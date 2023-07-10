import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useStudentStore } from '@/stores/student'

interface Finance {
  id: number
  title: string
  amount: number
  payment_deadline: string
  payment_deadline_date: string
  payment_date: string
  is_paid: boolean
}

export const useFinanceStore = defineStore('finance', () => {
  const finances = ref<Finance[] | null>(null)
  const nearFinance = ref<Finance | null>(null)
  const nearFinanceStyle = ref<string | null>(null)

  const getFinance = async () => {
    const userStore = useStudentStore()
    if (!userStore.student.id) return
    const response = await axios.get('http://localhost:3000/api/finances/' + userStore.student.id)
    finances.value = response.data
  }

  const getNearFinance = () => {
    nearFinance.value = finances.value?.find((finance: any) => {
      const today = new Date()
      const financeDate = new Date(finance.payment_deadline)

      const diffTime = Math.abs(financeDate.getTime() - today.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      return finance.is_paid === false && (financeDate.getTime() < today.getTime() || diffDays < 7)
    }) as Finance

    getNearFinanceStyle(nearFinance.value.payment_deadline)
    const dateFinance = new Date(nearFinance.value.payment_deadline).toLocaleDateString()
    nearFinance.value.payment_deadline_date = dateFinance
  }

  const getNearFinanceStyle = (payment_deadline: string) => {
    const today = new Date()
    const nearFinanceDate = new Date(payment_deadline)
    const diffTime = nearFinanceDate.getTime() - today.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 7) {
      nearFinanceStyle.value = 'warning'
    }

    if (diffDays <= 0) {
      nearFinanceStyle.value = 'negative'
    }
  }

  return {
    finances,
    nearFinance,
    nearFinanceStyle,
    getFinance,
    getNearFinance
  }
})
