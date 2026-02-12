<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  targetDateIso: {
    type: String,
    default: '2026-06-27T08:00:00+07:00'
  }
})

const targetDate = computed(() => new Date(props.targetDateIso).getTime())
const now = ref(Date.now())
let timer = null

const timeLeft = computed(() => {
  const diff = Math.max(0, targetDate.value - now.value)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
})

const units = [
  { key: 'days', kh: 'ថ្ងៃ', en: 'ថ្ងៃ' },
  { key: 'hours', kh: 'ម៉ោង', en: 'ម៉ោង' },
  { key: 'minutes', kh: 'នាទី', en: 'នាទី' },
  { key: 'seconds', kh: 'វិនាទី', en: 'វិនាទី' }
]

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">រាប់ថយក្រោយ</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">ពេលវេលាមុនពិធី</p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-[390px]:gap-2">
      <article
        v-for="unit in units"
        :key="unit.key"
        class="temple-frame"
      >
        <div class="temple-panel px-3 py-4 text-center h-full max-[390px]:px-2 max-[390px]:py-3">
          <p class="font-engraved text-3xl sm:text-4xl engraved-text max-[390px]:text-2xl">{{ timeLeft[unit.key] }}</p>
          <p class="font-khmer-body text-xs text-[#e8d3a7]/85 mt-2 max-[390px]:mt-1">{{ unit.kh }}</p>
          <p class="font-khmer-body text-[10px] tracking-[0.06em] text-[#bd9b58]/85 mt-1">{{ unit.en }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
