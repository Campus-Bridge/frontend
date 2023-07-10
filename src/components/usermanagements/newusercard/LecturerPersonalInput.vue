<template>
  <div class="flex justify-between" style="max-height: 75vh">
    <q-input
      style="width: calc(50% - 16px)"
      v-model="newLecturer.first_name"
      ref="firstNameRef"
      type="text"
      label="first_name"
      color="light-green-14"
      :rules="newLecturerRules.first_name"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.last_name"
      ref="lastNameRef"
      type="text"
      label="last_name"
      :rules="newLecturerRules.last_name"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.date_of_birth"
      ref="birthdateRef"
      mask="####/##/##"
      type="text"
      label="birthdate"
      :rules="newLecturerRules.date_of_birth"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="newLecturer.date_of_birth"
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
      v-model="newLecturer.home_address"
      ref="homeAddressRef"
      type="text"
      label="home_address"
      :rules="newLecturerRules.home_address"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.billing_address"
      ref="billingAddressRef"
      type="text"
      label="billing_address"
      :rules="newLecturerRules.billing_address"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.phone"
      ref="phoneRef"
      type="tel"
      label="phone"
      :rules="newLecturerRules.phone"
      mask="+##-###-###-###"
      maxlength="15"
    />
    <q-select
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.nationality"
      ref="nationalityRef"
      type="text"
      label="nationality"
      :rules="newLecturerRules.nationality"
      :options="nationals"
    />
    <q-select
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.citizenship"
      ref="citizenshipRef"
      type="text"
      label="citizenship"
      :rules="newLecturerRules.citizenship"
      :options="countries"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.series_and_number_of_identity_card"
      ref="seriesAndNumberOfIdentityCardRef"
      type="text"
      label="series_and_number_of_identity_card"
      :rules="newLecturerRules.series_and_number_of_identity_card"
      maxlength="9"
      mask="#########"
    />
    <q-select
      v-model="newLecturer.gender"
      ref="genderRef"
      style="width: calc(50% - 16px)"
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
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.tax_identification_number"
      ref="taxIdentificationNumberRef"
      type="text"
      label="tax_identification_number"
      :rules="newLecturerRules.tax_identification_number"
      maxlength="10"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.id_card_issuing_authority"
      ref="idCardIssuingAuthorityRef"
      type="text"
      label="id_card_issuing_authority"
      :rules="newLecturerRules.id_card_issuing_authority"
      maxlength="50"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.passport_number"
      ref="passportNumberRef"
      type="text"
      label="passport_number"
      :rules="newLecturerRules.passport_number"
      maxlength="9"
    />
    <q-input
      style="width: calc(50% - 16px)"
      color="light-green-14"
      v-model="newLecturer.bank_account_number"
      ref="bankAccountNumberRef"
      type="text"
      label="bank_account_number"
      :rules="newLecturerRules.bank_account_number"
      maxlength="26"
    />
  </div>
</template>

<script setup lang="ts">
import nationals from '@/modules/nationalites'
import countries from '@/modules/countries'
import { useLecturerStore } from '@/stores/lecturer'
const { newLecturer, newLecturerRef, newLecturerRules } = useLecturerStore()

const firstNameRef = ref()
watch(firstNameRef, () => {
  newLecturerRef.first_name = firstNameRef.value
})

const lastNameRef = ref()
watch(lastNameRef, () => {
  newLecturerRef.last_name = lastNameRef.value
})

const birthdateRef = ref()
watch(birthdateRef, () => {
  newLecturerRef.date_of_birth = birthdateRef.value
})

const billingAddressRef = ref()
watch(billingAddressRef, () => {
  newLecturerRef.billing_address = billingAddressRef.value
})

const homeAddressRef = ref()
watch(homeAddressRef, () => {
  newLecturerRef.home_address = homeAddressRef.value
})

const phoneRef = ref()
watch(phoneRef, () => {
  newLecturerRef.phone = phoneRef.value
})

const nationalityRef = ref()
watch(nationalityRef, () => {
  newLecturerRef.nationality = nationalityRef.value
})

const citizenshipRef = ref()
watch(citizenshipRef, () => {
  newLecturerRef.citizenship = citizenshipRef.value
})

const genderRef = ref()
watch(genderRef, () => {
  newLecturerRef.gender = genderRef.value
})

const taxIdentificationNumberRef = ref()
watch(taxIdentificationNumberRef, () => {
  newLecturerRef.tax_identification_number = taxIdentificationNumberRef.value
})

const seriesAndNumberOfIdentityCardRef = ref()
watch(seriesAndNumberOfIdentityCardRef, () => {
  newLecturerRef.series_and_number_of_identity_card = seriesAndNumberOfIdentityCardRef.value
})

const idCardIssuingAuthorityRef = ref()
watch(idCardIssuingAuthorityRef, () => {
  newLecturerRef.id_card_issuing_authority = idCardIssuingAuthorityRef.value
})

const passportNumberRef = ref()
watch(passportNumberRef, () => {
  newLecturerRef.passport_number = passportNumberRef.value
})

const bankAccountNumberRef = ref()
watch(bankAccountNumberRef, () => {
  newLecturerRef.bank_account_number = bankAccountNumberRef.value
})
</script>

<style lang="scss" scoped></style>
