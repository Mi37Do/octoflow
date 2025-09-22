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
          <router-link :to="{ name: 'administration-add-user-view' }" class="btn btn-primary">
            <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.user') }}
          </router-link>
        </div>
      </div>

      <account-type-modal />

      <commun-table v-if="users.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
        divsWidths = values
      }">
        <template #table_content>
          <!---->
          <item-data v-for="item in users" :key="item.id" :item="item" :divsWidths="divsWidths" />
        </template>

        <template #table_footer_right>
          <table-elements :elements="users.length" />
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
import itemData from '@/components/users/itemData.vue';
import optionsModal from '@/components/users/optionsModal.vue';
import axios from 'axios';
import accountTypeModal from '@/components/clients/accountTypeModal.vue';
import { useAdministrationStore } from '@/stores/administration';
import { faker } from '@faker-js/faker'

const columns = ref([])

const COUNT = 30

const contactColumns = ref([{
  designation: 'user',
  size: 1
}, {
  designation: 'region',
  size: 1
}, {
  designation: 'type',
  size: 1
}, {
  designation: 'contact',
  size: 1
}, {
  designation: 'status',
  size: 1
}, {
  designation: 'created_at',
  size: 1
},])

const tempCities = ref([])

const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const TYPES = ['User', 'ROOT']
const regions = ['sud', 'nord', 'est', 'ouest']

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

function createUser() {
  const first_name = faker.person.firstName()
  const last_name = faker.person.lastName()

  return {
    first_name,
    last_name,
    username: faker.internet.username({
      firstName: first_name,
      lastName: last_name
    }).toLowerCase(),
    email: faker.internet.email({
      firstName: first_name,
      lastName: last_name
    }).toLowerCase(),
    telephone: faker.phone.number(),
    region: faker.helpers.arrayElement(regions),
    city: faker.location.city(),
    type: faker.helpers.arrayElement(TYPES),
    is_active: faker.datatype.boolean(),
    created: faker.date.recent({ days: 365 }).toISOString()
  }
}


const users = ref(Array.from({ length: COUNT }, createUser))

function regenerate() {
  // give faker a new random seed then regenerate items
  //faker.seed(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
  users.value = Array.from({ length: COUNT }, createUser)

}

const loadData = async () => {
  try {
    regenerate()
    //  await useAdministration.getUsers()
  } catch (error) {
    console.error(error)

  }
}

</script>

<style lang="scss" scoped></style>
