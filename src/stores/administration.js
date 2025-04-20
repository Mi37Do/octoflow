import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdministrationStore = defineStore('administration', () => {
  const specialities = ref([])
  const focusedSpeciality = ref(null)

  const departements = ref([])
  const focusedDepartement = ref(null)

  const banks = ref([])
  const focusedBank = ref(null)
  const payers = ref([])
  const focusedPayer = ref(null)

  const roles = ref([])
  const focusedRole = ref(null)

  const getSpecialities = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Specialite/${id}/`)
      focusedSpeciality.value = response.data
    } else {
      let response = await axios.get(`/api/Specialite/`)
      specialities.value = response.data
      localStorage.setItem('specialities', JSON.stringify(specialities.value))
    }
  }

  const getDepartements = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Departements/${id}/`)
      focusedDepartement.value = response.data
    } else {
      let response = await axios.get(`/api/Departements/`)
      departements.value = response.data
      localStorage.setItem('departements', JSON.stringify(departements.value))
    }
  }

  const getBanks = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Banque/${id}/`)
      focusedBank.value = response.data
    } else {
      let response = await axios.get(`/api/Banque/`)
      banks.value = response.data
      localStorage.setItem('banks', JSON.stringify(banks.value))
    }
  }

  const getPayers = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Payeur/${id}/`)
      focusedPayer.value = response.data
    } else {
      let response = await axios.get(`/api/Payeur/`)
      payers.value = response.data
      localStorage.setItem('payers', JSON.stringify(payers.value))
    }
  }

  const getRoles = async (id) => {
    if (id) {
      let response = await axios.get(`/api/Role/${id}/`)
      focusedRole.value = response.data
    } else {
      let response = await axios.get(`/api/Role/`)
      roles.value = response.data
      localStorage.setItem('roles', JSON.stringify(roles.value))
    }
  }

  const getConfigs = async () => {
    await getSpecialities()

    await getDepartements()

    await getBanks()

    await getPayers()
  }

  return {
    specialities,
    focusedSpeciality,
    getSpecialities,
    getConfigs,
    getDepartements,
    departements,
    focusedDepartement,
    getBanks,
    banks,
    focusedBank,
    getPayers,
    payers,
    focusedPayer,
    getRoles,
    roles,
    focusedRole,
  }
})
