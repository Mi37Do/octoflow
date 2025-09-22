<template>
  <div class="w-full h-14 p-1.5 border-t border-[var(--color-commun-border)]">
    <div v-if="isMessage" class="w-full h-full flex">
      <input type="text" class="flex-1 h-full bg-transparent rounded-lg px-3 py-2 outline-none"
        placeholder="Type a message..." />
      <button @click="() => {
        isMessage = false
        startRecording()
      }" class="btn btn-square">
        <Mic />
      </button>
      <button class="btn btn-square">
        <Send />
      </button>
    </div>



    <div v-else class="w-full h-full flex gap-3 px-3">
      <button @click="isMessage = true" class="btn btn-square">
        <X />
      </button>

      <div class="flex-1 h-full  bg-[var(--color-background)] rounded-xl p-2.5 flex items-center gap-3">
        <!--
        <span class="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>

        <span>{{ duration }}</span> -->
        <!-- Progress Bar -->
        <div class="flex-1 flex flex-col">
          <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime"
            @input="audio.currentTime = currentTime" class="w-full accent-blue-500 cursor-pointer" />

          <button @click="togglePlay" class="btn"></button>

          <div class="flex justify-between text-xs text-gray-500">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Hidden native player -->
        <audio ref="audio" src="your-voice-file-url.webm" @play="onPlay" @pause="onPause" @timeupdate="onTimeUpdate"
          @loadedmetadata="onLoaded" class="hidden"></audio>
      </div>

      <button @click="() => {
        // isMessage = true
        stopRecording()
        sendVoice()
      }" class="btn btn-square">
        <MoveUp />
      </button>
    </div>



  </div>
</template>

<script setup>
import { Mic, MoveUp, Send, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { useVoiceRecorder } from "@/lib/useVoiceRecorder";

const {
  recording,
  audioUrl,
  duration,
  startRecording,
  stopRecording,
  getBase64
} = useVoiceRecorder(120); // ⏱ 2 minutes max

const isMessage = ref(true)

const audio = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);

const togglePlay = () => {
  if (!audio.value) return;
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
};

const formatTime = (sec) => {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};


const onPlay = () => (isPlaying.value = true);
const onPause = () => (isPlaying.value = false);
const onTimeUpdate = () => (currentTime.value = audio.value.currentTime);
const onLoaded = () => (duration.value = audio.value.duration);

const sendVoice = async () => {
  const base64 = await getBase64();
  console.log("Voice base64:", base64.slice(0, 50) + "...");
  // 🚀 send to server (preferably upload blob and send URL)
};

const sendMessage = () => {

}
</script>

<style lang="scss" scoped></style>
