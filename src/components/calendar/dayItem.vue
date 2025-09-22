<template>
  <div class="w-full h-full flex items-center justify-center relative overflow-hidden">

    <div
      v-if="events.find(item =>
        isWithinInterval(day.date, { start: subDays(item.startDate, 1), end: item.endDate }) && !isSameDay(item.startDate, item.endDate))"
      :class="events.find(item => isSameDay(day.date, item.startDate) && isSameMonth(day.date, item.startDate)) ? 'w-1/2 left-1/2' : events.find(item => isSameDay(day.date, item.endDate) && isSameMonth(day.date, item.endDate)) ? 'w-1/2 right-1/2' : 'w-full'"
      class="w-full h-[18px] selected_range absolute z-0">
    </div>

    <div :class="[
      day.isToday ? 'bg-[var(--vt-primary-1)] text-[var(--color-primary-text)]' : '',
      !day.isCurrentMonth ? 'text-gray-400' : 'text-text-[var(--color-text)]',
      (day.date.getDay() === 5 || day.date.getDay() === 6) ? 'font-semibold' : '',
      events.find(event => (
        (isSameDay(day.date, event.startDate) && isSameMonth(day.date, event.startDate)) ||
        (isSameDay(day.date, event.endDate)))
      ) ? 'selected_date'
        : ''
      ,]
      " class="w-6 h-6 flex items-center justify-center rounded-md z-10">
      {{ day.label }}
    </div>

  </div>
</template>

<script setup>
import { isSameDay, isSameMonth, isWeekend, isWithinInterval, subDays } from 'date-fns';

const props = defineProps(['day', 'events'])

</script>

<style lang="scss" scoped>
.selected_range {
  background-color: color-mix(in srgb, var(--vt-primary-2) 10%, transparent);
  color: var(--vt-primary-1);
}

.selected_date {
  background-color: color-mix(in srgb, var(--vt-primary-2) 60%, transparent);
  color: var(--color-primary-text)
}
</style>
