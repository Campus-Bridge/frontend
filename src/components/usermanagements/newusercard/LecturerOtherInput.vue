<template>
  <div class="flex q-gutter-md">
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.academic_title"
      ref="academicTitleRef"
      type="text"
      label="academic_title"
      :rules="newLecturerRules.academic_title"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.subjects_taught"
      ref="subjectsTaughtRef"
      type="text"
      label="subjects_taught"
      :rules="newLecturerRules.subjects_taught"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.contract_duration"
      ref="contractDurationRef"
      type="text"
      label="contract_duration"
      :rules="newLecturerRules.contract_duration"
      mask="####/##/##"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="newLecturer.contract_duration"
              color="light-green-14"
              :navigation-min-year-month="
                [new Date().getFullYear(), new Date().getMonth() + 1].toLocaleString()
              "
              default-view="Years"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="light-green-14" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.employee_identification_number"
      ref="employeeIdentificationNumberRef"
      type="text"
      label="employee_identification_number"
      :rules="newLecturerRules.employee_identification_number"
      maxlength="5"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.type_of_contract"
      ref="typeOfContractRef"
      type="text"
      label="type_of_contract"
      :rules="newLecturerRules.type_of_contract"
      maxlength="50"
    />
  </div>
</template>

<script setup lang="ts">
import { useLecturerStore } from '@/stores/lecturer'
const { newLecturer, newLecturerRef, newLecturerRules } = useLecturerStore()

const academicTitleRef = ref()
watch(academicTitleRef, () => {
  newLecturerRef.academic_title = academicTitleRef.value
})

const subjectsTaughtRef = ref()
watch(subjectsTaughtRef, () => {
  newLecturerRef.subjects_taught = subjectsTaughtRef.value
})

const contractDurationRef = ref()
watch(contractDurationRef, () => {
  newLecturerRef.contract_duration = contractDurationRef.value
})

const employeeIdentificationNumberRef = ref()
watch(employeeIdentificationNumberRef, () => {
  newLecturerRef.employee_identification_number = employeeIdentificationNumberRef.value
})

const typeOfContractRef = ref()
watch(typeOfContractRef, () => {
  newLecturerRef.type_of_contract = typeOfContractRef.value
})
</script>

<style lang="scss" scoped></style>
