import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useWidgetStore = defineStore('widget', () => {
  const isMobile = ref(false)
  const sheet = ref(false)
  const openSide = ref(false)
  const themeState = ref('light')

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

  const userLanguage = ref('en')
  const { locale } = useI18n()

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 768 // 768px is a common breakpoint for mobile devices
  }

  const toggleLanguage = () => {
    const activeLanguage = localStorage.getItem('user-language')
    if (activeLanguage === 'ar') setLanguage('fr')
    else if (activeLanguage === 'ar') setLanguage('fr')
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
  }
})
