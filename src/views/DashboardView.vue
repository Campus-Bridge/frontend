<template>
  <div class="application">
    <NavigationBar />
    <main>
      <TopBar :firstName="first_name" :lastName="last_name" />
      <div class="cards">
        <q-card class="my-card welcome-card" @click="toggle">
          <q-card-section>
            <div class="text-h5">Welcome</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p>Index: 13540</p>
            <p>Kierunek: Informatyka Stosowana</p>
            <p>Ścieżka: Programowanie aplikacji</p>
          </q-card-section>
        </q-card>
        <q-card class="my-card finances">
          <q-card-section>
            <div class="text-h5">Finances</div>
          </q-card-section>
          <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
        </q-card>
        <q-card class="my-card announcements">
          <q-card-section>
            <div class="text-h5">Announcement</div>
          </q-card-section>
          <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
        </q-card>
        <q-card class="my-card news">
          <q-card-section>
            <div class="text-h5">News</div>
          </q-card-section>
          <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
        </q-card>
        <q-card class="my-card callendar">
          <q-card-section>
            <div class="text-h5">Callendar</div>
          </q-card-section>
          <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
        </q-card>
        <q-card class="my-card daily-schedule">
          <q-card-section>
            <div class="text-h5">Schedule</div>
          </q-card-section>
          <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
        </q-card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/global/NavigationBar.vue'
import TopBar from '@/components/dashboard/TopBar.vue'

import { useQuasar } from 'quasar'
const $q = useQuasar()

import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
const studentStore = useStudentStore()
const { first_name, last_name } = storeToRefs(studentStore)

const toggle = () => {
  $q.dark.toggle()
}
</script>
<style lang="scss" scoped>
@import '@/assets/quasar-variables.sass';

main {
  width: 100%;
  height: calc(100vh - 32px);
  padding-left: 16px;
  overflow-y: auto;
}

h4 {
  color: $primary;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 16px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-gap: 16px;
  height: calc(100% - 112px);
}

.my-card {
  border-radius: 12px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.body--light {
  .my-card {
    background-color: $light-secondary;
  }
}

.body--dark {
  .my-card {
    background-color: $dark-secondary;
  }
}

.welcome-card {
  grid-area: 1 / 1 / 4 / 3;
}

.finances {
  grid-area: 4 / 1 / 6 / 3;
}

.announcements {
  grid-area: 6 / 1 / 9 / 3;
}
.news {
  grid-area: 9 / 1 / 13 / 3;
}

.daily-schedule {
  grid-area: 1 / 6 / 13 / 10;
}

.callendar {
  grid-area: 1 / 3 / 13 / 6;
}
</style>
