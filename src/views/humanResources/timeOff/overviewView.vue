<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar>
    </top-app-bar>
    <div class="w-full flex-1 overflow-hidden">
      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 px-3 pb-3">


        <sheet :open="useWidget.sheet" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'" @closeSide="(value) => {
          useWidget.sheet = value
        }" />

        <div class="w-full h-10 flex items-center justify-between">
          <div class="w-52 btn btn-nofloat">
            <div class="flex items-center w-full">

              <h2 class="text-xl font-bold flex-1 px-3">
                {{ viewMode === "year" ? currentYear : format(new Date(currentYear, currentMonth), "MMMM yyyy") }}
              </h2>
              <button @click="goPrev" class="btn btn-sm btn-square btn-ghost">
                <ChevronLeft size="18" />
              </button>
              <button @click="goNext" class=" btn btn-sm btn-square btn-ghost">
                <ChevronRight size="18" />
              </button>
            </div>
          </div>
          <div class="flex gap-2 items-center">

            <div class="grid grid-cols-2 gap-0.5 p-1 rounded-lg bg-[var(--color-commun-border)]">

              <button @click="isList = false" :class="!isList ? 'btn-nofloat' : ''" class="btn-sm btn-square">
                <CalendarRange />
              </button>
              <button @click="isList = true" :class="isList ? 'btn-nofloat' : ''" class="btn-sm btn-square">
                <List />
              </button>
            </div>

            <button @click="useWidget.sheet = true" class="btn btn-float">
              <ListFilter class="w-4" />
              {{ t('translation.filters') }}
            </button>
            <router-link :to="{ name: 'humanResources-add-user-view' }" class="btn btn-primary">
              <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.time_off') }}
            </router-link>
          </div>
        </div>

        <div v-if="isList" class="w-full flex-1 flex">
          <commun-table v-if="calendarItems.length > 0" :columns="columns" :footer="true" @divsWidths="(values) => {
            divsWidths = values
          }">

            <template #table_content><!--
              <item-data v-for="item in calendarItems" :key="item.id" :item="item" :divsWidths="divsWidths" />-->
            </template>

            <template #table_footer_right>

              <table-elements :elements="calendarItems.length" />
            </template>
            <!--
            <template #table_footer_left>
              <table-navigation :maxPages="14" />
            </template>
 -->
          </commun-table>
        </div>

        <div v-else class="flex-1 flex gap-3 w-full">
          <calendar-component :list="calendarItems" :currentYear="currentYear" :currentMonth="currentMonth" />

          <div class="w-[450px] h-full bg-glass-effect p-3"></div>

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
import { CalendarRange, ChevronLeft, ChevronRight, List, ListFilter, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import itemData from '@/components/humanResources/users/itemData.vue';
import optionsModal from '@/components/humanResources/users/optionsModal.vue';
import calendarComponent from '@/components/calendar/calendarComponent.vue';
import axios from 'axios';
import { useAdministrationStore } from '@/stores/administration';
import { faker } from '@faker-js/faker'
import {
  addMonths,
  getYear,
  subMonths
} from "date-fns"

const columns = ref([])
const viewMode = ref("year")
const isList = ref(false)


const COUNT = 6

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

const today = new Date()
const currentYear = ref(getYear(today))
const currentMonth = ref(today.getMonth())

// Fix the calendar items generation
const calendarItems = ref([])

const { t } = useI18n()
const loading = ref(true)
const divsWidths = ref([])
const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()

// Function to generate realistic calendar events
const generateCalendarItems = () => {
  const items = Array.from({ length: COUNT }, (_, i) => {
    const start = faker.date.between({
      from: new Date(currentYear.value, 0, 1),
      to: new Date(currentYear.value, 11, 31)
    })

    // Ensure end date is not before start date
    const isRange = faker.datatype.boolean()
    let end = start

    if (isRange) {
      const maxEnd = new Date(currentYear.value, 11, 31)
      const daysToAdd = faker.number.int({ min: 1, max: 14 })
      end = new Date(start)
      end.setDate(start.getDate() + daysToAdd)

      // Make sure end date doesn't exceed the year
      if (end > maxEnd) {
        end = maxEnd
      }
    }

    return {
      id: i + 1,
      designation: faker.person.jobTitle(),
      type: faker.helpers.arrayElement(["time off", "allocation"]),
      startDate: start,
      endDate: end
    }
  })

  return items
}

onMounted(async () => {
  try {
    columns.value = contactColumns.value
    await loadData()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false // Set to false even on error to show the UI
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

const loadData = async () => {
  try {
    // Generate calendar items
    calendarItems.value = generateCalendarItems()
    console.log("Calendar items:", calendarItems.value)

    // If you want to load real data from API later, uncomment:
    // await useAdministration.getUsers()
  } catch (error) {
    console.error(error)
  }
}

const goPrev = () => {
  if (viewMode.value === "year") {
    currentYear.value--
  } else {
    const prev = subMonths(new Date(currentYear.value, currentMonth.value), 1)
    currentYear.value = getYear(prev)
    currentMonth.value = prev.getMonth()
  }
}

const goNext = () => {
  if (viewMode.value === "year") {
    currentYear.value++
  } else {
    const next = addMonths(new Date(currentYear.value, currentMonth.value), 1)
    currentYear.value = getYear(next)
    currentMonth.value = next.getMonth()
  }
}

</script>

<style lang="scss" scoped></style>
