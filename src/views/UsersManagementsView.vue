<template>
  <div class="application">
    <NavigationBar />
    <main>
      <TopBar :firstName="''" :lastName="''" />
      <div class="flex justify-between items-center">
        <q-tabs v-model="tab" align="left" class="text-light-green-14 q-mb-md">
          <q-tab name="students" label="Students" />
          <q-tab name="lecturer" label="Lecturer" />
        </q-tabs>
        <q-btn
          outline
          color="light-green-14"
          icon="person_add"
          label="New User"
          @click="newUserDialog = true"
        />
      </div>
      <div class="cards">
        <q-dialog v-model="newUserDialog" persistent>
          <NewUserCard @closePop="newUserDialog = false" />
        </q-dialog>
        <q-card class="my-card users-list">
          <q-card-section>
            <q-table
              v-if="tab === 'students'"
              flat
              :rows="students"
              :columns="columns.student"
              row-key="id"
              style="height: 100%"
            >
              <template v-slot:body="props">
                <q-tr
                  :class="userIsSelected(props.row.id)"
                  :props="props"
                  @click="selectUser(props.row)"
                >
                  <q-td key="index" :props="props">
                    {{ props.row.index_number }}
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

            <q-table
              v-if="tab === 'lecturer'"
              flat
              :rows="lecturers"
              :columns="columns.lecturer"
              row-key="id"
              style="height: 100%"
            >
              <template v-slot:body="props">
                <q-tr
                  :class="userIsSelected(props.row.id)"
                  :props="props"
                  @click="selectUser(props.row)"
                >
                  <q-td key="first_name" :props="props">
                    {{ props.row.first_name }}
                  </q-td>
                  <q-td key="last_name" :props="props">
                    {{ props.row.last_name }}
                  </q-td>
                  <q-td key="email" :props="props">
                    {{ props.row.email }}
                  </q-td>
                  <q-td key="subjects_taught" :props="props">
                    {{ props.row.subjects_taught }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
        <EditCard v-if="selectedStudent" />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/components/global/NavigationBar.vue'
import TopBar from '@/components/dashboard/TopBar.vue'

import { storeToRefs } from 'pinia'
import { useStudentStore, type Student } from '@/stores/student'
import { useLecturerStore, type Lecturer } from '@/stores/lecturer'
import EditCard from '@/components/usermanagements/EditCard.vue'
import NewUserCard from '@/components/usermanagements/NewUserCard.vue'
const studentStore = useStudentStore()
const { students, selectedStudent } = storeToRefs(studentStore)
const lecturerStore = useLecturerStore()
const { lecturers, selectedLecturer } = storeToRefs(lecturerStore)

const tab = ref('students')

const newUserDialog = ref(false)

const columns = {
  student: [
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
  ],
  lecturer: [
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
      name: 'subjects_taught',
      label: 'Subjects Taught',
      field: 'subjects_taught',
      align: 'left',
      required: true,
      sortable: true
    }
  ]
} as any

function selectUser(user: any) {
  if (tab.value === 'students') {
    if (selectedStudent.value.id) {
      return
    }
    selectedStudent.value = user
  } else {
    if (selectedLecturer.value.id) {
      return
    }
    selectedLecturer.value = user
  }
}

function userIsSelected(id: number) {
  if (tab.value === 'students') {
    if (id === selectedStudent.value.id) {
      return 'active'
    }
  } else {
    if (id === selectedLecturer.value.id) {
      return 'active'
    }
  }
}

watch(tab, () => {
  selectedStudent.value = {} as Student
  selectedLecturer.value = {} as Lecturer
})

onMounted(async () => {
  await studentStore.fetchStudents()
  await lecturerStore.fetchLecturers()
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
