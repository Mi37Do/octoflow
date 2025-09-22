<template>
  <div class="w-full h-full card rounded-md flex flex-col gap-3 p-3">

    <div class="flex items-center justify-between">
      <span class="pixa-title">
        {{ t('translation.search') }}
      </span>

      <button class="btn btn-square btn-nofloat">
        <X />
      </button>
    </div>

    <input type="text" class="input" v-model="query" @input="handleSearch">

    <div class="flex-1 flex items-center justify-center overflow-hidden">

      <div v-if="gotResult" class="w-full h-full overflow-hidden">
        <div v-if="searchResults.length > 0" class="w-full h-full overflow-auto hidden-scrollbar">
          <div class="h-fit flex flex-col gap-1 ">
            <div v-for="item in searchResults" :key="item.id" @click="handleResultClick(item)" :class="compareRoundedCoordinates(item.lat, selectedSearch.lat) && compareRoundedCoordinates(item.lon, selectedSearch.lon) ? 'bg-[var(--color-background)]' :
              'hover:bg-[var(--color-background)]'" class="h-fit  rounded-md p-1.5 flex flex-col gap-1 cursor-pointer">
              <span>{{ item.display_name }}</span>
              <span class="uppercase text-xs italic">{{ item.addresstype }}</span>
            </div>
          </div>
        </div>
        <div v-else class="w-full h-full flex items-center justify-center">

        </div>
      </div>

      <commun-loading v-else />

    </div>

  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n';
import communLoading from '../commun/communLoading.vue';
import axios from 'axios';
import { reactive, ref } from 'vue';

const props = defineProps(['selected'])
const emits = defineEmits(['onSelectCenter'])
const { t } = useI18n()
const query = ref('')
const searchResults = ref([]);
let searchTimeout = ref(null);
const gotResult = ref(false)
const selectedSearch = reactive(
  {
    lat: null,
    lon: null
  }
)

const handleSearch = () => {
  clearTimeout(searchTimeout.value);

  if (query.value.length < 3) {
    searchResults.value = [];
    return;
  }

  searchTimeout.value = setTimeout(async () => {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search', {
        params: {
          q: query.value,
          format: 'json',
          limit: 5,
          'accept-language': 'en'
        }
      }
      );
      searchResults.value = response.data;
      console.log(response.data);
      gotResult.value = true

    } catch (error) {
      console.error('Search error:', error);
      searchResults.value = [];
    }
  }, 300); // 300ms debounce delay
};

const handleResultClick = (result) => {
  const lat = parseFloat(result.lat);
  const lon = parseFloat(result.lon);

  selectedSearch.lat = lat
  selectedSearch.lon = lon

  emits('onSelectCenter', [lat, lon])



  // Clear search results
  //searchResults.value = [];
  query.value = result.display_name;
}


function compareRoundedCoordinates(coord1, coord2) {
  // Round both coordinates to 7 decimal places
  const rounded1 = Math.round(coord1 * 1000000) / 1000000;
  const rounded2 = Math.round(coord2 * 1000000) / 1000000;

  // Compare the rounded values
  return rounded1 === rounded2;
}

</script>

<style lang="scss" scoped></style>
