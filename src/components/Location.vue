<script setup>
defineProps({
  venueKh: {
    type: String,
    default: 'សណ្ឋាគារ សុខា ភ្នំពេញ'
  },
  venueEn: {
    type: String,
    default: 'សណ្ឋាគារ សុខា ភ្នំពេញ'
  },
  addressKh: {
    type: String,
    default: 'ផ្លូវជាតិលេខ ៦A សង្កាត់ជ្រោយចង្វារ រាជធានីភ្នំពេញ'
  },
  addressEn: {
    type: String,
    default: 'ផ្លូវជាតិលេខ ៦A សង្កាត់ជ្រោយចង្វារ រាជធានីភ្នំពេញ'
  },
  mapsUrl: {
    type: String,
    default: 'https://maps.google.com/?q=Sokha+Phnom+Penh+Hotel'
  }
})
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">ទីតាំងពិធី</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">ព័ត៌មានទីតាំង</p>
    </div>

    <div class="temple-frame max-w-2xl mx-auto">
      <div class="temple-panel p-6 sm:p-8 max-[390px]:p-4">
        <div class="grid sm:grid-cols-2 gap-6 items-center max-[390px]:gap-4">
          <div>
            <p class="font-khmer-title text-lg text-[#f4ddb2] max-[390px]:text-base">{{ venueKh }}</p>
            <p class="font-khmer-body text-sm tracking-[0.04em] text-[#d1ad67] mt-1">{{ venueEn }}</p>

            <div class="mt-4 space-y-2 text-sm text-[#e9d3a7]/90">
              <p>{{ addressKh }}</p>
              <p>{{ addressEn }}</p>
              <p class="font-khmer-body text-xs tracking-[0.04em] text-[#cca661] max-[390px]:text-[10px]">ពិធីទទួលភ្ញៀវ ០៨:០០ ព្រឹក ដល់ ១២:០០ ថ្ងៃត្រង់</p>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(242,207,128,0.24),transparent_70%)]"></div>
            <div class="relative temple-frame">
              <div class="temple-panel p-5 text-center">
                <p class="text-4xl text-[#d4ad66]">&#8962;</p>
                <p class="font-khmer-body text-sm mt-2 text-[#e8d3a7]">ផែនទីទីតាំង</p>
                <p class="font-khmer-body text-[10px] tracking-[0.06em] text-[#bf9c58]">ចូលទៅកាន់ទីតាំង</p>
                <a
                  :href="mapsUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex mt-4 rounded-full gold-btn px-4 py-2 text-xs tracking-[0.06em] transition"
                >
                  បើកផែនទី
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
