<template>
  <div class="container">
    <div class="finance-buttons">
      <q-btn label="Payments" rounded />
      <q-btn label="Dane do przelewu" rounded />
    </div>
    <q-card class="my-card">
      <q-table
        class="my-sticky-virtscroll-table"
        flat
        bordered
        :rows="finances || []"
        :columns="columns"
        row-key="id"
        style="height: 100%"
      />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { useFinanceStore } from '@/stores/finance'
const studentStore = useStudentStore()
const { student } = storeToRefs(studentStore)
const financeStore = useFinanceStore()
const { finances } = storeToRefs(financeStore)
watch(
  () => student.value.id,
  () => {
    financeStore.getFinance()
  }
)
const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    sortable: true
  },
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
  {
    name: 'payment_date',
    align: 'left',
    label: 'Payment Date',
    field: 'payment_date',
    format: (val: any) => {
      return new Date(val).toLocaleDateString()
    },
    sortable: true
  },
  { name: 'is_paid', align: 'left', label: 'Is Paid', field: 'is_paid' },
  {
    name: 'payment_deadline',
    align: 'left',
    label: 'Payment Deadline',
    field: 'payment_deadline',
    format: (val: any) => {
      return new Date(val).toLocaleDateString()
    }
  }
] as any[]
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: calc(100vh - 32px);
  padding-left: 16px;
}
.my-card {
  border-radius: 12px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: calc(100% - 52px);
}
.body--light {
  button {
    background-color: $light-secondary;
  }
  .my-card {
    background-color: $light-secondary;
  }
  .q-table__container {
    background-color: $light-secondary;
  }
}

.body--dark {
  button {
    background-color: $dark-secondary;
  }
  .my-card {
    background-color: $dark-secondary;
  }
  .q-table__container {
    background-color: $dark-secondary;
  }
}

.finance-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.container {
  position: relative;
  width: 100%;
  height: calc(100% - 112px);
}
</style>
