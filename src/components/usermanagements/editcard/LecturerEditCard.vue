<template>
  <q-card class="my-card users-settings">
    <q-card-section class="flex justify-between">
      <div>
        <div class="text-h6">
          {{ selectedLecturer.first_name }} {{ selectedLecturer.last_name }}
        </div>
      </div>
      <img src="src/assets/imgs/avatar.jpg" alt="" />
    </q-card-section>
    <q-card-section class="q-pa-sm q-ma-sm">
      <q-tabs v-model="tab" class="text-light-green-14">
        <q-tab name="personal" label="Personal" />
        <q-tab name="university" label="University" />
      </q-tabs>
    </q-card-section>
    <q-card-section v-if="tab === 'personal'" style="overflow-y: scroll; overflow-x: hidden">
      <q-input
        v-model="selectedLecturer.first_name"
        ref="firstNameRef"
        type="text"
        label="first_name"
        color="light-green-14"
        :rules="newLecturerRules.first_name"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.last_name"
        ref="lastNameRef"
        type="text"
        label="last_name"
        :rules="newLecturerRules.last_name"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.date_of_birth"
        ref="birthdateRef"
        type="text"
        label="birthdate"
        :rules="newLecturerRules.date_of_birth"
        mask="####/##/##"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                v-model="selectedLecturer.date_of_birth"
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
        v-model="selectedLecturer.home_address"
        ref="addressRef"
        type="text"
        label="address"
        :rules="newLecturerRules.home_address"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.phone"
        ref="phoneRef"
        type="text"
        label="phone"
        :rules="newLecturerRules.phone"
        mask="+##-###-###-###"
        maxlength="15"
      />
      <q-select
        color="light-green-14"
        v-model="selectedLecturer.nationality"
        ref="nationalityRef"
        type="text"
        label="nationality"
        :rules="newLecturerRules.nationality"
        :options="nationals"
      />
      <q-select
        color="light-green-14"
        v-model="selectedLecturer.citizenship"
        ref="citizenshipRef"
        type="text"
        label="citizenship"
        :rules="newLecturerRules.citizenship"
        :options="countries"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.series_and_number_of_identity_card"
        ref="personalIdNumberRef"
        type="text"
        label="series_and_number_of_identity_card"
        :rules="newLecturerRules.series_and_number_of_identity_card"
        maxlength="11"
        mask="###########"
      />

      <q-select
        v-model="selectedLecturer.gender"
        ref="genderRef"
        color="light-green-14"
        label="gender"
        :rules="newLecturerRules.gender"
        :options="[
          { label: 'Male', value: '0' },
          { label: 'Female', value: '1' }
        ]"
        emit-value
        map-options
      />

      <q-input
        color="light-green-14"
        v-model="selectedLecturer.tax_identification_number"
        ref="taxIdentificationNumberRef"
        type="text"
        label="tax_identification_number"
        :rules="newLecturerRules.tax_identification_number"
        maxlength="10"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.series_and_number_of_identity_card"
        ref="seriesAndNumberOfIdentityCardRef"
        type="text"
        label="series_and_number_of_identity_card"
        :rules="newLecturerRules.series_and_number_of_identity_card"
        maxlength="9"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.id_card_issuing_authority"
        ref="idCardIssuingAuthorityRef"
        type="text"
        label="id_card_issuing_authority"
        :rules="newLecturerRules.id_card_issuing_authority"
        maxlength="50"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.passport_number"
        ref="passportNumberRef"
        type="text"
        label="passport_number"
        :rules="newLecturerRules.passport_number"
        maxlength="9"
      />
    </q-card-section>
    <q-card-section v-if="tab === 'university'" style="overflow-y: scroll; overflow-x: hidden">
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.academic_title"
        ref="indexRef"
        type="text"
        label="academic_title"
        :rules="newLecturerRules.academic_title"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.subjects_taught"
        ref="fieldOfStudyRef"
        type="text"
        label="subjects_taught"
        :rules="newLecturerRules.subjects_taught"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.contract_duration"
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
                v-model="selectedLecturer.contract_duration"
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
        color="light-green-14"
        v-model="selectedLecturer.employee_identification_number"
        ref="studentStatusRef"
        type="text"
        label="employee_identification_number"
        :rules="newLecturerRules.employee_identification_number"
        maxlength="100"
      />
      <q-input
        color="light-green-14"
        v-model="selectedLecturer.type_of_contract"
        ref="yearTermRef"
        type="text"
        label="type_of_contract"
        :rules="newLecturerRules.type_of_contract"
        maxlength="3"
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
import { useLecturerStore, type Lecturer } from '@/stores/lecturer'
const studentStore = useLecturerStore()
const { selectedLecturer, newLecturerRules } = storeToRefs(studentStore)

const tab = ref('personal')

const updateUser = () => {
  studentStore.updateLecturer(selectedLecturer.value)
}

const deselectUser = () => {
  selectedLecturer.value = {} as Lecturer
  studentStore.fetchLecturers()
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
