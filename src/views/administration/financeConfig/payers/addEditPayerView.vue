<template>
  <commun-loading v-if="loading" />

  <div v-else class="w-full h-full flex justify-center px-3">

    <form @submit.prevent="addEditItem" class="w-full max-w-screen-sm h-full flex flex-col">
      <div class="w-full h-14 p-3 flex items-center justify-between">

        <router-link :to="{ name: 'administration-config-payers-view' }"
          class="flex gap-3 items-center hover:text-[var(--vt-primary-1)] absolute capitalize">
          <ChevronLeft class="w-3" />
          <span>
            {{ t('translation.payers') }}</span>
        </router-link>
        <span class="pixa-title text-center w-full">
          <span v-if="route.name === 'administration-config-payers-edit-view'">
            {{ t('translation.edit') }}
          </span>
          <span v-else>{{ t('translation.add') }}</span>
          {{ t('translation.payer') }}</span>

        <span class="w-6"></span>
      </div>
      <div class="flex-1 overflow-hidden">
        <div class="h-full overflow-auto scrollbar-overlay">
          <div class="h-fit pl-3 pr-1 grid sm:grid-cols-2 gap-3 py-3">

            <span class="pixa-title my-1.5 sm:col-span-2">{{ t('translation.contactInformations') }}</span>

            <div class="flex flex-col gap-1.5 w-full sm:col-span-2">
              <span class="text-xs uppercase ">{{ t('translation.fullName') }} <span class="text-red-500">*</span>
              </span>
              <input type="text" class="input" required v-model="itemToAdd.designation">
            </div>

            <div class="flex flex-col gap-1.5 w-full">
              <span class="text-xs uppercase ">{{ t('translation.email') }} <span class="text-red-500">*</span></span>
              <input type="email" class="input" required v-model="itemToAdd.email">
            </div>

            <div class="flex flex-col gap-1.5 w-full">
              <span class="text-xs uppercase ">{{ t('translation.phone') }} <span class="text-red-500">*</span></span>
              <input type="tel" class="input" required v-model="itemToAdd.telephone">
            </div>


            <span class="pixa-title my-1.5 sm:col-span-2">{{ t('translation.billingInformations') }}</span>

            <div class="flex flex-col gap-1.5 w-full sm:col-span-2">
              <span class="text-xs uppercase ">{{ t('translation.rc') }} <span class="text-red-500">*</span>
              </span>
              <input type="text" class="input" required v-model="itemToAdd.rc">
            </div>

            <div class="flex flex-col gap-1.5 w-full">
              <span class="text-xs uppercase ">{{ t('translation.nis') }} <span class="text-red-500">*</span></span>
              <input type="text" class="input" required v-model="itemToAdd.nis">
            </div>

            <div class="flex flex-col gap-1.5 w-full">
              <span class="text-xs uppercase ">{{ t('translation.nif') }} <span class="text-red-500">*</span></span>
              <input type="text" class="input" required v-model="itemToAdd.nif">
            </div>

            <div class="flex flex-col gap-1.5 w-full">
              <span class="text-xs uppercase ">{{ t('translation.art') }} </span>
              <input type="text" class="input" v-model="itemToAdd.art">
            </div>



            <div class="flex flex-col gap-1.5 w-full">
              <span class="text-xs uppercase ">{{ t('translation.bp') }} </span>
              <input type="text" class="input" v-model="itemToAdd.bp">
            </div>

          </div>
        </div>
      </div>
      <div class="w-full h-fit p-3 grid grid-cols-2 gap-3">
        <button :disabled="loading" type="submit" class="btn btn-primary justify-center">
          <div v-if="loadingAdd" class=" h-5">
            <commun-loading />
          </div>
          <span v-else>{{
            t('translation.save') }}</span>
        </button>

        <button type="reset" class="btn btn-nofloat justify-center">{{ t('translation.cancel') }}</button>
      </div>
    </form>

  </div>
</template>

<script setup>
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, reactive, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { useAdministrationStore } from '@/stores/administration';
import { ChevronLeft } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const { t } = useI18n()
const loading = ref(true)
const useWidget = useWidgetStore()
const useAuth = useAuthStore()
const useAdministration = useAdministrationStore()
const router = useRouter()
const route = useRoute()
const loadingAdd = ref(false)
const itemToAdd = reactive(
  {
    email: null,
    manager: null, designation: null,
    telephone: null,
    nif: null,
    nis: null,
    rc: null,
    art: null,
    bp: null,
    active: false
  }
)

onMounted(async () => {
  try {
    if (route.name === 'administration-config-payers-edit-view') {
      await useAdministration.getPayers(route.params.id)
      Object.assign(itemToAdd, useAdministration.focusedPayer)
    }
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

const addEditItem = async () => {
  let response = null
  try {
    if (route.name === 'administration-config-payers-edit-view') {
      response = await axios.put(`/api/Payeur/${itemToAdd.id}/`, itemToAdd)
    } else {
      itemToAdd.manager = useAuth.authUser.details.type === 'ROOT' ? useAuth.authUser.details.id : useAuth.authUser.details.manager
      response = await axios.post(`/api/Payeur/`, itemToAdd)
    }

    router.push({ name: 'administration-config-payers-list-view' })
  } catch (error) {
    console.error(error)

  }
}
</script>

<style lang="scss" scoped></style>
