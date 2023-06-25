<template>
  <div class="flex q-gutter-md">
    <q-input
      style="width: calc(50% - 16px)"
      v-model="newUser.email"
      ref="emailRef"
      type="text"
      label="Email"
      color="light-green-14"
      :rules="newUserRule.email"
    />
    <q-select
      v-model="newUser.role"
      style="width: calc(50% - 16px)"
      ref="roleRef"
      color="light-green-14"
      :rules="newUserRule.role"
      :options="[
        {
          label: 'Student',
          value: 0
        },
        {
          label: 'Admin',
          value: 1
        },
        {
          label: 'Lecturer',
          value: 2
        }
      ]"
      label="Role"
      emit-value
      map-options
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
const { newUser, newUserRef, newUserRule } = useUserStore()

const emailRef = ref()
const roleRef = ref()

watch(emailRef, () => {
  newUserRef.email = emailRef.value
})
watch(roleRef, () => {
  newUserRef.role = roleRef.value
})
</script>

<style lang="scss" scoped></style>
