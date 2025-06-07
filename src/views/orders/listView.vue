<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

    <div class="w-full flex-1 overflow-hidden">

      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 pb-3 px-3">

        <options-modal />
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
            <router-link :to="{ name: 'add-order-view' }" class="btn btn-primary">
              <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.order') }}
            </router-link>
          </div>
        </div>

        <commun-table v-if="useOrder.orders.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
          divsWidths = values
        }">
          <template #table_content>
            <item-data v-for="item in useOrder.orders" :key="item.id" :item="item" :divsWidths="divsWidths" />
          </template>

          <template #table_footer_right>
            <table-elements :elements="useOrder.orders.length" />
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
import itemData from '@/components/orders/itemData.vue';
import optionsModal from '@/components/products/list/optionsModal.vue';
import axios from 'axios';
import { useOrderStore } from '@/stores/orders';
import { useProductStore } from '@/stores/products';

const columns = ref([{
  designation: 'company',
  size: 1
}, {
  designation: 'user',
  size: 1
}, {
  designation: 'price',
  size: 1
}, {
  designation: 'status',
  size: 1
}, {
  designation: 'created_at',
  size: 1
},])
const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useOrder = useOrderStore()
const useProduct = useProductStore()

onMounted(async () => {
  try {
    await useOrder.getOrders()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

const onDeleteItem = async (id) => {
  try {
    let response = await axios.delete(`/api/Commande/${id}/`)
    await useOrder.getOrders()

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
