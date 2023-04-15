<template>
  <div class="loginView">
    <header>
      <q-img
        src="@/assets/imgs/CAMPUSBRIDGE_LIGHT.svg"
        style="width: 250px"
        spinner-color="primary"
        spinner-size="82px"
      />
    </header>
    <main>
      <h2 class="q-mb-sm">Welcome Back!</h2>
      <h5 class="text-grey q-mb-md">Enter your detail to sign in.</h5>
      <q-form @reset="resetForm" @submit="submitForm">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          standout="bg-primary text-white"
          class="q-mb-md text-h5"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          standout="bg-primary text-white"
          class="q-mb-lg text-h5"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              @click="showPassword = !showPassword"
              class="cursor-pointer"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                {{ showPassword ? 'Hide Password' : 'Show Password' }}
              </q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <div style="display: flex; justify-content: space-between">
          <q-checkbox
            v-model="rememberMe"
            label="Remember me"
            class="q-mb-md"
            color="primary"
            dense
          />
          <q-btn
            label="Forgot Password?"
            flat
            rounded
            class="text-primary text-weight-bold q-mb-md"
          />
        </div>
        <div style="display: flex">
          <q-btn
            type="reset"
            label="Reset"
            style="width: 50%"
            outline
            rounded
            class="text-primary text-weight-bold q-mb-md"
          />
          <q-btn
            type="submit"
            label="Login"
            flat
            rounded
            style="width: 50%"
            class="bg-primary text-white text-weight-bold q-mb-md q-ml-md"
          />
        </div>
      </q-form>
    </main>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const resetForm = () => {
  email.value = ''
  password.value = ''
  rememberMe.value = false
  showPassword.value = false
}

const submitForm = async () => {
  const response = await axios.get('/user/login', {
    params: {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    }
  })
  console.log(response)
  if (response.status === 200) {
    localStorage.setItem('token', response.data)
    router.push('/about')
  } else {
    console.log('Login Failed')
  }
}
</script>

<style scoped>
.loginView {
  display: grid;
  align-items: center;
  grid-template-rows: 1fr 10fr;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/imgs/TLO.svg');
}
.loginView header {
  display: flex;
  align-items: center;
  margin-left: 6.25rem;
}
.loginView main {
  display: flex;
  flex-direction: column;
  margin-left: 12.5rem;
}

form {
  width: 30%;
}
</style>
