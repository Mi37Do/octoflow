<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar>
    </top-app-bar>
    <div class="w-full flex-1 overflow-hidden">
      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 px-3">

        <options-modal @loadData="async () => {
          await loadData()
        }" />
        <commun-delete-modal @delete-item="onDeleteItem" />

        <sheet :open="useWidget.sheet" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'" @closeSide="(value) => {
          useWidget.sheet = value
        }" />

        <div class="w-full h-10 flex items-center justify-between">
          <div class="w-80">
            <input type="text" class="input">
          </div>
          <div class="flex gap-2 items-center">
            <button @click="useWidget.sheet = true" class="btn btn-float">
              <ListFilter class="w-4" />
              {{ t('translation.filters') }}
            </button>
            <router-link :to="{ name: 'humanResources-add-user-view' }" class="btn btn-primary">
              <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.project') }}
            </router-link>
          </div>
        </div>


        <div v-if="projects.length > 0" class="w-full h-full flex overflow-hidden relative">
          <commun-scrollable>
            <template #scrollable-content>
              <div
                class="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 relative">
                <project-item v-for="project in projects" :key="project.id" :item="project" />
              </div>
            </template>
          </commun-scrollable>
        </div>

        <div v-else class="grow w-full flex flex-col items-center justify-center gap-8">
          <img src="@/assets/pics/noData.svg" class="w-52" />

          <span class="uppercase max-w-80 px-4 text-center">{{ t('translation.noData') }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import communTable from '@/components/commun/communTable.vue';
import communDeleteModal from '@/components/commun/communDeleteModal.vue';
import tableElements from '@/components/ui/table/tableElements.vue';
import sheet from '@/components/commun/sheet.vue';
import tableNavigation from '@/components/ui/table/tableNavigation.vue';
import { ListFilter, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import optionsModal from '@/components/humanResources/users/optionsModal.vue';
import projectItem from '@/components/humanResources/projects/projectItem.vue';
import axios from 'axios';
import { useAdministrationStore } from '@/stores/administration';
import { faker } from '@faker-js/faker'
import communScrollable from '@/components/commun/communScrollable.vue';

const columns = ref([])

const COUNT = 30

const contactColumns = ref([{
  designation: 'user',
  size: 1,
  filter: true
}, {
  designation: 'departement',
  size: 1,
  filter: false
}, {
  designation: 'type',
  size: 1,
  filter: false
}, {
  designation: 'region',
  size: 1,
  filter: false
}, {
  designation: 'contact',
  size: 1,
  filter: false
}, {
  designation: 'work_contact',
  size: 1,
  filter: false
}, {
  designation: 'status',
  size: 1,
  filter: false
}, {
  designation: 'created_at',
  size: 1,
  filter: false
},])

const tempCities = ref([])

const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()


onMounted(async () => {
  try {
    if (
      localStorage.getItem('cities')) {
      tempCities.value = JSON.parse(localStorage.getItem('cities'))
    }
    columns.value = contactColumns.value
    await loadData()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = true
  }
})

const onDeleteItem = async (id) => {
  try {
    let response = await axios.delete(`/api/CustomUser/${id}/`)

    await loadData()

    Object.assign(useWidget.deleteModal, {
      open: false,
      designation: '',
      id: '',
    })
  } catch (error) {
    console.error(error)
  }
}

const projects = ref([])
const statuses = ['done', 'in progress', 'new', 'blocked']

function generateProjects(count = 10) {
  projects.value = Array.from({ length: count }, () => {
    const participants = Array.from(
      { length: faker.number.int({ min: 2, max: 8 }) },
      () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      })
    )

    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      progress: faker.number.int({ min: 0, max: 100 }),
      participants,
      participantsCount: participants.length,
      deadline: faker.date.future(),
      createdAt: faker.date.past(),
      manager: faker.person.fullName(),
      status: faker.helpers.arrayElement(statuses),
    }
  })
}

const loadData = async () => {
  try {
    generateProjects(30)
    //  await useAdministration.getUsers()
  } catch (error) {
    console.error(error)

  }
}

</script>

<style lang="scss" scoped>
nav {
  a {
    color: var(--btn-float);
    fill: var(--btn-float);

    &.router-link-exact-active {
      background-color: var(--vt-primary-2);
      color: #fff;
      fill: #fff;
    }

    &.router-link-active {
      background-color: color-mix(in srgb, var(--vt-primary-2) 10%, transparent);
      color: var(--vt-primary-2);
      fill: var(--vt-primary-2);
    }
  }
}
</style>
