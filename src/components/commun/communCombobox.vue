<template>
  <div>
    <Combobox v-model="selected">
      <div class="relative">
        <div class="relative w-full">
          <ComboboxInput autocomplete="off" :required="required" class="input"
            :displayValue="(item) => item.designation" @change="query = $event.target.value" />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown class="h-5 w-5 text-slate-500" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
          @after-leave="query = ''">
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20">
            <div v-if="filteredList.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700">
              Nothing found.
            </div>

            <ComboboxOption v-for="item in filteredList" as="template" :key="item.id" @click="selectItem(item.id)"
              @keypress.enter="selectItem(item.id)" :value="item" v-slot="{ selected, active }">
              <li class="relative cursor-default select-none py-2 pl-10 pr-4 w-full" :class="{
                'bg-primary/20 text-primary fill-primary': active,
                'text-gray-900': !active,
              }">
                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  {{ item.designation }}
                </span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Check class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

const props = defineProps(['list', 'required', 'selected', 'placehonder'])
const emits = defineEmits(['onSelectedItem'])
let query = ref('')
const selected = ref('')

onMounted(() => {
  if (props.selected) selected.value = props.list.find(item => item.id === props.selected)

})

watch(() => props.selected, () => {
  selected.value = props.selected ? props.list.find(item => item.id === props.selected) : ''
})

let filteredList = computed(() =>
  query.value === ''
    ? props.list
    : props.list.filter((item) =>
      item.designation
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)

watch(() => selected.value, () => {
  emits('onSelectedItem', selected.value.id)
})

const selectItem = (id) => {
  selected.value = props.list.find(item => item.id === id)
  emits('onSelectedItem', id)
}

</script>
