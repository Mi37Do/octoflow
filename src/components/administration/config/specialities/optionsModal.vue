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
              class="w-full max-w-md sm:w-60  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="pixa-title truncate">
                {{ t('translation.options') }} : {{ useAdministration.focusedSpeciality ?
                  useAdministration.focusedSpeciality.designation : ''
                }}
              </DialogTitle>
              <div class="mt-6 flex flex-col">
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
import { Edit, Trash } from 'lucide-vue-next'
import { useAdministrationStore } from '@/stores/administration'

const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const { t } = useI18n()

function closeModal() {
  useWidget.openTypeOptions = false
  setTimeout(() => {
    useAdministration.focusedSpeciality = null
  }, 300)
}

const editItem = () => {

  useWidget.openTypeOptions = false

  Object.assign(useWidget.addEditType, {
    add: false,
    open: true,
  })
}

const deleteItem = () => {


  console.log(useAdministration.focusedSpeciality.designation)
  console.log({
    open: true,
    designation: useAdministration.focusedSpeciality.designation,
    id: useAdministration.focusedSpeciality.id,
  })

  useWidget.openTypeOptions = false
  Object.assign(useWidget.deleteModal, {
    open: true,
    designation: useAdministration.focusedSpeciality.designation,
    id: useAdministration.focusedSpeciality.id,
  })
}

</script>
