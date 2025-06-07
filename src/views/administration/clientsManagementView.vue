<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

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
            <button @click="useWidget.clientTypeModal = true" class="btn btn-primary">
              <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.client') }}
            </button>
          </div>
        </div>

        <account-type-modal />

        <commun-table v-if="useAdministration.users.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
          divsWidths = values
        }" :hasTableConfig="true">

          <template #table_config>
            <div class="grid gap-0.5 px-1 py-1 rounded-lg bg-[var(--color-background)]">
              <button @click="
                () => {
                  columns = contactColumns
                  tab = 'contact'
                }" :class="tab === 'contact' ? 'btn-nofloat' : ''" class="btn btn-square">
                <Contact />
              </button>
              <button @click="
                () => {
                  columns = financialColumns
                  tab = 'finance'
                }
              " :class="tab === 'finance' ? 'btn-nofloat' : ''" class="btn btn-square">
                <Landmark />
              </button>
              <button @click="
                () => {
                  columns = legalColumns
                  tab = 'legal'
                }
              " :class="tab === 'legal' ? 'btn-nofloat' : ''" class="btn btn-square">
                <BookText />
              </button>
            </div>
          </template>

          <template #table_content>
            <item-data v-for="item in useAdministration.users" :key="item.id" :item="item" :divsWidths="divsWidths"
              :tab="tab"
              :city="tempCities.find(i => i.id === item.ville) ? tempCities.find(i => i.id === item.ville).designation : item.ville" />
          </template>

          <template #table_footer_right>
            <table-elements :elements="useAdministration.users.length" />
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
import { BookText, Contact, Landmark, ListFilter, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import itemData from '@/components/clients/itemData.vue';
import optionsModal from '@/components/clients/optionsModal.vue';
import axios from 'axios';
import accountTypeModal from '@/components/clients/accountTypeModal.vue';
import { useAdministrationStore } from '@/stores/administration';

const columns = ref([])

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

const financialColumns = ref([{
  designation: 'user',
  size: 1
}, {
  designation: 'a_goal',
  size: 1
}, {
  designation: 'm_goal',
  size: 1
}, {
  designation: 'capping',
  size: 1
}, {
  designation: 'status',
  size: 1
}, {
  designation: 'created_at',
  size: 1
},])

const legalColumns = ref([{
  designation: 'user',
  size: 1
}, {
  designation: 'RC',
  size: 1
}, {
  designation: 'BP',
  size: 1
}, {
  designation: 'nif',
  size: 1
}, {
  designation: 'nis',
  size: 1
}, {
  designation: 'art',
  size: 1
},])

const tempCities = ref([])

const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const tab = ref('contact')

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

const loadData = async () => {
  try {
    await useAdministration.getUsers()
  } catch (error) {
    console.error(error)

  }
}

</script>

<style lang="scss" scoped></style>
