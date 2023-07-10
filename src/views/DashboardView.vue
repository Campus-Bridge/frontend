<template>
  <div class="application">
    <NavigationBar />
    <main>
      <TopBar :firstName="student?.first_name" :lastName="student?.last_name" />
      <DashboardUser v-if="user?.role === 0" />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/global/NavigationBar.vue'
import TopBar from '@/components/dashboard/TopBar.vue'
import DashboardUser from '@/components/dashboard/DashboardUser.vue'

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useStudentStore } from '@/stores/student'
import { useFinanceStore } from '@/stores/finance'

const userStore = useUserStore()
const studentStore = useStudentStore()
const financeStore = useFinanceStore()
const { student } = storeToRefs(studentStore)
const { user } = storeToRefs(userStore)

onMounted(async () => {
  if (userStore.user?.role === 0) {
    await studentStore.fetchStudent()
    await financeStore.getFinance()
    await financeStore.getNearFinance()
  }
})
</script>
<style lang="scss" scoped>
@import '@/css/quasar-variables.sass';

main {
  width: 100%;
  height: calc(100vh - 32px);
  padding-left: 16px;
  overflow-y: auto;
}

h4 {
  color: $light-green-14;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
