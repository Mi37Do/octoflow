<template>
  <div class="w-full h-full overflow-hidden">

    <commun-loading v-if="loading" />

    <div v-else class="w-full h-full flex flex-col gap-3 pb-3 px-3">
      <communImageCropperModal :selected="useAdministration.costumUser.photo" @selectedPic="(image) => {
        useAdministration.costumUser.photo = image
      }" />

      <div class="grow w-full flex flex-col items-center justify-center overflow-hidden">
        <div class="w-full max-w-screen-sm h-full  overflow-hidden flex flex-col relative">
          <div class="w-full flex items-center justify-between py-3">


            <router-link :to="{ name: 'administration-usersManagement-view' }"
              class="flex gap-3 items-center hover:text-[var(--vt-primary-1)] absolute capitalize">
              <ChevronLeft class="w-3" />
              <span>
                {{ t('translation.usersManagement') }}</span>
            </router-link>

            <span class="pixa-title truncate text-center w-full">
              {{ route.name === 'administration-add-user-view' ? t('translation.add') + ' ' + t('translation.user')
                :
                t('translation.edit') + ' : ' +
                useAdministration.costumUser.first_name + ' ' + useAdministration.costumUser.last_name }}</span>

          </div>


          <form @submit.prevent="addEditItem('next')" @reset.prevent="addEditItem('previous')"
            class=" flex-1 flex flex-col overflow-hidden">

            <commun-map-modal @onSelectLocation="(e) => {
              useAdministration.costumUser.lat = e.lat
              useAdministration.costumUser.long = e.lng
            }" />

            <div class="w-full overflow-auto hidden-scrollbar flex-1 py-3">

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
                  <span class="text-xs uppercase ">{{ t('translation.last_name') }} <span
                      class="text-red-500">*</span></span>
                  <input type="text" class="input" required v-model="useAdministration.costumUser.last_name">
                </div>

                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.username') }} <span
                      class="text-red-500">*</span></span>
                  <input type="text" class="input" required v-model="useAdministration.costumUser.username">
                </div>

                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.email') }} <span
                      class="text-red-500">*</span></span>
                  <input type="email" class="input" required v-model="useAdministration.costumUser.email">
                </div>

                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.phone') }} <span
                      class="text-red-500">*</span></span>
                  <input type="text" class="input" inputmode="numeric" pattern="[0-9]*" required v-model="phone"
                    @input="onPhoneInput">
                </div>

                <div class="flex flex-col gap-1.5 w-ful">
                  <span class="text-xs uppercase ">{{ t('translation.region') }} <span
                      class="text-red-500">*</span></span>
                  <commun-combobox :list="types" :selected="useAdministration.costumUser.type" @onSelectedItem="(id) => {
                    useAdministration.costumUser.type = id
                  }" :required="true" class="uppercase" />
                </div>

                <span class="w-full h-px bg-[var(--color-commun-border)] my-1.5 md:col-span-2"></span>


                <div class="flex flex-col gap-1.5 w-ful">
                  <span class="text-xs uppercase ">{{ t('translation.region') }} <span
                      class="text-red-500">*</span></span>
                  <commun-combobox :list="useWidget.regions" :selected="useAdministration.costumUser.region"
                    @onSelectedItem="(id) => {
                      useAdministration.costumUser.region = id
                      useAdministration.costumUser.ville = null
                    }" :required="true" />
                </div>
                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.city') }} <span
                      class="text-red-500">*</span></span>
                  <commun-combobox v-if="filtredCities.length > 0" :list="filtredCities"
                    :selected="useAdministration.costumUser.ville" @onSelectedItem="(id) => {
                      useAdministration.costumUser.ville = id
                    }" :required="true" />

                  <input v-else type="text" disabled v-model="useAdministration.costumUser.ville" required
                    class="input">
                </div>


                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.long') }}</span>
                  <input type="number" class="input" step="any" v-model="useAdministration.costumUser.long">
                </div>

                <div class="flex flex-col gap-1.5 w-full">
                  <span class="text-xs uppercase ">{{ t('translation.lat') }}</span>
                  <input type="number" step="any" class="input" v-model="useAdministration.costumUser.lat">
                </div>

                <button type="button" @click="useWidget.mapModal = true"
                  class="btn w-full btn-nofloat sm:col-span-2 my-8 justify-center">on map</button>

              </div>

            </div>


            <span class="w-full h-px bg-[var(--color-commun-border)] mt-1.5"></span>

            <div class="w-full flex flex-col gap-3 md:flex-row-reverse mt-3">

              <button type="submit" @click="useWidget.mapModal" :disabled="loadingAdd"
                class="btn btn-primary justify-center md:flex-1">
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
      </div>

    </div>
  </div>
