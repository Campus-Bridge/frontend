<template>
  <div class="cards">
    <q-card class="my-card welcome-card">
      <q-card-section class>
        <div class="text-h5 title">
          <q-icon name="description" />
          Welcome
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="student">
        <p>Index: {{ student.index_number }}</p>
        <p>Kierunek: Informatyka Stosowana</p>
        <p>Ścieżka: Programowanie aplikacji</p>
      </q-card-section>
      <q-inner-loading :showing="!student" label="Loading" style="border-radius: 12px" />
    </q-card>
    <q-card class="my-card finances" :class="nearFinanceStyle">
      <q-card-section class="q-pb-none">
        <div class="text-h5 title">
          <q-icon name="account_balance" />
          Finances
        </div>
      </q-card-section>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-card-section class="q-pt-none" v-if="nearFinance">
          <div v-if="nearFinance.id !== 0">
            <h6>Kwota: {{ nearFinance.amount }} PLN</h6>
            <p>
              {{ nearFinance.title }} -
              {{ nearFinance.payment_deadline_date }}
            </p>
          </div>
          <div v-else>
            <h6 class="q-pt-md">Wszystko opłacone</h6>
          </div>
        </q-card-section>
      </transition>
      <q-inner-loading :showing="!nearFinance" label="Loading" style="border-radius: 12px" />
    </q-card>
    <q-card class="my-card announcements">
      <q-card-section>
        <div class="text-h5 title">
          <q-icon name="announcement" />
          Announcement
        </div>
      </q-card-section>
      <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
    </q-card>
    <q-card class="my-card news">
      <q-card-section>
        <div class="text-h5 title">
          <q-icon name="info" />
          News
        </div>
      </q-card-section>
      <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
    </q-card>
    <q-card class="my-card callendar">
      <q-card-section>
        <div class="text-h5 title">
          <q-icon name="event_note" />
          Calendar
        </div>
      </q-card-section>
      <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
    </q-card>
    <q-card class="my-card daily-schedule">
      <q-card-section>
        <div class="text-h5 title">
          <q-icon name="schedule" />
          Schedule
        </div>
      </q-card-section>
      <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { useFinanceStore } from '@/stores/finance'

const studentStore = useStudentStore()
const financeStore = useFinanceStore()

const { student } = storeToRefs(studentStore)
const { nearFinance, nearFinanceStyle } = storeToRefs(financeStore)
</script>

<style scoped lang="scss">
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

.title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.body--light {
  .my-card {
    background-color: $light-secondary;
  }

  .finances {
    &.warning {
      background: $amber-11;
    }
    &.negative {
      background: $red-4;
    }
  }
}

.body--dark {
  .my-card {
    background-color: $dark-secondary;
  }

  .finances {
    &.warning {
      background: $amber-14;
    }
    &.negative {
      background: $red-5;
    }
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
