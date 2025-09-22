<template>
  <div class="w-full h-full flex overflow-hidden relative">
    <div ref="containerRef" class="w-full h-full overflow-auto pb-6 scrollbar-overlay relative">
      <slot name="scrollable-content"></slot>
    </div>
    <div v-if="top" :class="hideTop ? 'opacity-0 pointer-events-none' : 'opacity-100'"
      class="w-full h-20 bg-gradient-to-b from-[var(--color-background)] absolute top-0"></div>
    <div v-if="bottom" :class="hideBottom ? 'opacity-0 pointer-events-none' : 'opacity-100'"
      class="w-full h-20 bg-gradient-to-t from-[var(--color-background)] absolute bottom-0"></div>
  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps(['top', 'bottom', 'reversed'])
const containerRef = ref(null)
const hideTop = ref(true)
const hideBottom = ref(false)


function onScroll() {
  const el = containerRef.value
  if (!el) return

  const { scrollTop, scrollHeight, clientHeight } = el
  const maxScroll = scrollHeight - clientHeight
  const percent = (scrollTop / maxScroll) * 100

  if (props.reversed) {
    // reversed: top ↔ bottom
    hideBottom.value = scrollTop > 20         // bottom fade hides if not at very top
    hideTop.value = scrollTop <= maxScroll - 20 // top fade hides near bottom
  } else {
    hideTop.value = percent < 20
    hideBottom.value = percent >= 80
  }
}


onMounted(() => {
  const el = containerRef.value
  if (!el) return

  el.addEventListener('scroll', onScroll)

  // if reversed → jump to bottom
  if (props.reversed) {
    el.scrollTop = el.scrollHeight
  }
})

onBeforeUnmount(() => {
  containerRef.value?.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
/* This will make the scrollbar overlay the content */
.scrollbar-overlay {
  scrollbar-gutter: stable;
}

/* Optional: Custom scrollbar styling */
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
