<template>
  <TransitionRoot appear :show="useWidget.mapModal" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/15 blur-bg" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-end sm:items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md sm:max-w-screen-xl h-[90vh] transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all flex flex-col items-center gap-3">
              <div class="w-full flex items-center justify-between">
                <DialogTitle as="h3" class="pixa-title truncate">
                  {{ t('translation.choosingAccountType') }}
                </DialogTitle>
                <button @click="closeModal" class="btn btn-square btn-nofloat">
                  <X />
                </button>
              </div>

              <div class="w-full flex-1 overflow-hidden rounded-2xl relative flex gap-3">

                <div class="w-full h-full absolute inset-0 z-0">
                  <l-map ref="map" v-model:zoom="useMap.zoom" :center="useMap.center"
                    @update:center="useMap.centerUpdated" @update:zoom="useMap.zoomUpdated" :useGlobalLeaflet="false">
                    <l-tile-layer :max-zoom="18" :min-zoom="3" :url="tileUrl"
                      :attribution="tileAttribute"></l-tile-layer>
                    <l-control-scale position="bottomleft" :imperial="false" :metric="true">
                    </l-control-scale>
                    <l-marker :lat-lng="[useMap.focusMarker.lat, useMap.focusMarker.lng]"
                      :draggable="useMap.focusMarker.draggable" @update:lat-lng="positionUpdate">
                    </l-marker>

                    <!--
                    <l-icon :icon-size="iconSize" :icon-anchor="iconAnchor" :icon-url="useMap.focusMarker.marker" /> -->

                    <!--
                  <l-marker v-if="lawyers" v-for="lawyer in lawyers" :key="lawyer.id"
                    :lat-lng="[lawyer.lati, lawyer.long]">
                    <l-icon :icon-size="iconSize" :icon-anchor="iconAnchor" :icon-url="lawyerMarker" />
                  </l-marker>-->
                  </l-map>
                </div>

                <div class="w-96 h-full absolute flex flex-col gap-3 right-0 p-3">
                  <map-search :selected="useMap.center" @on-select-center="onSelectCenter" />

                  <button type="button" @click="() => {
                    emits('onSelectLocation', useMap.center)
                    useWidget.mapModal = false
                  }" class="btn btn-primary justify-center">select location</button>
                </div>



              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useWidgetStore } from '@/stores/widget'
import { useI18n } from 'vue-i18n'
import { X } from 'lucide-vue-next'
import { LMap, LIcon, LTileLayer, LMarker, LControlLayers, LTooltip, LPopup, LPolyline, LPolygon, LRectangle, LControlScale, LGeoJson, LControlZoom } from "@vue-leaflet/vue-leaflet"
import 'leaflet/dist/leaflet.css'
import { onBeforeMount, ref } from 'vue'
import mapSearch from '@/components/map/mapSearch.vue'
import { useMapStore } from '@/stores/map'

const props = defineProps(['selectedLocation', 'zoom', 'lawyers'])
const useWidget = useWidgetStore()
const accessToken = '4aEVnvjRmKsweVuioNcpEBcbWAPDAGFLNBXSDpZE9v1iBACbH8W5CQn2Dj8z6J4m'
const { t } = useI18n()

const tileAttribute = ref('&copy; <a target="_blank" href="https://xpertify-solutions.vercel.app/">xpertify-solutions</a>')

const lawyerMarker = new URL(`@/assets/images/lawyerMarker.png`, import.meta.url).href

const iconSize = ref([31.2, 44.72])
const useMap = useMapStore()
const iconAnchor = ref([15.6, 44.72])
let map = ref(null);
const emits = defineEmits(['onSelectLocation'])

onBeforeMount(() => {
  if (props.zoom) useMap.zoom = props.zoom
  if (props.selectedLocation) {
    if (props.selectedLocation.type === 'Avocat') {
      useMap.focusMarker.lat = props.selectedLocation.lat
      useMap.focusMarker.lng = props.selectedLocation.lng
      useMap.focusMarker.marker = lawyerMarker,
        useMap.focusMarker.draggable = props.selectedLocation.draggable
      useMap.centerUpdated({ lat: props.selectedLocation.lat, lng: props.selectedLocation.lng })
    }

  } console.log(props.selectedLocation);
  if (useMap.center) return;
  else {
    useMap.zoom = 6;
    useMap.centerUpdated({ lat: 32.49094, lng: 3.67347 })

  }
})


const tileUrl = ref('https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=4aEVnvjRmKsweVuioNcpEBcbWAPDAGFLNBXSDpZE9v1iBACbH8W5CQn2Dj8z6J4m', {})
const positionUpdate = (e) => {
  useMap.focusMarker.lat = e.lat
  useMap.focusMarker.lng = e.lng
  useMap.centerUpdated(e)
}

const closeModal = () => {
  useWidget.mapModal = false
}


const onSelectCenter = (center) => {
  // Recenter map with smooth animation
  positionUpdate({ lat: center[0], lng: center[1] })
  useMap.zoom = 13
  // Update marker

  /**
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker(center).addTo(map)
    .bindPopup(result.display_name)
    .openPopup();*/
}

</script>
