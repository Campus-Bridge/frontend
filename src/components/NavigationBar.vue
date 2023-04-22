<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><q-btn color="primary" icon="logout" label="Log out" @click="logOut" /></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import router from '@/router'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

const logOut = async () => {
  const response = await axios.get('/user/logout')
  const { cookies } = useCookies()
  cookies.remove('token')
  if (response.status !== 200) {
    console.log('Error logging out')
    return
  }
  router.push({ name: 'home' })
}
</script>

<style scoped>
nav {
  background-color: #333;
  color: #fff;
  width: 7.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
