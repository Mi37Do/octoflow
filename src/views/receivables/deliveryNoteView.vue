<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

    <div class="w-full flex-1 overflow-hidden">

      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 pb-3 px-3">

        <options-modal />
        <add-edit-item />
        <commun-delete-modal @delete-item="onDeleteItem" />

        <sheet :open="useWidget.sheet" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'" @closeSide="(value) => {
          useWidget.sheet = value
        }" />

        <div class="w-full h-10 flex items-center justify-between">
          <div class="w-80">
            <input type="text" class="input">
          </div>
          <!--
          <div class="flex gap-2 items-center">
            <div class="grid grid-cols-2 gap-0.5 p-1 rounded-lg bg-[var(--color-commun-border)]">
              <button @click="isList = true" :class="isList ? 'btn-nofloat' : ''" class="btn-sm btn-square">
                <List />
              </button>
              <button @click="isList = false" :class="!isList ? 'btn-nofloat' : ''" class="btn-sm btn-square">
                <LayoutGrid />
              </button>
            </div>
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
              <Plus class="w-4" /> {{ t('translation.add') }} {{ t('translation.product') }}
            </button>
          </div>-->
        </div>


        <commun-table v-if="useReceivables.deliveries.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
          divsWidths = values
        }">
          <template #table_content>
            <item-data v-for="item in useReceivables.deliveries" :key="item.id" :item="item" :divsWidths="divsWidths" />
          </template>

          <template #table_footer_right>
            <table-elements :elements="useReceivables.deliveries.length" />
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
import addEditItem from '@/components/receivables/deliveries/addEditItem.vue';
import tableElements from '@/components/ui/table/tableElements.vue';
import sheet from '@/components/commun/sheet.vue';
import tableNavigation from '@/components/ui/table/tableNavigation.vue';
import { LayoutGrid, List, ListFilter, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import itemData from '@/components/receivables/deliveries/itemData.vue';
import { useReceivablesStore } from '@/stores/receivables';
import optionsModal from '@/components/receivables/deliveries/optionsModal.vue';
import axios from 'axios';

const columns = ref([{
  designation: 'number',
  size: 1
}, {
  designation: 'order',
  size: 1
}, {
  designation: 'file',
  size: 1
}, {
  designation: 'price',
  size: 1
}, {
  designation: 'status',
  size: 1
}])
const { t } = useI18n()
const loading = ref(true)
const isList = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useReceivables = useReceivablesStore()

onMounted(async () => {
  try {
    await useReceivables.getDeliveries()

    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

const onDeleteItem = async (id) => {
  try {
    let response = await axios.delete(`/api/BonLivraison/${id}/`)

    await useProduct.getProducts()

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
