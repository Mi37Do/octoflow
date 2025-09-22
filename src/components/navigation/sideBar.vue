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

    <router-link :to="{ name: 'overview' }" class="w-full h-16 transition-all ease-in-out duration-300 flex ">
      <div class="w-16 h-16 flex items-center justify-center">
        <img v-if="useWidget.themeState === 'dark'" src="@/assets/logos/square_logo_white.svg" class="w-8 h-8 ml-1"
          alt="">
        <img v-else src="@/assets/logos/square_logo.svg" class="w-8 h-8 ml-1" alt="">
      </div>
      <div class="flex-1 h-full flex items-center overflow-hidden relative">
        <img v-if="useWidget.themeState === 'dark'" src="@/assets/logos/octaflow-white.svg" class="h-5" alt="">
        <img v-else src="@/assets/logos/octaflow.svg" class="h-5 " alt="">
      </div>
    </router-link>

    <div class="flex-1 w-full flex flex-col px-2 pb-2">

      <div class="h-12 mb-1"></div>

      <nav class="w-full h-fit card rounded-xl flex flex-col gap-1 p-1">
        <div v-for="item in routes" :key="item.id" class="w-full">

          <side-bar-router-subs v-if="item.subs" :item="item" />

          <side-bar-router v-else :item="item" />
        </div>
      </nav>

    </div>

    <div class="w-full flex flex-col px-2 pb-2">
      <nav class="w-full h-fit card rounded-xl flex flex-col gap-1 p-1">
        <side-bar-router :item="chatRoute" />

        <div :class="useWidget.openSide ? 'pr-2 py-1 ' : ' p-0'"
          class="w-full hover:bg-[var(--color-commun-border)]  hover:border-[var(--color-commun-border)] rounded-lg flex items-center transition-all duration-200 ">

          <div class="px-0.5">
            <div
              class="w-9 h-9 flex items-center overflow-hidden transition-all duration-200 bg-[var(--color-bg-side)] rounded-lg p-0.5">
              <div
                class="w-full h-full bg-gradient-to-br from-[var(--vt-primary-1)] to-[var(--vt-primary-2)] rounded-md flex flex-col">
                <span></span>
              </div>
            </div>
          </div>


          <div :class="useWidget.openSide ? 'flex-1' : 'w-0'" class=" flex items-center gap-2 overflow-hidden">
            <div class="flex-1 flex flex-col px-1">
              <span class="truncate">{{ useAuth.authUser?.details?.first_name || 'User' }} {{
                useAuth.authUser?.details?.last_name || 'one' }}</span>
              <span class="truncate text-xs">@{{ useAuth.authUser?.details?.username || 'username' }} </span>
            </div>
            <ChevronRight class="w-4" />
          </div>
        </div>
      </nav>
    </div>


    <div
      class="w-full transition-all ease-in-out duration-300 h-fit pb-1 pl-4 pr-2 flex flex-col justify-center gap-2.5">





      <!--
      <button :class="useWidget.openSide ? 'w-full' : 'btn-square'" class="btn btn-nofloat-red">
        <LogOut class="w-5 flex-none" />
        <div :class="useWidget.openSide ? 'flex-1' : 'w-0'"
          class="h-full flex items-center overflow-hidden transition-all duration-200">
          <span class="flex-none">{{ t('translation.signOut') }}</span>
        </div>
      </button>-->
    </div>
  </div>
  <sheet v-else :open="useWidget.openSide" :side="useWidget.userLanguage === 'ar' ? 'right' : 'left'" @closeSide="(value) => {
    useWidget.openSide = value
  }" />
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import sideBarRouter from './sideBarRouter.vue';
import sideBarRouterSubs from './sideBarRouterSubs.vue';
import { reactive, watch } from 'vue';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import sheet from '../commun/sheet.vue';
import { ChevronRight, LogOut, MessagesSquare } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';

const useWidget = useWidgetStore()
const useAuth = useAuthStore()
const { t } = useI18n()
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')
const props = defineProps(['routes', 'module'])
const chatRoute = reactive(
  {
    id: 1,
    name: 'discussions',
    icon: MessagesSquare,
    link: props.module + '-discussions-view',
  },
)

watch(() => isDesktop, () => {
  useWidget.openSide = false
})

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
