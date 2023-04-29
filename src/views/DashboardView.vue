<template>
  <div class="application">
    <NavigationBar />
    <main>
      <h1>Dashboard</h1>
      <q-btn @click="toggleDarkMode">Change</q-btn>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const toggleDarkMode = () => {
  $q.dark.toggle()
}
</script>
<style scoped>
main {
  width: 100%;
  height: 100%;
  padding: 16px;
}
</style>
