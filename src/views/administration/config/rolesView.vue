<template>
  <commun-loading v-if="loading" />

  <div v-else class="w-full h-full flex flex-col gap-3 pb-3 px-3">

    <options-modal />
    <add-edit-item :departements="departements" />
    <commun-delete-modal @delete-item="onDeleteItem" />

    <sheet :open="useWidget.sheet" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'" @closeSide="(value) => {
      useWidget.sheet = value
    }" />

    <div class="w-full h-10 flex items-center justify-between">
      <div class="w-80">
        <input type="text" class="input">
      </div>
      <div class="flex gap-2">
        <button @click="useWidget.sheet = true" class="btn btn-float">
          <ListFilter class="w-4" />
          {{ t('translation.filters') }}
        </button>
        <button @click="() => {
          Object.assign(useWidget.addEditType, {
            add: true,
            open: true,
          })
        }" class="btn btn-primary">
          <Plus class="w-4" /> {{ t('translation.add') }} {{ t('translation.role') }}
        </button>
      </div>
    </div>


    <commun-table v-if="useAdministration.roles.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
      divsWidths = values
    }">
      <template #table_content>
        <item-data v-for="item in useAdministration.roles" :key="item.id" :item="item" :divsWidths="divsWidths"
          :departement="departements.find(i => i.id === item.departements) ? departements.find(i => i.id === item.departements).designation : item.departements" />
      </template>

      <template #table_footer_right>
        <table-elements :elements="useAdministration.roles.length" />
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
</template>

<script setup>
import communTable from '@/components/commun/communTable.vue';
import communDeleteModal from '@/components/commun/communDeleteModal.vue';
import addEditItem from '@/components/administration/config/roles/addEditItem.vue';
import tableElements from '@/components/ui/table/tableElements.vue';
import sheet from '@/components/commun/sheet.vue';
import tableNavigation from '@/components/ui/table/tableNavigation.vue';
import { ListFilter, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import itemData from '@/components/administration/config/roles/itemData.vue';
import optionsModal from '@/components/administration/config/roles/optionsModal.vue';
import axios from 'axios';
import { useAdministrationStore } from '@/stores/administration';

const columns = ref([{
  designation: 'designation',
  size: 1
}, {
  designation: 'departement',
  size: 1
}, {
  designation: 'description',
  size: 2
}])
const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const departements = ref([])

onMounted(async () => {
  try {
    await useAdministration.getRoles()
    departements.value = JSON.parse(localStorage.getItem('departements'))

    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

const onDeleteItem = async (id) => {
  try {
    let response = await axios.delete(`/api/Role/${id}/`)
    await useAdministration.getRoles()
    Object.assign(useWidget.deleteModal, {
      open: false,
      designation: '',
      id: '',
    })
  } catch (error) {
    console.error(error)
  }
}

</script>

<style lang="scss" scoped></style>
