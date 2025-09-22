import { ref } from 'vue'

export function useVoiceRecorder(maxDuration = 120) {
  const recording = ref(false)
  const audioUrl = ref(null)
  const audioBlob = ref(null)
  const duration = ref(0)

  let timer = null
  let mediaRecorder
  let chunks = []
  let stream // keep reference to mic stream

  const startRecording = async () => {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)

    chunks = []
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)

    mediaRecorder.onstop = () => {
      audioBlob.value = new Blob(chunks, { type: 'audio/webm' })
      audioUrl.value = URL.createObjectURL(audioBlob.value)
      clearInterval(timer)
      timer = null

      // 🔴 release mic
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        stream = null
      }
    }

    mediaRecorder.start()
    recording.value = true
    duration.value = 0

    // ⏱ track duration
    timer = setInterval(() => {
      duration.value++
      if (duration.value >= maxDuration) {
        stopRecording() // auto stop
      }
    }, 1000)
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
    }
    recording.value = false
    clearInterval(timer)
    timer = null
  }

  const getBase64 = () =>
    new Promise((resolve, reject) => {
      if (!audioBlob.value) return reject('No audio recorded')
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(audioBlob.value)
    })

  return {
    recording,
    audioUrl,
    audioBlob,
    duration,
    startRecording,
    stopRecording,
    getBase64,
  }
}
