<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

    <div class="w-full flex-1 overflow-hidden">

      <commun-loading v-if="loading" />

      <form @submit.prevent="addEditOrder" v-else class="w-full h-full flex flex-col gap-3 pb-3 px-3">

        <add-edit-item @selectedItems="(table) => {
          selectedItems = table
        }" />

        <sheet :open="useWidget.sheet" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'" @closeSide="(value) => {
          useWidget.sheet = value
        }" />

        <div class="w-full h-10 flex items-center justify-between">
          <div class="w-80">
            <input type="text" class="input">
          </div>
          <div class="flex gap-2 items-center">
            <button @click="() => {
              Object.assign(useWidget.addEditType, {
                add: true,
                open: true,
              })
            }" class="btn btn-float">
              <Plus class="w-4" /> {{ t('translation.add') }} {{ t('translation.products') }}
            </button>
            <button class="btn btn-primary">
              <Plus class="w-4" />
              {{ t('translation.create') }} {{ t('translation.order') }}
            </button>
          </div>
        </div>


        <commun-table v-if="selectedItems.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
          divsWidths = values
        }">
          <template #table_content>
            <item-data v-for="item in selectedItems" :key="item.id"
              :item="useProduct.products.find(i => i.id === item.produit)" :divsWidths="divsWidths"
              :color="useProduct.colors.find(i => i.id === useProduct.products.find(i => i.id === item.produit).couleur)"
              :type="useProduct.types.find(i => i.id === useProduct.products.find(i => i.id === item.produit).type)"
              :packing="useProduct.packings.find(i => i.id === useProduct.products.find(i => i.id === item.produit).conditionement)"
              :quantity="item.quantite">
              <template #item_quantity>
                <input type="number" min="1" required class="input" v-model="item.quantite" @input="
                  () => {
                    if (item.quantite < 0) {
                      item.quantite = item.quantite * -1
                    }
                    if (item.quantite === 0)
                      item.quantite = 1
                  }
                ">
              </template>
            </item-data>
          </template>

          <template #table_footer_right>
            <table-elements :elements="selectedItems.length" />
          </template>

          <template #table_footer_left>
            <span class="font-semibold px-3 py-2 cursor-default rounded-lg border uppercase">
              {{ t('translation.total') }} :
              {{
                numberFormat(selectedItems.reduce((sum, item) => sum + (item.quantite * item.prixtotal), 0))
              }} DA</span>
          </template>
        </commun-table>

        <div v-else class="grow w-full flex flex-col items-center justify-center gap-8">
          <img src="@/assets/pics/noData.svg" class="w-52" />

          <span class="uppercase max-w-80 px-4 text-center">{{ t('translation.noData') }}</span>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import communTable from '@/components/commun/communTable.vue';
import addEditItem from '@/components/orders/add/addEditItem.vue';
import tableElements from '@/components/ui/table/tableElements.vue';
import sheet from '@/components/commun/sheet.vue';
import { Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import itemData from '@/components/orders/add/itemData.vue';
import { useProductStore } from '@/stores/products';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const columns = ref([{
  designation: 'product',
  size: 1
}, {
  designation: 'type',
  size: 1
}, {
  designation: 'color',
  size: 1
}, {
  designation: 'packing',
  size: 1
}, {
  designation: 'unit_price',
  size: 1
}, {
  designation: 'units',
  size: 1
}, {
  designation: 'total_price',
  size: 1
}])
const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useAuth = useAuthStore()
const useProduct = useProductStore()
const selectedItems = ref([])
const route = useRoute()

onMounted(async () => {
  try {
    await useProduct.getProducts()
    await useProduct.getTypes()
    await useProduct.getColors()
    await useProduct.getPackings()

    console.log(useAuth.authUser.details);


    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})


const addEditOrder = async () => {
  try {
    if (route.name === 'add-order-view') {
      let tempProducts = selectedItems.value.map(item => {
        return {
          produit: item.produit,
          quantite: item.quantite,
          prixtotal: item.prixtotal * item.quantite,
        }
      })

      console.log(tempProducts)

      let response = await axios.post(`/api/Commande/`, {
        user: '34c6675c-4806-4493-b44d-8a5f4bbdf97a',
        company: '34c6675c-4806-4493-b44d-8a5f4bbdf97a',
        etat: 'Brouillon',
      })
    } else {
      null
    }
  } catch (error) {

  }
}

</script>

<style lang="scss" scoped></style>
