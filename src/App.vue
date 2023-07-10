<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useQuasar } from 'quasar'
import NavigationBar from '@/components/global/NavigationBar.vue'
import TopBar from '@/components/dashboard/TopBar.vue'
import LoadingView from '@/views/LoadingView.vue'

import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { useUserStore } from '@/stores/user'
import { useLecturerStore } from '@/stores/lecturer'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const studentStore = useStudentStore()
const { student } = storeToRefs(studentStore)

const lecturerStore = useLecturerStore()
const { lecturer } = storeToRefs(lecturerStore)

const first_name = computed(() => {
  if (user.value?.role === 0) {
    return student.value?.first_name
  } else if (user.value?.role === 1) {
    return
  } else if (user.value?.role === 2) {
    return lecturer.value?.first_name
  }
})

const last_name = computed(() => {
  if (user.value?.role === 0) {
    return student.value?.last_name
  } else if (user.value?.role === 1) {
    return
  } else if (user.value?.role === 2) {
    return lecturer.value?.last_name
  }
})

const $q = useQuasar()

onMounted(async () => {
  if (localStorage.getItem('dark') === 'true') {
    $q.dark.set(true)
  } else {
    $q.dark.set(false)
  }
})
</script>

<template>
  <router-view v-if="$router.currentRoute.value.name === 'home'" />

  <template v-else>
    <NavigationBar />
    <main>
      <TopBar :firstName="first_name" :lastName="last_name" />
      <LoadingView v-if="$router.currentRoute.value.path === '/'">test</LoadingView>
      <router-view />
    </main>
  </template>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 16px;
}

main {
  width: 100%;
  height: calc(100vh - 32px);
  padding-left: 16px;
  overflow-y: auto;
  position: relative;
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
