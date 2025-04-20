<template>
  <TransitionRoot appear :show="useWidget.openTypeOptions" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/15   blur-bg" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-end sm:items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-xl sm:w-[750px]  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all">
              <div class="w-full flex gap-3 items-center justify-between">
                <DialogTitle as="h3" class="pixa-title truncate">
                  {{ t('translation.details') }} : {{ useAdministration.focusedPayer ?
                    useAdministration.focusedPayer.designation : ''
                  }}
                </DialogTitle>

                <button @click="async () => {
                  try {
                    let response = await axios.patch(`/api/Payeur/${useAdministration.focusedPayer.id}/`, {
                      active: !useAdministration.focusedPayer.active
                    })
                    await useAdministration.getPayers(useAdministration.focusedPayer.id)
                    await useAdministration.getPayers()

                  } catch (error) {
                    console.error(error)
                  }
                }" class="btn flex-none">
                  <RefreshCcw class="w-4" />
                  {{ t('translation.switchStatus') }}
                </button>
              </div>


              <div class="w-full h-fit grid sm:grid-cols-2 gap-3 mt-3">
                <div class="flex flex-col gap-1">
                  <span class="text-tag">{{ t('translation.fullName') }}</span>
                  <span class="truncate uppercase">{{ useAdministration.focusedPayer.designation }}</span>
                </div>

                <div class="flex flex-col gap-0.5">
                  <span class="text-tag">{{ t('translation.status') }}</span>
                  <span :class="useAdministration.focusedPayer.active ? 'bg-emerald-500' : 'bg-red-500'"
                    class="truncate tag text-white text-tag w-fit">{{
                      useAdministration.focusedPayer.active ? t('translation.active') : t('translation.inactive')
                    }}</span>
                </div>

                <div class="flex flex-col gap-1">
                  <span class="text-tag">{{ t('translation.email') }}</span>
                  <span class="truncate">{{ useAdministration.focusedPayer.email }}</span>
                </div>


                <div class="flex flex-col gap-1">
                  <span class="text-tag">{{ t('translation.phone') }}</span>
                  <span class="truncate">{{ useAdministration.focusedPayer.telephone }}</span>
                </div>

                <div class="flex flex-col gap-1">
                  <span class="text-tag">{{ t('translation.rc') }}</span>
                  <span class="truncate">{{ useAdministration.focusedPayer.rc }}</span>
                </div>
                <span></span>



                <div class="flex flex-col gap-1">
                  <span class="text-tag">{{ t('translation.nis') }}</span>
                  <span class="truncate">{{ useAdministration.focusedPayer.nis || '-----' }}</span>
                </div>



                <div class="flex flex-col gap-1">
                  <span class="text-tag">{{ t('translation.nif') }}</span>
                  <span class="truncate">{{ useAdministration.focusedPayer.nif || '-----' }}</span>
                </div>


                <div class="flex flex-col gap-1">
                  <span class="text-tag">{{ t('translation.art') }}</span>
                  <span class="truncate">{{ useAdministration.focusedPayer.art || '-----' }}</span>
                </div>
              </div>

              <div class="mt-6 grid sm:grid-cols-2 gap-3">
                <button @click="editItem" class="btn">
                  <Edit class="w-4" />
                  <span>{{ t('translation.edit') }}</span>
                </button>
                <button @click="deleteItem" class="btn">
                  <Trash class="w-4" />
                  <span>{{ t('translation.delete') }}</span>
                </button>
              </div>
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
import { useI18n } from 'vue-i18n'
import { Edit, RefreshCcw, Trash } from 'lucide-vue-next'
import { useAdministrationStore } from '@/stores/administration'
import axios from 'axios'
import { useRouter } from 'vue-router'

const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const router = useRouter()
const { t } = useI18n()

function closeModal() {
  useWidget.openTypeOptions = false
  setTimeout(() => {
    useAdministration.focusedPayer = null
  }, 300)
}

const editItem = () => {

  useWidget.openTypeOptions = false

  router.push({ name: 'administration-config-payers-edit-view', params: { id: useAdministration.focusedPayer.id } })
}

const deleteItem = () => {

  useWidget.openTypeOptions = false
  Object.assign(useWidget.deleteModal, {
    open: true,
    designation: useAdministration.focusedPayer.designation,
    id: useAdministration.focusedPayer.id,
  })
}

</script>
