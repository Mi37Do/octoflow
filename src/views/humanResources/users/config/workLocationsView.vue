<template>
  <div class="w-full h-full overflow-hidden">

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
            <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.jobPosition') }}
          </router-link>
        </div>
      </div>

      <account-type-modal />

      <commun-table v-if="jobPositions.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
        divsWidths = values
      }">
        <!---->
        <template #table_content>
          <JobPositionItem v-for="item in jobPositions" :key="item.id" :item="item" :divsWidths="divsWidths" />
        </template>

        <template #table_footer_right>
          <table-elements :elements="jobPositions.length" />
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
</template>

<script setup>
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
import optionsModal from '@/components/humanResources/users/optionsModal.vue';
import axios from 'axios';
import accountTypeModal from '@/components/clients/accountTypeModal.vue';
import { faker } from '@faker-js/faker'
import JobPositionItem from '@/components/humanResources/users/config/jobPositionItem.vue';

const columns = ref([])

const COUNT = 10

const contactColumns = ref([{
  designation: 'designation',
  size: 1,
}, {
  designation: 'departement',
  size: 1,
}, {
  designation: 'current',
  size: 1,
}, {
  designation: 'expected',
  size: 1,
}, {
  designation: 'forecasted',
  size: 1,
}, {
  designation: 'hired',
  size: 1,
}, {
  designation: 'status',
  size: 1,
}])

const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()


onMounted(async () => {
  try {
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

const departments = ref([]);
const jobPositions = ref([]);

// Generate Departments
function generateDepartments(count = 5) {
  const deptList = [];

  for (let i = 0; i < count; i++) {
    deptList.push({
      id: faker.string.uuid(),
      designation: faker.commerce.department(),
      managerName: faker.person.fullName(),
      employeesCount: faker.number.int({ min: 5, max: 200 }),
      parentDepartment: "None",
    });
  }

  departments.value = deptList;
}

// Generate Job Positions
function generateJobPositions(count = 10) {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const department = faker.helpers.arrayElement(departments.value);

    const currentEmployees = faker.number.int({ min: 1, max: 50 });
    const expectedNewEmployees = faker.number.int({ min: 0, max: 20 });
    const hiredEmployees = faker.number.int({ min: 0, max: expectedNewEmployees });

    positions.push({
      id: faker.string.uuid(),
      designation: faker.person.jobTitle(),
      department: department?.designation || "General",
      currentEmployees,
      expectedNewEmployees,
      totalForecastedEmployees: currentEmployees + expectedNewEmployees,
      hiredEmployees,
      status: expectedNewEmployees > 0 ? "In Progress" : "Not Recruiting",
    });
  }

  jobPositions.value = positions;
}


const loadData = async () => {
  try {
    generateDepartments()
    generateJobPositions()
  } catch (error) {
    console.error(error)

  }
}

</script>

<style lang="scss" scoped></style>
