<template>
  <TransitionRoot appear :show="useWidget.clientTypeModal" as="template">
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
              class="w-full max-w-md md:max-w-fit   transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all flex flex-col ">
              <div class="w-full flex items-center justify-between">

                <DialogTitle as="h3" class="pixa-title truncate">
                  {{ t('translation.choosingAccountType') }}
                </DialogTitle>
                <button @click="useWidget.clientTypeModal = false" class="btn btn-square btn-nofloat">
                  <X />
                </button>
              </div>

              <div class="w-full grid grid-cols-3 gap-3 mt-6">
                <router-link :to="{ name: 'administration-add-client-view', params: { type: type.id } }"
                  v-for="type in types" :key="type.id"
                  class="w-48 h-48 card flex flex-col gap-3 items-center justify-center hover:text-[var(--vt-primary-2)] cursor-pointer">

                  <component :is="type.icon" class="w-12 h-12" />
                  <span class="capitalize">{{ t(`translation.${type.designation.toLowerCase()}`) }}</span>
                </router-link>
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
import { ref } from 'vue'
import { Building, Package2, Warehouse, X } from 'lucide-vue-next'

const useWidget = useWidgetStore()
const { t } = useI18n()
const types = ref(
  [
    {
      id: 'Corporate',
      designation: 'corporate',
      icon: Building
    },
    {
      id: 'Distributeur',
      designation: 'Distributor',
      icon: Package2
    },
    {
      id: 'Suplyer',
      designation: 'supplier',
      icon: Warehouse
    }
  ]
)

const closeModal = () => {
  useWidget.clientTypeModal = false
}
</script>
