import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

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
  const dataFinanceIsLoaded = ref(false)

  const finances = ref<Finance[]>([])
  const nearFinanceStyle = ref({})
  const nearFinanceData = ref<Finance>({
    id: 0,
    title: '',
    amount: 0,
    payment_deadline: '',
    payment_deadline_date: '',
    payment_date: '',
    is_paid: false
  })

  const getFinance = async (id: number) => {
    const response = await axios.get('http://localhost:3000/api/finances/' + id)
    finances.value = response.data
    dataFinanceIsLoaded.value = true
  }

  const getNearFinanceData = async () => {
    while (!dataFinanceIsLoaded.value) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    const nearFinance = finances.value.filter((finance: any) => {
      const today = new Date()
      const financeDate = new Date(finance.payment_deadline)

      const diffTime = Math.abs(financeDate.getTime() - today.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      return finance.is_paid === false && (financeDate.getTime() < today.getTime() || diffDays < 7)
    })

    const dateFinance = new Date(nearFinance[0].payment_deadline).toLocaleDateString()

    nearFinanceData.value = {
      id: nearFinance[0].id,
      title: nearFinance[0].title,
      amount: nearFinance[0].amount,
      payment_deadline: nearFinance[0].payment_deadline,
      payment_deadline_date: dateFinance,
      payment_date: nearFinance[0].payment_date,
      is_paid: nearFinance[0].is_paid
    }
  }

  const getNearFinanceStyle = () => {
    const today = new Date()
    const nearFinanceDate = new Date(nearFinanceData.value.payment_deadline)
    const diffTime = Math.abs(nearFinanceDate.getTime() - today.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (today < nearFinanceDate) {
      nearFinanceStyle.value = 'negative'
    }
    console.log(nearFinanceData.value.title, diffDays)

    if (diffDays < 7) {
      nearFinanceStyle.value = 'warning'
    }
  }

  return {
    finances,
    nearFinanceStyle,
    nearFinanceData,
    dataFinanceIsLoaded,
    getFinance,
    getNearFinanceData,
    getNearFinanceStyle
  }
})
