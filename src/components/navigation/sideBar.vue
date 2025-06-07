<template>

  <UseTemplate>
    <nav class="w-full h-fit card rounded-xl flex flex-col gap-1 p-1">
      <div v-for="item in routes" :key="item.id" class="w-full">
        <side-bar-router-subs v-if="item.subs" :item="item" />
        <side-bar-router v-else :item="item" />
      </div>
    </nav>
  </UseTemplate>

  <div v-if="isDesktop" :class="[
    useWidget.isMobile ? 'hidden' : 'flex', useWidget.openSide ? 'w-52' : 'w-[4.125rem]']"
    class="h-full transition-all ease-in-out duration-300 flex flex-col">

    <div class="w-full h-16 transition-all ease-in-out duration-300 flex ">
      <div class="w-16 h-16 flex items-center justify-center">
        <img v-if="useWidget.themeState === 'dark'" src="@/assets/logos/distribex_square_white.png" class="w-8 h-8 ml-1"
          alt="">
        <img v-else src="@/assets/logos/distribex_square.png" class="w-8 h-8 ml-1" alt="">
      </div>
      <div class="flex-1 h-full flex items-center overflow-hidden relative">
        <img v-if="useWidget.themeState === 'dark'" src="@/assets/logos/distribex_white.png" class="h-6" alt="">
        <img v-else src="@/assets/logos/distribex.png" class="h-6 " alt="">
      </div>
    </div>

    <div class="flex-1 w-full flex flex-col px-2">

      <div class="h-12 mb-1"></div>

      <nav class="w-full h-fit card rounded-xl flex flex-col gap-1 p-1">
        <div v-for="item in routes" :key="item.id" class="w-full">

          <side-bar-router-subs v-if="item.subs" :item="item" />

          <side-bar-router v-else :item="item" />
        </div>
      </nav>
    </div>

    <div class="w-full bg-red-200 transition-all ease-in-out duration-300 h-16"></div>
  </div>
  <sheet v-else :open="useWidget.openSide" :side="useWidget.userLanguage === 'ar' ? 'right' : 'left'" @closeSide="(value) => {
    useWidget.openSide = value
  }" />
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import sideBarRouter from './sideBarRouter.vue';
import sideBarRouterSubs from './sideBarRouterSubs.vue';
import { onMounted, ref, watch } from 'vue';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import sheet from '../commun/sheet.vue';
import { ChartArea, FileSpreadsheet, HandCoins, House, Lamp, LayoutDashboard } from 'lucide-vue-next';

const useWidget = useWidgetStore()
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

watch(() => isDesktop, () => {
  useWidget.openSide = false
})


const routes = ref(
  [
    {
      id: 1,
      name: 'dashboard',
      icon: ChartArea,
      links: null
    }, {
      id: 2,
      name: 'administration',
      icon: House,
      subs: [
        {
          title: '',
          links: [
            { id: 1, name: 'usersManagement' }
          ]
        },
        {
          title: '',
          links: [
            { id: 1, name: 'clientsManagement' }
          ]
        },
        {
          title: '',
          links: [
            { id: 1, name: 'usersConfig' }
          ]
        }, {
          title: '',
          links: [
            { id: 1, name: 'financeConfig' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'products',
      icon: Lamp,
      subs: [
        {
          title: '',
          links: [
            { id: 1, name: 'list' },

            { id: 12, name: 'config' }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'orders',
      icon: FileSpreadsheet,
      links: null
    }, {
      id: 5,
      name: 'receivables',
      icon: HandCoins,
      subs: [
        {
          title: '',
          links: [
            { id: 1, name: 'bills' }, { id: 2, name: 'deliveryNote' }
          ]
        }
      ]
    },
  ]
)

</script>

<style lang="scss">
nav {
  a {
    color: var(--btn-float);
    fill: var(--btn-float);

    &.router-link-exact-active {
      background-color: var(--vt-primary-2);
      color: #fff;
      fill: #fff;
    }

    &.router-link-active {
      background-color: color-mix(in srgb, var(--vt-primary-2) 10%, transparent);
      color: var(--vt-primary-2);
      fill: var(--vt-primary-2);
    }
  }
}
</style>
