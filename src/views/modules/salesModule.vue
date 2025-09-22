<template>
  <main :class="['w-full h-screen overflow-hidden']">

    <sheet :open="false" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'"></sheet>

    <div :class="[
      useWidget.isMobile ? 'bg-red-600' : '']" class="w-full h-full flex">

      <side-bar :routes="routes" module="sales" />

      <div :class="scaleIt ? 'scale-[98%]' : 'scale-100'"
        class="flex-1 h-full transition-all duration-200 flex flex-col overflow-hidden">
        <router-view></router-view>
      </div>
    </div>

  </main>
</template>

<script setup>
import sheet from '@/components/commun/sheet.vue'
import { useWidgetStore } from "@/stores/widget";
import { onBeforeMount, ref, watchEffect } from 'vue';
import sideBar from '@/components/navigation/sideBar.vue';
import { Clock4, Contact, House, User, UserCog, Users, UserSearch } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const useWidget = useWidgetStore()
const router = useRouter()
const scaleIt = ref(false)

const routes = ref([
  {
    id: 1,
    name: 'contacts',
    icon: Contact,
    subs: [
      {
        title: '',
        links: [
          {
            id: 1, name: 'list',
            link: 'sales-contacts-list-view',
          },
        ]
      }
    ]
  },
])

onBeforeMount(() => {
  try {
    useWidget.currentModule = 'sales'
    useWidget.communRoutes = routes.value
    router.push({ name: routes.value[0].link })
  } catch (error) {
    console.error(error)
  }
})


watchEffect(() => {
  if (useWidget.sheet) {
    scaleIt.value = true
  } else {
    scaleIt.value = false
  }
})

</script>

<style lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease-out;
}
</style>
