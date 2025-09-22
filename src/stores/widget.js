import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useWidgetStore = defineStore('widget', () => {
  const isMobile = ref(false)
  const sheet = ref(false)
  const openSide = ref(false)
  const communRoutes = ref([])
  const themeState = ref('light')
  const imageCropper = ref(false)
  const clientTypeModal = ref(false)
  const mapModal = ref(false)
  const { t } = useI18n()

  const regionIds = ['EST', 'OUEST', 'CENTRE', 'SUD']

  const regions = computed(() =>
    regionIds.map((id) => ({
      id,
      designation: t(`translation.regions.${id}`),
    })),
  )

  const currentModule = ref('')

  const deleteModal = reactive({
    open: false,
    designation: '',
    id: '',
  })

  //types
  const openTypeOptions = ref(false)
  const addEditType = reactive({
    add: true,
    open: false,
  })

  //users
  const openClientOptions = ref(false)

  const userLanguage = ref('en')
  const { locale } = useI18n()

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 768 // 768px is a common breakpoint for mobile devices
  }

  const toggleLanguage = () => {
    const activeLanguage = localStorage.getItem('user-language')
    if (activeLanguage === 'en') setLanguage('en')
    else if (activeLanguage === 'fr') setLanguage('fr')
    else setLanguage('ar')
  }

  const setLanguage = (language) => {
    localStorage.setItem('user-language', language)
    locale.value = language
    userLanguage.value = language
  }

  const getLanguage = () => {
    return localStorage.getItem('user-language')
  }

  return {
    isMobile,
    checkScreenSize,
    sheet,
    openSide,
    userLanguage,
    toggleLanguage,
    setLanguage,
    getLanguage,
    themeState,
    openTypeOptions,
    addEditType,
    deleteModal,
    currentModule,
    imageCropper,
    regions,
    clientTypeModal,
    openClientOptions,
    mapModal,
    communRoutes,
  }
})
