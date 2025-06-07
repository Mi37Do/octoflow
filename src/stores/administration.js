import { ref, computed, reactive } from 'vue'
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
  const users = ref([])
  const focusedUser = ref(null)

  const cities = ref([])
  const focusedCity = ref('')

  const roles = ref([])
  const focusedRole = ref(null)

  const costumUser = reactive({
    name: '',
    first_name: '',
    last_name: '',
    type: null,
    region: 'OUEST',
    logo: null,
    siteweb: '',
    telephone: '',
    email: '',
    photo: '',
    password: '123456',
    nif: '',
    nis: '',
    art: '',
    rc: '',
    bp: '',
    long: 0,
    lat: 0,
    objectif_a: 0,
    objectif_m: 0,
    plafonnement: 0,
    ville: null,
    manager: null,
  })

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

  const getUsers = async (id) => {
    if (id) {
      let response = await axios.get(`/api/CustomUser/${id}/`)
      focusedUser.value = response.data
    } else {
      let response = await axios.get(`/api/CustomUser/`)
      users.value = response.data
    }
  }

  const getCities = async (id) => {
    if (id) {
      let response = await axios.get(`/api/ville/${id}/`)
      focusedCity.value = response.data
    } else {
      let response = await axios.get(`/api/ville/`)
      cities.value = response.data
      localStorage.setItem('cities', JSON.stringify(cities.value))
    }
  }

  const getConfigs = async () => {
    await getSpecialities()
    await getDepartements()
    await getBanks()
    await getPayers()
    await getCities()
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
    getUsers,
    users,
    focusedUser,
    costumUser,
    cities,
    getCities,
    focusedCity,
  }
})
