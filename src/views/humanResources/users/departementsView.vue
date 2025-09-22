<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar>
    </top-app-bar>
    <div class="w-full flex-1 overflow-hidden">

      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 pb-3 px-3">

        <options-modal @loadData="async () => {
          await loadData()
        }" />
        <commun-delete-modal @delete-item="onDeleteItem" />

        <sheet :open="useWidget.sheet" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'" @closeSide="(value) => {
          useWidget.sheet = value
        }" />

        <div class="w-full h-10 flex items-center justify-between">
          <div class="w-80">
            <input type="text" class="input">
          </div>
          <div class="flex gap-2 items-center">
            <button @click="useWidget.sheet = true" class="btn btn-float">
              <ListFilter class="w-4" />
              {{ t('translation.filters') }}
            </button>
            <router-link :to="{ name: 'humanResources-add-user-view' }" class="btn btn-primary">
              <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.departement') }}
            </router-link>
          </div>
        </div>

        <account-type-modal />

        <commun-table v-if="departments.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
          divsWidths = values
        }">
          <!---->
          <template #table_content>
            <item-data v-for="item in departments" :key="item.id" :item="item" :divsWidths="divsWidths" />
          </template>

          <template #table_footer_right>
            <table-elements :elements="departments.length" />
          </template>

          <template #table_footer_left>
            <table-navigation :maxPages="14" />
          </template>

        </commun-table>

        <div v-else class="grow w-full flex flex-col items-center justify-center gap-8">
          <img src="@/assets/pics/noData.svg" class="w-52" />

          <span class="uppercase max-w-80 px-4 text-center">{{ t('translation.noData') }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import communTable from '@/components/commun/communTable.vue';
import communDeleteModal from '@/components/commun/communDeleteModal.vue';
import tableElements from '@/components/ui/table/tableElements.vue';
import sheet from '@/components/commun/sheet.vue';
import tableNavigation from '@/components/ui/table/tableNavigation.vue';
import { ListFilter, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import itemData from '@/components/humanResources/departements/itemData.vue';
import optionsModal from '@/components/humanResources/departements/optionsModal.vue';
import axios from 'axios';
import accountTypeModal from '@/components/clients/accountTypeModal.vue';
import { useAdministrationStore } from '@/stores/administration';
import { faker } from '@faker-js/faker'

const columns = ref([])

const COUNT = 10

const contactColumns = ref([{
  designation: 'designation',
  size: 1,
}, {
  designation: 'manager',
  size: 1,
}, {
  designation: 'employees',
  size: 1,
}, {
  designation: 'parentDept',
  size: 1,
}])

const tempCities = ref([])

const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()

const departments = ref([])

onMounted(async () => {
  try {
    if (
      localStorage.getItem('cities')) {
      tempCities.value = JSON.parse(localStorage.getItem('cities'))
    }
    columns.value = contactColumns.value
    await loadData()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

const onDeleteItem = async (id) => {
  try {
    let response = await axios.delete(`/api/CustomUser/${id}/`)

    await loadData()

    Object.assign(useWidget.deleteModal, {
      open: false,
      designation: '',
      id: '',
    })
  } catch (error) {
    console.error(error)
  }
}


function generateDepartments() {

  const deptList = [];

  for (let i = 0; i < COUNT; i++) {
    // Create department
    const id = faker.string.uuid()
    const designation = faker.commerce.department();
    const managerName = faker.person.fullName();
    const employeesCount = faker.number.int({ min: 5, max: 200 });

    // Randomly assign parent department (or "None" if root)
    let parentDepartment = null;
    if (deptList.length > 0 && Math.random() > 0.4) {
      const randomParent = deptList[faker.number.int({ min: 0, max: deptList.length - 1 })];
      parentDepartment = randomParent.designation;
    }
    deptList.push({
      id,
      designation,
      managerName,
      employeesCount,
      parentDepartment,
    });
  }
  console.log(deptList);

  departments.value = deptList;
}


const loadData = async () => {
  try {
    generateDepartments()
    //  await useAdministration.getUsers()
  } catch (error) {
    console.error(error)

  }
}

</script>

<style lang="scss" scoped></style>
