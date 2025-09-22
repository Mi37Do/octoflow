<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

    <div class="w-full flex-1 overflow-hidden">
      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 px-3">
        <!-- header -->
        <div class="w-full h-10 flex items-center justify-between">
          <span class="pixa-title px-3">discussions</span>
          <div class="flex gap-2 items-center">

            <router-link :to="{ name: 'humanResources-add-user-view' }" class="btn btn-primary">
              <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.pipline') }}
            </router-link>
          </div>
        </div>

        <!-- board -->
        <div v-if="discussions.length > 0" class="w-full h-full flex overflow-hidden pb-3 gap-3">
          <div class="w-96 h-full bg-glass-effect flex flex-col">
            <discussions-side :list="discussions" :types="types" />
          </div>

          <div class="flex-1 h-full bg-glass-effect overflow-hidden">
            <router-view></router-view>
          </div>
        </div>

        <!-- empty state -->
        <div v-else class="grow w-full flex flex-col items-center justify-center gap-8">
          <img src="@/assets/pics/noData.svg" class="w-52" />
          <span class="uppercase max-w-80 px-4 text-center">{{ t('translation.noData') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import { Columns3, List, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref, reactive, provide, computed } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import { faker } from '@faker-js/faker';
import { useProjectStore } from '@/stores/humanResources/projects';
import discussionsSide from '@/components/discussions/discussionsSide.vue';

const useProject = useProjectStore();
const { t } = useI18n();
const loading = ref(true);
const useWidget = useWidgetStore();

const types = ["group", "project", "helpdesk", "module", "direct"];

function useFakeDiscussions(count = 10) {

  const discussions = Array.from({ length: count }, (_, i) => {
    const participantsCount = faker.number.int({ min: 2, max: 10 });

    // If more than 2 participants, force type to group
    let chatType =
      participantsCount > 2 ? "group" : faker.helpers.arrayElement(types);

    const participants = Array.from({ length: participantsCount }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }));

    const lastMessageTime = faker.date.recent({ days: 10 });

    return {
      id: i + 1,
      name:
        chatType === "direct"
          ? participants.map((p) => p.name).join(" & ")
          : faker.company.name(),
      type: chatType,
      participants,
      lastMessage: faker.lorem.sentence(),
      seen: faker.datatype.boolean(),
      lastMessageTime: lastMessageTime.toLocaleString(), // formatted
      messagesCount: faker.number.int({ min: 1, max: 500 }),
    };
  });

  return ref(discussions);
}

// Example usage
const discussions = useFakeDiscussions(15);

// load data
onMounted(async () => {
  try {
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = true;
  }
});

</script>

<style lang="scss" scoped>
.scrollbar-overlay {
  scrollbar-gutter: stable;
}

.scrollbar-overlay::-webkit-scrollbar {
  width: 12px;
}

.scrollbar-overlay::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-overlay::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 6px;
  border: 3px solid transparent;
  background-clip: content-box;
}
</style>
