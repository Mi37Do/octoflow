import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const types = ref([])
  const focusedType = ref(null)

  const colors = ref([])
  const focusedColor = ref(null)

  const packings = ref([])
  const focusedPacking = ref(null)

  const products = ref([])
  const focusedProduct = ref(null)

  const getTypes = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Type/${id}/`)
      focusedType.value = response.data
    } else {
      let response = await axios.get(`/api/Type/`)
      types.value = response.data
      localStorage.setItem('types', JSON.stringify(types.value))
    }
  }

  const getColors = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Couleur/${id}/`)
      focusedColor.value = response.data
    } else {
      let response = await axios.get(`/api/Couleur/`)
      colors.value = response.data
      localStorage.setItem('colors', JSON.stringify(colors.value))
    }
  }

  const getPackings = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Conditionement/${id}/`)
      focusedPacking.value = response.data
    } else {
      let response = await axios.get(`/api/Conditionement/`)
      packings.value = response.data
      localStorage.setItem('packings', JSON.stringify(packings.value))
    }
  }

  const getProducts = async (id, filters) => {
    if (id) {
      let response = await axios.get(`/api/Produit/${id}/`)
      focusedProduct.value = response.data
    } else {
      let response = await axios.get(`/api/Produit/`)
      products.value = response.data
    }
  }

  const getConfigs = async () => {
    await getColors()
    await getPackings()
    await getTypes()
  }

  return {
    getTypes,
    types,
    focusedType,
    getColors,
    colors,
    focusedColor,
    getPackings,
    packings,
    focusedPacking,
    getProducts,
    focusedProduct,
    products,
    getConfigs,
  }
})
