<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

    <div class="w-full flex-1 overflow-hidden">

      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 pb-3 px-3">

        <div class="grow w-full flex flex-col items-center justify-center overflow-hidden">
          <div class="w-full max-w-screen-sm h-full  overflow-hidden flex flex-col relative">
            <div class="w-full flex items-center justify-between py-3">


              <router-link :to="{ name: 'administration-clientsManagement-view' }"
                class="flex gap-3 items-center hover:text-[var(--vt-primary-1)] absolute capitalize">
                <ChevronLeft class="w-3" />
                <span>
                  {{ t('translation.clientsManagement') }}</span>
              </router-link>

              <span class="pixa-title truncate text-center w-full">
                {{ route.name === 'administration-addClient-view' ? t('translation.add') + ' ' + t('translation.client')
                  + ' : ' + route.params.type
                  :
                  t('translation.edit') + ' : ' +
                  useAdministration.costumUser.first_name + ' ' + useAdministration.costumUser.last_name }}</span>

              <span
                class="px-3 py-1.5 bg-[var(--color-bg-side)] rounded-md text-[var(--vt-primary-1)] font-semibold uppercase flex gap-3 items-center absolute right-0">
                <span>{{ tab === 'contacts' ? '1' : tab === 'finance' ? '2' : '3' }}/3</span>
              </span>
            </div>


            <contact-form v-if="tab === 'contacts'" :tab="tab" @ChangeTab="(status) => {
              if (status === 'next') {
                tab = 'finance'
              } else {
                tab = 'contacts'
              }
            }" />
            <finance-form v-if="tab === 'finance'" :tab="tab" @ChangeTab="(status) => {
              if (status === 'next') {
                tab = 'company'
              } else {
                tab = 'contacts'
              }
            }" />
            <company-form v-if="tab === 'company'" :tab="tab" @ChangeTab="(status) => {
              if (status === 'next') {
                tab = 'finance'
              } else {
                tab = 'finance'
              }
            }" :list="useAdministration.cities" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAdministrationStore } from '@/stores/administration';
import { ChevronLeft } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import contactForm from '@/components/clients/contactForm.vue';
import financeForm from '@/components/clients/financeForm.vue';
import companyForm from '@/components/clients/companyForm.vue'
import { useWidgetStore } from '@/stores/widget';

const { t } = useI18n()
const loading = ref(true)
const tab = ref('contacts')
const route = useRoute()
const useAdministration = useAdministrationStore()
const useWidget = useWidgetStore()

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
        manager: null,
      })
    }
    useWidget.clientTypeModal = false
    await useAdministration.getCities()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

</script>

<style lang="scss" scoped></style>
