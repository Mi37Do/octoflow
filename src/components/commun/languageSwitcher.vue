<template>
  <div class="w-fit text-right ">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="btn  btn-float">
          <Languages class="w-5 h-5" />
          {{ useWidget.userLanguage }}
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems :class="[
          useWidget.userLanguage === 'ar' ? 'origin-left left-0' : 'origin-top-right  right-0',
          'absolute mt-2 w-32 divide-y card z-50']">

          <div class="px-1 py-1">
            <MenuItem @click="useWidget.setLanguage(language)" v-for="language in languages" :key="language">
            <button :class="[
              ' btn-sm flex justify-between btn-ghost w-full font-light capitalize'
            ]">
              <span class="uppercase">{{ language }}</span>
              <span> {{ language === 'en' ? 'english' : language === 'fr' ? 'français' : 'العربية'
              }}</span>

            </button>
            </MenuItem>

          </div>


        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ref, onBeforeMount, watch } from 'vue'

import { useWidgetStore } from '@/stores/widget'
import { Languages } from 'lucide-vue-next'

const enabled = ref(false)
const useWidget = useWidgetStore()
const languages = ref(['ar', 'en'])

onBeforeMount(() => {
  const initLanguage = useWidget.getLanguage()
  useWidget.setLanguage(initLanguage)
})


</script>
