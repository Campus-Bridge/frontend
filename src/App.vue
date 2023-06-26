<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
if (localStorage.getItem('dark') === 'true') {
  $q.dark.set(true)
} else {
  $q.dark.set(false)
}
</script>

<template><router-view /></template>

<style lang="scss">
.application {
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 16px;
}

body.body--light {
  background: $light-page;

  color: $grey-9;
}

::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: $light-green-14;
  border-radius: 10px;
}
</style>
