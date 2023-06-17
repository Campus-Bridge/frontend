<template>
  <q-card class="my-card users-settings">
    <q-card-section class="flex justify-between">
      <div>
        <div class="text-h6">{{ selectedUser.first_name }} {{ selectedUser.last_name }}</div>
        <div class="text-subtitle2">Index: {{ selectedUser.index }}</div>
      </div>
      <img src="src/assets/imgs/avatar.jpg" alt="" />
    </q-card-section>
    <q-card-section class="q-pa-sm q-ma-sm">
      <q-tabs v-model="tab" class="text-light-green-14">
        <q-tab name="personal" label="Personal" />
        <q-tab name="studies" label="Studies" />
      </q-tabs>
    </q-card-section>
    <q-card-section
      v-if="tab === 'personal'"
      style="overflow-y: scroll; overflow-x: hidden"
      class="q-gutter-md"
    >
      <q-input
        v-model="selectedUser.first_name"
        type="text"
        label="First Name"
        color="light-green-14"
      />
      <q-input
        v-model="selectedUser.last_name"
        type="text"
        label="Last Name"
        color="light-green-14"
      />
      <q-input v-model="selectedUser.email" type="email" label="Email" color="light-green-14" />
      <q-input
        v-model="selectedUser.birthdate"
        type="text"
        label="Birthdate"
        color="light-green-14"
      />
      <q-input
        v-model="selectedUser.phone"
        type="text"
        label="Phone Number"
        color="light-green-14"
        mask="+###########"
        hint="Enter phone number in format +48123456789"
      />
      <q-input v-model="selectedUser.address" type="text" label="Address" color="light-green-14" />
      <q-input
        v-model="selectedUser.index"
        type="text"
        label="Index"
        color="light-green-14"
        mask="#####"
        hint="Enter index in format 12345"
      />
      <q-input
        v-model="selectedUser.field_of_study"
        type="text"
        label="Field of study"
        color="light-green-14"
      />
      <q-input
        v-model="selectedUser.middle_name"
        type="text"
        label="Middle Name"
        color="light-green-14"
      />
      <q-select
        v-model="selectedUser.nationality"
        label="Nationality"
        color="light-green-14"
        :options="nationalities"
      />
      <q-select
        v-model="selectedUser.citizenship"
        label="Place of birth"
        color="light-green-14"
        :options="nationalities"
      />
      <q-input
        v-model="selectedUser.personal_id_number"
        type="text"
        label="Personal id number"
        color="light-green-14"
        mask="##########1"
        hint="Enter personal id number in format 12345678900"
      />
      <q-input v-model="selectedUser.mother" type="text" label="Mother" color="light-green-14" />
      <q-input v-model="selectedUser.father" type="text" label="Father" color="light-green-14" />
      <q-select
        v-model="selectedUser.gender"
        label="Gender"
        color="light-green-14"
        :options="gender"
        emit-value
        map-options
      />
    </q-card-section>
    <q-card-section v-if="tab === 'studies'"> </q-card-section>
    <q-separator />
    <q-card-actions class="buttons">
      <q-btn flat icon="save" label="Save" color="light-green-14" @click="updateUser" />
      <q-btn flat icon="close" label="Cancel" color="light-green-14" @click="deselectUser" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
interface Student {
  id: number
  first_name: string
  last_name: string
  birthdate: string
  address: string
  phone: string
  index: string
  field_of_study: string
  email: string
  middle_name: string
  nationality: string
  citizenship: string
  personal_id_number: string
  mother: string
  father: string
  gender: boolean
}

import { useStudentStore } from '@/stores/student'
const studentStore = useStudentStore()
const props = defineProps({
  selectedUser: {
    type: Object as PropType<Student>,
    required: true
  }
})
const emits = defineEmits(['deselectUser'])

const selectedUser = ref<Student>(props.selectedUser)

const tab = ref('personal')

const nationalities = ['Polish', 'English', 'German', 'French', 'Spanish', 'Italian']
const gender = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 1 }
]

const deselectUser = () => {
  emits('deselectUser')
}

const updateUser = () => {
  studentStore.updateStudent(selectedUser.value)
}
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
