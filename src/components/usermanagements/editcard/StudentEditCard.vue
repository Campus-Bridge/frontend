<template>
  <q-card class="my-card users-settings">
    <q-card-section class="flex justify-between">
      <div>
        <div class="text-h6">{{ selectedStudent.first_name }} {{ selectedStudent.last_name }}</div>
        <div class="text-subtitle2">Index: {{ selectedStudent.index_number }}</div>
      </div>
      <img src="src/assets/imgs/avatar.jpg" alt="" />
    </q-card-section>
    <q-card-section class="q-pa-sm q-ma-sm">
      <q-tabs v-model="tab" class="text-light-green-14">
        <q-tab name="personal" label="Personal" />
        <q-tab name="studies" label="Studies" />
      </q-tabs>
    </q-card-section>
    <q-card-section v-if="tab === 'personal'" style="overflow-y: scroll; overflow-x: hidden">
      <q-input
        v-model="selectedStudent.first_name"
        ref="firstNameRef"
        type="text"
        label="first_name"
        color="light-green-14"
        :rules="newStudentRule.first_name"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.last_name"
        ref="lastNameRef"
        type="text"
        label="last_name"
        :rules="newStudentRule.last_name"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.birthdate"
        ref="birthdateRef"
        type="text"
        label="birthdate"
        :rules="newStudentRule.birthdate"
        mask="####/##/##"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                v-model="selectedStudent.birthdate"
                color="light-green-14"
                :default-year-month="
                  [new Date().getFullYear() - 18, new Date().getMonth() + 1].toLocaleString()
                "
                :navigation-max-year-month="
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
        color="light-green-14"
        v-model="selectedStudent.address"
        ref="addressRef"
        type="text"
        label="address"
        :rules="newStudentRule.address"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.phone"
        ref="phoneRef"
        type="text"
        label="phone"
        :rules="newStudentRule.phone"
        mask="+##-###-###-###"
        maxlength="15"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.middle_name"
        ref="middleNameRef"
        type="text"
        label="middle_name"
        :rules="newStudentRule.middle_name"
        maxlength="50"
      />
      <q-select
        color="light-green-14"
        v-model="selectedStudent.nationality"
        ref="nationalityRef"
        type="text"
        label="nationality"
        :rules="newStudentRule.nationality"
        :options="nationals"
      />
      <q-select
        color="light-green-14"
        v-model="selectedStudent.citizenship"
        ref="citizenshipRef"
        type="text"
        label="citizenship"
        :rules="newStudentRule.citizenship"
        :options="countries"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.personal_id_number"
        ref="personalIdNumberRef"
        type="text"
        label="personal_id_number"
        :rules="newStudentRule.personal_id_number"
        maxlength="11"
        mask="###########"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.mother"
        ref="motherRef"
        type="text"
        label="mother"
        :rules="newStudentRule.mother"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.father"
        ref="fatherRef"
        type="text"
        label="father"
        :rules="newStudentRule.father"
        maxlength="50"
      />
      <q-select
        v-model="selectedStudent.gender"
        ref="genderRef"
        color="light-green-14"
        label="gender"
        :rules="newStudentRule.gender"
        :options="[
          { label: 'Male', value: '0' },
          { label: 'Female', value: '1' }
        ]"
        emit-value
        map-options
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.marital_status"
        ref="maritalStatusRef"
        type="text"
        label="marital_status"
        :rules="newStudentRule.marital_status"
        maxlength="7"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.tax_identification_number"
        ref="taxIdentificationNumberRef"
        type="text"
        label="tax_identification_number"
        :rules="newStudentRule.tax_identification_number"
        maxlength="10"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.series_and_number_of_identity_card"
        ref="seriesAndNumberOfIdentityCardRef"
        type="text"
        label="series_and_number_of_identity_card"
        :rules="newStudentRule.series_and_number_of_identity_card"
        maxlength="9"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.id_card_issuing_authority"
        ref="idCardIssuingAuthorityRef"
        type="text"
        label="id_card_issuing_authority"
        :rules="newStudentRule.id_card_issuing_authority"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.passport_number"
        ref="passportNumberRef"
        type="text"
        label="passport_number"
        :rules="newStudentRule.passport_number"
        maxlength="9"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.series_and_number_of_military_booklet"
        ref="seriesAndNumberOfMilitaryBookletRef"
        type="text"
        label="series_and_number_of_military_booklet"
        :rules="newStudentRule.series_and_number_of_military_booklet"
        maxlength="8"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.mothers_maiden_name"
        ref="mothersMaidenNameRef"
        type="text"
        label="mothers_maiden_name"
        :rules="newStudentRule.mothers_maiden_name"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.maiden_name"
        ref="maidenNameRef"
        type="text"
        label="maiden_name"
        :rules="newStudentRule.maiden_name"
        maxlength="50"
      />
    </q-card-section>
    <q-card-section v-if="tab === 'studies'" style="overflow-y: scroll; overflow-x: hidden">
      <q-input
        color="light-green-14"
        v-model="selectedStudent.index_number"
        ref="indexRef"
        type="text"
        label="Index"
        :rules="newStudentRule.index_number"
        maxlength="5"
        mask="#####"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.field_of_study"
        ref="fieldOfStudyRef"
        type="text"
        label="field_of_study"
        :rules="newStudentRule.field_of_study"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.course_of_study"
        ref="courseOfStudyRef"
        type="text"
        label="course_of_study"
        :rules="newStudentRule.course_of_study"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.student_status"
        ref="studentStatusRef"
        type="text"
        label="student_status"
        :rules="newStudentRule.student_status"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.year_term"
        ref="yearTermRef"
        type="text"
        label="year_term"
        :rules="newStudentRule.year_term"
        maxlength="3"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.type_of_study"
        ref="typeOfStudyRef"
        type="text"
        label="type_of_study"
        :rules="newStudentRule.type_of_study"
        maxlength="20"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.department"
        ref="departmentRef"
        type="text"
        label="department"
        :rules="newStudentRule.department"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.speciality"
        ref="specialityRef"
        type="text"
        label="speciality"
        :rules="newStudentRule.speciality"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.specialization"
        ref="specializationRef"
        type="text"
        label="specialization"
        :rules="newStudentRule.specialization"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.title_obtained"
        ref="titleObtainedRef"
        type="text"
        label="title_obtained"
        :rules="newStudentRule.title_obtained"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedStudent.start_date_of_studies"
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
                v-model="selectedStudent.start_date_of_studies"
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
        color="light-green-14"
        v-model="selectedStudent.expected_date_of_graduation"
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
                v-model="selectedStudent.expected_date_of_graduation"
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
        color="light-green-14"
        v-model="selectedStudent.individual_course"
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
        color="light-green-14"
        v-model="selectedStudent.date_and_number_of_contract"
        ref="dateAndNumberOfContractRef"
        type="text"
        label="date_and_number_of_contract"
        :rules="newStudentRule.date_and_number_of_contract"
        maxlength="20"
      />
    </q-card-section>
    <q-separator />
    <q-card-actions class="buttons">
      <q-btn flat icon="save" label="Save" color="light-green-14" @click="updateUser" />
      <q-btn flat icon="close" label="Cancel" color="light-green-14" @click="deselectUser" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import nationals from '@/modules/nationalites'
import countries from '@/modules/countries'

import { storeToRefs } from 'pinia'
import { useStudentStore, type Student } from '@/stores/student'
const studentStore = useStudentStore()
const { selectedStudent, newStudentRule } = storeToRefs(studentStore)

const tab = ref('personal')

const updateUser = () => {
  studentStore.updateStudent(selectedStudent.value)
}

const deselectUser = () => {
  selectedStudent.value = {} as Student
  studentStore.fetchStudents()
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
