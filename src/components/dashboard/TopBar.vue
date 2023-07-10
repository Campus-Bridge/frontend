<template>
  <div class="topbar">
    <q-spinner-gears
      color="light-green-14"
      size="3rem"
      :thickness="5"
      v-if="props.firstName === undefined"
    />
    <div class="user_data" v-else>
      <q-img
        :src="getAvatar()"
        spinner-color="light-green-14"
        spinner-size="32px"
        width="64px"
        height="64px"
        class="user_image"
      />
      <div>
        <p class="q-ma-none user_info">Welcome back,</p>
        <p class="q-ma-none user_name">{{ fullName }}</p>
      </div>
    </div>
    <div class="user_settings">
      <q-fab flat icon="settings" vertical-actions-align="right" push direction="left">
        <q-fab-action
          :color="themeColor"
          :text-color="themeColorText"
          @click="ToggleTheme"
          :icon="themeIcon"
          :label="themeText"
        />
      </q-fab>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
const $q = useQuasar()

const props = defineProps(['firstName', 'lastName'])
const fullName = computed(() => `${props.firstName} ${props.lastName}`)

function getAvatar() {
  return 'src/assets/imgs/avatar.jpg'
}

const themeText = computed(() => {
  if ($q.dark.isActive) return 'Light Mode'
  return 'Dark Mode'
})

const themeIcon = computed(() => {
  if ($q.dark.isActive) return 'light_mode'
  return 'dark_mode'
})

const themeColor = computed(() => {
  if ($q.dark.isActive) return 'grey-1'
  return 'grey-7'
})

const themeColorText = computed(() => {
  if ($q.dark.isActive) return 'grey-9'
  return 'grey-1'
})

const ToggleTheme = () => {
  $q.dark.toggle()
  localStorage.setItem('dark', $q.dark.isActive ? 'true' : 'false')
}
</script>

<style lang="scss" scoped>
.topbar {
  width: 100%;
  height: 96px;
  background: $light-green-14;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 10px;
}

.body--light {
  .topbar {
    background: $light-secondary;
  }
}

.body--dark {
  .topbar {
    background: $dark-secondary;
  }
  .user_data {
    .user_name {
      color: $grey-4;
    }

    .user_info {
      color: $grey-5;
    }
  }
}

.user_data {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
  text-transform: capitalize;
  .user_image {
    border-radius: 50%;
    border: 2px solid $light-green-14;
  }

  .user_name {
    font-size: 1.5rem;
    font-weight: bold;
    color: $grey-10;
  }

  .user_info {
    font-size: 1.1rem;
    font-weight: 300;
    color: $grey-8;
  }
}

.user_settings {
  display: flex;
  gap: 32px;
}
</style>
