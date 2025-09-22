<template>
  <div class="flex gap-3 items-center" :class="{ playing: isPlaying }">
    <audio ref="audioEl" :src="src" preload="metadata" @ended="onEnded" crossorigin="anonymous"
      class="opacity-0"></audio>

    <button class="btn-play" @click="togglePlay" :aria-pressed="isPlaying.toString()"
      :title="isPlaying ? 'Pause' : 'Play'">
      <span v-if="!isPlaying">▶</span>
      <span v-else>❚❚</span>
    </button>

    <div class="memo-body">
      <div>
        <div class="bars" ref="barsContainer" :style="{ '--bars-count': numBars }">
          <AVLine :src="src" />
        </div>
      </div>
    </div>
    <div class="meta">
      <span class="time">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { AVLine } from 'vue-audio-visual'

const props = defineProps({
  src: { type: String, required: true },
  // number of vertical bars shown in the visualiser
  numBars: { type: Number, default: 20 },
  autoplay: { type: Boolean, default: false }
})

const audioEl = ref(null)
const audioCtx = ref(null)
const analyser = ref(null)
const dataArray = ref(null)
const sourceNode = ref(null)
const rafId = ref(null)
const isPlaying = ref(false)
const barHeights = ref(Array.from({ length: props.numBars }, () => 2))
const startTimestamp = ref(0)
const currentSeconds = ref(0)

const formattedTime = computed(() => {
  const s = Math.floor(currentSeconds.value)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
})

function createAudioGraph() {
  if (!audioEl.value) return
  // guard for resumed context (some browsers require user gesture)
  if (!audioCtx.value || audioCtx.value.state === 'closed') {
    audioCtx.value = new (window.AudioContext || window.webkitAudioContext)()
  }

  // if already created, do nothing
  if (analyser.value) return

  sourceNode.value = audioCtx.value.createMediaElementSource(audioEl.value)
  analyser.value = audioCtx.value.createAnalyser()
  analyser.value.fftSize = 2048
  analyser.value.smoothingTimeConstant = 0.75

  sourceNode.value.connect(analyser.value)
  analyser.value.connect(audioCtx.value.destination)

  const bufferLength = analyser.value.frequencyBinCount
  dataArray.value = new Uint8Array(bufferLength)
}

function startVisualiser() {
  if (!analyser.value || !dataArray.value) return
  cancelAnimation()
  loop()
}

function loop() {
  if (!analyser.value) return
  analyser.value.getByteFrequencyData(dataArray.value)

  // Map frequency bins to N bars
  const bins = dataArray.value
  const binCount = bins.length
  const step = Math.floor(binCount / props.numBars) || 1

  for (let i = 0; i < props.numBars; i++) {
    // average a small range for smoother visuals
    let sum = 0
    let count = 0
    for (let j = i * step; j < (i + 1) * step && j < binCount; j++) {
      sum += bins[j]
      count++
    }
    const avg = count > 0 ? sum / count : 0
    // Normalize 0-255 to 0-100 (percentage height)
    const percent = Math.round((avg / 255) * 100)
    // Apply small random to mimic voice memos feel
    const jitter = Math.random() * 8 - 4
    barHeights.value[i] = Math.min(100, Math.max(2, percent + jitter))
  }

  // update current playback time
  if (audioEl.value) currentSeconds.value = audioEl.value.currentTime

  rafId.value = requestAnimationFrame(loop)
}

function cancelAnimation() {
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }
}

async function togglePlay() {
  if (!audioEl.value) return

  try {
    // some browsers block AudioContext resume until user gesture
    if (audioCtx.value && audioCtx.value.state === 'suspended') {
      await audioCtx.value.resume()
    }

    if (audioEl.value.paused) {
      // connect graph if not already
      if (!analyser.value) createAudioGraph()
      await audioEl.value.play()
      isPlaying.value = true
      startVisualiser()
    } else {
      audioEl.value.pause()
      isPlaying.value = false
      cancelAnimation()
    }
  } catch (err) {
    // handle play errors e.g. autoplay restrictions
    console.warn('Play failed', err)
  }
}

function onEnded() {
  isPlaying.value = false
  cancelAnimation()
  // reset bars softly
  barHeights.value = Array.from({ length: props.numBars }, () => 2)
  currentSeconds.value = 0
}

onMounted(() => {
  // prepare audio graph on mount (but will actually create context on play)
  // createAudioGraph() // delay until first play to avoid autoplay block

  // autoplay if requested and allowed
  if (props.autoplay && audioEl.value) {
    // try to play but browsers may block autoplay w/out gesture
    togglePlay()
  }
})

// cleanup
onBeforeUnmount(() => {
  cancelAnimation()
  try {
    if (analyser.value) {
      analyser.value.disconnect()
      analyser.value = null
    }
    if (sourceNode.value) {
      sourceNode.value.disconnect()
      sourceNode.value = null
    }
    if (audioCtx.value) {
      // Closing the context to release resources
      audioCtx.value.close()
      audioCtx.value = null
    }
  } catch (e) {
    // ignore
  }
})
</script>

<style scoped>
/* meta: time etc */
.meta {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #6b7280;
}
</style>
