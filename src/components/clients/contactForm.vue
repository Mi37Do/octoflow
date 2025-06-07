<template>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <communImageCropperModal :selected="useAdministration.costumUser.photo" @selectedPic="(image) => {
      useAdministration.costumUser.photo = image
    }" />


    <form @submit.prevent="addEditItem('next')" @reset.prevent="addEditItem('previous')"
      class="mt-6 flex-1 flex flex-col gap-3 overflow-hidden">


      <div class="w-full overflow-auto flex-1">

        <div class="w-full h-fit  gap-3  grid sm:grid-cols-2">
          <span class="pixa-title my-1.5 sm:col-span-2">{{ t('translation.contactInformations') }}</span>

          <div class="w-full sm:col-span-2 h-60 flex items-center justify-center mb-6">

            <div class="w-48 h-48 rounded-full bg-[var(--color-background)] p-2">
              <div @click="useWidget.imageCropper = true"
                class="w-full h-full bg-[var(--color-bg-side)] rounded-full cursor-pointer flex items-center justify-center overflow-hidden  ">

                <div v-if="useAdministration.costumUser.photo"
                  class="w-full h-full relative flex items-center justify-center group">
                  <div
                    class="w-full h-full bg-trensparent absolute group-hover:bg-[var(--vt-primary-1)] group-hover:opacity-20 flex items-center justify-center">
                  </div>
                  <img :src="useAdministration.costumUser.photo" class="rounded-full" alt="">
                </div>

                <div v-else class="flex flex-col items-center justify-center uppercase gap-3">
                  <ImagePlus size="28" class="mt-2" />
                  <span>{{ t('translation.userPicture') }}</span>
                </div>
              </div>
            </div>

          </div>


          <div class="flex flex-col gap-1.5 w-ful">
            <span class="text-xs uppercase ">{{ t('translation.first_name') }} <span
                class="text-red-500">*</span></span>
            <input type="text" class="input" required v-model="useAdministration.costumUser.first_name">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.last_name') }} <span class="text-red-500">*</span></span>
            <input type="text" class="input" required v-model="useAdministration.costumUser.last_name">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.username') }} <span class="text-red-500">*</span></span>
            <input type="text" class="input" required v-model="useAdministration.costumUser.username">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.email') }} <span class="text-red-500">*</span></span>
            <input type="email" class="input" required v-model="useAdministration.costumUser.email">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.phone') }} <span class="text-red-500">*</span></span>
            <input type="text" class="input" inputmode="numeric" pattern="[0-9]*" required v-model="phone"
              @input="onPhoneInput">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.website') }}</span>
            <input type="url" inputmode="url" class="input" v-model="useAdministration.costumUser.website">
          </div>

        </div>

      </div>


      <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>

      <div class="w-full flex flex-col gap-3 md:flex-row-reverse">

        <button type="submit" :disabled="loadingAdd" class="btn btn-primary justify-center md:flex-1">
          <div v-if="loadingAdd" class=" h-5">
            <commun-loading />
          </div>
          <span v-else>{{
            t('translation.next') }}</span>
        </button>

        <button type="reset" class="btn btn-nofloat justify-center md:flex-1">{{ t('translation.cancel')
        }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAdministrationStore } from "@/stores/administration"
import { useWidgetStore } from "@/stores/widget";
import { ImagePlus } from 'lucide-vue-next';
import { ref, watchEffect } from "vue";
import communLoading from "../commun/communLoading.vue";
import communImageCropperModal from "../commun/communImageCropperModal.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { usePhoneInput } from '@/lib/usePhoneInput'



const props = defineProps(['tab'])
const emits = defineEmits(['ChangeTab'])
const { t } = useI18n()
const useAdministration = useAdministrationStore()
const useWidget = useWidgetStore()
const loadingAdd = ref(false)

const router = useRouter()
const phone = ref(useAdministration.costumUser.telephone)

const { onPhoneInput } = usePhoneInput(phone, 10)

watchEffect(() => {
  useAdministration.costumUser.telephone = phone.value
})

const addEditItem = (status) => {
  if (status === 'next') {
    emits('ChangeTab', status)
  } else {
    Object.assign(useAdministration.costumUser, {
      name: '',
      first_name: '',
      last_name: '',
      type: null,
      region: 'OUEST',
      logo: null,
      siteweb: '',
      telephone: '',
      email: '',
      photo: '',
      password: '',
      nif: '',
      nis: '',
      art: '',
      rc: '',
      bp: '',
      long: 0,
      lat: 0,
      objectif_a: 0,
      objectif_m: 0,
      plafonnement: 0,
      ville: null,
      manager: null,
    })
    router.push({ name: 'administration-clientsManagement-view' })
  }
}
</script>

<style lang="scss" scoped></style>
