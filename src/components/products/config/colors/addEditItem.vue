<template>
  <TransitionRoot appear :show="useWidget.addEditType.open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/15 blur-bg" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-end sm:items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md sm:w-96 transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="pixa-title truncate">
                {{
                  useWidget.addEditType.add
                    ? `${t('translation.add')} ${t('translation.color')}`
                    : `${t('translation.edit')}: ${useProduct.focusedColor?.designation || ''}`
                }}
              </DialogTitle>

              <div v-if="loading" class="mt-6 flex flex-col min-h-60 items-center justify-center">
                <commun-loading />
                <button class="sr-only">Focusable</button>
              </div>

              <form v-else @submit.prevent="addEditItem" @reset.prevent="closeModal"
                class="mt-6 h-fit flex flex-col gap-3">
                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase">{{ t('translation.code') }}</span>
                  <input type="text" class="input" required v-model="itemToAdd.code" />
                </div>

                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase">{{ t('translation.designation') }}</span>
                  <input type="text" class="input" required v-model="itemToAdd.designation" />
                </div>

                <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>

                <button type="submit" :disabled="loadingAdd" class="btn btn-primary justify-center mt-1.5">
                  <div v-if="loadingAdd" class="h-5">
                    <commun-loading />
                  </div>
                  <span v-else>{{ t('translation.save') }}</span>
                </button>

                <button type="reset" class="btn btn-nofloat justify-center">
                  {{ t('translation.cancel') }}
                </button>
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
  DialogTitle
} from '@headlessui/vue'
import { useWidgetStore } from '@/stores/widget'
import { useProductStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import communLoading from '@/components/commun/communLoading.vue'
import { ref, reactive, watch, nextTick } from 'vue'
import axios from 'axios'

const useWidget = useWidgetStore()
const useProduct = useProductStore()
const useAuth = useAuthStore()
const { t } = useI18n()

const loading = ref(true)
const loadingAdd = ref(false)

const itemToAdd = reactive({
  code: '',
  designation: '',
  manager: null
})

function closeModal() {
  loading.value = true
  Object.assign(useWidget.addEditType, { add: true, open: false })
  loadingAdd.value = false
}

watch(
  () => useWidget.addEditType.open,
  async () => {
    if (useWidget.addEditType.add) {
      Object.assign(itemToAdd, { code: '', designation: '', manager: null })
    } else {
      Object.assign(itemToAdd, {
        code: useProduct.focusedColor?.code || '',
        designation: useProduct.focusedColor?.designation || ''
      })
    }
    await nextTick()
    loading.value = false
  }
)

async function addEditItem() {
  loadingAdd.value = true
  try {
    if (useWidget.addEditType.add) {
      itemToAdd.manager =
        useAuth.authUser.details.type === 'ROOT'
          ? useAuth.authUser.details.id
          : useAuth.authUser.details.manager
      await axios.post(`/api/Couleur/`, itemToAdd)
    } else {
      await axios.patch(`/api/Couleur/${useProduct.focusedColor.id}/`, itemToAdd)
    }

    await useProduct.getColors()
    closeModal()
  } catch (error) {
    console.error(error)
  }
}
</script>
