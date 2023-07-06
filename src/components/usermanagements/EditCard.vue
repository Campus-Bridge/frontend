<template>
  <StudentEditCard v-if="selectedStudent.id" />
  <LecturerEditCard v-else-if="selectedLecturer.id" />
</template>

<script lang="ts" setup>
import StudentEditCard from './editcard/StudentEditCard.vue'
import LecturerEditCard from './editcard/LecturerEditCard.vue'

import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { useLecturerStore } from '@/stores/lecturer'

const studentStore = useStudentStore()
const { selectedStudent } = storeToRefs(studentStore)
const lecturerStore = useLecturerStore()
const { selectedLecturer } = storeToRefs(lecturerStore)
</script>

<style lang="scss" scoped>
.my-card {
  border-radius: 12px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

  &.users-settings {
    flex-basis: 30%;
    display: grid;
    grid-template-rows: 1fr auto 10fr auto 1fr;
    .buttons {
      display: flex;
      justify-content: space-evenly;
    }
    img {
      width: 15%;
      border-radius: 50%;
      border: 2px solid $light-green-14;
    }
  }
}
</style>
