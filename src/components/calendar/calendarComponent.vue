<template>
  <div
    :class="[viewMode === 'month' ? 'bg-glass-effect p-3' : '', 'w-full  h-full overflow-hidden flex flex-col gap-3']">
    <!-- Header -->
    <div class="flex-1 overflow-auto ">
      <div class="h-fit">
        <!-- YEAR VIEW -->
        <div v-if="viewMode === 'year'" class="grid grid-cols-4 gap-3">
          <div v-for="month in yearMonths" :key="month.index" class="p-3 bg-glass-effect">
            <h3
              class="text-center font-semibold mb-2 cursor-pointer hover:text-blue-600 bg-[var(--color-background)] rounded-lg  py-2"
              @click="switchToMonth(month.index)">
              {{ month.name }}
            </h3>
            <!-- Weekdays -->
            <div class="grid grid-cols-7 text-xs font-bold text- text-[var(--color-text)]">
              <div v-for="d in weekDays" :key="d" class="text-center">{{ d }}</div>
            </div>
            <!-- Days -->
            <div class="grid grid-cols-7 gap-y-0.5 text-xs">
              <day-item v-for="day in month.days" :key="day.full" :day="day" :events="list" />
            </div>
          </div>
        </div>

        <!-- MONTH VIEW -->
        <div v-else>
          <div class="grid grid-cols-7 text-sm font-bold text- text-[var(--color-text)] ">
            <div v-for="d in weekDays" :key="d" class="text-center">{{ d }}</div>
          </div>
          <div class="grid grid-cols-7">
            <div v-for="day in daysInMonth" :key="day.full" class="h-20 flex items-center justify-center border rounded"
              :class="[
                day.isToday ? 'bg-blue-500 text-white' : '',
                !day.isCurrentMonth ? 'text-gray-400' : ''
              ]">
              {{ day.label }}
            </div>
          </div>
          <div class="mt-4">
            <button @click="viewMode = 'year'" class="px-3 py-1 bg-blue-500 text-white rounded">
              Back to Year
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import dayItem from "./dayItem.vue"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns"

const today = new Date()
const viewMode = ref("year") // "year" | "month"
const props = defineProps(['list', 'currentMonth', 'currentYear'])
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const currentYear = ref(props.currentYear)
const currentMonth = ref(props.currentMonth)


// --- Generate all months for the year ---
const yearMonths = computed(() =>
  Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date(props.currentYear, i)
    const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 0 })

    const days = eachDayOfInterval({ start, end }).map(d => ({
      date: d,
      label: format(d, "d"),
      full: format(d, "yyyy-MM-dd"),
      isCurrentMonth: d.getMonth() === i,
      isToday: format(d, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
    }))

    return {
      name: format(monthDate, "MMMM"),
      index: i,
      days
    }
  })
)

// --- Single month view ---
const daysInMonth = computed(() => {
  const monthDate = new Date(props.currentYear, props.currentMonth)
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 0 })
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 0 })

  return eachDayOfInterval({ start, end }).map(d => ({
    date: d,
    label: format(d, "d"),
    full: format(d, "yyyy-MM-dd"),
    isCurrentMonth: d.getMonth() === props.currentMonth,
    isToday: format(d, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
  }))
})


const switchToMonth = (monthIndex) => {
  currentMonth.value = monthIndex
  viewMode.value = "month"
}
</script>

<style lang="scss" scoped></style>
