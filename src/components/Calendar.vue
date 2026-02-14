<script setup>
const props = defineProps({
  dateIso: {
    type: String,
    default: '2026-06-27T08:00:00+07:00'
  },
  monthKh: {
    type: String,
    default: 'កុម្ភៈ'
  },
  weekdayKh: {
    type: String,
    default: 'ថ្ងៃសៅរ៍'
  }
})

const date = new Date(props.dateIso)
const eventDate = {
  monthKh: props.monthKh,
  monthEn: props.monthKh,
  day: String(date.getDate()),
  weekdayKh: props.weekdayKh,
  weekdayEn: props.weekdayKh,
  year: String(date.getFullYear())
}
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">កាលបរិច្ឆេទមង្គលការ</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">Wedding date</p>
    </div>

    <div class="temple-frame max-w-md mx-auto">
      <div class="temple-panel px-6 py-7 text-center max-[390px]:px-4 max-[390px]:py-5">
        <p class="font-khmer-body text-sm text-[#e8d3a7]/90">{{ eventDate.weekdayKh }}</p>
        <p class="font-khmer-body text-xs tracking-[0.06em] text-[#bd9b58]">Saturday</p>

        <p class="font-engraved text-7xl leading-none mt-3 engraved-text max-[390px]:text-6xl">{{ eventDate.day }}</p>

        <p class="font-khmer-title text-lg gold-title mt-3">{{ eventDate.monthKh }}</p>
        <p class="font-khmer-body text-xs tracking-[0.06em] text-[#d4bb86]/90">February</p>

        <div class="ornament-divider mt-4">
          <div class="ornament-line"></div>
          <span class="font-engraved tracking-[0.18em]">{{ eventDate.year }}</span>
          <div class="ornament-line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

