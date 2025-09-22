import { ref, computed, onBeforeMount, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const openMapSearch = ref(false)
  const loadingMap = ref(true)
  const zoom = ref(6)

  const center = ref(null)

  const centerUpdated = (e) => {
    center.value = e
  }

  const zoomUpdated = (e) => {
    zoom.value = e
  }
  /**
  const focusMarker = reactive({
    lat: 32.49094,
    lng: 3.67347,
    marker: new URL(`@/assets/images/defaultMarker.png`, import.meta.url).href,
    draggable: true
  })*/

  const focusOnSearch = (lng, lat) => {
    focusMarker.lng = lng
    focusMarker.lat = lat
    centerUpdated([lat, lng])
    zoomUpdated(12)
  }

  return {
    openMapSearch,
    zoom,
    center,
    centerUpdated,
    zoomUpdated,
    focusOnSearch,
    loadingMap,
    // focusMarker
  }
})
