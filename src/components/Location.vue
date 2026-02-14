<script setup>
defineProps({
  venueKhs: {
    type: String,
    default: 'គេហដ្ឋានខាងស្រី​ ស្ថិតនៅ ភូមិរហាងសួង ឃុំព្រែកហ្លួង ស្រុកឯកភ្នំ ខេត្តបាត់ដំបង'
  },
  venueEns: {
    type: String,
    default: 'The woman\'s house is located in Hang Suong village, Prek Luong commune, Ek Phnom district, Battambang province.'
  },
  addressKhs: {
    type: String,
    default: 'ក្រោមសាលាបឋមសិក្សារហាលសួងប្រហែល៥០០ម៉ែត្រ'
  },
  addressEns: {
    type: String,
    default: 'Under Rohal Suong Primary School, about 500 meters.'
  },
  mapsUrls: {
    type: String,
    default: 'https://maps.app.goo.gl/bzUKRgyHbUCpk8mm9?g_st=atm'
  },
  eventTimeKhs: {
    type: String,
    default: 'ថ្ងៃសៅរ៍ ២៨ កុម្ភៈ ឆ្នាំ ២០២៦ វេលាម៉ោង១១:០០ ថ្ងៃត្រង់'
  }
})
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">ទីតាំងពិធីបង្គលការ</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">Wedding's location</p>
    </div>

    <div class="temple-frame max-w-2xl mx-auto">
      <div class="temple-panel p-6 sm:p-8 max-[390px]:p-4">
        <div class="grid sm:grid-cols-2 gap-6 items-center max-[390px]:gap-4">
          <div>
            <p class="font-khmer-title text-lg text-[#f4ddb2] max-[390px]:text-base">{{ venueKhs }}</p>
            <p class="font-khmer-body text-sm tracking-[0.04em] text-[#d1ad67] mt-1">{{ venueEns }}</p>

            <div class="mt-4 space-y-2 text-sm text-[#e9d3a7]/90">
              <p>{{ addressKhs }}</p>
              <p>{{ addressEns }}</p>
              <p class="font-khmer-body text-xs tracking-[0.04em] text-[#cca661] max-[390px]:text-[10px]">{{ eventTimeKhs }}</p>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(242,207,128,0.24),transparent_70%)]"></div>
            <div class="relative temple-frame">
              <div class="temple-panel p-5 text-center">
                <p class="text-4xl text-[#d4ad66]">&#8962;</p>
                <p class="font-khmer-body text-sm mt-2 text-[#e8d3a7]">ផែនទីទីតាំង</p>
                <p class="font-khmer-body text-[10px] tracking-[0.06em] text-[#bf9c58]">Location map</p>
                <a
                  :href="mapsUrls"
                  target="_blank"
                  rel="noopener noreferrer"
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
