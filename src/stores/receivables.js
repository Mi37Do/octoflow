import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useReceivablesStore = defineStore('receivables', () => {
  const deliveries = ref([])
  const focusedDelivery = ref(null)

  const getDeliveries = async (id) => {
    if (id) {
      let response = await axios.get(`/api/BonLivraison/${id}/`)
      focusedDelivery.value = response.data
    } else {
      let response = await axios.get(`/api/BonLivraison/`)
      deliveries.value = response.data
    }
  }

  return { deliveries, focusedDelivery, getDeliveries }
})
