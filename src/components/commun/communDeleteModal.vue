<template>
  <TransitionRoot appear :show="useWidget.deleteModal.open" as="template">
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
              class="w-full max-w-md sm:w-96  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all flex flex-col items-center gap-3">

              <div
                class="w-14 h-14 bg-red-100 dark:bg-white rounded-full flex items-center justify-center text-red-500">
                <TriangleAlert class="mb-1" />
              </div>

              <DialogTitle as="h3" class="pixa-title truncate">
                {{ t('translation.areYouSure') }}
              </DialogTitle>
              <div class="flex flex-col w-full text-center">
                <span>{{ t('translation.youAreGoingToDelete') }} <br> <span class="font-medium uppercase">{{
                  useWidget.deleteModal.designation }}</span></span>

                <div class="w-full flex flex-col gap-1.5 mt-6">
                  <button @click="deleteItem" class="btn btn-primary-red justify-center">
                    <span>{{ t('translation.yesDeleteIt') }}</span>
                  </button>
                  <button @click="closeModal" class="btn btn-nofloat justify-center">
                    <span>{{ t('translation.NokeepIt') }}</span>
                  </button>
                </div>
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
import { TriangleAlert } from 'lucide-vue-next'

const useWidget = useWidgetStore()
const { t } = useI18n()
const emits = defineEmits(['deleteItem'])

function closeModal() {
  Object.assign(useWidget.deleteModal, {
    open: false,
    designation: '',
    id: '',
  })
}

const deleteItem = () => {
  emits('deleteItem', useWidget.deleteModal.id)
}
</script>
