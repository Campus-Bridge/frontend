<template>
  <nav>
    <section>
      <q-img src="" alt="" width="100%" />
      <ul>
        <li>
          <router-link to="/dashboard">
            <q-icon name="dashboard">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                Dashboard
              </q-tooltip>
            </q-icon>
          </router-link>
        </li>
        <li data-testid='schedule'>
          <router-link to="/a">
            <q-icon name="today">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                Schedule
              </q-tooltip>
            </q-icon>
          </router-link>
        </li>
        <li data-testid='grades'>
          <router-link to="/b">
            <q-icon name="grade">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                Grades
              </q-tooltip>
            </q-icon>
          </router-link>
        </li>
        <li data-testid='announcement'>
          <router-link to="/c">
            <q-icon name="announcement">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                Announcement
              </q-tooltip>
            </q-icon>
          </router-link>
        </li>
        <li data-testid='finance'>
          <router-link to="/d">
            <q-icon name="account_balance">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                Finance
              </q-tooltip>
            </q-icon>
          </router-link>
        </li>
        <li data-testid='files'>
          <router-link to="/e">
            <q-icon name="cloud_download">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                Files
              </q-tooltip>
            </q-icon>
          </router-link>
        </li>
        <li data-testid='account'>
          <router-link to="/d">
            <q-icon name="account_circle">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                Account
              </q-tooltip>
            </q-icon>
          </router-link>
        </li>
      </ul>
      <q-btn color="light-green-14" unelevated round icon="logout" @click="logOut" />
    </section>
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

<style lang="scss" scoped>
@import '@/assets/quasar-variables.sass';

.body--light {
  section {
    background-color: $light-secondary;
  }

  a {
    color: $grey-7;
  }
  .router-link-active {
    color: $light-green-14;
  }
}
.body--dark {
  section {
    background-color: $dark-secondary;
  }
  a {
    color: $grey-1;
  }
  .router-link-active {
    color: $light-green-14;
  }
}

nav {
  width: 75px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 1rem 0;
    border-radius: 12px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

a {
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: $light-green-14;
}
</style>
