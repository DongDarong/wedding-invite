<script setup>
defineProps({
  brideKh: {
    type: String,
    default: 'រ៉ុង រីណា'
  },
  groomKh: {
    type: String,
    default: 'ឈឿន រ៉ាឆា'
  },
  brideEn: {
    type: String,
    default: 'កូនស្រី'
  },
  groomEn: {
    type: String,
    default: 'កូនប្រុស'
  },
  brideFatherKh: {
    type: String,
    default: 'វុន ចំរ៉ុង'
  },
  brideMotherKh: {
    type: String,
    default: 'ឈឿន សុឃឿន'
  },
  groomFatherKh: {
    type: String,
    default: 'វឿន សំអាត'
  },
  groomMotherKh: {
    type: String,
    default: 'ថោង សុភាព'
  }
})
</script>

<template>
  <header class="text-center pt-8 animate-[fade-up_1.5s_ease] max-[390px]:pt-5">
    <p class="font-khmer-body text-[11px] tracking-[0.08em] text-[#7e642d]/80 max-[390px]:text-[10px]">
      លិខិតអញ្ជើញចូលរួមពិធី​
    </p>
    <h2 class="font-khmer-title text-lg sm:text-xl mt-4 gold-title max-[390px]:mt-3 max-[390px]:text-base">សិរីមង្គលអាពាហ៍ពិពាហ៍</h2>
    <p class="mt-2 text-xs tracking-[0.08em] text-[#d7bf8a]/80 max-[390px]:text-[10px]">
      Wedding celebration
    </p>

    <div class="ornament-divider mt-6">
      <div class="ornament-line"></div>
      <span class="text-sm">&#10022; &#10048; &#10022;</span>
      <div class="ornament-line"></div>
    </div>

    <div class="mt-8 space-y-3 max-[390px]:mt-6 max-[390px]:space-y-2">
      <h1 class="font-khmer-title​ text-4xl sm:text-5xl max-[430px]:text-3xl max-[340px]:text-[1.65rem] gold-title leading-[1.35]
         break-keep text-center">{{ brideKh }}</h1>
      <p class="font-engraved text-base engraved-text tracking-[0.2em] max-[430px]:text-sm max-[430px]:tracking-[0.14em]">{{ brideEn }}</p>
      <p class="font-khmer-body text-sm text-[#dcc79b]/90 max-[430px]:text-xs">
         លោក {{ brideFatherKh }} និង លោកស្រី {{ brideMotherKh }}
      </p>

      <p class="font-engraved text-xl text-[#d7bf8a]/95">&</p>

      <h1 class="font-khmer-title​ text-4xl sm:text-5xl max-[430px]:text-3xl max-[340px]:text-[1.65rem] gold-title leading-[1.35]
         break-keep text-center">{{ groomKh }}</h1>
      <p class="font-engraved text-base engraved-text tracking-[0.2em] max-[430px]:text-sm max-[430px]:tracking-[0.14em]">{{ groomEn }}</p>
      <p class="font-khmer-body text-sm text-[#dcc79b]/90 max-[430px]:text-xs">
         លោក {{ groomFatherKh }} និង លោកស្រី {{ groomMotherKh }}
      </p>
    </div>

    <div class="ornament-divider mt-8 mb-2 max-[390px]:mt-6">
      <div class="ornament-line"></div>
      <span class="text-[11px] tracking-[0.08em] max-[390px]:text-[10px]">ថ្ងៃសៅរ៍ ទី២៨ ខែកុម្ភៈ ឆ្នាំ២០២៦</span>
      <div class="ornament-line"></div>
    </div>
  </header>
</template>