</template>

<script setup>
import communLoading from '@/components/commun/communLoading.vue';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAdministrationStore } from '@/stores/administration';
import { ChevronLeft } from 'lucide-vue-next';
import communCombobox from '@/components/commun/communCombobox.vue';
import { useRoute, useRouter } from 'vue-router';
import { useWidgetStore } from '@/stores/widget';
import { usePhoneInput } from '@/lib/usePhoneInput'
import { ImagePlus } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import communMapModal from '@/components/commun/communMapModal.vue';
import communImageCropperModal from '@/components/commun/communImageCropperModal.vue';
import axios from 'axios';

const loadingAdd = ref(false)

const router = useRouter()

const { t } = useI18n()
const loading = ref(true)
const route = useRoute()
const useAdministration = useAdministrationStore()
const useWidget = useWidgetStore()
const phone = ref('')
const { onPhoneInput } = usePhoneInput(phone, 10)
const { authUser } = storeToRefs(useAuthStore())

const types = ref(
  [
    {
      id: 'ROOT',
      designation: 'ROOT'
    }, {
      id: 'User',
      designation: 'User'
    }
  ]
)


onMounted(async () => {

  try {
    if (route.params.id) {
      await useAdministration.getUsers(route.params.id)
      Object.assign(useAdministration.costumUser, useAdministration.focusedUser)
      useAdministration.costumUser.ville = useAdministration.focusedUser.ville
      console.log(useAdministration.focusedUser)

    } else {

      Object.assign(useAdministration.costumUser, {
        username: '',
        first_name: '',
        last_name: '',
        type: null,
        region: 'OUEST',
        logo: null,
        siteweb: '',
        telephone: '',
        email: '',
        photo: '',
        password: '123456',
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
        manager: authUser.value.details.type === 'ROOT' ? authUser.value.details.id : authUser.value.details.manager,
      })
    }

    phone.value = useAdministration.costumUser.telephone

    useWidget.clientTypeModal = false
    await useAdministration.getCities()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})



const filtredCities = computed(() => {
  return useAdministration.cities.filter(item => item.region === useAdministration.costumUser.region)
})

watchEffect(() => {
  useAdministration.costumUser.telephone = phone.value
})

const addEditItem = async () => {
  loadingAdd.value = true
  try {
    //to delete later
    //delete useAdministration.costumUser.photo

    if (route.name === 'administration-add-user-view') {

      if (authUser.value.details.type === 'ROOT') {
        useAdministration.costumUser.manager =
          authUser.value.details.id
      } else {
        useAdministration.costumUser.manager = authUser.value.details.manager
      }

      useAdministration.costumUser.type = route.params.type
      let response = await axios.post(`/api/CustomUser/`, useAdministration.costumUser)
    } else {
      let response = await axios.put(`/api/CustomUser/${route.params.id}/`, useAdministration.costumUser)
    }

    router.push({ name: 'administration-users-list-view' })
  } catch (error) {
    console.error(error)

  }

  loadingAdd.value = false
}

</script>

<style lang="scss" scoped></style>
