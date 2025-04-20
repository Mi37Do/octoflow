<template>
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
          <Plus class="w-4" /> {{ t('translation.add') }} {{ t('translation.color') }}
        </button>
      </div>
    </div>


    <commun-table v-if="useProduct.colors.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
      divsWidths = values
    }">
      <template #table_content>
        <item-data v-for="item in useProduct.colors" :key="item.id" :item="item" :divsWidths="divsWidths" />
      </template>

      <template #table_footer_right>
        <table-elements :elements="useProduct.colors.length" />
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
import addEditItem from '@/components/products/config/colors/addEditItem.vue';
import tableElements from '@/components/ui/table/tableElements.vue';
import sheet from '@/components/commun/sheet.vue';
import tableNavigation from '@/components/ui/table/tableNavigation.vue';
import { ListFilter, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import itemData from '@/components/products/config/colors/itemData.vue';
import { useProductStore } from '@/stores/products';
import optionsModal from '@/components/products/config/colors/optionsModal.vue';
import axios from 'axios';

const columns = ref([{
  designation: 'designation',
  size: 1
}, {
  designation: 'code',
  size: 1
}])
const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useProduct = useProductStore()

onMounted(async () => {
  try {
    await useProduct.getColors()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

const onDeleteItem = async (id) => {
  try {
    let response = await axios.delete(`/api/Couleur/${id}/`)
    await useProduct.getColors()
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
