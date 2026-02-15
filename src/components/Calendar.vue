<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const props = defineProps({
  dateIso: {
    type: String,
    default: '2026-06-27T08:00:00+07:00'
  },
  monthKh: {
    type: String,
    default: 'កុម្ភៈ'
  },
  monthEn: {
    type: String,
    default: 'February'
  },
  weekdayKh: {
    type: String,
    default: 'ថ្ងៃសៅរ៍'
  },
  weekdayEn: {
    type: String,
    default: 'Saturday'
  }
})

const { isKh } = useLanguage()
const date = new Date(props.dateIso)

const eventDate = {
  monthKh: props.monthKh,
  monthEn: props.monthEn,
  day: String(date.getDate()),
  weekdayKh: props.weekdayKh,
  weekdayEn: props.weekdayEn,
  year: String(date.getFullYear())
}

function toKhmerDigits(value) {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
  return String(value).replace(/\d/g, (digit) => khmerDigits[Number(digit)])
}

const dayText = computed(() => (isKh.value ? toKhmerDigits(eventDate.day) : eventDate.day))
const yearText = computed(() => (isKh.value ? toKhmerDigits(eventDate.year) : eventDate.year))
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">{{ isKh ? 'កាលបរិច្ឆេទមង្គលការ' : 'Wedding Date' }}</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">
        {{ isKh ? 'ថ្ងៃពិធីអាពាហ៍ពិពាហ៍' : 'Event Date' }}
      </p>
    </div>

    <div class="temple-frame max-w-md mx-auto">
      <div class="temple-panel px-6 py-7 text-center max-[390px]:px-4 max-[390px]:py-5">
        <p class="font-khmer-body text-sm text-[#e8d3a7]/90">{{ isKh ? eventDate.weekdayKh : eventDate.weekdayEn }}</p>

        <p class="font-engraved text-7xl leading-none mt-3 engraved-text max-[390px]:text-6xl">{{ dayText }}</p>

        <p class="font-khmer-title text-lg gold-title mt-3">{{ isKh ? eventDate.monthKh : eventDate.monthEn }}</p>

        <div class="ornament-divider mt-4">
          <div class="ornament-line"></div>
          <span class="font-engraved tracking-[0.18em]">{{ yearText }}</span>
          <div class="ornament-line"></div>
        </div>
      </div>
    </div>
  </section>
</template>
