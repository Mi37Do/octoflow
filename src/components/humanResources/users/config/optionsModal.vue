<template>
  <TransitionRoot appear :show="useWidget.openClientOptions" as="template">
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
              class="w-full max-w-md sm:w-72  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="pixa-title truncate">
                {{ t('translation.options') }} : {{ useAdministration.focusedUser ?
                  useAdministration.focusedUser.first_name + ' ' + useAdministration.focusedUser.last_name :
                  ''
                }}
              </DialogTitle>
              <div class="mt-6 flex flex-col">
                <button @click="editItem" class="btn">
                  <Edit class="w-4" />
                  <span>{{ t('translation.edit') }}</span>
                </button>
                <button @click="async () => {
                  let response = await axios.patch(`/api/CustomUser/${useAdministration.focusedUser.id}/`, {
                    is_active: !useAdministration.focusedUser.is_active
                  })
                  emits('loadData')
                  closeModal()
                }" class="btn">
                  <RefreshCcw class="w-4" />
                  <span>{{ t('translation.changeStatus') }}</span>
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
import { useRouter } from 'vue-router'
import axios from 'axios'

const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const emits = defineEmits(['loadData'])
const router = useRouter()
const { t } = useI18n()

function closeModal() {
  useWidget.openClientOptions = false
  setTimeout(() => {
    useAdministration.focusedUser = null
  }, 300)
}

const editItem = () => {

  useWidget.openClientOptions = false

  router.push({ name: 'administration-edit-user-view', params: { id: useAdministration.focusedUser.id } })
}

const deleteItem = () => {

  useWidget.openClientOptions = false
  Object.assign(useWidget.deleteModal, {
    open: true,
    designation: useAdministration.focusedUser.type + ' : ' + useAdministration.focusedUser.first_name + ' ' + useAdministration.focusedUser.last_name,
    id: useAdministration.focusedUser.id,
  })
}

</script>
