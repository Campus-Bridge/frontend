<template>
    <div class="application">
        <NavigationBar />
        <main>
            <TopBar :firstName="first_name" :lastName="last_name" />
            <div class="cards">
                <div class="finance-buttons">
                    <q-btn
                    label="Payments"
                    rounded
                    />
                    <q-btn 
                    label="Dane do przelewu"
                    rounded
                    />
                </div>
                <q-card class="my-card payments">
                    <q-table 
                    :rows="rows"
                    :columns="columns"
                    row-key="id">

                       
                    </q-table>
                </q-card>
            </div>
        </main>
    </div>

</template>

<script setup lang="ts">
import NavigationBar from '@/components/global/NavigationBar.vue'
import TopBar from '@/components/dashboard/TopBar.vue'

import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
const studentStore = useStudentStore()
const { first_name, last_name, dataStudentIsLoaded, id } = storeToRefs(studentStore)


</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: calc(100vh - 32px);
  padding-left: 16px;
  overflow-y: auto;
}

.body--light{
    button{
        background-color: $light-secondary;
    }
}

.finance-buttons{
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

</style>