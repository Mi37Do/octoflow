<template>
  <div class="w-full h-full flex overflow-hidden">
    <div class="flex-1 flex flex-col overflow-hidden">
      <commun-scrollable :reversed="true">
        <template #scrollable-content>
          <div :class="useWidget.userLanguage === 'ar' ? 'pr-3' : 'pl-3'" class="h-fit flex flex-col gap-1.5 py-3">
            <message-item v-for="item in fakeMessages" :key="item" :item="item" />
          </div>
        </template>
      </commun-scrollable>

      <message-form />
    </div>
    <div class="w-96 h-full  border-l border-[var(--color-commun-border)]"></div>
  </div>
</template>

<script setup>
import messageForm from '@/components/discussions/messageForm.vue';
import communScrollable from '@/components/commun/communScrollable.vue';
import messageItem from '@/components/discussions/messageItem.vue';
import { faker } from '@faker-js/faker'
import { useWidgetStore } from '@/stores/widget';

const useWidget = useWidgetStore()

function generateMessages(count = 10) {
  const fileTypes = ['pdf', 'docx', 'xlsx']
  const messages = []

  // Simulate the current user
  const currentUser = {
    name: 'You',
    avatar: faker.image.avatar()
  }

  for (let i = 0; i < count; i++) {
    const hasText = faker.datatype.boolean()
    const isAudio = !hasText // if no text → audio
    const hasImage = !isAudio && faker.datatype.boolean()
    const hasFile = !isAudio && faker.datatype.boolean()

    let images = []
    let file = null

    if (hasImage) {
      const imageCount = faker.number.int({ min: 1, max: 6 })
      images = Array.from({ length: imageCount }, () =>
        faker.image.urlPicsumPhotos({ width: 400, height: 300 })
      )
    }

    if (hasFile) {
      const fileType = faker.helpers.arrayElement(fileTypes)
      file = {
        name: faker.system.fileName({ extension: fileType }),
        type: fileType,
        url: faker.internet.url()
      }
    }

    // Randomly decide if this message is from current user
    const isSender = faker.datatype.boolean()
    const sender = isSender
      ? currentUser
      : {
        name: faker.person.firstName(),
        avatar: faker.image.avatar()
      }

    messages.push({
      id: faker.string.uuid(),
      sender,
      isSender,
      timestamp: faker.date.recent(),
      text: isAudio ? null : faker.lorem.sentence(),
      audio: isAudio ? faker.internet.url() + '/voice.mp3' : null,
      images,
      file
    })
  }

  return messages
}

const fakeMessages = generateMessages(10)
</script>

<style lang="scss" scoped></style>
