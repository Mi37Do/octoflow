<template>
  <TransitionRoot appear :show="useWidget.addEditType.open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/15   blur-bg" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div
          class="flex h-full md:h-fit md:min-h-full items-end sm:items-center justify-center p-4 text-center overflow-hidden">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md md:max-w-fit sm:w-fit  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all flex flex-col ">
              <DialogTitle as="h3" class="pixa-title truncate">
                {{ useWidget.addEditType.add ? t('translation.add') + ' ' + t('translation.product') :
                  t('translation.edit') + ':' +
                  useProduct.focusedProduct.designation }}
              </DialogTitle>
              <div v-if="loading" class="mt-6 flex flex-col min-h-60 items-center justify-center">
                <commun-loading />
              </div>


              <form @submit.prevent="addEditItem" @reset.prevent="closeModal" v-else
                class="mt-6 h-[80vh] md:h-fit flex flex-col gap-3 overflow-hidden">

                <div class="w-full overflow-auto flex-1">

                  <div class="w-full h-full  gap-3  grid md:grid-cols-2">

                    <div class="flex flex-col gap-1.5 w-full sm:w-80">
                      <span class="text-xs uppercase ">{{ t('translation.code') }}</span>
                      <input type="text" class="input" required v-model="itemToAdd.code">
                    </div>

                    <div class="flex flex-col gap-1.5 w-full  sm:w-80">
                      <span class="text-xs uppercase ">{{ t('translation.designation') }}</span>
                      <input type="text" class="input" required v-model="itemToAdd.designation">
                    </div>



                    <div class="flex flex-col gap-1.5 w-full  sm:w-80">
                      <span class="text-xs uppercase ">{{ t('translation.type') }}</span>
                      <CommunCombobox :list="useProduct.types" :selected="itemToAdd.type" @on-selected-item="(id) => {
                        itemToAdd.type = id
                      }" />
                    </div>

                    <div class="flex flex-col gap-1.5 w-full  sm:w-80">
                      <span class="text-xs uppercase ">{{ t('translation.packing') }}</span>
                      <CommunCombobox :list="useProduct.packings" :selected="itemToAdd.conditionement"
                        @on-selected-item="(id) => {
                          itemToAdd.packings = id
                        }" />
                    </div>

                    <div class="flex flex-col gap-1.5 w-full  sm:w-80">
                      <span class="text-xs uppercase ">{{ t('translation.color') }}</span>
                      <CommunCombobox :list="useProduct.colors" :selected="itemToAdd.couleur" @on-selected-item="(id) => {
                        itemToAdd.couleur = id
                      }" />
                    </div>

                    <span></span>



                    <div class="flex flex-col gap-1.5 w-full  sm:w-80">
                      <span class="text-xs uppercase ">{{ t('translation.price') }}</span>
                      <input type="number" class="input" required v-model="itemToAdd.price">
                    </div>



                    <div class="flex flex-col gap-1.5 w-full  sm:w-80">
                      <span class="text-xs uppercase ">{{ t('translation.designation') }}</span>
                      <input type="number" class="input" required v-model="itemToAdd.public_price">
                    </div>
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

                  <button type="reset" class="btn btn-nofloat justify-center md:flex-1">{{ t('translation.cancel')
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
import { Edit, Trash } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import CommunCombobox from '@/components/commun/communCombobox.vue'
import { useAuthStore } from '@/stores/auth'

const useWidget = useWidgetStore()
const useProduct = useProductStore()
const { t } = useI18n()
const loading = ref(true)
const useAuth = useAuthStore()
const loadingAdd = ref(false)
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

  try {
    if (useWidget.addEditType.add) {
      itemToAdd.manager = useAuth.authUser.details.type === 'ROOT' ? useAuth.authUser.details.id : useAuth.authUser.details.manager
      let response = await axios.post(`/api/Produit/`, itemToAdd)
    } else {
      let response = await axios.patch(`/api/Produit/${useProduct.focusedProduct.id}/`, itemToAdd)
    }
    await useProduct.getProducts()

    closeModal()

  } catch (error) {
    console.error(error)
  }
}
</script>
