<template>
  <div class="w-full h-screen overflow-hidden relative flex flex-col items-center
  justify-center">

    <topAppBar class="z-10"></topAppBar>

    <div class="w-full max-w-screen-lg flex-1 overflow-hidden z-10">
      <div class="h-full overflow-auto flex lg:items-center hidden-scrollbar">
        <div class="h-fit flex flex-wrap justify-center gap-12 py-10">
          <div v-for="module in modules" :key="module.id" class="w-72 h-fit flex flex-col gap-6">
            <div class="flex gap-3 items-center">
              <div
                class="w-10 h-10 bg-gradient-to-br from-[var(--vt-primary-1)] to-[var(--vt-primary-2)]  rounded-xl flex items-center justify-center text-[var(--color-bg-side)]">
                <component :is="module.icon" style="width: 20px;"></component>
              </div>
              <span class="pixa-title">{{ module.designation }}</span>
            </div>

            <div class="w-full grid gap-3">
              <router-link :to="{ name: link.link }" v-for="link in module.links" :key="link.id"
                class="w-full h-12 bg-[var(--color-bg-side)] rounded-xl p-3 flex gap-3 items-center leading-loose">
                <component :is="link.icon" style="width: 20px;"></component>
                <span class="pixa-title-2 ">{{ t(`translation.${link.designation}`) }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="h-12 w-full flex items-center justify-center">
      <span class="text-xs h-12 border-t border-[var(--color-commun-border)] flex items-center">All rights
        reserved,
        developped
        by
        xpertify-solutions</span>
    </div>

    <div class="w-full h-full absolute flex items-center justify-center">
      <div class="w-full h-full flex items-center justify-center opacity-5">
        <img v-if="useWidget.themeState === 'dark'" src="@/assets/logos/square_logo_white.svg" class="w-[60vw] h-[60vw]"
          alt="">
        <img v-else src="@/assets/logos/square_logo.svg" class="w-[60vw] h-[60vw]" alt="">
      </div>
    </div>

    <div
      class="w-[800px] h-[800px] absolute rounded-full bg-gradient-to-b from-transparent to-[var(--vt-primary-1)] blur-3xl -bottom-[400px] opacity-15">
    </div>

  </div>
</template>

<script setup>
import { BanknoteArrowDown, Bolt, ChartLine, Clock4, Contact, FolderOpen, Hammer, House, Lamp, Landmark, ReceiptText, ShoppingCart, Store, User, UserCog, Users, UserSearch, Warehouse, Wrench } from 'lucide-vue-next';
import { ref } from 'vue';
import topAppBar from '@/components/navigation/topAppBar.vue';
import { useI18n } from 'vue-i18n';
import { useWidgetStore } from '@/stores/widget';

const { t } = useI18n()
const useWidget = useWidgetStore()
const modules = ref(
  [
    {
      id: 1,
      designation: 'sales',
      icon: ChartLine,
      links: [
        {
          id: 1,
          designation: 'sales',
          icon: ChartLine,
          link: 'coming-soon-view'
        },
        {
          id: 2,
          designation: 'crm',
          icon: House,
          link: 'coming-soon-view'
        },
        {
          id: 3,
          designation: 'pos',
          icon: Store,
          link: 'coming-soon-view'
        },
        {
          id: 4,
          designation: 'contacts',
          icon: Contact,
          link: 'sales-contacts-list-view'
        }
      ]
    }, {
      id: 2,
      designation: 'manufacturing',
      icon: Wrench,
      links: [
        {
          id: 1,
          designation: 'manufacturing',
          icon: Wrench,
          link: 'coming-soon-view'
        },
        {
          id: 2,
          designation: 'maintenance',
          icon: Hammer,
          link: 'coming-soon-view'
        }
      ]
    }, {
      id: 3,
      designation: 'human resources',
      icon: Users,
      links: [
        {
          id: 1,
          designation: 'usersManagement',
          icon: User,
          link: 'humanResources-usersManagement-view'
        },
        {
          id: 2,
          designation: 'recruitment',
          icon: UserSearch,
          link: 'humanResources-recrutements-view'
        },
        {
          id: 3,
          designation: 'attendances',
          icon: Clock4,
          link: 'humanResources-attendances-view'
        },
        {
          id: 4,
          designation: 'time_off',
          icon: UserCog,
          link: 'humanResources-timeOff-view'
        },
        {
          id: 5,
          designation: 'projects_management',
          icon: FolderOpen,
          link: 'humanResources-projectsManagement-view'
        }
      ]
    }, {
      id: 4,
      designation: 'finance & accounting',
      icon: Landmark,
      links: [
        {
          id: 1,
          designation: 'invoicing',
          icon: ReceiptText,
          link: 'coming-soon-view'
        },
        {
          id: 2,
          designation: 'credits',
          icon: BanknoteArrowDown,
          link: 'coming-soon-view'
        }
      ]
    }, {
      id: 5,
      designation: 'inventory',
      icon: Warehouse,
      links: [
        {
          id: 1,
          designation: 'inventory',
          icon: Warehouse,
          link: 'coming-soon-view'
        },
        {
          id: 2,
          designation: 'purchases',
          icon: ShoppingCart,
          link: 'coming-soon-view'
        },
        {
          id: 3,
          designation: 'products',
          icon: Lamp,
          link: 'coming-soon-view'
        }
      ]
    }
  ]
)

</script>

<style lang="scss" scoped>
.icon-large {
  width: 52px;
  height: 52px;
}
</style>
