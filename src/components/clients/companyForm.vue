<template>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <communImageCropperModal :selected="useAdministration.costumUser.logo" @selectedPic="(image) => {
      useAdministration.costumUser.logo = image
    }" />


    <form @submit.prevent="addEditItem('next')" @reset.prevent="addEditItem('previous')"
      class="mt-6 flex-1 flex flex-col gap-3 overflow-hidden">


      <div class="w-full overflow-auto flex-1">

        <div class="w-full h-fit  gap-3  grid md:grid-cols-2">


          <div class="w-full md:col-span-2 h-60 flex items-center justify-center mb-6">

            <div class="w-48 h-48 rounded-full bg-[var(--color-background)] p-2">
              <div @click="useWidget.imageCropper = true"
                class="w-full h-full bg-[var(--color-bg-side)] rounded-full cursor-pointer flex items-center justify-center overflow-hidden  ">

                <div v-if="useAdministration.costumUser.logo"
                  class="w-full h-full relative flex items-center justify-center group">
                  <div
                    class="w-full h-full bg-trensparent absolute group-hover:bg-[var(--vt-primary-1)] group-hover:opacity-20 flex items-center justify-center">
                  </div>
                  <img :src="useAdministration.costumUser.logo" class="rounded-full" alt="">
                </div>

                <div v-else class="flex flex-col items-center justify-center uppercase gap-3">
                  <ImagePlus size="28" class="mt-2" />
                  <span>{{ t('translation.logo') }}</span>
                </div>
              </div>
            </div>

          </div>

          <div class="flex flex-col gap-1.5 w-ful">
            <span class="text-xs uppercase ">{{ t('translation.region') }} <span class="text-red-500">*</span></span>
            <commun-combobox :list="useWidget.regions" :selected="useAdministration.costumUser.region" @onSelectedItem="(id) => {
              useAdministration.costumUser.region = id
              useAdministration.costumUser.ville = null
            }" :required="true" />
          </div>
          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.city') }} <span class="text-red-500">*</span></span>
            <commun-combobox v-if="filtredCities.length > 0" :list="filtredCities"
              :selected="useAdministration.costumUser.ville" @onSelectedItem="(id) => {
                useAdministration.costumUser.ville = id
              }" :required="true" />

            <input v-else type="text" disabled v-model="useAdministration.costumUser.ville" required class="input">
          </div>


          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.long') }}</span>
            <input type="number" class="input" v-model="useAdministration.costumUser.long">
          </div>

          <div class="flex flex-col gap-1.5 w-full">
            <span class="text-xs uppercase ">{{ t('translation.lat') }}</span>
            <input type="number" class="input" v-model="useAdministration.costumUser.lat">
          </div>

        </div>

      </div>

      <div style="background-color: color-mix(in srgb, var(--vt-primary-2) 10%, transparent)"
        class="w-full flex items-center justify-center uppercase py-3 px-1.5 text-center text-[var(--vt-primary-2)] rounded-lg font-medium">
        <span>{{ t('translation.defaultPassword') }} : 123456</span>
      </div>


      <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>

      <div class="w-full flex flex-col gap-3 md:flex-row-reverse">

        <button type="submit" :disabled="loadingAdd" class="btn btn-primary justify-center md:flex-1">
          <div v-if="loadingAdd" class=" h-5">
            <commun-loading />
          </div>
          <span v-else>{{
            t('translation.save') }}</span>
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
import { computed, ref } from "vue";
import communLoading from "../commun/communLoading.vue";
import communImageCropperModal from "../commun/communImageCropperModal.vue";
import { useI18n } from "vue-i18n";
import communCombobox from "../commun/communCombobox.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const props = defineProps(['tab', 'list'])
const route = useRoute()
const emits = defineEmits(['ChangeTab'])
const { t } = useI18n()
const useAdministration = useAdministrationStore()
const useWidget = useWidgetStore()
const router = useRouter()
const loadingAdd = ref(false)

console.log(useAdministration.costumUser);


const filtredCities = computed(() => {
  return props.list.filter(item => item.region === useAdministration.costumUser.region)
})

const addEditItem = async (status) => {
  if (status === 'next') {
    loadingAdd.value = true
    try {
      //to delete later
      delete useAdministration.costumUser.photo

      if (route.name === 'administration-addClient-view') {
        useAdministration.costumUser.type = route.params.type
        let response = await axios.post(`/api/CustomUser/`, useAdministration.costumUser)
        router.push({ name: 'administration-clientsManagement-view' })
      } else {
        let response = await axios.put(`/api/CustomUser/${route.params.id}/`, useAdministration.costumUser)
        router.push({ name: 'administration-clientsManagement-view' })
      }

    } catch (error) {
      console.error(error)

    }

    loadingAdd.value = false
  } else {
    emits('ChangeTab', status)
  }
}

</script>

<style lang="scss" scoped></style>
