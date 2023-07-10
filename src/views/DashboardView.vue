<template>
  <DashboardUser v-if="user?.role === 0" />
</template>

<script setup lang="ts">
import DashboardUser from '@/components/dashboard/DashboardUser.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { user } = userStore
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
