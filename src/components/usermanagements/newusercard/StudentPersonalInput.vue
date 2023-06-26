<template>
  <div class="flex justify-between" style="max-height: 75vh">
    <q-input
      style="width: calc(50% - 16px)"
      v-model="newStudent.first_name"
      ref="firstNameRef"
      type="text"
      label="first_name"
      color="light-green-14"
      :rules="newStudentRule.first_name"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.last_name"
      ref="lastNameRef"
      type="text"
      label="last_name"
      :rules="newStudentRule.last_name"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.birthdate"
      ref="birthdateRef"
      mask="####/##/##"
      type="text"
      label="birthdate"
      :rules="newStudentRule.birthdate"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="newStudent.birthdate"
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
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.address"
      ref="addressRef"
      type="text"
      label="address"
      :rules="newStudentRule.address"
      maxlength="100"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.phone"
      ref="phoneRef"
      type="tel"
      label="phone"
      :rules="newStudentRule.phone"
      mask="+##-###-###-###"
      maxlength="15"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.middle_name"
      ref="middleNameRef"
      type="text"
      label="middle_name"
      :rules="newStudentRule.middle_name"
      maxlength="50"
    />
    <q-select
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.nationality"
      ref="nationalityRef"
      type="text"
      label="nationality"
      :rules="newStudentRule.nationality"
      :options="nationals"
    />
    <q-select
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.citizenship"
      ref="citizenshipRef"
      type="text"
      label="citizenship"
      :rules="newStudentRule.citizenship"
      :options="countries"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.personal_id_number"
      ref="personalIdNumberRef"
      type="text"
      label="personal_id_number"
      :rules="newStudentRule.personal_id_number"
      maxlength="11"
      mask="###########"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.mother"
      ref="motherRef"
      type="text"
      label="mother"
      :rules="newStudentRule.mother"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.father"
      ref="fatherRef"
      type="text"
      label="father"
      :rules="newStudentRule.father"
      maxlength="50"
    />
    <q-select
      v-model="newStudent.gender"
      ref="genderRef"
      style="width: calc(50% - 16px)"
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
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.marital_status"
      ref="maritalStatusRef"
      type="text"
      label="marital_status"
      :rules="newStudentRule.marital_status"
      maxlength="7"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.tax_identification_number"
      ref="taxIdentificationNumberRef"
      type="text"
      label="tax_identification_number"
      :rules="newStudentRule.tax_identification_number"
      maxlength="10"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.series_and_number_of_identity_card"
      ref="seriesAndNumberOfIdentityCardRef"
      type="text"
      label="series_and_number_of_identity_card"
      :rules="newStudentRule.series_and_number_of_identity_card"
      maxlength="9"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.id_card_issuing_authority"
      ref="idCardIssuingAuthorityRef"
      type="text"
      label="id_card_issuing_authority"
      :rules="newStudentRule.id_card_issuing_authority"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.passport_number"
      ref="passportNumberRef"
      type="text"
      label="passport_number"
      :rules="newStudentRule.passport_number"
      maxlength="9"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.series_and_number_of_military_booklet"
      ref="seriesAndNumberOfMilitaryBookletRef"
      type="text"
      label="series_and_number_of_military_booklet"
      :rules="newStudentRule.series_and_number_of_military_booklet"
      maxlength="8"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.mothers_maiden_name"
      ref="mothersMaidenNameRef"
      type="text"
      label="mothers_maiden_name"
      :rules="newStudentRule.mothers_maiden_name"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newStudent.maiden_name"
      ref="maidenNameRef"
      type="text"
      label="maiden_name"
      :rules="newStudentRule.maiden_name"
      maxlength="50"
    />
  </div>
</template>

<script setup lang="ts">
import nationals from '@/modules/nationalites'
import countries from '@/modules/countries'
import { useStudentStore } from '@/stores/student'
const { newStudent, newStudentRef, newStudentRule } = useStudentStore()

const firstNameRef = ref()
watch(firstNameRef, () => {
  newStudentRef.first_name = firstNameRef.value
})

const lastNameRef = ref()
watch(lastNameRef, () => {
  newStudentRef.last_name = lastNameRef.value
})

const birthdateRef = ref()
watch(birthdateRef, () => {
  newStudentRef.birthdate = birthdateRef.value
})

const addressRef = ref()
watch(addressRef, () => {
  newStudentRef.address = addressRef.value
})

const phoneRef = ref()
watch(phoneRef, () => {
  newStudentRef.phone = phoneRef.value
})

const middleNameRef = ref()
watch(middleNameRef, () => {
  newStudentRef.middle_name = middleNameRef.value
})

const nationalityRef = ref()
watch(nationalityRef, () => {
  newStudentRef.nationality = nationalityRef.value
})

const citizenshipRef = ref()
watch(citizenshipRef, () => {
  newStudentRef.citizenship = citizenshipRef.value
})

const personalIdNumberRef = ref()
watch(personalIdNumberRef, () => {
  newStudentRef.personal_id_number = personalIdNumberRef.value
})

const motherRef = ref()
watch(motherRef, () => {
  newStudentRef.mother = motherRef.value
})

const fatherRef = ref()
watch(fatherRef, () => {
  newStudentRef.father = fatherRef.value
})

const genderRef = ref()
watch(genderRef, () => {
  newStudentRef.gender = genderRef.value
})

const maritalStatusRef = ref()
watch(maritalStatusRef, () => {
  newStudentRef.marital_status = maritalStatusRef.value
})

const taxIdentificationNumberRef = ref()
watch(taxIdentificationNumberRef, () => {
  newStudentRef.tax_identification_number = taxIdentificationNumberRef.value
})

const seriesAndNumberOfIdentityCardRef = ref()
watch(seriesAndNumberOfIdentityCardRef, () => {
  newStudentRef.series_and_number_of_identity_card = seriesAndNumberOfIdentityCardRef.value
})

const idCardIssuingAuthorityRef = ref()
watch(idCardIssuingAuthorityRef, () => {
  newStudentRef.id_card_issuing_authority = idCardIssuingAuthorityRef.value
})

const passportNumberRef = ref()
watch(passportNumberRef, () => {
  newStudentRef.passport_number = passportNumberRef.value
})

const seriesAndNumberOfMilitaryBookletRef = ref()
watch(seriesAndNumberOfMilitaryBookletRef, () => {
  newStudentRef.series_and_number_of_military_booklet = seriesAndNumberOfMilitaryBookletRef.value
})

const mothersMaidenNameRef = ref()
watch(mothersMaidenNameRef, () => {
  newStudentRef.mothers_maiden_name = mothersMaidenNameRef.value
})

const maidenNameRef = ref()
watch(maidenNameRef, () => {
  newStudentRef.maiden_name = maidenNameRef.value
})
</script>

<style lang="scss" scoped></style>
