<script setup>
import { useLanguage } from '../composables/useLanguage'

defineProps({
  venueKh: {
    type: String,
    default: 'គេហដ្ឋានខាងស្រី ស្ថិតនៅ ភូមិរហាលសួង ឃុំព្រែកហ្លួង ស្រុកឯកភ្នំ ខេត្តបាត់ដំបង'
  },
  venueEn: {
    type: String,
    default: 'Bride\'s house, Hang Suong Village, Prek Luong Commune, Ek Phnom District, Battambang Province.'
  },
  addressKh: {
    type: String,
    default: 'ក្រោមសាលាបឋមសិក្សារហាលសួង ប្រហែល ៥០០ ម៉ែត្រ'
  },
  addressEn: {
    type: String,
    default: 'About 500 meters from Rohal Suong Primary School.'
  },
  mapsUrl: {
    type: String,
    default: 'https://maps.app.goo.gl/bzUKRgyHbUCpk8mm9?g_st=atm'
  },
  eventTimeKh: {
    type: String,
    default: 'ថ្ងៃសៅរ៍ ទី២៨ ខែកុម្ភៈ ឆ្នាំ២០២៦ វេលាម៉ោង ១១:០០ ថ្ងៃត្រង់'
  },
  eventTimeEn: {
    type: String,
    default: 'Saturday, 28 February 2026 at 11:00 AM'
  }
})

const { isKh } = useLanguage()
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">{{ isKh ? 'ទីតាំងពិធីមង្គលការ' : 'Wedding Location' }}</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">
        {{ isKh ? 'អាសយដ្ឋាន និងផែនទី' : 'Address and Map' }}
      </p>
    </div>

    <div class="temple-frame max-w-2xl mx-auto">
      <div class="temple-panel p-6 sm:p-8 max-[390px]:p-4">
        <div class="grid sm:grid-cols-2 gap-6 items-center max-[390px]:gap-4">
          <div>
            <p class="font-khmer-title text-lg text-[#f4ddb2] max-[390px]:text-base">{{ isKh ? venueKh : venueEn }}</p>

            <div class="mt-4 space-y-2 text-sm text-[#e9d3a7]/90">
              <p>{{ isKh ? addressKh : addressEn }}</p>
              <p class="font-khmer-body text-xs tracking-[0.04em] text-[#cca661] max-[390px]:text-[10px]">
                {{ isKh ? eventTimeKh : eventTimeEn }}
              </p>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(242,207,128,0.24),transparent_70%)]"></div>
            <div class="relative temple-frame">
              <div class="temple-panel p-5 text-center">
                <p class="text-4xl text-[#d4ad66]">&#8962;</p>
                <p class="font-khmer-body text-sm mt-2 text-[#e8d3a7]">{{ isKh ? 'ផែនទីទីតាំង' : 'Location Map' }}</p>
                <a
                  :href="mapsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex mt-4 rounded-full gold-btn px-4 py-2 text-xs tracking-[0.06em] transition"
                >
                  {{ isKh ? 'បើកផែនទី' : 'Open Map' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
