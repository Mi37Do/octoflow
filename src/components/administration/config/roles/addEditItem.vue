<template>
  <TransitionRoot appear :show="useWidget.addEditType.open" as="template">
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
              class="w-full max-w-md sm:w-96  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="pixa-title truncate">
                {{ useWidget.addEditType.add ? t('translation.add') + ' ' + t('translation.role') :
                  t('translation.edit') + ':' +
                  useAdministration.focusedRole.designation }}
              </DialogTitle>
              <div v-if="loading" class="mt-6 flex flex-col min-h-60 felx items-center justify-center">
                <commun-loading />
              </div>


              <form @submit.prevent="addEditItem" @reset.prevent="closeModal" v-else
                class="mt-6 h-fit flex flex-col gap-3">


                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.departement') }}</span>
                  <commun-combobox :list="departements" :selected="itemToAdd.departements" :required="true"
                    @on-selected-item="(id) => itemToAdd.departements = id" />
                </div>

                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.designation') }}</span>
                  <input type="text" class="input" required v-model="itemToAdd.designation">
                </div>


                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.description') }}</span>
                  <textarea type="text" class="input py-1.5 min-h-32" required
                    v-model="itemToAdd.description"></textarea>
                </div>

                <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>

                <button type="submit" :disabled="loadingAdd" class="btn btn-primary justify-center mt-1.5">
                  <div v-if="loadingAdd" class=" h-5">
                    <commun-loading />
                  </div>
                  <span v-else>{{
                    t('translation.save') }}</span>
                </button>

                <button type="reset" class="btn btn-nofloat justify-center">{{ t('translation.cancel') }}</button>
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
import communCombobox from '@/components/commun/communCombobox.vue'
import { useWidgetStore } from '@/stores/widget'
import communLoading from '@/components/commun/communLoading.vue'
import { useI18n } from 'vue-i18n'
import { Edit, Trash } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useAdministrationStore } from '@/stores/administration'

const useWidget = useWidgetStore()
const props = defineProps(['departements'])
const useAuth = useAuthStore()
const useAdministration = useAdministrationStore()
const { t } = useI18n()
const loading = ref(true)
const loadingAdd = ref(false)
const itemToAdd = reactive(
  {
    designation: '',
    departements: null,
    description: '',
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
      designation: '',
      description: '',
      departements: '',
      manager: null
    })
    loading.value = false
  } else {
    Object.assign(itemToAdd, useAdministration.focusedRole)
    loading.value = false
  }
})

const addEditItem = async () => {
  loadingAdd.value = true

  try {
    if (useWidget.addEditType.add) {
      itemToAdd.manager = useAuth.authUser.details.type === 'ROOT' ? useAuth.authUser.details.id : useAuth.authUser.details.manager
      let response = await axios.post(`/api/Role/`, itemToAdd)
    } else {
      let response = await axios.patch(`/api/Role/${useAdministration.focusedRole.id}/`, itemToAdd)
    }

    await useAdministration.getRoles()

    closeModal()

  } catch (error) {
    console.error(error)
  }
}
</script>
