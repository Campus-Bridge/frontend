<template>
  <div class="full-width row justify-center">
    <div class="col-6 login-background">
      <div class="fit column justify-center items-center">
        <p>Logo</p>
        <q-img
          src="../assets/imgs/Mobile.svg"
          spinner-color="primary"
          spinner-size="82px"
          width="75%"
          height="75%"
        />
        <p>asd</p>
      </div>
    </div>
    <div class="col-6 row justify-center items-center">
      <div class="login">
        <h2>Welcome</h2>
        <p>Log In your account!</p>
        <q-form @submit="onSubmit" @reset="onReset">
          <q-input
            filled
            v-model="email"
            label="Your email *"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type your email']"
          />
          <br />
          <q-input
            filled
            type="password"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
          >
            <template v-slot:append>
              <q-icon name="visibility" @click="password = ''" class="cursor-pointer" />
            </template>
          </q-input>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </div>
  <!-- <a href="https://storyset.com/online">Online illustrations by Storyset</a> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const onSubmit = (evt: Event) => {
  evt.preventDefault() // don't submit the form
  console.log('submit: ', email.value, password.value)
}

const onReset = () => {
  email.value = ''
  password.value = ''
  console.log('reset')
}
</script>

<style scoped>
.login-background {
  background-color: #ff725e;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 60%;
}
</style>
