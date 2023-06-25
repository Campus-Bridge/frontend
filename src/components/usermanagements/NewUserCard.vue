<template>
  <q-stepper
    v-model="tab"
    ref="stepper"
    done-color="light-green-14"
    active-color="light-green-14"
    animated
    style="width: 900px; max-width: 900px; height: auto"
    flat
  >
    <q-step :name="1" title="User type" icon="settings" :done="tab > 1">
      <UserInput />
    </q-step>
    <q-step :name="2" title="Personal information" icon="create_new_folder" :done="tab > 2">
      <StudentPersonalInput v-if="newUser.role === 0" />
    </q-step>
    <q-step :name="3" title="Other information" icon="create_new_folder" :done="tab > 3">
      <StudentOtherInput v-if="newUser.role === 0" />
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          @click="next()"
          color="light-green-14"
          outline
          :label="tab === 3 ? 'Finish' : 'Continue'"
          :icon="tab === 3 ? 'check' : 'arrow_forward'"
        />
        <q-btn
          v-if="tab > 1"
          flat
          color="light-green-14"
          @click="previous()"
          label="Back"
          class="q-ml-sm"
          icon="arrow_back"
        />
        <q-btn
          color="light-green-14"
          flat
          icon="cancel"
          label="Cancel"
          class="q-ml-sm"
          @click="closePop()"
          v-close-popup
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script lang="ts" setup>
import StudentOtherInput from './newusercard/StudentOtherInput.vue'
import UserInput from './newusercard/UserInput.vue'
import StudentPersonalInput from './newusercard/StudentPersonalInput.vue'
import { useUserStore } from '@/stores/user'
import { useStudentStore } from '@/stores/student'
const { newUser, newUserRef, createUser, resetNewUser } = useUserStore()
const { newStudentRef, createStudent, resetNewStudent } = useStudentStore()

const tab = ref(1)
const emit = defineEmits(['closePop'])

const next = async () => {
  console.log(Valid())
  if (Valid()) return

  if (tab.value < 3) {
    tab.value++
  } else {
    const id = await createUser()
    console.log(id)
    await createStudent(id)
    emit('closePop')
  }
}

const closePop = () => {
  resetNewUser()
  resetNewStudent()
}

const Valid = () => {
  if (tab.value === 1) {
    newUserRef.email.validate()
    newUserRef.role.validate()
    return newUserRef.email.hasError || newUserRef.role.value
  } else if (tab.value === 2) {
    newStudentRef.first_name.validate()
    newStudentRef.last_name.validate()
    newStudentRef.birthdate.validate()
    newStudentRef.address.validate()
    newStudentRef.phone.validate()
    newStudentRef.middle_name.validate()
    newStudentRef.nationality.validate()
    newStudentRef.citizenship.validate()
    newStudentRef.personal_id_number.validate()
    newStudentRef.mother.validate()
    newStudentRef.father.validate()
    newStudentRef.gender.validate()
    newStudentRef.marital_status.validate()
    newStudentRef.tax_identification_number.validate()
    newStudentRef.series_and_number_of_identity_card.validate()
    newStudentRef.id_card_issuing_authority.validate()
    newStudentRef.passport_number.validate()
    newStudentRef.series_and_number_of_military_booklet.validate()
    newStudentRef.mothers_maiden_name.validate()
    newStudentRef.maiden_name.validate()

    return (
      newStudentRef.first_name.hasError ||
      newStudentRef.last_name.hasError ||
      newStudentRef.birthdate.hasError ||
      newStudentRef.address.hasError ||
      newStudentRef.phone.hasError ||
      newStudentRef.middle_name.hasError ||
      newStudentRef.nationality.hasError ||
      newStudentRef.citizenship.hasError ||
      newStudentRef.personal_id_number.hasError ||
      newStudentRef.mother.hasError ||
      newStudentRef.father.hasError ||
      newStudentRef.gender.hasError ||
      newStudentRef.marital_status.hasError ||
      newStudentRef.tax_identification_number.hasError ||
      newStudentRef.series_and_number_of_identity_card.hasError ||
      newStudentRef.id_card_issuing_authority.hasError ||
      newStudentRef.passport_number.hasError ||
      newStudentRef.series_and_number_of_military_booklet.hasError ||
      newStudentRef.mothers_maiden_name.hasError ||
      newStudentRef.maiden_name.hasError
    )
  } else if (tab.value === 3) {
    newStudentRef.field_of_study.validate()
    newStudentRef.index_number.validate()
    newStudentRef.course_of_study.validate()
    newStudentRef.student_status.validate()
    newStudentRef.year_term.validate()
    newStudentRef.type_of_study.validate()
    newStudentRef.department.validate()
    newStudentRef.speciality.validate()
    newStudentRef.specialization.validate()
    newStudentRef.title_obtained.validate()
    newStudentRef.start_date_of_studies.validate()
    newStudentRef.expected_date_of_graduation.validate()
    newStudentRef.individual_course.validate()
    newStudentRef.date_and_number_of_contract.validate()

    return (
      newStudentRef.field_of_study.hasError ||
      newStudentRef.index_number.hasError ||
      newStudentRef.course_of_study.hasError ||
      newStudentRef.student_status.hasError ||
      newStudentRef.year_term.hasError ||
      newStudentRef.type_of_study.hasError ||
      newStudentRef.department.hasError ||
      newStudentRef.speciality.hasError ||
      newStudentRef.specialization.hasError ||
      newStudentRef.title_obtained.hasError ||
      newStudentRef.start_date_of_studies.hasError ||
      newStudentRef.expected_date_of_graduation.hasError ||
      newStudentRef.individual_course.hasError ||
      newStudentRef.date_and_number_of_contract.hasError
    )
  }
}

const previous = () => {
  if (tab.value > 1) {
    tab.value--
  }
}
</script>

<style lang="scss">
.user-role-card {
  transition: all 0.3s;
  img {
    filter: grayscale(1);
  }
}
.active {
  border: 1px solid $light-green-14;
  img {
    filter: grayscale(0);
  }
}
</style>
