<template>
  <div class="flex q-gutter-md">
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.index_number"
      ref="indexRef"
      type="text"
      label="Index"
      :rules="newStudentRule.index_number"
      maxlength="5"
      mask="#####"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.field_of_study"
      ref="fieldOfStudyRef"
      type="text"
      label="field_of_study"
      :rules="newStudentRule.field_of_study"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.course_of_study"
      ref="courseOfStudyRef"
      type="text"
      label="course_of_study"
      :rules="newStudentRule.course_of_study"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.student_status"
      ref="studentStatusRef"
      type="text"
      label="student_status"
      :rules="newStudentRule.student_status"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.year_term"
      ref="yearTermRef"
      type="text"
      label="year_term"
      :rules="newStudentRule.year_term"
      maxlength="3"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.type_of_study"
      ref="typeOfStudyRef"
      type="text"
      label="type_of_study"
      :rules="newStudentRule.type_of_study"
      maxlength="20"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.department"
      ref="departmentRef"
      type="text"
      label="department"
      :rules="newStudentRule.department"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.speciality"
      ref="specialityRef"
      type="text"
      label="speciality"
      :rules="newStudentRule.speciality"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.specialization"
      ref="specializationRef"
      type="text"
      label="specialization"
      :rules="newStudentRule.specialization"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.title_obtained"
      ref="titleObtainedRef"
      type="text"
      label="title_obtained"
      :rules="newStudentRule.title_obtained"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.start_date_of_studies"
      ref="startDateOfStudiesRef"
      mask="date"
      type="text"
      label="start_date_of_studies"
      :rules="newStudentRule.start_date_of_studies"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="newStudent.start_date_of_studies"
              color="light-green-14"
              :default-year-month="
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
      v-model="newStudent.expected_date_of_graduation"
      ref="expectedDateOfGraduationRef"
      mask="date"
      type="text"
      label="expected_date_of_graduation"
      :rules="newStudentRule.expected_date_of_graduation"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="newStudent.expected_date_of_graduation"
              color="light-green-14"
              :default-year-month="
                [new Date().getFullYear() + 4, new Date().getMonth() + 1].toLocaleString()
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
    <q-select
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.individual_course"
      ref="individualCourseRef"
      type="text"
      label="individual_course"
      :rules="newStudentRule.individual_course"
      :options="[
        {
          label: 'Yes',
          value: true
        },
        {
          label: 'No',
          value: false
        }
      ]"
      emit-value
      map-options
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.date_and_number_of_contract"
      ref="dateAndNumberOfContractRef"
      type="text"
      label="date_and_number_of_contract"
      :rules="newStudentRule.date_and_number_of_contract"
      maxlength="20"
    />
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
const { newStudent, newStudentRef, newStudentRule } = useStudentStore()

const indexRef = ref()
watch(indexRef, () => {
  newStudentRef.index_number = indexRef.value
})

const fieldOfStudyRef = ref()
watch(fieldOfStudyRef, () => {
  newStudentRef.field_of_study = fieldOfStudyRef.value
})

const courseOfStudyRef = ref()
watch(courseOfStudyRef, () => {
  newStudentRef.course_of_study = courseOfStudyRef.value
})

const studentStatusRef = ref()
watch(studentStatusRef, () => {
  newStudentRef.student_status = studentStatusRef.value
})

const yearTermRef = ref()
watch(yearTermRef, () => {
  newStudentRef.year_term = yearTermRef.value
})

const typeOfStudyRef = ref()
watch(typeOfStudyRef, () => {
  newStudentRef.type_of_study = typeOfStudyRef.value
})

const departmentRef = ref()
watch(departmentRef, () => {
  newStudentRef.department = departmentRef.value
})

const specialityRef = ref()
watch(specialityRef, () => {
  newStudentRef.speciality = specialityRef.value
})

const specializationRef = ref()
watch(specializationRef, () => {
  newStudentRef.specialization = specializationRef.value
})

const titleObtainedRef = ref()
watch(titleObtainedRef, () => {
  newStudentRef.title_obtained = titleObtainedRef.value
})

const startDateOfStudiesRef = ref()
watch(startDateOfStudiesRef, () => {
  newStudentRef.start_date_of_studies = startDateOfStudiesRef.value
})

const expectedDateOfGraduationRef = ref()
watch(expectedDateOfGraduationRef, () => {
  newStudentRef.expected_date_of_graduation = expectedDateOfGraduationRef.value
})

const individualCourseRef = ref()
watch(individualCourseRef, () => {
  newStudentRef.individual_course = individualCourseRef.value
})

const dateAndNumberOfContractRef = ref()
watch(dateAndNumberOfContractRef, () => {
  newStudentRef.date_and_number_of_contract = dateAndNumberOfContractRef.value
})
</script>

<style lang="scss" scoped></style>
