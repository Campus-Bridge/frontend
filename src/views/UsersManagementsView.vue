<template>
  <div class="application">
    <NavigationBar />
    <main>
      <TopBar :firstName="''" :lastName="''" />
      <q-tabs v-model="tab" align="left" class="text-light-green-14 q-mb-md">
        <q-tab name="students" label="Students" />
        <q-tab name="lecturer" label="Lecturer" />
      </q-tabs>
      <div class="cards">
        <q-card class="my-card users-list">
          <q-card-section>
            <q-table flat :rows="showUser" :columns="columns" row-key="id" style="height: 100%">
              <template v-slot:body="props">
                <q-tr
                  :class="userIsSelected(props.row.id)"
                  :props="props"
                  @click="selectUser(props.row)"
                >
                  <q-td key="index" :props="props">
                    {{ props.row.index }}
                  </q-td>
                  <q-td key="first_name" :props="props">
                    {{ props.row.first_name }}
                  </q-td>
                  <q-td key="last_name" :props="props">
                    {{ props.row.last_name }}
                  </q-td>
                  <q-td key="email" :props="props">
                    {{ props.row.email }}
                  </q-td>
                  <q-td key="field_of_study" :props="props">
                    {{ props.row.field_of_study }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
        <q-card class="my-card users-settings" v-if="selectedUser">
          <q-card-section>
            <div class="text-h6">{{ selectedUser.first_name }} {{ selectedUser.last_name }}</div>
            <div class="text-subtitle2">Index: {{ selectedUser.index }}</div>
          </q-card-section>
          <q-card-section> tutaj dane </q-card-section>
          <q-separator />
          <q-card-actions class="buttons">
            <q-btn flat icon="save" label="Save" color="light-green-14" />
            <q-btn
              flat
              icon="close"
              label="Cancel"
              color="light-green-14"
              @click="deselectUser()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/components/global/NavigationBar.vue'
import TopBar from '@/components/dashboard/TopBar.vue'

import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
const studentStore = useStudentStore()
const { students } = storeToRefs(studentStore)

const tab = ref('students')

const selectedUser = ref(0) as any

const columns = [
  {
    name: 'index',
    label: 'Index',
    field: 'index',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'first_name',
    label: 'First Name',
    field: 'first_name',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'last_name',
    label: 'Last Name',
    field: 'last_name',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'field_of_study',
    label: 'Field of Study',
    field: 'field_of_study',
    align: 'left',
    required: true,
    sortable: true
  }
] as any[]

function selectUser(id: number) {
  selectedUser.value = id
}

function deselectUser() {
  selectedUser.value = 0
}

function userIsSelected(id: number) {
  if (id === selectedUser.value.id) {
    return 'active'
  }
}

const showUser = computed(() => {
  if (tab.value === 'students') {
    return students.value
  } else if (tab.value === 'lecturer') {
    return []
  }
})

onMounted(async () => {
  await studentStore.fetchStudents()
})
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: calc(100vh - 32px);
  padding-left: 16px;
  overflow-y: auto;
}
.cards {
  display: flex;
  gap: 16px;
  height: calc(100% - 176px);
  overflow: hidden;
}

.my-card {
  border-radius: 12px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

  &.users-list {
    flex-basis: clamp(70%, 100%, 100%);
  }
  &.users-settings {
    flex-basis: 30%;
    display: grid;
    grid-template-rows: 1fr 10fr auto 1fr;
    .buttons {
      display: flex;
      justify-content: space-evenly;
    }
  }
}

.body--dark {
  .active {
    background-color: rgba(255, 255, 255, 0.07);
  }
}

.body--light {
  .active {
    background-color: rgba(0, 0, 0, 0.07);
  }
}
</style>
