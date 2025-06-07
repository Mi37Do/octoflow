<template>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <communImageCropperModal :selected="useAdministration.costumUser.photo" @selectedPic="(image) => {
      if (tab === 'contacts') {
        useAdministration.costumUser.photo = image
      } else {

      }
    }" />


    <form @submit.prevent="addEditItem('next')" @reset.prevent="addEditItem('previous')"
      class="mt-6 flex-1 flex flex-col gap-3 overflow-hidden">


      <div class="w-full overflow-auto flex-1">

        <div class="w-full h-fit  gap-3  grid sm:grid-cols-2">


          <span class="pixa-title my-1.5 sm:col-span-2">{{ t('translation.billingInformations') }}</span>

          <div class="flex flex-col gap-1.5 w-full sm:col-span-2">
            <span class="text-xs uppercase ">{{ t('translation.rc') }} <span class="text-red-500">*</span></span>
            <input type="number" class="input" required v-model="useAdministration.costumUser.rc">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.nis') }} <span class="text-red-500">*</span></span>
            <input type="number" class="input" required v-model="useAdministration.costumUser.nis">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.nif') }} <span class="text-red-500">*</span></span>
            <input type="number" class="input" required v-model="useAdministration.costumUser.nif">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.art') }}</span>
            <input type="number" class="input" v-model="useAdministration.costumUser.art">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.bp') }}</span>
            <input type="number" class="input" v-model="useAdministration.costumUser.bp">
          </div>

          <span class="w-full h-px bg-[var(--color-commun-border)] my-1.5 md:col-span-2"></span>

          <div class="flex flex-col gap-1.5 w-ful">
            <span class="text-xs uppercase ">{{ t('translation.m_goal') }} <span class="text-red-500">*</span></span>
            <input type="number" min="0" class="input" v-model="useAdministration.costumUser.objectif_m">
          </div>

          <div class="flex flex-col gap-1.5 w-ful">
            <span class="text-xs uppercase ">{{ t('translation.a_goal') }} <span class="text-red-500">*</span></span>
            <input type="number" min="0" class="input" v-model="useAdministration.costumUser.objectif_a">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.capping') }} <span class="text-red-500">*</span></span>
            <input type="number" min="0" class="input" v-model="useAdministration.costumUser.plafonnement">
          </div>

        </div>

      </div>

      <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>


      <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>

      <div class="w-full flex flex-col gap-3 md:flex-row-reverse">

        <button type="submit" :disabled="loadingAdd" class="btn btn-primary justify-center md:flex-1">
          <div v-if="loadingAdd" class=" h-5">
            <commun-loading />
          </div>
          <span v-else>{{
            t('translation.next') }}</span>
        </button>

        <button type="reset" class="btn btn-nofloat justify-center md:flex-1">{{ t('translation.previous')
        }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAdministrationStore } from "@/stores/administration"
import { useWidgetStore } from "@/stores/widget";
import { ImagePlus } from 'lucide-vue-next';
import { ref } from "vue";
import communLoading from "../commun/communLoading.vue";
import communImageCropperModal from "../commun/communImageCropperModal.vue";
import { useI18n } from "vue-i18n";

const props = defineProps(['tab'])
const emits = defineEmits(['ChangeTab'])
const { t } = useI18n()
const useAdministration = useAdministrationStore()
const useWidget = useWidgetStore()
const loadingAdd = ref(false)


const addEditItem = (status) => {
  emits('ChangeTab', status)
}
</script>

<style lang="scss" scoped></style>
