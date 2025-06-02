<template>
  <TransitionRoot appear :show="useWidget.addEditType.open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/15   blur-bg" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div class="flex h-full  items-end sm:items-center justify-center p-4 text-center overflow-hidden">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md md:w-[1300px] md:max-w-screen-xl sm:w-fit h-full  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all flex flex-col ">
              <DialogTitle as="h3" class="pixa-title truncate">
                {{ useWidget.addEditType.add ? t('translation.add') + ' ' + t('translation.products') :
                  t('translation.edit') + ':' +
                  useProduct.focusedProduct.designation }}
              </DialogTitle>
              <div v-if="loading" class="mt-6 flex flex-col min-h-60 items-center justify-center">
                <commun-loading />
              </div>


              <form @submit.prevent="addEditItem" @reset.prevent="closeModal" v-else
                class="mt-6 h-[80vh] md:h-full flex flex-col gap-3 overflow-hidden w-full">



                <div class="w-full overflow-hidden flex-1  relative">

                  <div class="w-full overflow-auto h-full hidden-scrollbar">



                    <div class="w-full h-fit  gap-3  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                      <item-data-card v-for="item in useProduct.products" :key="item.id" :item="item"
                        :color="useProduct.colors.find(i => i.id === item.couleur)"
                        :type="useProduct.types.find(i => i.id === item.type)"
                        :packing="useProduct.packings.find(i => i.id === item.conditionement)"
                        :selected="selectedProducts.find(i => i.produit === item.id)" @click="() => {

                          if (selectedProducts.find(i => i.produit === item.id)) {
                            selectedProducts = selectedProducts.filter(i => i.produit !== item.id)
                          } else {
                            selectedProducts.push(
                              {
                                produit: item.id,
                                prixtotal: item.public_price,
                                quantite: 1
                              }
                            )
                          }
                        }">

                        <template v-if="selectedProducts.find(i => i.produit === item.id)" #selected_tag>
                          <div
                            class="bg-gradient-to-br from-[var(--vt-primary-1)] to-[var(--vt-primary-2)]  rounded-b-lg w-full h-full flex items-center justify-center text-[var(--color-primary-text)]">
                            <Check />
                          </div>
                        </template>

                      </item-data-card>
                    </div>

                  </div>

                  <div
                    class="w-full h-20 bg-gradient-to-t from-[--color-bg-side] to-transparent absolute bottom-0 z-10 pointer-events-none">
                  </div>
                </div>

                <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>

                <div class="w-full flex flex-col gap-3 md:flex-row">

                  <button type="submit" :disabled="loadingAdd" class="btn btn-primary justify-center md:flex-1">
                    <div v-if="loadingAdd" class=" h-5">
                      <commun-loading />
                    </div>
                    <span v-else>{{
                      t('translation.save') }}</span>
                  </button>

                  <button type="reset" class="btn btn-nofloat justify-center md:flex-1">{{
                    t('translation.cancel')
                  }}</button>
                </div>

              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useWidgetStore } from '@/stores/widget'
import communLoading from '@/components/commun/communLoading.vue'
import { useProductStore } from '@/stores/products'
import { useI18n } from 'vue-i18n'
import { Check, Edit, Trash } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import CommunCombobox from '@/components/commun/communCombobox.vue'
import { useAuthStore } from '@/stores/auth'
import itemDataCard from '@/components/products/list/itemDataCard.vue'

const useWidget = useWidgetStore()
const useProduct = useProductStore()
const { t } = useI18n()
const loading = ref(true)
const useAuth = useAuthStore()
const emits = defineEmits(['selectedItems'])
const loadingAdd = ref(false)
const selectedProducts = ref([])
const itemToAdd = reactive(
  {
    code: '',
    designation: '',
    type: null,
    price: 0,
    public_price: 0,
    couleur: null, conditionement: null,
    manager: null
  }
)

function closeModal() {
  loading.value = true
  Object.assign(useWidget.addEditType, {
    add: true,
    open: false,
  })
  loadingAdd.value = false
}

watch(() => useWidget.addEditType.open, () => {
  if (useWidget.addEditType.add) {
    Object.assign(itemToAdd, {
      code: '',
      designation: '',
      type: null,
      price: 0,
      public_price: 0,
      couleur: null, conditionement: null,
      manager: null
    })
    loading.value = false
  } else {
    Object.assign(itemToAdd, useProduct.focusedProduct)
    loading.value = false
  }
})

const addEditItem = async () => {
  loadingAdd.value = true
  emits('selectedItems', selectedProducts.value)
  closeModal()
  loadingAdd.value = false
}
</script>
