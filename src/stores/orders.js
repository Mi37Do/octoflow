import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const focusedOrder = ref(null)

  const getOrders = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Commande/${id}/`)
      focusedOrder.value = response.data
    } else {
      let response = await axios.get(`/api/Commande/`)
      orders.value = response.data
    }
  }

  return { getOrders, orders }
})
