<template>
  <div class="w-full h-screen flex flex-col ">
    <div class="w-full flex items-center justify-between px-3 h-16">
      <div class="flex gap-1.5 flex-1 justify-end">
        <language-switcher />
        <button @click="toggleTheme()" class="btn btn-square btn-float">
          <Sun v-if="isDark" class="w-5 h-5" />
          <Moon v-else />
        </button>
      </div>
    </div>


    <div class="w-full flex-1 flex items-center justify-center">
      <form @submit.prevent="login(user.username, user.password)"
        class="w-full max-w-80 h-fit p-3 flex flex-col items-center gap-3">

        <div class="w-40 h-fit mb-12 flex flex-col items-center">

          <div v-if="useWidget.themeState === 'dark'" class="flex flex-col gap-6 w-fit items-center">
            <img src="@/assets/logos/distribex_square_white.png" class="w-20" alt="">
            <img src="@/assets/logos/distribex_white.png" class="h-6 w-fit" alt="">
          </div>
          <div v-else class="flex flex-col gap-6 w-fit items-center">
            <img src="@/assets/logos/distribex_square.png" class="w-20" alt="">
            <img src="@/assets/logos/distribex.png" class="h-6 w-fit" alt="">
          </div>
        </div>

        <div class="flex flex-col gap-1.5 w-full">
          <span class="text-xs uppercase ">username</span>
          <input type="text" class="input" required v-model="user.username">
        </div>

        <div class="flex flex-col gap-1.5 w-full">
          <span class="text-xs uppercase">password</span>
          <input type="text" :class="px('pr-6', 'input')" required v-model="user.password">
          <span class="text-right text-xs uppercase">forgot password ?</span>
        </div>

        <label class="flex gap-3 items-center py-3 w-full">
          <CommunSwitcher /> <span>Save my credentials</span>
        </label>

        <button :disabled="loadingAuth" class="btn btn-primary justify-center w-full" type="submit">
          <div v-if="loadingAuth" class=" h-5">
            <commun-loading />
          </div>
          <span v-else>login</span>
        </button>
      </form>
    </div>

    <div class="w-full h-14 flex items-center justify-center text-center text-xs md:text-md">
      <span>All rights reserved to <span class="font-medium uppercase">distribex</span><br class="md:hidden"> ,
        developped by
        <span class="font-medium uppercase">xpertify-solutions</span></span>
    </div>

  </div>
</template>

<script setup>
import communLoading from '@/components/commun/communLoading.vue';
import { useWidgetStore } from '@/stores/widget';
import { useDark, useToggle } from '@vueuse/core';
import { px } from '@/lib/utils';
import languageSwitcher from '@/components/commun/languageSwitcher.vue';
import { Moon, Sun } from 'lucide-vue-next';
import CommunSwitcher from '@/components/commun/communSwitcher.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';


const useWidget = useWidgetStore()
const useAuth = useAuthStore()
const loadingAuth = ref(false)
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'user-theme', // Sauvegarde le choix de l'utilisateur
})
const toggleTheme = useToggle(isDark)
const user = reactive(
  {
    username: '',
    password: '',
  }
)

onMounted(() => {
  useWidget.themeState = isDark.value ? 'dark' : 'light'
})

watch(() => isDark.value, () => {
  useWidget.themeState = isDark.value ? 'dark' : 'light'
})

const login = async (username, password) => {

  loadingAuth.value = true
  try {
    await useAuth.login(username, password)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
