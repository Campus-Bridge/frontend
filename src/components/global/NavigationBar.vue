<template>
  <nav>
    <section>
      <q-img src="" alt="" width="100%" />
      <ul>
        <li v-for="(item, index) in userStore.getNavigation" :key="index">
          <router-link :to="item.link">
            <q-icon :name="item.icon">
              <q-tooltip class="text-body2" anchor="center right" self="center left">
                {{ item.name }}
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
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const logOut = async () => {
  await useUserStore().logOut()
}
</script>

<style lang="scss" scoped>
@import '@/css/quasar-variables.sass';

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
